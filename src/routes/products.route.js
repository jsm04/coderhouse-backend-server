import { Router } from 'express';
import { productTestHandler } from '../controllers/products.controller.js';

const router = Router();

router.get('/', productTestHandler);
export default router;

