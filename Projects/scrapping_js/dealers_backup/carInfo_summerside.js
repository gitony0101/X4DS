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

async function scrapeWebsite(url, outputPath, selectors) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await autoScroll(page);

  const htmlData = await page.content();
  await browser.close();

  const $ = load(htmlData);
  const carInfo = [];

  $(selectors.item).each((index, element) => {
    const carModel = $(element).find(selectors.model).text().trim();
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

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'carModel', title: 'Model' },
      { id: 'carPrice', title: 'Price' },
      { id: 'carSpecs', title: 'Specs' },
    ],
  });

  await csvWriter.writeRecords(carInfo);
  console.log(`Data has been written to ${outputPath}`);
}

const websites = [
  {
    url: 'https://www.summersidetoyota.com/en/new-inventory',
    output: 'carInfo_summerside_toyota.csv',
    selectors: {
      item: '.listing-tile-link',
      model: '.new-car-name',
      price: '.payment-row-price',
      specs: '.listing-tile-package-description',
      label: '.listing-tile-package-head',
      value: '.listing-tile-package-description',
    },
  },
  // 可以在这里添加更多网站的URL、输出文件名和选择器
];

(async () => {
  for (const site of websites) {
    await scrapeWebsite(site.url, site.output, site.selectors);
  }
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
