import { BaseScraper } from './lib/BaseScraper.js';
import { dealerConfigs } from './configs/dealerConfigs.js';
import { TaskManager } from './lib/TaskManager.js';
import { Logger } from './utils/Logger.js';
import { FileHandler } from './utils/FileHandler.js';

const logger = new Logger('main');
const fileHandler = new FileHandler('output');
const taskManager = new TaskManager({
    maxConcurrent: 2,  // 同时爬取2个网站
    maxRetries: 3,     // 失败重试3次
    retryDelay: 5000   // 重试间隔5秒
});

async function scrapeDealer(dealer, config) {
    try {
        const scraper = new BaseScraper(config);
        const data = await scraper.scrapeWebsite();
        
        // 保存数据到CSV和JSON
        const filename = config.output || `${dealer}_inventory.csv`;
        const headers = Object.keys(data[0] || {});
        await fileHandler.writeToCSV(filename, data, headers);
        await fileHandler.writeToJSON(`${dealer}_inventory.json`, data);
        
        return data;
    } catch (error) {
        logger.error(`Failed to scrape ${dealer}`, error);
        throw error;
    }
}

async function scrapeAllDealers() {
    try {
        // 确保输出目录存在
        await fileHandler.ensureOutputDir();

        // 添加所有爬虫任务到任务管理器
        const tasks = Object.entries(dealerConfigs).map(([dealer, config]) => {
            return taskManager.addTask(
                () => scrapeDealer(dealer, config),
                dealer
            );
        });

        // 等待所有任务完成
        await Promise.allSettled(tasks);
        await taskManager.waitForAll();

        logger.success('All scraping tasks completed');
    } catch (error) {
        logger.error('Error in main process', error);
        process.exit(1);
    }
}

// 运行爬虫
scrapeAllDealers();
