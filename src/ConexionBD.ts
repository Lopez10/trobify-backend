import { createPool } from 'mysql2/promise';

export class ConexionBD {
	private static conexion: any;
	private constructor() {}

	public static async getConexion(): Promise<any> {
		if (ConexionBD.conexion === undefined) {
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
}
