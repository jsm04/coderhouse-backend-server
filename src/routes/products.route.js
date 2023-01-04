import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import {} from '../controllers/products.controller.js';
import { logger } from '../entities/logger.js';
import { ProductPostDTO } from '../entities/products/products.dto.js';
import { productService } from '../services/services.index.js';
import { Mock } from '../utils/mock.js';

const router = Router();
router.get('/randomize', async (req, res) => {
	try {
		if (process.env.NODE_ENV === 'production') {
			return res.status(403).send({ status: 'error', message: 'this route is unavailable' });
		}

		const productsArr = (qnt) => {
			const arr = [];
			for (let idx = 0, amt = qnt; idx < amt; idx++) {
				arr.push(Mock.getProduct);
			}
			return arr;
		};

		const payload = await productService.saveMany(productsArr(5));

		return res.send({ status: payload });
	} catch (error) {
		res.send(error);
		logger.error(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const products = await productService.list();
		res.send({ list: products });
	} catch (error) {
		logger.error(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}
		const query = await productService.getById({ _id: id });

		const response = query || 'product not found';

		res.send({ target: response });
	} catch (error) {
		logger.error(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}
		const query = await productService.deleteOne({ _id: id });
		if (!query) return res.status(404).send({ status: 'error', message: 'product not found' });
		res.send({ deletedItem: query });
	} catch (error) {
		logger.error(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { title, description, stock, price, image } = req.body;
		if (!title || !price) {
			return res.status(400).send({ status: 'error', message: 'required field missing' });
		}
		const requestPayload = { title, description, stock, price, image };

		const finalPayload = new ProductPostDTO(requestPayload);

		const dbQuery = await productService.getByParam({ title: title });

		const exists = dbQuery.length > 0 ? true : false;
		if (exists) {
			return res.send({ status: 'error', message: 'product already exists' });
		}
		const newProduct = await productService.save(finalPayload);

		res.send({ status: 'ok', payload: newProduct });
	} catch (error) {
		logger.error(error);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { description, stock, price, image } = req.body;

		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.status(400).send({ status: 'error', message: 'invalid id' });
		}

		const dbQuery = await productService.getById(id);

		const exists = Object.keys(dbQuery).length === 0 ? false : true;

		if (!exists) {
			return res.send({ status: 'error', message: 'no user matchs id' });
		}

		const filteredPayload = () => {
			const requestPayload = { description: description, stock: stock, price: price, image: image };
			const requestPayloadEntries = Object.entries(requestPayload);
			let filteredPayload = {};
			for (let [key, value] of requestPayloadEntries) {
				if (value !== undefined) {
					filteredPayload[key] = value;
				}
			}
			return filteredPayload;
		};

		const updatedPayload = { ...dbQuery, ...filteredPayload() };

		res.send({ status: 'ok', payload: updatedPayload });
	} catch (error) {
		logger.error(error);
	}
});

export default router;
