import { Router } from 'express';
import {
	deleteProductById,
	getProductById,
	listProductsHandler,
	postProductHandler,
	randomizeProductsHandler,
	updateProductHandler
} from '../controllers/products.controller.js';

const router = Router();

router.get('/randomize', randomizeProductsHandler);
router.get('/', listProductsHandler);
router.get('/:id', getProductById);
router.delete('/:id', deleteProductById);
router.post('/', postProductHandler);
router.put('/:id', updateProductHandler);

export default router;
