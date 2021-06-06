import { Pool } from 'mysql2/promise';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { createPool } from 'mysql2/promise';
import { ConexionBD } from '../../ConexionBD';

export class BaseDeDatos {
	protected static conn: Pool;

	protected constructor() {}

	public static async getConexion(): Promise<Pool> {
		if (BaseDeDatos.conn === undefined) {
			BaseDeDatos.conn = await createPool({
				host: 'localhost',
				user: 'root',
				password: 'rootroot',
				database: 'Trobify',
				port: 3306,
				connectionLimit: 100,
			});
		}

		return BaseDeDatos.conn;
	}

	public static async getConsulta(consulta: string, mas?: string[]): Promise<any> {
		console.log(consulta);

		let resultadoQuery: any;

		resultadoQuery = (await BaseDeDatos.getConexion()).query(consulta);

		return resultadoQuery;
	}

	public static async vaciarDataBase(): Promise<boolean> {
		try {
			await BaseDeDatos.getConsulta('USE ' + 'Trobify' + '; DROP DATABASE ' + 'Trobify' + ';');
		} catch {
			return false;
		}
		return true;
	}

	public static async crearDataBase(): Promise<boolean> {
		var fs = require('fs');
		var source = fs.readFileSync('../../database/Trobify.sql', 'utf8');
		console.log;
		await BaseDeDatos.conn.query(source, function (err) {
			if (err) return false;
		});
		return true;
	}

	public static async poblarDataBase(): Promise<boolean> {
		var fs = require('fs');
		var source = await fs.readFileSync('../../database/PoblarBD.sql', 'utf8');

		console.log(source);
		await BaseDeDatos.conn.query(source, function (err) {
			if (err) return false;
		});
		return true;
	}

	public static async reiniciarDataBase(): Promise<boolean> {
		await BaseDeDatos.vaciarDataBase();

		await BaseDeDatos.crearDataBase();

		await BaseDeDatos.poblarDataBase();

		return true;
	}
}
