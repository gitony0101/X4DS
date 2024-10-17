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

function guessSelectors($) {
  // 尝试找到可能的车辆块
  const carItem = $('div[class*="tile"], div[class*="card"], div[class*="listing"]').first();
  
  // 猜测车辆型号、价格、VIN、库存编号和描述等信息
  const carModel = carItem.find('h2, h3, .model, .car-title').first().text().trim();
  const carPrice = carItem.find('.price, .amount, .payment-row-price').first().text().trim();
  const carVIN = carItem.find('.vin, .listing-tile-vin, [data-vin]').first().text().trim();
  const carStockNumber = carItem.find('.stock, .stock-number, [data-stock-number]').first().text().trim();
  const carDescription = carItem.find('.description, .car-description, .new-car-motor').first().text().trim();

  return {
    item: carItem,
    model: carModel || 'Unknown',
    price: carPrice || 'Unknown',
    vin: carVIN || 'Unknown',
    stock: carStockNumber || 'Unknown',
    description: carDescription || 'No description available',
  };
}

async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  // 动态判断页面的选择器
  const selectors = guessSelectors($);

  $('div[class*="tile"], div[class*="card"], div[class*="listing"]').each((index, element) => {
    const carModel = $(element).find('h2, h3, .model, .car-title').first().text().trim() || 'Unknown';
    const carPrice = $(element).find('.price, .amount, .payment-row-price').first().text().trim() || 'Unknown';
    const carVIN = $(element).find('.vin, .listing-tile-vin, [data-vin]').first().text().trim() || 'Unknown';
    const carStockNumber = $(element).find('.stock, .stock-number, [data-stock-number]').first().text().trim() || 'Unknown';
    const carDescription = $(element).find('.description, .car-description, .new-car-motor').first().text().trim() || 'No description available';

    carInfo.push({
      carModel,
      carPrice,
      carVIN,
      carStockNumber,
      carDescription,
    });
  });

  return carInfo;
}

async function scrapeWebsite(url, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const carInfo = await scrapePage(page);
  await browser.close();

  const csvContent = [
    'Model,Price,VIN,Stock Number,Description',
    ...carInfo.map(
      (car) => `${car.carModel},${car.carPrice},${car.carVIN},${car.carStockNumber},${car.carDescription}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  url: 'YOUR_WEBSITE_URL',  // 替换为你要爬取的网站URL
  output: 'carInfo.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));
