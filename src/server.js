import compress from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { Router } from 'express';
import helmet from 'helmet';
import { logger as Logger } from './entities/logger.js';
import mainRouter from './routes/index.route.js';

export class Server {
	logger = Logger;
	constructor(port) {
		this.port = port;
		this.server = express();
		this.server.use(express.urlencoded({ extended: true }));
		this.server.use(express.json());
		this.server.use(helmet.xssFilter());
		this.server.use(helmet.noSniff());
		this.server.use(helmet.hidePoweredBy());
		this.server.use(helmet.frameguard({ action: 'deny' }));
		this.server.use(compress());
		this.server.use(cors());
		const router = Router();
		router.use(errorHandler());
		this.server.use(router);
		router.use('/api/v1', mainRouter);
		router.use((err, _req, res, _next) => {
			console.log(err);
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
		});
	}
	async listen() {
		return new Promise((resolve) => {
			this.httpServer = this.server.listen(this.port, () => {
				this.logger.info(
					`  Backoffice Backend App is running at http://localhost:${
						this.port
					} in ${this.server.get('env')} mode`
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
