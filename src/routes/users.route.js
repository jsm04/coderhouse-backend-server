import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import {
	addProductsToCartHandler,
	deleteUserByIdHandler,
	getUserByIdHandler,
	getUserCartHandler,
	listUsersHandler,
	postUserHandler,
	randomizeUsersHandler,
	removeProductsFromCartHandler,
	updatePasswordHandler
} from '../controllers/users.controller.js';
import { logger } from '../entities/logger.js';
import { UserPostDTO } from '../entities/users/users.dto.js';
import { productService, userService } from '../services/services.index.js';
import { Mock } from '../utils/mock.js';

const router = Router();

router.get('/randomize', randomizeUsersHandler);
router.get('/', listUsersHandler);
router.get('/:id', getUserByIdHandler);
router.delete('/:id', deleteUserByIdHandler);
router.post('/', postUserHandler);
router.put('/:id', updatePasswordHandler);
router.get('/cart/:id', getUserCartHandler);
router.put('/cart/:id', addProductsToCartHandler);
router.delete('/cart/:id', removeProductsFromCartHandler);
export default router;
