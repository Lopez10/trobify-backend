import { ConsultaSedeCatastral } from './ConsultaSedeCatastral';
import { BaseDeDatos } from './BaseDeDatos';

export class DatosCatastro extends ConsultaSedeCatastral {
	static BD: BaseDeDatos = BaseDeDatos.getInstance();
	constructor() {
		super();
	}

	static async create(id_catastro: string): Promise<DatosCatastro> {
		let select: string =
			'id_catastro, direccion, codPostal, localidad, id_provincia, superficie, latitud, longitud';
		let from: String = 'datoscatastro';
		let where: String = 'id_catastro LIKE ' + id_catastro;

		const catalogo = await this.BD.getConsulta(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where
		);

		return JSON.parse(JSON.stringify(catalogo[0]));
	}
}
