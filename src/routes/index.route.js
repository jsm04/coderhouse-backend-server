import { Router } from 'express';
import productRouter from './products.route.js';
import testRouter from './test.route.js';
import usersRouter from './users.route.js';
import sessionRouter from './sessions.route.js';

const router = Router();

router.use('/test', testRouter);
router.use('/products', productRouter);
router.use('/users', usersRouter);
router.use('/sessions', sessionRouter);
export default router;
