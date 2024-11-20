import debug from 'debug';

export class Logger {
    private debug: debug.Debugger;

    constructor(namespace: string) {
        this.debug = debug(namespace);
        this.debug.enabled = true;
    }

    info(message: string, ...args: any[]): void {
        this.debug(`INFO: ${message}`, ...args);
    }

    error(message: string, error?: Error): void {
        this.debug(`ERROR: ${message}`, error);
        if (error?.stack) {
            this.debug('Stack trace:', error.stack);
        }
    }

    warn(message: string, ...args: any[]): void {
        this.debug(`WARN: ${message}`, ...args);
    }

    success(message: string, ...args: any[]): void {
        this.debug(`SUCCESS: ${message}`, ...args);
    }
}
