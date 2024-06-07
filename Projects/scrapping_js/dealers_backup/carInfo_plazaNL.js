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

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.col-xs-12.col-sm-12.col-md-7').each((index, element) => {
    const carModel = $(element)
      .find('.vehicle-year-make-model .stat-text-link')
      .text()
      .trim();
    const carPrice = $(element).find('.vehicle-price-2-new').text().trim();
    const carDescription = $(element).find('.s-desc').text().trim();
    const engineType = $(element)
      .find('td[itemprop="vehicleEngine"]')
      .text()
      .trim();
    const transmission = $(element)
      .find('td[itemprop="vehicleTransmission"]')
      .text()
      .trim();
    const exteriorColor = $(element).find('td[itemprop="color"]').text().trim();
    const vin = $(element).find('td:contains("VIN:")').next().text().trim();
    const drivetrain = $(element)
      .find('td:contains("Drivetrain:")')
      .next()
      .text()
      .trim();
    const stockNumber = $(element)
      .find('td:contains("Stock #:")')
      .next()
      .text()
      .trim();
    const city = $(element).find('td:contains("City:")').next().text().trim();

    carInfo.push({
      carModel,
      carPrice,
      carDescription,
      engineType,
      transmission,
      exteriorColor,
      vin,
      drivetrain,
      stockNumber,
      city,
    });
  });

  return carInfo;
}

async function scrapeWebsite(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const allCarInfo = [];

  try {
    const carInfo = await scrapePage(page, url);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
  }

  await browser.close();

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'carModel', title: 'Model' },
      { id: 'carPrice', title: 'Price' },
      { id: 'carDescription', title: 'Description' },
      { id: 'engineType', title: 'Engine Type' },
      { id: 'transmission', title: 'Transmission' },
      { id: 'exteriorColor', title: 'Exterior Color' },
      { id: 'vin', title: 'VIN' },
      { id: 'drivetrain', title: 'Drivetrain' },
      { id: 'stockNumber', title: 'Stock Number' },
      { id: 'city', title: 'City' },
    ],
  });

  await csvWriter.writeRecords(allCarInfo);
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  url: 'https://www.toyotaplaza.ca/new/',
  output: 'carInfo_plazaNL.csv',
};

(async () => {
  await scrapeWebsite(website.url, website.output);
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
