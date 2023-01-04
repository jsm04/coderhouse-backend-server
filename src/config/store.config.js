import MongoStore from 'connect-mongo';
import config from './main.config.js';

export const store_config = {
	store: MongoStore.create({
		mongoUrl: config.mongoUri
	}),
	secret: config.expressSessionSecret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24 * 3
	}
};
