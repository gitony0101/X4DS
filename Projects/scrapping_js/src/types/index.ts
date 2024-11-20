import { Page } from 'puppeteer';

// 基础配置接口
export interface BaseConfig {
    baseUrl: string;
    output: string;
}

// 选择器配置接口
export interface SelectorConfig {
    selector: string;
    attribute?: string;
    transform?: (value: string) => string | number;
}

// 选择器映射接口
export interface SelectorsMap {
    [key: string]: string | SelectorConfig;
}

// 分页配置接口
export interface PaginationConfig {
    enabled: boolean;
    queryParam?: string;
    nextButtonSelector?: string;
    disabledClass?: string;
    maxPages?: number;
}

// 过滤器配置接口
export interface FilterConfig {
    selector: string;
    validate: (value: string) => boolean;
}

// 过滤器映射接口
export interface FiltersMap {
    [key: string]: FilterConfig;
}

// 数据转换器映射接口
export interface DataTransformersMap {
    [key: string]: (value: string) => string | number;
}

// 完整的经销商配置接口
export interface DealerConfig extends BaseConfig {
    selectors: SelectorsMap;
    pagination?: PaginationConfig;
    filters?: FiltersMap;
    dataTransformers?: DataTransformersMap;
}

// 爬虫结果接口
export interface ScrapedData {
    [key: string]: string | number;
}

// 任务管理器选项接口
export interface TaskManagerOptions {
    maxConcurrent?: number;
    maxRetries?: number;
    retryDelay?: number;
}

// 任务接口
export interface Task<T> {
    task: () => Promise<T>;
    name: string;
    retries: number;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

// 浏览器上下文接口
export interface BrowserContext {
    page: Page;
    close: () => Promise<void>;
}
