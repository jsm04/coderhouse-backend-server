import { Dao } from '../models/dao.model.js';
import { OrdersRepository } from './orders.repository.js';
import { ProductsRepository } from './products.repository.js';
import { UsersRepository } from './users.repository.js';

const dao = new Dao();
export const userService = new UsersRepository(dao);
export const productService = new ProductsRepository(dao);
export const orderService = new OrdersRepository(dao);
