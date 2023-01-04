import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { logger } from '../entities/logger.js';
import { orderService, productService, userService } from '../services/services.index.js';
import { Mock } from '../utils/mock.js';

export const listOrdersHandler = async (req, res) => {
	try {
		const populateUserQuery = req.query.user;

		if (populateUserQuery) {
			const list = await orderService.findOneAndPopulate({}, 'user');
			res.send({ status: 'ok', orders: list });
		}

		const list = await orderService.list();
		res.send({ status: 'ok', orders: list });
	} catch (error) {
		logger.error(error);
	}
};
export const ordersFromSessionHandler = async (req, res) => {
	try {
		const { id } = req.session.user;

		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'corrupted id' });
		}

		if (!id) {
			res.status(401).send({ status: 'error', message: 'session required' });
		}

		const dbQuery = await orderService.getByParam({ user: id });

		const userNotFound = dbQuery.length === 0;

		if (userNotFound) {
			return res.send({ status: 'ok', message: 'user has no active orders' });
		}

		const user = dbQuery[0];

		const { orders } = user;

		res.send({ status: 'ok', orders });
	} catch (error) {
		logger.error(error);
	}
};
export const createOrderFromSessionHandler = async (req, res) => {
	try {
		const { id } = req.session.user;

		if (!id) {
			res.status(401).send({ status: 'error', message: 'session required' });
		}

		const dbQuery = await userService.findOneAndPopulate({ _id: id }, 'cart.product');

		const userNotFound = dbQuery.length === 0;

		if (userNotFound) {
			return res.status(404).send({ status: 'error', message: 'user not found' });
		}

		const user = dbQuery[0];
		const cart = user.cart;

		if (cart.length === 0) {
			return res.status(400).send({ status: 'error', message: 'cart is empty' });
		}

		let orderDbQuery = await orderService.getByParam({ user: id });

		const isFirstOrder = orderDbQuery.length === 0;

		if (isFirstOrder) {
			const payload = {
				user: user._id,
				orders: [{ order: [...cart] }]
			};

			await orderService.save(payload);

			res.send({ status: 'ok', message: 'order generated' });
		}

		let finalPayload = orderDbQuery[0];

		finalPayload.orders.push({ order: [...cart] });

		await orderService.update({ user: id }, finalPayload);

		res.send({ status: 'ok', message: 'order generated' });
	} catch (error) {
		logger.error(error);
	}
};
