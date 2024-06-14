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

  $('.vehicle-list-cell').each((index, element) => {
    const carModel = $(element).find('.vehicle-year-make-model').text().trim();
    const carPrice = $(element).find('.vehicle-price-2-new').text().trim();
    const carDetails = $(element)
      .find('.veh-info-1')
      .text()
      .replace(/\s\s+/g, ', ')
      .trim();
    const carStock = $(element)
      .find('.table-col:contains("Stock #")')
      .next()
      .text()
      .trim();

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carPrice,
        carDetails,
        carStock,
      });
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
        `${car.carModel},${car.carPrice},${car.carDetails},${car.carStock}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序能正常结束
}

const website = {
  baseUrl: 'https://www.toyotaplaza.ca/new/segment/in-stock/',
  output: 'carInfo_toyotaplaza.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
