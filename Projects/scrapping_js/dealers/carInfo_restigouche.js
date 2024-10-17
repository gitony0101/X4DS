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

async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  // 遍历每个车辆信息块
  $('div.listing-new-tile').each((index, element) => {
    const carModel = $(element)
      .find('.new-car-name.sr-text.is-bold')
      .text()
      .trim();
    const carTrim = $(element)
      .find('.new-car-motor p')
      .eq(0)
      .text()
      .trim();
    let carPrice = $(element)
      .find('.payment-row-price.sr-text.is-bold')
      .text()
      .trim()
      .replace('$', '')
      .replace(',', '');

    if (!carPrice) {
      carPrice = '0';
    }

    const carVIN = $(element).find('.listing-tile-vin p').text().trim();
    const carStockNumber = $(element)
      .find('.listing-tile-specification-stock')
      .text()
      .trim();
    const installedOptions = $(element)
      .find('.listing-tile-package-description')
      .text()
      .trim();
    const carColor = $(element)
      .find('.listing-tile-package-description')
      .text()
      .trim();
    const carImage = $(element).find('.car-image').attr('src');
    const carEngine = $(element)
      .find('.new-car-motor p')
      .eq(2)
      .text()
      .trim();

    carInfo.push({
      carModel,
      carTrim,
      carPrice,
      carVIN,
      carStockNumber,
      installedOptions,
      carColor,
      carEngine,
      carImage,
    });
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  // 加载页面并爬取信息
  const carInfo = await scrapePage(page);

  await browser.close();

  // 将爬取的数据写入 CSV 文件
  const csvContent = [
    'Model,Trim,Price,VIN,Stock Number,Installed Options,Color,Engine,Image',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.carTrim},${car.carPrice},${car.carVIN},${car.carStockNumber},${car.installedOptions},${car.carColor},${car.carEngine},${car.carImage}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl: 'https://www.restigouchetoyota.com/en/new-inventory',
  output: 'carInfo_restigouche.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
