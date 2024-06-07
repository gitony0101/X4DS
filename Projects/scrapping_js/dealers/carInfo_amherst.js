import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';
import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

let server;

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

  $('.listing-new-tile').each((index, element) => {
    // 检查是否包含 "Sold" 或 "Demo" 标记
    if (
      $(element).find('div:contains("Sold")').length === 0 &&
      $(element).find('.demo-tag').length === 0
    ) {
      const carModel = $(element).find('.new-car-name').text().trim();
      const carPrice = $(element).find('.payment-row-price').text().trim();
      const carDescription = $(element)
        .find('.listing-new-tile-drivePowerTrains')
        .text()
        .trim();
      const carVIN = $(element).find('.listing-tile-vin p').text().trim();

      carInfo.push({
        carModel,
        carPrice,
        carDescription,
        carVIN,
      });
    }
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
      { id: 'carVIN', title: 'VIN' },
    ],
  });

  await csvWriter.writeRecords(allCarInfo);
  console.log(`Data has been written to ${outputPath}`);

  // 关闭服务器并退出程序
  server.close(() => {
    console.log('Server closed');
    process.exit();
  });
}

const website = {
  url: 'https://www.amhersttoyota.com/en/new-inventory?view=grid&sc=new',
  output: 'carInfo_amherst.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));

server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);
