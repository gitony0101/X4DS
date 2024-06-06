import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
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

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://oreganstoyotabridgewater.com/inventory/?do-search=1&search.vehicle-inventory-type-ids.0=1',
    { waitUntil: 'networkidle2' },
  );

  await autoScroll(page);

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

  carInfo.forEach((car) => {
    console.log('Car Model: ', car.carModel);
    console.log('Car Price: ', car.carPrice);
    console.log('Car Specs:');
    car.carSpecs.forEach((spec) => {
      console.log(`  ${spec.label}: ${spec.value}`);
    });
    console.log('------------------------');
  });
})().catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
