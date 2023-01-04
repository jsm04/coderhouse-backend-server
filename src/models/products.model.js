export class Product {
	static get model() {
		return 'Products';
	}
	static get schema() {
		return {
			title: { type: String, required: true },
			description: { type: String },
			stock: { type: Number },
			code: { type: String, required: true },
			price: { type: Number, required: true },
			image: { type: String }
		};
	}
}
