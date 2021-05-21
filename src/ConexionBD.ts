//import { connect } from './database';
import { createPool } from 'mysql2/promise';

export class ConexionBD {
	static getConsulta(arg0: string) {
		throw new Error('Method not implemented.');
	}
	private static instance: ConexionBD;
	private constructor() {}

	public static getInstance(): ConexionBD {
		if (ConexionBD.instance == null) {
			ConexionBD.instance = new ConexionBD();
		}
		return ConexionBD.instance;
	}
	async getConexion() {
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
