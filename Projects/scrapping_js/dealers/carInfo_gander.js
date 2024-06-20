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

  $('.carDescriptionContent').each((index, element) => {
    const carModel =
      $(element).find('.carTitle .divMake').text().trim() +
      ' ' +
      $(element).find('.carTitle .divModelYear').text().trim() +
      ' ' +
      $(element).find('.carTitle .divTrim').text().trim();
    const carPrice = $(element).find('.carPrice .dollarsigned').text().trim();
    const carStock = $(element).find('[data-carid]').data('stock-number');
    const carDetails = $(element).find('.carDescription .s-desc').text().trim();

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

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}?page=${currentPage}`;
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
        `${car.carModel},${car.carPrice},${car.carDetails},${car.carStock}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序能正常结束
}

const website = {
  baseUrl: 'https://www.gandertoyota.com/en/new-inventory',
  output: 'carInfo_gander.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
