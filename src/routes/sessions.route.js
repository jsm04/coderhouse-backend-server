import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import sessionControllers from '../controllers/sessions.controller.js';
import { renewRefreshToken } from '../middlewares/jwtTokens.js';

const router = Router();
const options = { session: false };

router.get('/', sessionControllers.testHandler);
router.post('/register', passport.authenticate('register', options), sessionControllers.registerHandler);
router.post('/login', passport.authenticate('login', options), sessionControllers.loginHandler);
router.post('/logout', sessionControllers.logoutHandler);
router.get('/refresh', renewRefreshToken);

export default router;