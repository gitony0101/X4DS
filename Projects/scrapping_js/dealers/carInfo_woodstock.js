import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';
import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

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

  $('li').each((index, element) => {
    const carModel =
      $(element).find('.inventory-vehicle-name h2').text().trim() +
      ' ' +
      $(element).find('.inventory-vehicle-name h3').text().trim();
    const carPrice = $(element).find('.price').text().trim();
    const carDetails = $(element)
      .find('ul li')
      .map((i, el) => $(el).text().trim())
      .get()
      .join(', ');

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carPrice,
        carDetails,
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
      { id: 'carDetails', title: 'Details' },
    ],
  });

  await csvWriter.writeRecords(allCarInfo);
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  url: 'https://m.woodstocknbtoyota.com/en/for-sale/car/new',
  output: 'carInfo_woodstock.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
