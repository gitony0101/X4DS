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

async function scrapePage(page, url, selectors) {
  await page.goto(url, { waitUntil: 'networkidle2' });
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $(selectors.item).each((index, element) => {
    const carYear = $(element).find(selectors.year).text().trim();
    const carMakeModel = $(element).find(selectors.makeModel).text().trim();
    const carTrim = $(element).find(selectors.trim).text().trim();
    const carModel = `${carYear} ${carMakeModel} ${carTrim}`;
    const carPrice = $(element).find(selectors.price).text().trim();
    const carSpecs = [];

    $(element)
      .find(selectors.specs)
      .each((i, specElement) => {
        const label = $(specElement).find(selectors.label).text().trim();
        const value = $(specElement).find(selectors.value).text().trim();
        carSpecs.push({ label, value });
      });

    carInfo.push({
      carModel,
      carPrice,
      carSpecs: JSON.stringify(carSpecs),
    });
  });

  return carInfo;
}

async function scrapeWebsite(urls, outputPath, selectors) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const allCarInfo = [];

  for (const url of urls) {
    try {
      const carInfo = await scrapePage(page, url, selectors);
      allCarInfo.push(...carInfo);
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  await browser.close();

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'carModel', title: 'Model' },
      { id: 'carPrice', title: 'Price' },
      { id: 'carSpecs', title: 'Specs' },
    ],
  });

  await csvWriter.writeRecords(allCarInfo);
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  urls: [
    'https://www.gandertoyota.com/new/inventory/search.html',
    'https://www.gandertoyota.com/inventory.html?filterid=a1b3d1Sq1-10x0-0-0',
  ],
  output: 'carInfo_gander.csv',
  selectors: {
    item: '.carDescriptionContent',
    year: '.divModelYear',
    makeModel: '.divMake',
    trim: '.divTrim',
    price: '.carPrice .dollarsigned',
    specs: '.carDescription .s-desc',
    label: 'span',
    value: 'span',
  },
};

(async () => {
  await scrapeWebsite(website.urls, website.output, website.selectors);
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
