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

async function clickLoadMoreButton(page) {
  let loadMoreVisible = true;
  while (loadMoreVisible) {
    try {
      // 等待 "Load More" 按钮可见
      await page.waitForSelector('.listing-used-button-loading.sr-button-1', {
        visible: true,
        timeout: 3000, // 3秒超时
      });

      // 点击 "Load More" 按钮
      await page.click('.listing-used-button-loading.sr-button-1');
      console.log('Clicked "Load More" button, loading more vehicles...');

      // 等待页面内容加载
      await page.waitForTimeout(2000); // 等待2秒让内容加载
    } catch (error) {
      // 如果超时或找不到 "Load More" 按钮，则停止
      console.log('No more "Load More" button found or all vehicles loaded.');
      loadMoreVisible = false;
    }
  }
}

async function scrapePage(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('div.listing-new-tile').each((index, element) => {
    // 检查是否包含 "Reserved" 或 "Sold"
    const isReservedOrSold =
      $(element).find('span:contains("Reserved")').length > 0 ||
      $(element).find('span:contains("Sold")').length > 0;

    if (!isReservedOrSold) {
      const carModel = $(element)
        .find('.new-car-name.sr-text.is-bold')
        .text()
        .trim();
      let carPrice = $(element)
        .find('.payment-row-price.sr-text.is-bold')
        .text()
        .trim()
        .replace('$', '')
        .replace(',', '');

      if (!carPrice) {
        carPrice = '0';
      }

      const carVIN = $(element).find('.listing-tile-vin p').text().trim();
      const carStockNumber = $(element)
        .find('.listing-tile-specification-stock')
        .text()
        .trim();
      const installedOptions = $(element)
        .find('.listing-tile-package-description')
        .text()
        .trim();

      carInfo.push({
        carModel,
        carPrice,
        carVIN,
        carStockNumber,
        installedOptions,
      });
    }
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  // 点击 "Load More" 按钮，直到没有更多数据可加载
  await clickLoadMoreButton(page);

  // 加载完毕后开始爬取
  const carInfo = await scrapePage(page);
  
  await browser.close();

  const csvContent = [
    'Model,Price,VIN,Stock Number,Installed Options',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carVIN},${car.carStockNumber},${car.installedOptions}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl: 'https://www.summersidetoyota.com/en/new-inventory',
  output: 'carInfo_summerside.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
