import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs/promises';
import path from 'path';

export class FileHandler {
    constructor(outputDir = 'output') {
        this.outputDir = outputDir;
    }

    async ensureOutputDir() {
        try {
            await fs.access(this.outputDir);
        } catch {
            await fs.mkdir(this.outputDir, { recursive: true });
        }
    }

    async writeToCSV(filename, data, headers) {
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

    async writeToJSON(filename, data) {
        await this.ensureOutputDir();
        await fs.writeFile(
            path.join(this.outputDir, filename),
            JSON.stringify(data, null, 2)
        );
    }

    async readJSON(filepath) {
        const content = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(content);
    }
}
