import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import fs from 'fs';

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

async function clickLoadMore(page) {
  let loadMoreButton = await page.$('.listing-used-button-loading');
  while (loadMoreButton) {
    await loadMoreButton.click();
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 3000)),
    ); // 等待加载更多数据
    loadMoreButton = await page.$('.listing-used-button-loading');
  }
}

async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.listing-tile-link .listing-new-tile').each((index, element) => {
    const carModel = $(element).find('.new-car-name').text().trim();
    let carPrice = $(element).find('.payment-row-price').text().trim();

    // 移除价格中的逗号
    carPrice = carPrice.replace(/,/g, '');

    const carDetails = $(element)
      .find('.new-car-motor')
      .text()
      .replace(/\s\s+/g, ', ')
      .trim();
    const carStock = $(element).find('.listing-tile-vin').text().trim();

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carPrice,
        carDetails,
        carStock,
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const allCarInfo = [];

  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  // 点击所有的"Load More"按钮直到页面完全加载
  await clickLoadMore(page);

  // 开始爬取数据
  const carInfo = await scrapePage(page);
  if (carInfo.length > 0) {
    allCarInfo.push(...carInfo);
  }

  await browser.close();

  const csvContent = allCarInfo
    .map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carDetails},${car.carStock}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序能正常结束
}

const website = {
  baseUrl: 'https://www.kentvilletoyota.com/en/new-inventory?page=1',
  output: 'carInfo_kentville.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
