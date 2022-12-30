import { Router } from 'express';
import productRouter from './products.route.js';
import testRouter from './test.route.js';
import usersRouter from './users.route.js';

const router = Router();

router.use('/test', testRouter);
router.use('/products', productRouter);
router.use('/users', usersRouter);
export default router;
