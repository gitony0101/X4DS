export const dealerConfigs = {
    amherst: {
        baseUrl: 'https://www.amhersttoyota.com/en/new-inventory',
        output: 'carInfo_amherst.csv',
        selectors: {
            container: '.inventory-list__item',
            carModel: '.inventory-card__name',
            carPrice: '.inventory-card__price',
            carTrim: '.inventory-card__trim',
            carStockNumber: '.inventory-card__stock',
            carVIN: '.inventory-card__vin',
            exteriorColor: '.inventory-card__color',
            features: '.inventory-card__features li',
            reserved: '.inventory-card__reserved'
        },
        pagination: {
            enabled: true,
            queryParam: '?page=',
            nextButtonSelector: '.pagination__next',
            disabledClass: 'disabled'
        }
    },
    
    halifax: {
        baseUrl: 'https://oreganstoyotahalifax.com/inventory/new/',
        output: 'carInfo_oregans_halifax_toyota.csv',
        selectors: {
            container: '.vehicle-card',
            carModel: '.vehicle-card__title',
            carPrice: '.vehicle-card__price',
            carTrim: '.vehicle-card__trim',
            carStockNumber: '.vehicle-card__stock-number',
            carVIN: '.vehicle-card__vin',
            exteriorColor: '.vehicle-card__color',
            drivetrain: '.vehicle-card__drivetrain',
            transmission: '.vehicle-card__transmission',
            fuelType: '.vehicle-card__fuel-type',
            features: '.vehicle-card__features li'
        },
        filters: {
            inventoryType: {
                selector: '.vehicle-card__type',
                validate: (value) => value.trim().toLowerCase() === 'new'
            }
        },
        dataTransformers: {
            carPrice: (value) => {
                if (!value || typeof value !== 'string') return '0';
                if (value.includes('Missing Price')) return '0';
                return value.replace(/[$,]/g, '');
            }
        }
    },

    central: {
        baseUrl: 'https://www.centraltoyota.com/new-inventory/',
        output: 'carInfo_central_toyota.csv',
        selectors: {
            container: '.vehicle-card',
            carModel: '.vehicle-card__title',
            carPrice: '.vehicle-card__price',
            carTrim: '.vehicle-card__trim',
            carStockNumber: '.vehicle-card__stock',
            carVIN: '.vehicle-card__vin',
            exteriorColor: '.vehicle-card__exterior-color',
            interiorColor: '.vehicle-card__interior-color',
            mileage: '.vehicle-card__mileage',
            drivetrain: '.vehicle-card__drivetrain',
            features: '.vehicle-card__features li'
        },
        pagination: {
            enabled: true,
            queryParam: '?page=',
            nextButtonSelector: '.pagination__next',
            disabledClass: 'disabled'
        }
    },

    bridgewater: {
        baseUrl: 'https://oreganstoyotabridgewater.com/inventory/new/',
        output: 'carInfo_oregans_bridgewater.csv',
        selectors: {
            container: '.vehicle-card',
            carModel: '.vehicle-card__title',
            carPrice: '.vehicle-card__price',
            carTrim: '.vehicle-card__trim',
            carStockNumber: '.vehicle-card__stock-number',
            carVIN: '.vehicle-card__vin',
            exteriorColor: '.vehicle-card__color',
            carEngine: '.vehicle-card__engine',
            carDrivetrain: '.vehicle-card__drivetrain',
            carFuelType: '.vehicle-card__fuel-type',
            carTransmission: '.vehicle-card__transmission',
            features: '.vehicle-card__features li'
        },
        filters: {
            inventoryType: {
                selector: '.vehicle-card__type',
                validate: (value) => value.trim().toLowerCase() === 'new'
            }
        },
        dataTransformers: {
            carPrice: (value) => {
                if (!value || typeof value !== 'string') return '0';
                if (value.includes('Missing Price')) return '0';
                return value.replace(/[$,]/g, '');
            }
        }
    }
};
