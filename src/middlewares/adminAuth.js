import { logger } from '../entities/logger.js';
import { userService } from '../services/services.index.js';

export const adminAuth = async (req, res, next) => {
	try {
		const isSessionAdmin = req.session.user.role === 'admin';
		if (isSessionAdmin) {
			return next();
		}
		const userId = req.session.user.id;

		const query = await userService.getById(userId);

		if (!query) {
			return res.status(409).send({ status: 'error', message: 'invalid user' });
		}

		const user = query;

		const isUserAdmin = user.role === 'admin';
		if (!isUserAdmin) {
			return res.status(401).send({ status: 'error', message: 'unauthorized' });
		}

		req.session.user.role = 'admin';
		return next();
	} catch (error) {
		logger.error(error);
	}
};
