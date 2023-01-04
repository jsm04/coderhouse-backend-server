import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth.js';
import { validateAccessToken } from '../middlewares/jwtTokens.js';

const router = Router();

router.get('/', (req, res) => {
	res.send({ directory: 'home page' });
});

router.get('/login', (req, res) => {
	res.send({ directory: 'login page' });
});

router.get('/auth', validateAccessToken, (req, res) => {
	res.send({ directory: 'some regular directory that only logged users can access' });
});
router.get('/adminAuth', validateAccessToken, adminAuth, (req, res) => {
	res.send({ directory: 'super restricted directory that only admins should be able to access' });
});

export default router;
