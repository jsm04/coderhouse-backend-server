import { Order } from '../models/orders.model.js';
import { GenericRepository } from './generic.repository.js';
export class OrdersRepository extends GenericRepository {
	constructor(dao) {
		super(dao, Order.model);
	}
}
