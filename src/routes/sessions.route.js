import { Router } from 'express';
import passport from 'passport';
import sessionControllers from '../controllers/sessions.controller.js';
import { renewRefreshToken } from '../middlewares/jwtTokens.js';

const router = Router();
const options = { session: false, failureMessage: true };

router.get('/', sessionControllers.testHandler);
router.post('/register', passport.authenticate('register', options), sessionControllers.registerHandler);
router.post('/login', passport.authenticate('login', options), sessionControllers.loginHandler);
router.post('/logout', sessionControllers.logoutHandler);
router.get('/refresh', renewRefreshToken);

export default router;
