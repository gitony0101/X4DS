import puppeteer from 'puppeteer';
import { load } from 'cheerio';

async function scrapePrice(url) {
  // 启动Puppeteer浏览器实例
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 访问指定网址
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

  // 获取页面内容
  const htmlData = await page.content();

  // 关闭浏览器
  await browser.close();

  // 使用Cheerio解析HTML
  const $ = load(htmlData);

  // 获取指定的价格元素
  const priceElement = $('.payment-row-price.sr-text.is-bold');

  // 获取价格文本并去除多余空格
  const price = priceElement.text().trim();

  // 打印价格到控制台
  console.log(`Price: ${price}`);
}

// 指定目标网站
const website = {
  url: 'https://www.woodstocknbtoyota.com/en/new-inventory',
};

// 执行爬取任务
(async () => {
  await scrapePrice(website.url);
})();
