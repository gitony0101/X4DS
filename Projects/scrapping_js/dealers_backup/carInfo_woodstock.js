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

  $('ul').each((index, element) => {
    // 检查车辆是否已售出
    const isSold = $(element).find('.label.sold').length > 0;

    // 如果车辆未售出，则抓取信息
    if (!isSold) {
      const carModel = $(element).find('.vehicle-title').text().trim();
      const carPrice = $(element).find('.vehicle-new-price').text().trim();
      const carStock = $(element).find('.vehicle-stockno').text().trim();
      const carTransmission = $(element).find('.vehicle-odo').text().trim();

      if (carModel && carPrice) {
        carInfo.push({
          carModel,
          carPrice,
          carStock,
          carTransmission,
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

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}?page=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const carInfo = await scrapePage(page);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }

    // 检查是否存在下一页按钮
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
        `${car.carModel},${car.carPrice},${car.carStock},${car.carTransmission}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl: 'https://www.woodstocknbtoyota.com/en/new-inventory',
  output: 'carInfo_woodstock.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
