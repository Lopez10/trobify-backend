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
		let select: string = 'SELECT inm.id_catastro ';
		let from: String = 'FROM inmueble inm, datoscatastro dat, catalogo cat ';
		let where: String =
			'WHERE inm.id_catastro = dat.id_catastro AND inm.id_catastro = cat.id_catastro AND cat.publicado = 1 ';
		where += ' AND cat.id_modalidad = ' + idModalidad;
		where += ' AND dat.id_provincia = ' + idProvincia;
		where += ' AND inm.id_tipoInmueble = ' + idTipoInmueble;

		const aux: string = select + from + where + ';';

		return Consulta.getStringify(await Consulta.getConsulta(aux), 'id_catastro');
	}

	public static async getCatastroToCaracteristicasIntrinsecas(
		nBano?: number,
		nHab?: number,
		id_certifener?: number
	): Promise<string[]> {
		let select: string = 'SELECT id_catastro ';
		let from: string = 'FROM caractintrinsecas ';
		let where: string = 'WHERE 1=1';
		if (!isNaN(nBano)) where += ' AND nBano = ' + nBano;
		if (!isNaN(nHab)) where += ' AND nHab = ' + nHab;
		if (!isNaN(id_certifener)) where += ' AND id_certifener = ' + id_certifener;
		where += ';';

		try {
			let consulta = Consulta.getStringify(
				await Consulta.getConsulta(select + from + where),
				'id_catastro'
			);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getCatastroToInmueble(
		tpoInm: number,
		stoInm: number,
		tpoViv: number
	): Promise<string[]> {
		let select: string = 'SELECT id_catastro ';
		let from: string = 'FROM inmueble ';
		let where: string = 'WHERE 1=1';
		if (!isNaN(tpoInm)) where += ' AND id_tipoInmueble = ' + tpoInm;
		if (!isNaN(stoInm)) where += ' AND id_tipoInmueble = ' + stoInm;
		if (!isNaN(tpoViv)) where += ' AND id_tipoVivienda= ' + tpoViv;
		where += ';';

		try {
			let consulta = Consulta.getStringify(
				await Consulta.getConsulta(select + from + where),
				'id_catastro'
			);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getCatastroToSuperficie(supMin: number, supMax: number): Promise<string[]> {
		let select: string = 'SELECT id_catastro ';
		let from: string = 'FROM datoscatastro ';
		let where: string = 'WHERE superficie BETWEEN ' + supMin + ' AND ' + supMax + ';';

		try {
			let consulta = Consulta.getStringify(
				await Consulta.getConsulta(select + from + where),
				'id_catastro'
			);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getCatastroToContiene(contiene: string): Promise<string[]> {
		let select: string = 'SELECT DISTINCT id_catastro ';
		let from: string = 'FROM contiene ';
		let where: string = 'WHERE id_caractSecundaria IN ' + contiene + ';';
		try {
			let consulta = Consulta.getStringify(
				await Consulta.getConsulta(select + from + where),
				'id_catastro'
			);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getCatastroToCatalogo(
		preMin: number,
		preMax: number,
		aMrgn?: string,
		margen?: number
	): Promise<string[]> {
		let select: string = 'SELECT id_catastro ';
		let from: string = 'FROM catalogo ';

		let min: number = preMin;
		let max: number = preMax;
		if (min > max) {
			let aux: number = min;
			min = max;
			max = aux;
		}
		if (aMrgn === 'on') {
			min = min - min * margen;
			max = max + max * margen;
		}
		if (min < 0) min = 0;

		let where: string = 'WHERE precio BETWEEN ' + min + ' AND ' + max + ';';

		try {
			let consulta = Consulta.getStringify(
				await Consulta.getConsulta(select + from + where),
				'id_catastro'
			);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getCatastroFromUsuario(id: number): Promise<string[]> {
		let select: string = 'SELECT distinct id_catastro ';
		let from: string = 'FROM Catalogo ';
		let where: string = 'WHERE id_usuario = ' + id + ';';

		try {
			let consulta = Consulta.getStringify(
				await Consulta.getConsulta(select + from + where),
				'id_catastro'
			);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getModalidad(id: string): Promise<number[]> {
		let select: string = 'SELECT id_modalidad ';
		let from: string = 'FROM Catalogo ';
		let where: string = 'WHERE id_catastro = "' + id + '";';

		try {
			let consulta = await Consulta.getConsulta(select + from + where);
			return consulta;
		} catch {
			return null;
		}
	}

	public static async getUsuarioFromMail(mail: string): Promise<number> {
		let select: string = 'SELECT id_usuario ';
		let from: string = 'FROM Usuario ';
		let where: string = 'WHERE mail = "' + mail + '";';

		try {
			return Consulta.getStringify(await Consulta.getConsulta(select + from + where), 'id_usuario');
		} catch {
			return null;
		}
	}

	public static getStringify(consulta: string[] | number[], atributo: string): any[] | any {
		var resultado: any[] = [''];
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			resultado.push(item[atributo]);
		});
		resultado.splice(0, 1);

		return resultado;
	}

	public static interseccionDeDosArray(lista: string[], lista2: string[]) {
		let definitiva: string[] = [];
		if (lista.length != 0 && lista2.length != 0) {
			let k: number = 0;
			for (let i = 0; i < lista.length; i++) {
				for (let j = 0; j < lista2.length; j++) {
					if (lista[i] == lista2[j]) {
						definitiva[k] = lista[i];
						k++;
					}
				}
			}
		}
		return definitiva;
	}
}
