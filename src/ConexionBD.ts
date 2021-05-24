import { createPool, Pool } from 'mysql2/promise';

export class ConexionBD {
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
}
