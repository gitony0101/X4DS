import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import xlsx from 'xlsx';

// 自动滚动页面
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

// 从Lexus of Saint John爬取数据
async function scrapeSaintJohn(page) {
  await autoScroll(page);

  const htmlData = await page.content();
  const $ = load(htmlData);
  const carInfo = [];

  $('.listing-new-tile-wrapper.false').each((index, element) => {
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
    let carPrice = $(element)
      .find('.payment-row-price.sr-text.is-bold')
      .text()
      .trim();
    carPrice = carPrice.replace(/,/g, ''); // 去除价格中的逗号
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

// 从O'Regan's Lexus爬取数据
async function scrapeORegans(page) {
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

// 保存数据到Excel文件
function saveToExcel(data, sheetName, workbook) {
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
}

// 主函数
async function runAllScrapingTasks() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--disable-features=IsolateOrigins', '--disable-site-isolation-trials'],
  });
  const page = await browser.newPage();

  const workbook = xlsx.utils.book_new();

  // 爬取Lexus of Saint John
  await page.goto('https://www.lexusofsaintjohn.com/en/new-inventory', {
    waitUntil: 'networkidle2',
    timeout: 60000,  // 延长超时时间
  });
  const saintJohnData = await scrapeSaintJohn(page);
  saveToExcel(saintJohnData, 'SaintJohn', workbook);

  // 爬取O'Regan's Lexus
  await page.goto(
    'https://www.oreganslexus.com/inventory/?search.vehicle-inventory-type-ids.0=1',
    {
      waitUntil: 'networkidle2',
      timeout: 60000,  // 延长超时时间
    }
  );
  const oRegansData = await scrapeORegans(page);
  saveToExcel(oRegansData, 'ORegans', workbook);

  await browser.close();

  xlsx.writeFile(workbook, 'Lexus_Inventory.xlsx');
  console.log('Data has been written to Lexus_Inventory.xlsx');
}

runAllScrapingTasks().catch((err) => console.error('Error:', err));
