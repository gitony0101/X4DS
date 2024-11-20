import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs/promises';
import path from 'path';

interface CsvHeader {
    id: string;
    title: string;
}

export class FileHandler {
    private outputDir: string;

    constructor(outputDir: string = 'output') {
        this.outputDir = outputDir;
    }

    async ensureOutputDir(): Promise<void> {
        try {
            await fs.access(this.outputDir);
        } catch {
            await fs.mkdir(this.outputDir, { recursive: true });
        }
    }

    async writeToCSV<T extends Record<string, any>>(
        filename: string,
        data: T[],
        headers: string[]
    ): Promise<void> {
        await this.ensureOutputDir();
        const csvWriter = createObjectCsvWriter({
            path: path.join(this.outputDir, filename),
            header: headers.map(header => ({
                id: header,
                title: header
            }))
        });
        await csvWriter.writeRecords(data);
    }

    async writeToJSON<T>(filename: string, data: T): Promise<void> {
        await this.ensureOutputDir();
        await fs.writeFile(
            path.join(this.outputDir, filename),
            JSON.stringify(data, null, 2)
        );
    }

    async readJSON<T>(filepath: string): Promise<T> {
        const content = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(content) as T;
    }
}
