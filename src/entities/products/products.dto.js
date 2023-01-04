import crypto from 'crypto';
export class ProductPostDTO {
	constructor(payload) {
		this.title = payload.title;
		this.description = payload.description || 'no description provided';
		this.stock = payload.stock || 0;
		this.code = crypto.randomUUID();
		this.price = payload.price;
		this.image = payload.image || 'https://picsum.photos/id/36/640/480';
	}
}
