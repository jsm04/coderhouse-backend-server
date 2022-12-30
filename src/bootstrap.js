import { App } from './app.js';

bootstrap();
async function bootstrap() {
	const app = new App();
	try {
		await app.start();
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
}

process.on('uncaughtException', (err) => {
	console.log('uncaughtException', err);
	process.exit(1);
});
