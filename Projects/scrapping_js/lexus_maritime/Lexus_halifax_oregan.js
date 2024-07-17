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

  $('[data-vehicle-inventory-type-id="1"]').each((index, element) => {
    const carModel = $(element).find('.ouvsrModelYear').text().trim();
    let carPrice = $(element)
      .find('.ouvsrCurrentPrice .currencyValue')
      .text()
      .trim();
    carPrice = carPrice.replace(/,/g, ''); // 去除价格中的逗号
    const carStock = $(element)
      .find('.ouvsrSpec.ouvsrStockNumber .ouvsrValue')
      .text()
      .trim();
    const carDetails = $(element).find('.ouvsrTrimAndPackage').text().trim();

    const carFeatures = [];
    $(element)
      .find('.ouvsrFeaturesList li')
      .each((idx, el) => {
        carFeatures.push($(el).find('.ouvsrFeatureLabel').text().trim());
      });

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carPrice,
        carDetails,
        carStock,
        carFeatures: carFeatures.join(', '),
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  const carInfo = await scrapePage(page);
  await browser.close();

  const csvContent = carInfo
    .map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carDetails},${car.carStock},${car.carFeatures}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序能正常结束
}

const website = {
  baseUrl:
    'https://www.oreganslexus.com/inventory/?search.vehicle-inventory-type-ids.0=1',
  output: 'carInfo_oregans_lexus.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
