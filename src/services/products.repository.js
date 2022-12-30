import { Product } from '../models/products.model.js';
import { GenericRepository } from './generic.repository.js';
export class ProductsRepository extends GenericRepository {
	constructor(dao) {
		super(dao, Product.model);
	}
}
