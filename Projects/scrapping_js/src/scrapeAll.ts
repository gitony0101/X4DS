import { BaseScraper } from './lib/BaseScraper';
import { dealerConfigs } from './configs/dealerConfigs';
import { TaskManager } from './lib/TaskManager';
import { Logger } from './utils/Logger';
import { FileHandler } from './utils/FileHandler';
import { ScrapedData } from './types';

const logger = new Logger('main');
const fileHandler = new FileHandler('output');
const taskManager = new TaskManager({
    maxConcurrent: 2,  // 同时爬取2个网站
    maxRetries: 3,     // 失败重试3次
    retryDelay: 5000   // 重试间隔5秒
});

async function scrapeDealer(dealer: string, config: typeof dealerConfigs[string]): Promise<ScrapedData[]> {
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
        logger.error(`Failed to scrape ${dealer}`, error as Error);
        throw error;
    }
}

async function scrapeAllDealers(): Promise<void> {
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
        logger.error('Error in main process', error as Error);
        process.exit(1);
    }
}

// 运行爬虫
scrapeAllDealers();
