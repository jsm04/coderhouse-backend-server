import { Router } from 'express';
import productRouter from './products.route.js';
import sessionRouter from './sessions.route.js';
import usersRouter from './users.route.js';

const router = Router();
router.use('/products', productRouter);
router.use('/users', usersRouter);
router.use('/sessions', sessionRouter);
export default router;
