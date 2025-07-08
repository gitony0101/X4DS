import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeTruroToyota() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.trurotoyota.com/inventory/new/', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  await page.waitForSelector('.card-content', { timeout: 15000 });

  const data = await page.evaluate(() => {
    const items = document.querySelectorAll('.card-content');
    const results = [];

    items.forEach((card) => {
      const title = card
        .querySelector('.year-make .stat-text-link')
        ?.innerText.trim();
      const vin = card
        .querySelector('.vin')
        ?.innerText.replace('VIN:', '')
        .trim();
      const engine = card
        .querySelector('[data-attribute="engine"] .details span')
        ?.innerText.trim();
      const transmission = card
        .querySelector('[data-attribute="transmission"] .details span')
        ?.innerText.trim();
      const drivetrain = card
        .querySelector('[data-attribute="drivetrain"] .details span')
        ?.innerText.trim();
      const color = card
        .querySelector(
          '[data-attribute="exterior-colour"] .details span:last-child',
        )
        ?.innerText.trim();
      const price = card
        .querySelector('.segment-cash .value.fs\\:24')
        ?.innerText.trim();
      const stock = card
        .querySelector('[data-attribute="stock-#"] .details span')
        ?.innerText.trim();

      results.push({
        title,
        vin,
        engine,
        transmission,
        drivetrain,
        color,
        price,
        stock,
      });
    });

    return results;
  });

  await browser.close();

  // Save to CSV
  const csvContent = [
    'Title,VIN,Engine,Transmission,Drivetrain,Color,Price,Stock',
    ...data.map(
      (d) =>
        `${d.title},${d.vin},${d.engine},${d.transmission},${d.drivetrain},${d.color},${d.price},${d.stock}`,
    ),
  ].join('\n');

  fs.writeFileSync('truro_toyota_inventory.csv', csvContent, 'utf-8');
  console.log('Done: truro_toyota_inventory.csv');
}

scrapeTruroToyota().catch(console.error);
