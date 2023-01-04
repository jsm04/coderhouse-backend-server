import { Router } from 'express';
import orderRouter from './orders.route.js';
import productRouter from './products.route.js';
import sessionRouter from './sessions.route.js';
import usersRouter from './users.route.js';

const router = Router();
router.use('/sessions', sessionRouter);
router.use('/users', usersRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
export default router;
