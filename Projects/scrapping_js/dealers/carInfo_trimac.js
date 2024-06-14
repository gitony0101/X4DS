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

  $('a.vehicle').each((index, element) => {
    const status = $(element).find('.vehicle__hitbox').attr('status-label');

    // Only scrape available vehicles
    if (!status || status !== 'sold') {
      const carModel = $(element)
        .find('.vehicle__title .vehicle-title')
        .text()
        .trim();
      const carPrice = $(element).find('.vehicle-price .price').text().trim();
      const carStock = $(element).find('.feature-value.js-stock').text().trim();
      const carTransmission = $(element)
        .find('.feature-value.js-transmission')
        .text()
        .trim();
      const carEngine = $(element)
        .find('.feature-value.js-engine-type')
        .text()
        .trim();
      const carUrl = $(element).attr('href');

      if (carModel && carPrice) {
        carInfo.push({
          carModel,
          carPrice,
          carStock,
          carTransmission,
          carEngine,
          carUrl,
        });
      }
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const allCarInfo = [];

  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  const carInfo = await scrapePage(page);
  if (carInfo.length > 0) {
    allCarInfo.push(...carInfo);
  }

  await browser.close();

  const csvContent = allCarInfo
    .map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carStock},${car.carTransmission},${car.carEngine},${car.carUrl}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // Ensure the program exits normally
}

const website = {
  baseUrl: 'https://trimactoyota.ca/new-inventory/',
  output: 'carInfo_trimactoyota.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
