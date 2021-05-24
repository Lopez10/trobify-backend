import { Pool } from 'mysql2/promise';
import { ConexionBD } from '../../ConexionBD';

export class BaseDeDatos {
	protected static conexion: Pool;

	protected constructor() {}

	public static async getConexion(): Promise<Pool> {
		if (BaseDeDatos.conexion == null) {
			BaseDeDatos.conexion = await ConexionBD.getConexion();
		}
		return BaseDeDatos.conexion;
	}

	public static async vaciarDataBase(): Promise<boolean> {
		try {
			await BaseDeDatos.conexion.query('DROP DATABASE ' + 'Trobify' + ';');
		} catch {
			return false;
		}
		return true;
	}

	public static async crearDataBase(): Promise<boolean> {
		var fs = require('fs');
		var source = fs.readFileSync('../database/Trobify.sql', 'utf8');
		await BaseDeDatos.conexion.query(source, function (err) {
			if (err) return false;
		});
		return true;
	}

	public static async poblarDataBase(): Promise<boolean> {
		var fs = require('fs');
		var source = fs.readFileSync('../database/PoblarBD.sql', 'utf8');
		await BaseDeDatos.conexion.query(source, function (err) {
			if (err) return false;
		});
		return true;
	}
}
