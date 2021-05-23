import { createPool, Pool } from 'mysql2/promise';

export class Consulta {
	private static conexion: Pool;
	private constructor() {}

	public static async getConexion(): Promise<Pool> {
		if (Consulta.conexion == null) {
			Consulta.conexion = await createPool({
				host: 'localhost',
				user: 'root',
				password: 'rootroot',
				database: 'Trobify',
				port: 3306,
				connectionLimit: 100,
			});
		}
		return Consulta.conexion;
	}

	public static async getConsulta(consulta: string, mas?: string[]): Promise<any> {
		const conect = await Consulta.getConexion();

		console.log(consulta);

		let resultadoQuery: any;
		if (mas) {
			resultadoQuery = await conect.query(consulta, mas);
		} else {
			resultadoQuery = await conect.query(consulta);
		}
		return resultadoQuery;
	}

	public static async cuantosElementosEnTabla(
		tabla: string,
		atributo: string,
		valorAtributo: string
	): Promise<number> {
		let select: string = 'COUNT(' + atributo + ') as cuenta';
		let where: string = atributo + ' LIKE ( "' + valorAtributo + '")';

		const conect = await Consulta.getConexion();

		const consulta = await conect.query('SELECT ' + select + ' FROM ' + tabla + ' WHERE ' + where);

		var contar: number = 0;
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			contar = item.cuenta;
		});
		return contar;
	}

	public static async existeElementoEnTabla(
		tabla: string,
		atributo: string,
		valorAtributo: string
	): Promise<boolean> {
		const cantidad = await Consulta.cuantosElementosEnTabla(tabla, atributo, valorAtributo);

		let existe = false;
		if (cantidad > 0) existe = true;

		return existe;
	}
}
