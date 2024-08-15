import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

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
  await page.waitForSelector('.card-grid-view', { timeout: 15000 }); // Adjust timeout if needed

  const carInfo = await page.evaluate(() => {
    const cars = [];
    document.querySelectorAll('.card-grid-view').forEach((card) => {
      const carModel = card
        .querySelector('.vehicle-title-link')
        ?.innerText.trim();
      const carPrice = card
        .querySelector('.adjusted-price .price')
        ?.innerText.trim();
      const carVIN = card
        .querySelector('.vehicle-vin-container .vehicle-vin')
        ?.innerText.trim();
      const carDealer = card.querySelector('.dealer-name')?.innerText.trim();
      const carDistance = card
        .querySelector('.dealer-name + span')
        ?.innerText.trim();

      if (carModel && carPrice && carVIN && carDealer && carDistance) {
        cars.push({
          carModel,
          carPrice,
          carVIN,
          carDealer,
          carDistance,
        });
      }
    });
    return cars;
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  await autoScroll(page);

  const carInfo = await scrapePage(page);
  await browser.close();

  const csvContent = [
    'Model,Price,VIN,Dealer,Distance',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carVIN},${car.carDealer},${car.carDistance}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const website = {
  baseUrl:
    'https://shop.ford.ca/inventory/bronco/results?zipcode=B4C2R3&Radius=150&modeltrim=Bronco_F25-RAPTOR&Order=LowPrice&intcmp=moddetails-bb-si',
  output: path.join(__dirname, 'raptor_info.csv'),
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
