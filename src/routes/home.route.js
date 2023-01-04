import { Router } from 'express';
import { validateAccessToken } from '../middlewares/jwtTokens.js';

const router = Router();

router.get('*', (req, res, next) => {
	res.on('finish', () => {
		if ((res.statusCode = 404)) {
			console.log(req.path);
			next();
		}
	});
	next();
});

router.get('/', (req, res) => {
	res.send({ directory: 'home page' });
});

router.get('/login', (req, res) => {
	res.send({ directory: 'login' });
});

router.get('/auth', validateAccessToken, (req, res) => {
	res.send({ directory: 'some restricted directory' });
});

export default router;
