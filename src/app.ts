import express, { Application } from 'express';
import morgan from 'morgan';

// Routes
import IndexRoutes from './routes/index.routes';
import CatalogRoutes from './routes/catalog.routes';
import InmuebleRoutes from './routes/inmueble.routes';
import path from 'path';

export class App {
	private app: Application;

	constructor(private port?: number | string) {
		this.app = express();
		this.headers();
		this.settings();
		this.middlewares();
		this.routes();
		this.static();
	}

	settings() {
		this.app.set('port', this.port || process.env.PORT || 3000);
	}

	middlewares() {
		this.app.use(morgan('dev'));
		this.app.use(express.json());
	}

	routes() {
		this.app.use(IndexRoutes);
		this.app.use('/catalogo', CatalogRoutes);
		this.app.use('/inmueble', InmuebleRoutes);
	}

	static() {
		this.app.use(express.static(path.join(__dirname, 'views')));
	}
	headers() {
		this.app.use((req, res, next) => {
			res.append('Access-Control-Allow-Origin', ['*']);
			res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.append('Access-Control-Allow-Headers', 'Content-Type');
			next();
		});
	}
	async listen() {
		await this.app.listen(this.app.get('port'));
		console.log('Server on port', 3000);
	}
}
