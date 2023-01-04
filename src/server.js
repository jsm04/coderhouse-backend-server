import compress from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { Router } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import httpStatus from 'http-status';
import passport from 'passport';
import { registerPassportStrategies } from './config/passport.config.js';
import { store_config } from './config/store.config.js';
import { logger as Logger } from './entities/logger.js';
import { debbugLogger } from './middlewares/errorLogger.js';
import homeRouter from './routes/home.route.js';
import apiRouter from './routes/index.route.js';

export class Server {
	logger = Logger;
	constructor(port) {
		this.port = port;
		this.server = express();
		this.server.use(express.urlencoded({ extended: true }));
		this.server.use(session(store_config));
		this.server.use(express.json());
		this.server.use(helmet.xssFilter());
		this.server.use(helmet.noSniff());
		this.server.use(helmet.hidePoweredBy());
		this.server.use(helmet.frameguard({ action: 'deny' }));
		this.server.use(cors());
		this.server.use(compress());
		registerPassportStrategies();
		this.server.use(passport.initialize());
		this.server.use(passport.session());
		const router = Router();
		this.server.use(router);
		router.use('/', homeRouter);
		router.use('/api/v1', apiRouter);
		router.use((err, req, res, next) => {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
		});
		if (process.env.NODE_ENV !== 'production') {
			this.server.all('*', debbugLogger);
			this.server.use(errorHandler());
		}
	}
	async listen() {
		return new Promise((resolve) => {
			this.httpServer = this.server.listen(this.port, () => {
				this.logger.info(
					`  Backoffice Backend App is running at http://localhost:${this.port} in ${this.server.get('env')} mode`
				);
				this.logger.info('  Press CTRL-C to stop\n');
				resolve();
			});
		});
	}
	getHTTPServer() {
		return this.httpServer;
	}
	async stop() {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close((error) => {
					if (error) return reject(error);
					return resolve();
				});
			}
			return resolve();
		});
	}
}
