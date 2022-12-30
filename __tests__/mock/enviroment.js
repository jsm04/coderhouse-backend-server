import { faker } from '@faker-js/faker';
import { orderService, productService, userService } from '../../src/services/services.index.js';

class Mock {
	static get getProduct() {
		const { random, image, commerce } = faker;
		return {
			title: commerce.productName(),
			description: commerce.productDescription(),
			stock: parseInt(random.numeric(3)),
			code: random.alphaNumeric(7),
			price: parseInt(commerce.price(600, 500000)),
			image: image.animals()
		};
	}

	static get getUser() {
		const { name, random, internet } = faker;
		return {
			name: name.firstName(),
			lastname: name.lastName(),
			username: `${this.name}${random.alphaNumeric(4)}`,
			email: internet.email(),
			password: random.alphaNumeric(7)
		};
	}
}
test: (async () => {
})();

enviroment: (async () => {
})();
