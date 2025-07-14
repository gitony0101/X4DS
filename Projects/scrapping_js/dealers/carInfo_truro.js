import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 构造 ES Module 中的 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置抓取的目标网站和输出文件路径
const website = {
  baseUrl: 'https://www.trurotoyota.com/en/new-inventory',
  output: path.join(__dirname, '..', 'carInfo_truro.csv'), // 保持保存到上级目录
};

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // 使用新版 headless 模式
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

    // 输出文件名确认
    const outputFilename = path.basename(website.output);
    console.log(`✅ Data has been written to ${outputFilename}`);
  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    await browser.close();
  }
})();
