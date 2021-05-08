import { Request, Response } from 'express';
import { Singleton } from '../../Singleton';

export class Catalogo {
	BD: Singleton;
	constructor() {
		this.BD = Singleton.getInstance();
	}
	async getProvincias(req: Request, res: Response): Promise<Response> {
		let select: string = 'SELECT * ';
		let from: String = 'FROM Provincias ';
		let where: String = '';
		if (!(req.query.prov === undefined) && Number(req.query.prov) < 53) {
			where += 'WHERE provincia_id = ' + req.query.prov + ';';
		}

		const provincias = this.BD.accesoBD(select + from + where);
		return res.json(provincias[0]);
	}

	async getFiltros(req: Request, res: Response): Promise<Response> {
		const id: number = +req.params.id_cliente;

		let select: string = '*';
		let from: string = ' Filtros F ';
		let where: string = ' F.id_cliente = ' + id + '';

		const filter = this.BD.accesoBD(
			' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ;'
		);

		return res.json(filter[0]);
	}

	criteriosMinimosDeFiltrado(
		idModalidad: Number,
		idTipoInmueble: Number,
		idProvincia: Number
	): boolean {
		if (isNaN(+idProvincia) || idProvincia < 0 || idProvincia > 52) {
			return false;
		}

		if (isNaN(+idTipoInmueble) || idTipoInmueble < 0 || idTipoInmueble > 10) {
			return false;
		}

		if (isNaN(+idModalidad) || idModalidad < 0 || idModalidad > 3) {
			return false;
		}

		return true;
	}

	getSubconsultaModalidadProvinciaTipoinmueble(
		idModalidad: number,
		idTipoInmueble: number,
		idProvincia: number
	): String {
		let subConsulta: string = '';
		let select: string = 'inm.id_catastro';
		let from: String =
			'inmueble inm, ubicacion ubi, provincias pro, tipodeinmueble tpoI, catalogo cat, modalidad mo';
		let where: String =
			'inm.id_tipoInmueble = tpoI.id_tipoInmueble AND inm.id_ubicacion = ubi.id_ubicacion AND ubi.prov = pro.id_provincia AND inm.id_catastro = cat.id_catastro AND cat.id_modalidad = mo.id_modalidad';
		where += ' AND mo.id_modalidad = ' + idModalidad;
		where += ' AND pro.id_provincia = ' + idProvincia;
		where += ' AND tpoI.id_tipoInmueble = ' + idTipoInmueble;

		subConsulta =
			' AND inm.id_catastro IN (SELECT DISTINCT ' +
			select +
			' FROM ' +
			from +
			' WHERE ' +
			where +
			')';

		return subConsulta;
	}
	getSubconsultaCaracterisiticasSecundarias(entrada: string, parametro: string): String {
		if (entrada === 'undefined' || entrada == '') {
			return '';
		}

		let subConsulta: string[] = String(entrada).split(',');
		let j: number = subConsulta.length;

		let resultado: string = '';

		let select: string = 'id_catastro';
		let from: string = '(';

		for (let i = 0; i < j; i++) {
			from += 'SELECT co' + i + '.id_catastro, ca' + i + '.caracteristica ';
			from += 'FROM caractsecundarias ca' + i + ', contiene co' + i + ' ';
			from +=
				'WHERE ca' +
				i +
				'.id_caractSecundaria = co' +
				i +
				'.id_caractSecundaria and ca' +
				i +
				'.id_caractSecundaria = "' +
				subConsulta[i] +
				'"';
			if (i + 1 < j) from += ' UNION ALL ';
		}
		from += ') ' + parametro;
		let group: string = 'id_catastro HAVING COUNT(id_catastro) = ' + j;

		resultado =
			' AND inm.id_catastro IN (SELECT ' + select + ' FROM ' + from + ' GROUP BY ' + group + ')';

		return resultado;
	}

	getOrderBy(entrada: number): String {
		let resultado: string = '';
		if (isNaN(+entrada) || entrada < 1 || entrada > 6) {
			resultado = ' cat.f_insercion';
		}
		switch (entrada) {
			case 1:
				resultado = ' cat.f_insercion DESC';
				break;
			case 3:
				resultado = ' cat.precio DESC';
				break;
			case 4:
				resultado = ' cat.precio';
				break;
			case 5:
				resultado = ' inm.superficie DESC';
				break;
			case 6:
				resultado = ' inm.superficie';
				break;
			default:
				resultado = ' cat.f_insercion';
				break;
		}
		return resultado;
	}
	getPrecio(minimo: number, maximo: number, aMrgn: string, margen: number): string {
		if (isNaN(+minimo) || minimo < 0) {
			return '';
		}
		if (isNaN(+maximo) || maximo < 0) {
			return '';
		}
		if (isNaN(+margen) || margen < 0 || margen > 100) {
			return '';
		}

		let min: number = minimo;
		let max: number = maximo;
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

		//console.log('AND cat.precio BETWEEN ' + min + ' AND ' + max);

		return ' AND cat.precio BETWEEN ' + min + ' AND ' + max;
	}
}
