import { Server } from './server.js';
import config from './config/main.config.js';

export class App {
	async start() {
		this.port = config.port;
		this.server = new Server(this.port);
		return this.server.listen();
	}
	get httpServer() {
		if (this.server) return this.server.getHTTPServer();
	}

	async stop() {
		if (this.server) return this.server.stop();
	}

	async debug(message) {
		return console.log(message);
	}
}
