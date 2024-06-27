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

  $('div.listing-new-tile').each((index, element) => {
    const isReserved =
      $(element).find('div.tile-tag:contains("Reserved")').length > 0;

    if (!isReserved) {
      const carModel = $(element)
        .find('.new-car-name.sr-text.is-bold')
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

      carInfo.push({
        carModel,
        carPrice,
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const allCarInfo = [];

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}?page=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const carInfo = await scrapePage(page);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }

    const nextPageButton = await page.$(
      '.divPaginationArrowBox:not(.disabled)',
    );
    if (nextPageButton) {
      currentPage += 1;
    } else {
      hasNextPage = false;
    }
  }

  await browser.close();

  const csvContent = [
    'Model,Price',
    ...allCarInfo.map((car) => `${car.carModel},${car.carPrice}`),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl: 'https://www.amhersttoyota.com/en/new-inventory?view=grid&sc=new',
  output: 'carInfo_amherst.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
