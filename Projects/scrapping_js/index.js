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

  $('.vehicle-card-vertical').each((index, element) => {
    const carModel =
      $(element).find('.vehicle-name__make').text().trim() +
      ' ' +
      $(element).find('.vehicle-name__year').text().trim() +
      ' ' +
      $(element).find('.vehicle-name__model').text().trim() +
      ' ' +
      $(element).find('.vehicle-name__trim').text().trim();
    const carPrice = $(element)
      .find('.vehicle-payment-cashdown__regular-price .price')
      .text()
      .trim();
    const carDetails = $(element)
      .find('.di-light-specs__list')
      .text()
      .replace(/\s\s+/g, ', ')
      .trim();
    const carStock = $(element).find('.di-stock-number').text().trim();

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
      { id: 'carStock', title: 'Stock Number' },
    ],
  });

  await csvWriter.writeRecords(allCarInfo);
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  url: 'https://www.edmundstontoyota.com/en/new-inventory',
  output: 'carInfo_edmundston.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
