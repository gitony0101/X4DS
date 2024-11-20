import { BaseScraper } from './lib/BaseScraper.js';
import { dealerConfigs } from './configs/dealerConfigs.js';

async function scrapeAllDealers() {
    for (const [dealer, config] of Object.entries(dealerConfigs)) {
        console.log(`Starting to scrape ${dealer}...`);
        try {
            const scraper = new BaseScraper(config);
            await scraper.scrapeWebsite();
            console.log(`Successfully scraped ${dealer}`);
        } catch (error) {
            console.error(`Error scraping ${dealer}:`, error);
        }
    }
}

// Run all scrapers
scrapeAllDealers().catch(console.error);
