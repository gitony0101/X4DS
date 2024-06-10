import puppeteer from 'puppeteer';
import { parse } from 'json2csv';
import fs from 'fs';

async function scrapeVehicles(url) {
  // 启动浏览器
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 访问网页
  await page.goto(url, { waitUntil: 'networkidle2' });

  // 抓取页面上的JSON-LD脚本内容
  const data = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]');
    return script ? JSON.parse(script.innerText) : null;
  });

  // 关闭浏览器
  await browser.close();

  // 检查数据是否存在
  if (!data) {
    console.log('No vehicles found.');
    return;
  }

  // 解析数据，这里假设data是一个数组
  const vehicles = data.map((vehicle) => ({
    type: vehicle['@type'],
    name: vehicle.item.name,
    description: vehicle.item.description,
    price: vehicle.item.offers.price,
    currency: vehicle.item.offers.priceCurrency,
    url: vehicle.item.url,
  }));

  // 将数据转换为CSV
  const csv = parse(vehicles, {
    fields: ['type', 'name', 'description', 'price', 'currency', 'url'],
  });

  // 保存到文件
  fs.writeFileSync('vehicles.csv', csv);
  console.log('CSV file has been successfully saved.');
}

// 调用函数，替换下面的URL为实际的页面地址
scrapeVehicles('https://www.acadiatoyota.com/en/new-inventory');
