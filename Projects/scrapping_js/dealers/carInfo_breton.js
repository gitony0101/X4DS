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

  // 增加延时等待，确保所有内容加载完成
  await page.waitForTimeout(5000);

  // 等待特定元素出现，确保页面完全加载
  await page.waitForSelector('.vehicle-card-vertical__info-section');

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.vehicle-card-vertical__info-section').each((index, element) => {
    if ($(element).find('.label__text').text().trim() === 'Sold') {
      return;
    }

    const carModel = $(element).find('.vehicle-name__model').text().trim();
    const carPrice = $(element).find('.price').text().trim();

    carInfo.push({
      carModel,
      carPrice,
    });
  });

  return carInfo;
}

async function scrapeWebsite(url, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const allCarInfo = [];

  const urls = [url, `${url}?page=2`];

  for (const u of urls) {
    try {
      const carInfo = await scrapePage(page, u);
      if (carInfo.length > 0) {
        allCarInfo.push(...carInfo);
      }
    } catch (error) {
      console.error(`Error scraping ${u}:`, error);
    }
  }

  await browser.close();

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'carModel', title: 'Model' },
      { id: 'carPrice', title: 'Price' },
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
