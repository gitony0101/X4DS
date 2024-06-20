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
    const carPrice = $(element)
      .find('.ouvsrCurrentPrice .currencyValue')
      .text()
      .trim();
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
  const allCarInfo = [];

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}&page=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // 关闭弹窗
    try {
      await page.waitForSelector('.modal-dialog .btn-close', { timeout: 5000 });
      await page.click('.modal-dialog .btn-close');
    } catch (err) {
      console.log('No modal dialog found');
    }

    await new Promise((resolve) => setTimeout(resolve, 5000)); // 替代waitForTimeout

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
    .map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carDetails},${car.carStock},${car.carFeatures}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl:
    'https://oreganstoyotabridgewater.com/inventory/?search.vehicle-inventory-type-ids.0=1&search.vehicle-make-ids.0=45',
  output: 'carInfo_south_shore.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
