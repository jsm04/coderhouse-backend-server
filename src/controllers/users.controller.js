import { isValidObjectId } from 'mongoose';
import { logger } from '../entities/logger.js';
import { UserPostDTO } from '../entities/users/users.dto.js';
import { productService, userService } from '../services/services.index.js';
import { Mock } from '../utils/mock.js';
export const randomizeUsersHandler = async (req, res) => {
	try {
		if (process.env.NODE_ENV === 'production') {
			return res.status(403).send({ status: 'error', message: 'this route is unavailable' });
		}

		const usersArray = (qnt) => {
			const arr = [];
			for (let idx = 0, amt = qnt; idx < amt; idx++) {
				arr.push(Mock.getUser);
			}
			return arr;
		};

		const payload = await userService.saveMany(usersArray(3));
		return res.send({ status: payload });
	} catch (error) {
		res.send(error);
		logger.error(error);
	}
};
export const listUsersHandler = async (req, res) => {
	try {
		const users = await userService.list();
		res.send({ list: users });
	} catch (error) {
		logger.error(error);
	}
};
export const getUserByIdHandler = async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		return res.status(400).send({ status: 'error', message: 'invalid id' });
	}
	const query = await userService.getById(id);
	const response = query || 'user not found';
	res.send({ target: response });
};
export const deleteUserByIdHandler = async (req, res) => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid user id' });
		}
		const query = await userService.deleteOne({ _id: id });
		if (!query) return res.status(404).send({ status: 'error', message: 'user not found' });
		res.send({ deletedUser: query });
	} catch (error) {
		logger.error(error);
	}
};
export const postUserHandler = async (req, res) => {
	try {
		const { name, lastname, username, email, password } = req.body;

		if (!name || !lastname || !username || !email || !password) {
			return res.status(400).send({ status: 'error', message: 'required field missing' });
		}

		const requestPayload = { name, lastname, username, email, password };

		const finalPayload = new UserPostDTO(requestPayload);

		const dbQuery = await userService.getByParam({ email: email });

		const exists = dbQuery.length > 0 ? true : false;

		if (exists) {
			return res.send({ status: 'error', message: 'email already in use' });
		}

		const newUser = await userService.save(finalPayload);

		res.send({ status: 'ok', payload: newUser });
	} catch (error) {
		logger.error(error);
	}
};
export const updatePasswordHandler = async (req, res) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}

		const { password } = req.body;

		if (!password) {
			return res.status(400).send({ status: 'error', message: 'required field missing' });
		}

		const dbUserQuery = await userService.getById(id);

		const exists = Object.keys(dbUserQuery).length === 0 ? false : true;

		if (!exists) {
			return res.send({ status: 'error', message: 'no user matchs id' });
		}

		const updatedPayload = { ...dbUserQuery, password };

		const updateUser = await userService.update({ _id: id }, updatedPayload);

		res.send({ status: 'ok', payload: updateUser });
	} catch (error) {
		logger.error(error);
	}
};
export const getUserCartHandler = async (req, res) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}

		let user = await userService.findOneAndPopulate({ _id: id }, 'cart.product');

		const userNotFound = user.length === 0;

		if (userNotFound) {
			return res.status(404).send({ status: 'error', message: 'user not found' });
		}

		const cart = user[0].cart;

		res.send({ status: 'ok', cart });
	} catch (error) {
		logger.error(error);
	}
};
export const addProductsToCartHandler = async (req, res) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}
		const { productid, quantity } = req.body;

		if (!productid) {
			return res.status(400).send({ status: 'error', message: 'missing required field' });
		}

		const isValidProductId = isValidObjectId(productid);

		if (!isValidProductId) {
			return res.status(406).send({ status: 'error', message: 'invalid product id' });
		}

		let user = await userService.getById(id);

		if (!user) {
			return res.status(404).send({ status: 'error', message: 'user not found' });
		}

		const productExists = await productService.getById(productid);

		if (!productExists) {
			return res.status(406).send({ status: 'error', message: 'product not found' });
		}

		const { cart } = user;

		const parsedQuantity = Math.round(parseInt(quantity));

		const validatedQuantity = parsedQuantity < 0 ? 0 : parsedQuantity;

		const addToCart = {
			product: productid,
			quantity: validatedQuantity
		};

		const isProductInCart = cart.filter((obj) => obj.product.toHexString() === productid).length > 0;

		if (isProductInCart) {
			const indexof = cart.findIndex((obj) => {
				if (obj.product.toHexString() === productid) {
					return true;
				}
			});

			user.cart[indexof].quantity += validatedQuantity;

			const payload = await userService.update({ _id: id }, user);

			return res.send({ status: 'ok', cart: payload.cart });
		}

		user.cart.push(addToCart);

		const payload = await userService.update({ _id: id }, user);

		res.send({ status: 'ok', cart: payload.cart });
	} catch (error) {
		logger.error(error);
	}
};
export const removeProductsFromCartHandler = async (req, res) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}

		const { productid, quantity } = req.body;

		if (!productid) {
			return res.status(400).send({ status: 'error', message: 'missing required field' });
		}

		const isValidProductId = isValidObjectId(productid);

		if (!isValidProductId) {
			return res.status(406).send({ status: 'error', message: 'invalid product id' });
		}

		let user = await userService.getById(id);

		if (!user) {
			return res.status(404).send({ status: 'error', message: 'user not found' });
		}

		const productExists = await productService.getById(productid);

		if (!productExists) {
			return res.status(406).send({ status: 'error', message: 'product not found' });
		}

		const { cart } = user;

		const parsedQuantity = Math.round(parseInt(quantity));

		const validatedQuantity = parsedQuantity <= 0 ? 1 : parsedQuantity;

		const isProductInCart = cart.filter((obj) => obj.product.toHexString() === productid).length > 0;

		if (!isProductInCart) {
			return res.send({ status: 'error', message: 'product not in cart' });
		}

		const indexof = cart.findIndex((obj) => {
			if (obj.product.toHexString() === productid) {
				return true;
			}
		});

		const validateFinalQuantity = user.cart[indexof].quantity - validatedQuantity;

		if (validateFinalQuantity <= 0) {
			user.cart.splice(indexof, 1);
			const payload = await userService.update({ _id: id }, user);
			return res.send({ status: 'ok', cart: user.cart });
		}

		user.cart[indexof].quantity -= validatedQuantity;

		const payload = await userService.update({ _id: id }, user);
		return res.send({ status: 'ok', cart: user.cart });
	} catch (error) {
		logger.error(error);
	}
};
