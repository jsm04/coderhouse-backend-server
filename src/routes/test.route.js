import { Router } from 'express';
import { testHandler } from '../controllers/test.controller.js';
import { validateAccessToken } from '../middlewares/jwtTokens.js';

const router = Router();

router.get('/', testHandler);
router.get('/auth', validateAccessToken, (req, res) => {
	res.send({ status: 'ok' });
});

export default router;
