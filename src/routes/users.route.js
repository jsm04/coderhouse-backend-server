import { Router } from 'express';
import { usersTestHandler } from '../controllers/users.controller.js';

const router = Router();

router.get('/', usersTestHandler);
export default router;
