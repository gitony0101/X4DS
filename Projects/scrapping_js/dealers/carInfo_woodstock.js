import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import fs from 'fs';

// 自动滚动页面以确保加载所有车辆
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const { scrollHeight } = document.body;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

// 抓取单个页面的车辆信息
async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  // 解析车辆信息
  $('.listing-new-tile-drivePowerTrains').each((index, element) => {
    const carModel = $(element).find('.new-car-name').text().trim();
    const carDrive = $(element)
      .find('.new-car-motor p:nth-child(1)')
      .text()
      .trim();
    const carTransmission = $(element)
      .find('.new-car-motor p:nth-child(2)')
      .text()
      .trim();
    const carEngine = $(element)
      .find('.new-car-motor p:nth-child(3)')
      .text()
      .trim();

    // 获取车辆价格
    const carPrice = $(element)
      .closest('.listing-new-tile')
      .find('.payment-row-price')
      .text()
      .trim()
      .replace(/[$,]/g, '');

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carDrive,
        carTransmission,
        carEngine,
        carPrice,
      });
    }
  });

  return carInfo;
}

// 抓取整个网站的车辆信息并写入CSV文件
async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const allCarInfo = [];

  let currentPage = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const url = `${baseUrl}?page=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const carInfo = await scrapePage(page);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }

    // 检查是否存在下一页按钮
    const nextPageButton = await page.$(
      '.pagination__item:not(.disabled) .simple-arrow-right',
    );
    if (nextPageButton) {
      currentPage += 1;
    } else {
      hasNextPage = false;
    }
  }

  await browser.close();

  // 写入CSV文件
  const csvContent = [
    'Model,Drive,Transmission,Engine,Price',
    ...allCarInfo.map(
      (car) =>
        `${car.carModel},${car.carDrive},${car.carTransmission},${car.carEngine},${car.carPrice}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序正常结束
}

// 配置抓取的目标网站和输出文件路径
const website = {
  baseUrl: 'https://www.woodstocknbtoyota.com/en/new-inventory',
  output: 'carInfo_woodstock.csv',
};

// 执行抓取任务
(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})();
