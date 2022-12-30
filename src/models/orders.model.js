import mongoose from 'mongoose';
export class Order {
	static get model() {
		return 'Orders';
	}
	static get schema() {
		return {
			user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
			order: [
				{
					product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
					quantity: { type: Number, required: true }
				}
			],
			completed: { type: Boolean, default: false }
		};
	}
}
