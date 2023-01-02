import MongoStore from 'connect-mongo';
import config from './main.config.js';

export const store_config = {
	store: MongoStore.create({
		mongoUrl: config.mongoUri,
		ttl: 1 * 60 * 60 * 24
	}),
	secret: config.expressSessionSecret,
	resave: false,
	saveUninitialized: false,
	cookie: {}
};
