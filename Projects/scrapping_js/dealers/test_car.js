import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import fs from 'fs';

async function scrapePage(page) {
  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.listing-new-tile-wrapper').each((index, element) => {
    // 车辆信息
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
      .trim();
    const color = $(element)
      .find('.listing-tile-package-description')
      .text()
      .trim();
    const vin = $(element).find('.listing-tile-vin p').text().trim();

    // 价格信息
    const price = $(element)
      .find('.payment-row-price')
      .text()
      .replace(/\s/g, '')
      .trim();

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
