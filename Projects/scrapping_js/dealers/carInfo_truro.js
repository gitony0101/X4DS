// import puppeteer from 'puppeteer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // 获取当前模块文件的目录路径
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 页面解析函数
// async function scrapePage(page) {
//   await page.waitForSelector('.card-content', { timeout: 20000 });

//   return await page.evaluate(() => {
//     const cars = [];
//     const items = document.querySelectorAll('.card-content');

//     items.forEach((card) => {
//       const carModel =
//         card.querySelector('.year-make .stat-text-link')?.innerText.trim() ||
//         '';
//       const vin =
//         card.querySelector('.vin')?.innerText.replace('VIN:', '').trim() || '';
//       const engine =
//         card
//           .querySelector('[data-attribute="engine"] .details span')
//           ?.innerText.trim() || '';
//       const transmission =
//         card
//           .querySelector('[data-attribute="transmission"] .details span')
//           ?.innerText.trim() || '';
//       const drivetrain =
//         card
//           .querySelector('[data-attribute="drivetrain"] .details span')
//           ?.innerText.trim() || '';
//       const color =
//         card
//           .querySelector(
//             '[data-attribute="exterior-colour"] .details span:last-child',
//           )
//           ?.innerText.trim() || '';
//       const price =
//         card.querySelector('.segment-cash .value.fs\\:24')?.innerText.trim() ||
//         '';
//       const stock =
//         card
//           .querySelector('[data-attribute="stock-#"] .details span')
//           ?.innerText.trim() || '';

//       if (carModel && price) {
//         cars.push({
//           carModel,
//           vin,
//           engine,
//           transmission,
//           drivetrain,
//           color,
//           price,
//           stock,
//         });
//       }
//     });

//     return cars;
//   });
// }

// // 主爬取逻辑
// async function scrapeWebsite(baseUrl, outputPath) {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 60000 });

//   const carInfo = await scrapePage(page);
//   await browser.close();

//   const csvContent = [
//     'Model,VIN,Engine,Transmission,Drivetrain,Color,Price,Stock',
//     ...carInfo.map(
//       (car) =>
//         `${car.carModel},${car.vin},${car.engine},${car.transmission},${car.drivetrain},${car.color},${car.price},${car.stock}`,
//     ),
//   ].join('\n');

//   fs.writeFileSync(outputPath, csvContent, 'utf8');
//   console.log(`Data has been written to ${outputPath}`);
// }

// // 保持你原有结构
// const website = {
//   baseUrl: 'https://www.trurotoyota.com/en/new-inventory',
//   output: path.join(__dirname, '..', 'carInfo_truro.csv'),
// };

// // 执行爬虫
// (async () => {
//   await scrapeWebsite(website.baseUrl, website.output);
// })().catch((err) => console.error(err));

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// 配置抓取的目标网站和输出文件路径
const website = {
  baseUrl: 'https://www.trurotoyota.com/en/new-inventory',
  output: path.join(__dirname, '..', 'carInfo_truro.csv'), // 保持保存到上级目录
};

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // 使用新版headless模式以避免可见化窗口干扰
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(website.baseUrl, { waitUntil: 'domcontentloaded' });

    // 等待车辆信息元素加载完成
    await page.waitForSelector('.listing-new-tile');

    // 提取车辆信息
    const vehicles = await page.$$eval('.listing-new-tile', (elements) =>
      elements.map((el) => {
        const nameEl = el.querySelector('.new-car-name');
        const motorEl = el.querySelector('.new-car-motor');
        const priceEl = el.querySelector('.payment-row-price');

        const name = nameEl?.textContent?.trim().replace(/\s+/g, ' ') || 'N/A';
        const motor =
          motorEl?.textContent?.trim().replace(/\s+/g, ' ') || 'N/A';
        const price = priceEl?.textContent?.replace(/[^\d.,]/g, '') || 'N/A';

        return {
          name,
          motor,
          price,
        };
      }),
    );

    // 写入CSV文件
    const csvContent =
      'Name,Motor,Price\n' +
      vehicles.map((v) => `"${v.name}","${v.motor}","${v.price}"`).join('\n');

    fs.writeFileSync(website.output, csvContent, 'utf8');

    // 仅输出文件名，不包含完整路径
    const outputFilename = path.basename(website.output);
    console.log(`✅ Data has been written to ${outputFilename}`);
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    await browser.close();
  }
})();
