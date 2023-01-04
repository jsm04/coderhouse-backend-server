import mongoose from 'mongoose';
import config from '../config/main.config.js';
import { Order } from './orders.model.js';
import { Product } from './products.model.js';
import { User } from './users.model.js';

export class Dao {
	constructor() {
		mongoose.set('strictQuery', false);
		mongoose.set('strictPopulate', false);
		this.connection = mongoose.connect(config.mongoUri);
		const timestamps = {
			timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
		};

		const userSchema = mongoose.Schema(User.schema, timestamps);
		const productSchema = mongoose.Schema(Product.schema, timestamps);
		const orderSchema = mongoose.Schema(Order.schema, timestamps);

		this.models = {
			[User.model]: mongoose.model(User.model, userSchema),
			[Product.model]: mongoose.model(Product.model, productSchema),
			[Order.model]: mongoose.model(Order.model, orderSchema)
		};
	}
	_isValidEntity = (entity) => {
		if (!this.models[entity]) throw new Error('Entity not found');
	};

	list = async (entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].find({}).lean();
	};
	getByParam = async (params, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].find(params).lean();
	};

	getById = async (id, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].findById(id).lean();
	};

	findOne = async (params, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].findOne(params).lean();
	};

	findOneAnPopulate = async (params, fieldRef, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].find(params).populate(fieldRef).lean();
	};

	save = async (document, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].create(document);
	};

	saveMany = async (arr, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].insertMany(arr);
	};

	update = async (filter, update, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].findOneAndUpdate(filter, update, {
			new: true
		});
	};
	deleteOne = async (params, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].findOneAndDelete(params);
	};

	deleteMany = async (params, entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].deleteMany(params);
	};
	destroy = async (entity) => {
		this._isValidEntity(entity);
		return await this.models[entity].deleteMany({});
	};
}
