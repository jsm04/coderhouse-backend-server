import { logger } from '../entities/logger.js';
export const debbugLogger = (req, res, next) => {
	logger.debug(`Path requested '${req.path}' with method ${req.method}`);
	res.on('finish', () => {
		if (res.statusCode === 404) {
			logger.warn(`Non existent path was requested '${req.path}' with method ${req.method}`);
		}

		if (res.statusCode < 300) {
			logger.warn(`Report ${res.statusCode}'on ${req.path}' with method ${req.method}`);
		}

		if (res.statusCode >= 500) {
			logger.error(`Server error ${res.statusCode}'on ${req.path}' with method ${req.method}`);
		}

		if (res.statusCode >= 400 && res.statusCode < 500) {
			logger.error(`Error ${res.statusCode}'on ${req.path}' with method ${req.method}`);
		}
	});
	return next();
};
