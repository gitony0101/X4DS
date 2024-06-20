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

  $('.vehicle_item').each((index, element) => {
    const carModel = $(element).find('.vehicle_title a').text().trim();
    const carPrice = $(element).find('.vehicle_price').first().text().trim();
    const mileage = $(element)
      .find('.details-overview_title:contains("Mileage")')
      .next()
      .text()
      .trim();
    const trim = $(element)
      .find('.details-overview_title:contains("Trim")')
      .next()
      .text()
      .trim();
    const stock = $(element)
      .find('.details-overview_title:contains("Stock #")')
      .next()
      .text()
      .trim();
    const vin = $(element)
      .find('.details-overview_title:contains("VIN")')
      .next()
      .text()
      .trim();
    const exteriorColor = $(element)
      .find('.details-overview_title:contains("Exterior Color")')
      .next()
      .text()
      .trim();
    const interiorColor = $(element)
      .find('.details-overview_title:contains("Interior Color")')
      .next()
      .text()
      .trim();
    const drivetrain = $(element)
      .find('.details-overview_title:contains("Drivetrain")')
      .next()
      .text()
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
  const allCarInfo = [];

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}&p=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const carInfo = await scrapePage(page);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }

    const nextPageButton = await page.$('.next a');
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
  baseUrl:
    'https://www.centraltoyota.com/search/new-toyota-jonesboro-ar/?cy=72404&mk=63&tp=new',
  output: 'carInfo_central_toyota.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
