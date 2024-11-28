import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import fs from 'fs';

async function scrapePage(page) {
  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('div.listing-new-tile').each((index, element) => {
    // 检查是否标记为 "Sold"
    const isSold = $(element).find('.tile-tag:contains("Sold")').length > 0;
    if (isSold) return;

    // 提取车辆信息
    const carModel = $(element).find('.new-car-name').text().trim();
    const drivetrain = $(element).find('.new-car-motor p').eq(0).text().trim();
    const transmission = $(element)
      .find('.new-car-motor p')
      .eq(1)
      .text()
      .trim();
    const engine = $(element).find('.new-car-motor p').eq(2).text().trim();
    const stockNumber = $(element)
      .find('.listing-tile-specification-stock')
      .text()
      .replace('Stock #', '')
      .trim();
    const color = $(element)
      .find('.listing-tile-package-description')
      .eq(1)
      .text()
      .trim();
    const vin = $(element).find('.listing-tile-vin p').text().replace('VIN ', '').trim();
    let price = $(element)
      .find('.payment-row-price')
      .text()
      .replace(/[,$*]/g, '') // 去除符号和格式化
      .trim();

    // 确保关键字段存在
    if (carModel && price) {
      carInfo.push({
        carModel,
        drivetrain,
        transmission,
        engine,
        stockNumber,
        color,
        vin,
        price,
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(url, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const carInfo = await scrapePage(page);

  await browser.close();

  // 将爬取的车辆信息写入 CSV 文件
  const csvContent = [
    'Model,Drivetrain,Transmission,Engine,Stock Number,Color,VIN,Price',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.drivetrain},${car.transmission},${car.engine},${car.stockNumber},${car.color},${car.vin},${car.price}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  url: 'https://www.woodstocknbtoyota.com/en/new-inventory',
  output: 'carInfo_woodstock.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})();
