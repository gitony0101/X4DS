import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://oreganstoyotabridgewater.com/inventory/?do-search=1&search.vehicle-inventory-type-ids.0=1',
    { waitUntil: 'networkidle2' },
  );

  // 等待特定元素加载
  await page.waitForSelector('.ouvsrItem');

  const htmlData = await page.content();
  await browser.close();

  const $ = load(htmlData);
  const carInfo = [];

  $('.ouvsrItem').each((index, element) => {
    const carModel = $(element).find('.ouvsrModelYear').text().trim();
    const carPrice = $(element).find('.currencyValue').text().trim();
    const carSpecs = [];

    $(element)
      .find('.ouvsrTechSpecs .ouvsrSpec')
      .each((i, specElement) => {
        const label = $(specElement).find('.ouvsrLabel').text().trim();
        const value = $(specElement).find('.ouvsrValue').text().trim();
        carSpecs.push({ label, value });
      });

    carInfo.push({
      carModel,
      carPrice,
      carSpecs,
    });
  });

  console.log('Car Info: ', JSON.stringify(carInfo, null, 2));
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
