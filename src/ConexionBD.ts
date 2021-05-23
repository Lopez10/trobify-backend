//import { createPool } from 'mysql2/promise';
import { createPool, Pool } from 'mysql2/promise';

export class ConexionBD {
	/*
	private static conexionBD: ConexionBD;
	private constructor() {}

	public static getInstance(): ConexionBD {
		if (ConexionBD.conexionBD == null) {
			ConexionBD.conexionBD = new ConexionBD();
		}
		return ConexionBD.conexionBD;
	}

	static async getConexion() {
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

	public static async getConsulta(consulta: string, mas?: string[]): Promise<any> {
		const conn = await ConexionBD.getConexion();
		console.log(consulta);
		if (mas) return await conn.query(consulta, mas);
		return await conn.query(consulta);
	}
*/

	private static conexion: Pool;
	private constructor() {}

	public static async getConexion(): Promise<Pool> {
		if (ConexionBD.conexion == null) {
			ConexionBD.conexion = await createPool({
				host: 'localhost',
				user: 'root',
				password: 'rootroot',
				database: 'Trobify',
				port: 3306,
				connectionLimit: 100,
			});
		}
		return ConexionBD.conexion;
	}

	public static async getConsulta(consulta: string, mas?: string[]): Promise<any> {
		const conect = await ConexionBD.getConexion();

		console.log(consulta);

		let resultadoQuery: any;
		if (mas) {
			resultadoQuery = await conect.query(consulta, mas);
		} else {
			resultadoQuery = await conect.query(consulta);
		}
		return resultadoQuery;
	}
}
