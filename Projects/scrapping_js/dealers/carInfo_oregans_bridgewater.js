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

  // 遍历所有车辆信息
  $('div.ouvsrItem').each((index, element) => {
    const carModel = $(element).find('.ouvsrModelYear').text().trim();
    const carTrim = $(element).find('.ouvsrTrimAndPackage').text().trim();
    const carPrice = $(element)
      .find('.currencyValue')
      .text()
      .trim()
      .replace(',', '');

    const carStockNumber = $(element)
      .find('.ouvsrSpec.ouvsrStockNumber .ouvsrValue')
      .text()
      .trim();
    const carVIN = $(element)
      .find('.ouvsrToolsList a.ouvsrContactLink')
      .attr('href')
      ?.split('vin=')[1] || '';

    const carColor = $(element)
      .find('.ouvsrSpec.ouvsrExteriorColor .ouvsrColorName')
      .text()
      .trim();
    const carEngine = $(element)
      .find('.ouvsrSpec.ouvsrEngine .ouvsrValue')
      .text()
      .trim();
    const carDrivetrain = $(element)
      .find('.ouvsrSpec.ouvsrDrivetrain .ouvsrValue')
      .text()
      .trim();
    const carFuelType = $(element)
      .find('.ouvsrSpec.ouvsrFuelType .ouvsrValue')
      .text()
      .trim();
    const carTransmission = $(element)
      .find('.ouvsrSpec.ouvsrTransmission .ouvsrValue')
      .text()
      .trim();

    // 获取车辆的特性信息
    const features = [];
    $(element)
      .find('.ouvsrFeaturesList li .ouvsrFeatureLabel')
      .each((i, featureElement) => {
        features.push($(featureElement).text().trim());
      });

    carInfo.push({
      carModel,
      carTrim,
      carPrice,
      carStockNumber,
      carVIN,
      carColor,
      carEngine,
      carDrivetrain,
      carFuelType,
      carTransmission,
      features: features.join(', '),
    });
  });

  return carInfo;
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  // 加载页面并爬取信息
  const carInfo = await scrapePage(page);

  await browser.close();

  // 将爬取的数据写入 CSV 文件
  const csvContent = [
    'Model,Trim,Price,Stock Number,VIN,Color,Engine,Drivetrain,Fuel Type,Transmission,Features',
    ...carInfo.map(
      (car) =>
        `${car.carModel},${car.carTrim},${car.carPrice},${car.carStockNumber},${car.carVIN},${car.carColor},${car.carEngine},${car.carDrivetrain},${car.carFuelType},${car.carTransmission},${car.features}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
  process.exit();
}

const website = {
  baseUrl:
    'https://oreganstoyotabridgewater.com/inventory/?do-search=1&search.vehicle-inventory-type-ids.0=1&search.vehicle-make-ids.0=45',
  output: 'carInfo_oregans_bridgewater.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
