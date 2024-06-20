import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';

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

async function scrapePage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2' });
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.listing-tile-link').each((index, element) => {
    const carModel = $(element).find('.new-car-name').text().trim();
    const carPrice = $(element).find('.payment-row-price').text().trim();
    const carDescription = $(element).find('.new-car-motor').text().trim();
    const carVin = $(element).find('.listing-tile-vin p').text().trim();
    const stockNumber = $(element)
      .find('.listing-tile-specification-stock')
      .text()
      .trim();

    carInfo.push({
      carModel,
      carPrice,
      carDescription,
      carVin,
      stockNumber,
    });
  });

  return carInfo;
}

async function scrapeWebsite(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const allCarInfo = [];

  try {
    const carInfo = await scrapePage(page, url);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }

  await browser.close();

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'carModel', title: 'Model' },
      { id: 'carPrice', title: 'Price' },
      { id: 'carDescription', title: 'Description' },
      { id: 'carVin', title: 'VIN' },
      { id: 'stockNumber', title: 'Stock Number' },
    ],
  });

  await csvWriter.writeRecords(allCarInfo);
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序在完成后退出
}

const website = {
  url: 'https://www.bathursttoyota.ca/en/new-inventory',
  output: 'carInfo_bathurst.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));
