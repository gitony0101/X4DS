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

  $('.ouvsrItem').each((index, element) => {
    const carModel = $(element).find('.ouvsrModelYear').text().trim();
    const carPrice = $(element).find('.currencyValue').text().trim();
    const carSpecs = [];

    $(element)
      .find('.ouvsrTechSpecs .ouvsrSpec')
      .each((i, specElement) => {
        const label = $(specElement).find('.ouvsrLabel').text().trim();
        const value = $(specElement).find('.ouvsrValue').text().trim();
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

async function scrapeWebsite(url, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const allCarInfo = [];

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const pageUrl = `${url}&page=${currentPage}`;
    await page.goto(pageUrl, { waitUntil: 'networkidle2' });

    const carInfo = await scrapePage(page);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }

    const nextPageButton = await page.$(
      '.pagination__item:not(.disabled) .simple-arrow-right',
    );
    if (nextPageButton) {
      currentPage += 1;
    } else {
      hasNextPage = false;
    }
  }

  await browser.close();

  const csvContent = allCarInfo
    .map((car) => `${car.carModel},${car.carPrice},${car.carSpecs}`)
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  url: 'https://oreganstoyotadartmouth.com/inventory/?search.vehicle-inventory-type-ids.0=1',
  output: 'carInfo_dartmouth.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));
