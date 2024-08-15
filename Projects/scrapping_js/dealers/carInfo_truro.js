import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrapePage(page) {
  await page.waitForSelector('.listing-new-tile', { timeout: 10000 });

  return await page.evaluate(() => {
    const cars = [];
    document.querySelectorAll('.listing-new-tile').forEach((tile) => {
      const carModel = tile.querySelector('.new-car-name')?.innerText.trim();
      const carDrive = tile
        .querySelector('.new-car-motor p:nth-child(1)')
        ?.innerText.trim();
      const carTransmission = tile
        .querySelector('.new-car-motor p:nth-child(2)')
        ?.innerText.trim();
      const carEngine = tile
        .querySelector('.new-car-motor p:nth-child(3)')
        ?.innerText.trim();
      const carPrice = tile
        .querySelector('.payment-row-price')
        ?.innerText.trim();
      const carVIN = tile
        .querySelector('.listing-tile-vin p')
        ?.innerText.replace('VIN ', '')
        .trim();
      const carColor = tile
        .querySelector('.listing-tile-package-description')
        ?.innerText.trim();
      const carImage = tile.querySelector('.preview-photo-wrapper img')?.src;

      if (carModel && carPrice) {
        cars.push({
          carModel,
          carDrive,
          carTransmission,
          carEngine,
          carPrice,
          carVIN,
          carColor,
          carImage,
        });
      }
    });
    return cars;
  });
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const carInfo = await scrapePage(page);
  await browser.close();

  const csvContent = [
    'Model,Drive,Transmission,Engine,Price,VIN,Color,Image URL',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.carDrive},${car.carTransmission},${car.carEngine},${car.carPrice},${car.carVIN},${car.carColor},${car.carImage}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  baseUrl: 'https://www.trurotoyota.com/en/new-inventory',
  output: path.join(__dirname, '..', 'carInfo_truro.csv'), // Save to the parent directory
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
