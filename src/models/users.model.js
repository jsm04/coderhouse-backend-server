import mongoose from 'mongoose';
export class User {
	static get model() {
		return 'Users';
	}
	static get schema() {
		return {
			name: { type: String, required: true },
			lastname: { type: String, required: true },
			username: { type: String, required: true },
			email: { type: String, required: true },
			password: { type: String, required: true },
			role: {
				type: String,
				enum: ['user', 'admin'],
				default: 'user'
			},
			cart: {
				products: [
					{
						product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
						quantity: { type: Number, default: 1 },
						_id: false
					}
				],
				state: {
					type: String,
					enum: ['inactive', 'active', 'ordered'],
					default: 'active'
				},
				timestamp: Date
			}
		};
	}
}

/*
	products: [
					{
						product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
						quantity: { type: Number, default: 1 },
						_id: false
					}
				],
*/