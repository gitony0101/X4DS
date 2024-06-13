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

  $('li.carBoxWrapper').each((index, element) => {
    const carModel =
      $(element).find('.divMake').text().trim() +
      ' ' +
      $(element).find('.divModelYear').text().trim();
    const carPrice = $(element).find('.dollarsigned').text().trim();
    const mileage = $(element).find('.s-km').text().trim();
    const trim = $(element).find('.divTrim').text().trim();
    const stock = $(element)
      .find('.divStockTextSelect')
      .text()
      .trim()
      .split('VIN:')[0]
      .replace('Stock:', '')
      .trim();
    const vin = $(element)
      .find('.divStockTextSelect')
      .text()
      .trim()
      .split('VIN:')[1]
      .trim();
    const exteriorColor = $(element)
      .find('.carDescription')
      .text()
      .split('Ext:')[1]
      .split(',')[0]
      .trim();
    const interiorColor = $(element)
      .find('.carDescription')
      .text()
      .split('Int:')[1]
      .trim()
      .split('.')[0]
      .trim();
    const drivetrain = $(element)
      .find('.divCarPaymentContainerTooltip')
      .attr('data-tooltip')
      .split('Drive train:')[1]
      .split('<')[0]
      .trim();

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carPrice,
        mileage,
        trim,
        stock,
        vin,
        exteriorColor,
        interiorColor,
        drivetrain,
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (request.isNavigationRequest() && request.redirectChain().length) {
      request.abort();
    } else {
      request.continue();
    }
  });

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
    'Model,Price,Mileage,Trim,Stock,VIN,Exterior Color,Interior Color,Drivetrain',
    ...allCarInfo.map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.mileage},${car.trim},${car.stock},${car.vin},${car.exteriorColor},${car.interiorColor},${car.drivetrain}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl: 'https://www.gandertoyota.com/new/inventory/search.html',
  output: 'carInfo_gander_toyota.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
