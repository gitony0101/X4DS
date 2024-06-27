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

  $('div.ouvsrItem').each((index, element) => {
    const inventoryType = $(element).find('.ouvsrInventoryType').text().trim();
    if (inventoryType === 'New') {
      const carModel = $(element)
        .find('.ouvsrModelYear')
        .text()
        .replace(/\s+/g, ' ')
        .trim();
      let carPrice = $(element)
        .find('.currencyValue')
        .text()
        .replace(/,/g, '')
        .trim();

      if ($(element).find('.ouvsrMissingPriceLink').length > 0) {
        carPrice = '0';
      }

      const exteriorColor = $(element).find('.ouvsrColorName').text().trim();
      const trim = $(element).find('.ouvsrTrim').text().trim();
      const stock = $(element)
        .find('.ouvsrSpec.ouvsrStockNumber .ouvsrValue')
        .text()
        .replace('#', '')
        .trim();
      const drivetrain = $(element)
        .find('.ouvsrSpec.ouvsrDrivetrain .ouvsrValue')
        .text()
        .trim();
      const transmission = $(element)
        .find('.ouvsrSpec.ouvsrTransmission .ouvsrValue')
        .text()
        .trim();
      const fuelType = $(element)
        .find('.ouvsrSpec.ouvsrFuelType .ouvsrValue')
        .text()
        .trim();

      carInfo.push({
        carModel,
        carPrice,
        exteriorColor,
        trim,
        stock,
        drivetrain,
        transmission,
        fuelType,
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
    'Model,Price,Exterior Color,Trim,Stock,Drivetrain,Transmission,Fuel Type',
    ...allCarInfo.map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.exteriorColor},${car.trim},${car.stock},${car.drivetrain},${car.transmission},${car.fuelType}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl: 'https://oreganstoyotahalifax.com/inventory/',
  output: 'carInfo_oregans_halifax_toyota.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
