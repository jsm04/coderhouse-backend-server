import winston from 'winston';

class Logger {
	constructor() {
		this.logger = winston.createLogger({
			format: winston.format.combine(
				winston.format.prettyPrint(),
				winston.format.align(),
				winston.format.errors({ stack: true }),
				winston.format.splat(),
				winston.format.simple()
			),
			transports: [
				new winston.transports.Console({}),
				new winston.transports.File({ filename: `logs/ERROR.log`, level: 'error' }),
				new winston.transports.File({ filename: `logs/WARN.log`, level: 'warn' }),
				new winston.transports.File({ filename: `logs/DEBUG.log`, level: 'debug' }),
				new winston.transports.File({ filename: `logs/INFO.log`, level: 'info' })
			]
		});
	}

	error(message) {
		this.logger.error(message);
	}

	warn(message) {
		this.logger.warn(message);
	}

	debug(message) {
		this.logger.debug(message);
	}

	info(message) {
		this.logger.info(message);
	}
}

export const logger = new Logger();
