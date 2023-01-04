import mongoose from 'mongoose';
export class Order {
	static get model() {
		return 'Orders';
	}
	static get schema() {
		return {
			user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
			orders: [
				{
					cart: { type: Array, required: true },
					status: {
						type: String,
						enum: ['pending', 'confirmed', 'completed'],
						default: 'pending'
					}
				}
			]
		};
	}
}
