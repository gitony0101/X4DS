import { BaseScraper } from '../lib/BaseScraper.js';

const config = {
    baseUrl: 'https://www.amhersttoyota.com/en/new-inventory',
    output: 'carInfo_amherst.csv',
    selectors: {
        container: 'div.listing-new-tile',
        carModel: '.new-car-name.sr-text.is-bold',
        carPrice: '.payment-row-price.sr-text.is-bold',
        reserved: 'div.tile-tag:contains("Reserved")'
    },
    pagination: {
        enabled: true,
        queryParam: '?page=',
        nextButtonSelector: '.divPaginationArrowBox',
        disabledClass: 'disabled'
    }
};

const scraper = new AmherstScraper(config);
await scraper.scrapeWebsite();
