import { Server } from './server.js';

export class App {
	async start() {
		this.port = process.env.PORT || 8080;
		this.server = new Server(this.port);
		return this.server.listen();
	}

	get httpServer() {
		if (this.server) return this.server.getHTTPServer();
	}

	async stop() {
		if (this.server) return this.server.stop();
	}

	debug(message) {
		return console.log(message);
	}
}
