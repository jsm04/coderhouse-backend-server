import { Router } from 'express';
import { createOrderFromSessionHandler, listOrdersHandler, ordersFromSessionHandler } from '../controllers/orders.controller.js';

const router = Router();

router.get('/list', listOrdersHandler);

router.get('/', ordersFromSessionHandler);

router.post('/', createOrderFromSessionHandler);

export default router;
