import { DealerConfig } from '../types';

export const dealerConfigs: Record<string, DealerConfig> = {
    amherst: {
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
    },
    
    halifax: {
        baseUrl: 'https://oreganstoyotahalifax.com/inventory/',
        output: 'carInfo_oregans_halifax_toyota.csv',
        selectors: {
            container: 'div.ouvsrItem',
            carModel: '.ouvsrModelYear',
            carPrice: '.currencyValue',
            exteriorColor: '.ouvsrColorName',
            trim: '.ouvsrTrim',
            stock: {
                selector: '.ouvsrSpec.ouvsrStockNumber .ouvsrValue',
                transform: (value: string) => value.replace('#', '').trim()
            },
            drivetrain: '.ouvsrSpec.ouvsrDrivetrain .ouvsrValue',
            transmission: '.ouvsrSpec.ouvsrTransmission .ouvsrValue',
            fuelType: '.ouvsrSpec.ouvsrFuelType .ouvsrValue'
        },
        filters: {
            inventoryType: {
                selector: '.ouvsrInventoryType',
                validate: (value: string) => value.trim() === 'New'
            }
        },
        dataTransformers: {
            carPrice: (value: string) => {
                if (value.includes('Missing Price')) return '0';
                return value.replace(/[$,]/g, '');
            }
        }
    },

    central: {
        baseUrl: 'https://www.centraltoyota.com/search/new-toyota-jonesboro-ar/',
        output: 'carInfo_central_toyota.csv',
        selectors: {
            container: '.vehicle_item',
            carModel: '.vehicle_title a',
            carPrice: '.vehicle_price',
            mileage: '.details-overview_title:contains("Mileage") + *',
            trim: '.details-overview_title:contains("Trim") + *',
            stock: '.details-overview_title:contains("Stock #") + *',
            vin: '.details-overview_title:contains("VIN") + *',
            exteriorColor: '.details-overview_title:contains("Exterior Color") + *',
            interiorColor: '.details-overview_title:contains("Interior Color") + *',
            drivetrain: '.details-overview_title:contains("Drivetrain") + *'
        },
        pagination: {
            enabled: true,
            queryParam: '&p=',
            nextButtonSelector: '.next a'
        }
    },

    bridgewater: {
        baseUrl: 'https://oreganstoyotabridgewater.com/inventory/',
        output: 'carInfo_oregans_bridgewater.csv',
        selectors: {
            container: 'div.ouvsrItem',
            carModel: '.ouvsrModelYear',
            carTrim: '.ouvsrTrimAndPackage',
            carPrice: '.currencyValue',
            carStockNumber: '.ouvsrSpec.ouvsrStockNumber .ouvsrValue',
            carVIN: {
                selector: '.ouvsrToolsList a.ouvsrContactLink',
                attribute: 'href',
                transform: (value: string) => value?.split('vin=')[1] || ''
            },
            carColor: '.ouvsrSpec.ouvsrExteriorColor .ouvsrColorName',
            carEngine: '.ouvsrSpec.ouvsrEngine .ouvsrValue',
            carDrivetrain: '.ouvsrSpec.ouvsrDrivetrain .ouvsrValue',
            carFuelType: '.ouvsrSpec.ouvsrFuelType .ouvsrValue',
            carTransmission: '.ouvsrSpec.ouvsrTransmission .ouvsrValue',
            features: {
                selector: '.ouvsrFeaturesList li .ouvsrFeatureLabel',
                transform: (elements: string[]) => elements.join(', ')
            }
        }
    }
};
