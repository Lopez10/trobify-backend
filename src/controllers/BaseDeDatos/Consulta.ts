import { BaseDeDatos } from './BaseDeDatos';

export class Consulta extends BaseDeDatos {
	public static async cuantosElementosEnTabla(
		tabla: string,
		atributo: string,
		valorAtributo: string
	): Promise<number> {
		let select: string = 'COUNT(' + atributo + ') as cuenta';
		let where: string = atributo + ' LIKE ( "' + valorAtributo + '")';

		const consulta = await Consulta.getConsulta(
			'SELECT ' + select + ' FROM ' + tabla + ' WHERE ' + where
		);

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

	public static async getCatastroIdToModProvTpoinm(
		idModalidad: number,
		idTipoInmueble: number,
		idProvincia: number
	): Promise<string[]> {
		let select: string = 'inm.id_catastro';
		let from: String = 'inmueble inm, datoscatastro dat, catalogo cat';
		let where: String = 'inm.id_catastro = dat.id_catastro AND inm.id_catastro = cat.id_catastro';
		where += ' AND cat.id_modalidad = ' + idModalidad;
		where += ' AND dat.id_provincia = ' + idProvincia;
		where += ' AND inm.id_tipoInmueble = ' + idTipoInmueble;

		const aux: string = 'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';';

		return Consulta.getStringify(await Consulta.getConsulta(aux), 'id_catastro');
	}

	public static getStringify(consulta: string[] | number[], atributo: string): string[] {
		var resultado: string[] = [''];
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			resultado.push(item[atributo]);
		});
		resultado.splice(0, 1);

		return resultado;
	}
}
