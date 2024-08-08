const puppeteer = require('puppeteer');
const fs = require('fs');

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

  return await page.evaluate(() => {
    const cars = [];
    document.querySelectorAll('div.vehicle-card').forEach((card) => {
      const carModel = card
        .querySelector('.vehicle-title-link')
        .innerText.trim();
      const carPrice = card
        .querySelector('.adjusted-price .price')
        .innerText.trim()
        .replace('$', '')
        .replace(',', '');
      const carVIN = card.querySelector('.vehicle-vin').innerText.trim();
      const carDealer = card.querySelector('.dealer-name').innerText.trim();
      const carDistance = card
        .querySelector('.dealer-name + span')
        .innerText.trim();

      cars.push({
        carModel,
        carPrice,
        carVIN,
        carDealer,
        carDistance,
      });
    });
    return cars;
  });
}

async function scrapeWebsite(baseUrl, outputPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const allCarInfo = [];

  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}&page=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const carInfo = await scrapePage(page);
    if (carInfo.length > 0) {
      allCarInfo.push(...carInfo);
    }

    const nextPageButton = await page.$('divPaginationArrowBox:not(.disabled)');
    if (nextPageButton) {
      currentPage += 1;
    } else {
      hasNextPage = false;
    }
  }

  await browser.close();

  const csvContent = [
    'Model,Price,VIN,Dealer,Distance',
    ...allCarInfo.map(
      (car) =>
        `${car.carModel},${car.carPrice},${car.carVIN},${car.carDealer},${car.carDistance}`,
    ),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`Data has been written to ${outputPath}`);
}

const website = {
  baseUrl:
    'https://shop.ford.ca/inventory/bronco/results?zipcode=B4C2R3&Radius=150&modeltrim=Bronco_F25-RAPTOR&Order=LowPrice&intcmp=moddetails-bb-si',
  output: 'raptor_info.csv',
};

(async () => {
  await scrapeWebsite(website.baseUrl, website.output);
})().catch((err) => console.error(err));
