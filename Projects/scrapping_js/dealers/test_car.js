import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import fs from 'fs';

// 自动滚动页面
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

// 点击 "Load More" 按钮直到页面完全加载
async function clickLoadMore(page) {
  let loadMoreButton = await page.$('.listing-used-button-loading');
  while (loadMoreButton) {
    console.log('Clicking Load More button...');
    await loadMoreButton.click();
    // 替换 waitForTimeout，使用直接延时
    await new Promise((resolve) => setTimeout(resolve, 3000));
    loadMoreButton = await page.$('.listing-used-button-loading');
  }
}

// 爬取页面中的车辆信息
async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('div.listing-new-tile').each((index, element) => {
    // 提取车辆信息
    const carModel = $(element).find('.new-car-name').text().trim();
    const drivetrain = $(element).find('.new-car-motor p').eq(0).text().trim();
    const transmission = $(element).find('.new-car-motor p').eq(1).text().trim();
    const engine = $(element).find('.new-car-motor p').eq(2).text().trim();
    const vin = $(element).find('.listing-tile-vin p').text().replace('VIN ', '').trim();
    const stockNumber = $(element).find('.listing-tile-specification-stock').text().replace('Stock #', '').trim();
    const color = $(element).find('.listing-tile-package-description').text().trim();

    // 提取价格信息
    let carPrice = $(element).find('.tile-selling-price').text().trim();
    carPrice = carPrice.replace(/[,$*]/g, ''); // 格式化价格

    // 检查 "In Transit" 状态
    const inTransit = $(element).find('.tile-tag:contains("In Transit")').length > 0;

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        drivetrain,
        transmission,
        engine,
        vin,
        stockNumber,
        color,
        carPrice,
        inTransit: inTransit ? 'Yes' : 'No',
      });
    }
  });

  return carInfo;
}

// 爬取网站并保存到 CSV 文件
async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  // 点击 "Load More" 按钮直到页面完全加载
  await clickLoadMore(page);

  // 开始爬取数据
  const carInfo = await scrapePage(page);

  await browser.close();

  // 将爬取的车辆信息写入 CSV 文件
  const csvContent = [
    'Model,Drivetrain,Transmission,Engine,VIN,Stock Number,Color,Price,In Transit',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.drivetrain},${car.transmission},${car.engine},${car.vin},${car.stockNumber},${car.color},${car.carPrice},${car.inTransit}`,
    ),
  ].join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  baseUrl: 'https://www.kentvilletoyota.com/en/new-inventory?page=1',
  output: 'carInfo_kentville.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error('Error:', err));
