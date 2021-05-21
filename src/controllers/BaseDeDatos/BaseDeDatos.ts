import { BD } from '../../interface/baseDatos.interface';
import { createPool } from 'mysql2/promise';

export class BaseDeDatos {
	private static instance: BaseDeDatos;
	private constructor() {}

	public static getInstance(): BaseDeDatos {
		if (BaseDeDatos.instance == null) {
			BaseDeDatos.instance = new BaseDeDatos();
		}
		return BaseDeDatos.instance;
	}

	private async getConexion() {
		const connection = await createPool({
			host: 'localhost',
			user: 'root',
			password: 'rootroot',
			database: 'Trobify',
			port: 3306,
			connectionLimit: 100,
		});
		return connection;
	}

	public async getConsulta(consulta: string, mas?: string[]): Promise<any> {
		const conn = await this.getConexion();
		console.log(consulta);
		if (mas) return await conn.query(consulta, mas);
		return await conn.query(consulta);
	}
}
