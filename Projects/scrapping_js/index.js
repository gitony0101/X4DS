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

async function clickLoadMoreUntilDisappear(page) {
  let loadMoreVisible = true;
  while (loadMoreVisible) {
    loadMoreVisible = await page.evaluate(() => {
      const loadMoreButton = document.querySelector(
        '.listing-used-button-loading.sr-button-1',
      );
      if (loadMoreButton) {
        loadMoreButton.click();
        return true;
      }
      return false;
    });
    // 使用 setTimeout 来代替 waitForTimeout
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 等待3秒钟加载更多内容
  }
}

async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.listing-new-tile').each((index, element) => {
    const carModel = $(element)
      .find('.new-car-name.sr-text.is-bold')
      .text()
      .trim();
    const carDrive = $(element).find('.new-car-motor p').first().text().trim();
    const carTransmission = $(element)
      .find('.new-car-motor p')
      .eq(1)
      .text()
      .trim();
    const carEngine = $(element).find('.new-car-motor p').eq(2).text().trim();
    const carPrice = $(element)
      .find('.payment-row-price.sr-text.is-bold')
      .text()
      .trim()
      .replace(/,/g, ''); // 移除价格中的逗号
    const carVIN = $(element)
      .find('.listing-tile-vin p')
      .text()
      .replace('VIN ', '')
      .trim();
    const carStock = $(element)
      .find('.listing-tile-specification-stock')
      .text()
      .replace('Stock #', '')
      .trim();
    const carColor = $(element)
      .find('.listing-tile-package-description')
      .first()
      .text()
      .trim();

    if (carModel && carPrice) {
      carInfo.push({
        carModel,
        carDrive,
        carTransmission,
        carEngine,
        carPrice,
        carVIN,
        carStock,
        carColor,
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  await clickLoadMoreUntilDisappear(page);

  const carInfo = await scrapePage(page);
  await browser.close();

  const csvContent = carInfo
    .map(
      (car) =>
        `${car.carModel},${car.carDrive},${car.carTransmission},${car.carEngine},${car.carPrice},${car.carVIN},${car.carStock},${car.carColor}`,
    )
    .join('\n');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit(); // 确保程序能正常结束
}

const website = {
  baseUrl: 'https://www.trurotoyota.com/en/new-inventory',
  output: 'carInfo_truro.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
