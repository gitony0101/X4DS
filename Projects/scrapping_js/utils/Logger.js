import debug from 'debug';

export class Logger {
    constructor(namespace) {
        this.debug = debug(namespace);
        this.debug.enabled = true;
    }

    info(message, ...args) {
        this.debug(`INFO: ${message}`, ...args);
    }

    error(message, error) {
        this.debug(`ERROR: ${message}`, error);
        if (error?.stack) {
            this.debug('Stack trace:', error.stack);
        }
    }

    warn(message, ...args) {
        this.debug(`WARN: ${message}`, ...args);
    }

    success(message, ...args) {
        this.debug(`SUCCESS: ${message}`, ...args);
    }
}
