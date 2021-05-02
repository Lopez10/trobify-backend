import { Request, Response } from 'express';
import { connect } from '../database';

export async function getCatalog1(req: Request, res: Response): Promise<Response> {
	let select: string =
		'inm.id_catastro as "catastro", cat.id_modalidad, inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif"';
	let from: String =
		'inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert';
	let where: String = '(inm.id_estadoInmueble = est.id_estadoInmueble';
	where += ' AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble';
	where += ' AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda';
	where += ' AND cat.id_catastro = inm.id_catastro';
	where += ' AND inm.id_ubicacion = ub.id_ubicacion';
	where += ' AND ub.prov = pro.id_provincia';
	where += ' AND img.id_imagen = inm.id_imagen';
	where += ' AND intr.id_catastro = inm.id_catastro';
	where += ' AND intr.id_certifEner = cert.id_certifEner';

	// Filtro de provincia
	if (!(req.query.prov === undefined) && Number(req.query.prov) != 0) {
		where += ' and pro.id_provincia = ' + req.query.prov;
	}
	// Filtro de modalidad (Alquiler, venta,...)
	if (req.query.opt === undefined) {
		where += ' and cat.id_modalidad = ' + 1;
	} else {
		where += ' and cat.id_modalidad = ' + req.query.opt;
	}
	// Filtro de TipoDeInmueble, se pueden pasar varios
	if (!(req.query.tpoInm === undefined)) {
		where += ' and inm.id_tipoInmueble in (' + req.query.tpoInm + ')';
	}
	// Filtro de TipoDeVivienda, se pueden pasar varios
	if (!(req.query.tpoViv === undefined) && req.query.tpoViv != '' && Number(req.query.prov) != 1) {
		where += ' and  inm.id_tipoVivienda in (' + req.query.tpoViv + ')';
	}
	// Filtro de EstadoDeVivienda, se pueden pasar varios
	if (!(req.query.stdo === undefined) && req.query.stdo != '') {
		where += ' and inm.id_estadoInmueble in (' + req.query.stdo + ')';
	}
	// Filtro de la cantidad mínima de habitaciones
	if (!(req.query.nHab === undefined)) {
		where += ' and intr.nHab >= ' + req.query.nHab;
	}
	// Filtro de la cantidad mínima de baños
	if (!(req.query.nBan === undefined)) {
		where += ' and intr.nBano >= ' + req.query.nBan;
	}
	// Filtro de la superficie
	if (!(req.query.supMin === undefined) && !(req.query.supMax === undefined)) {
		where += ' and inm.superficie BETWEEN ' + req.query.supMin + ' AND ' + req.query.supMax;
	}
	// Filtro del precio
	if (!(req.query.preMin === undefined) && !(req.query.preMax === undefined)) {
		let min: number = Number(req.query.preMin);
		let max: number = Number(req.query.preMax);
		if (min > max) {
			let aux: number = min;
			min = max;
			max = aux;
		}
		if (
			!(req.query.aMrgn === undefined) &&
			String(req.query.aMrgn) === 'on' &&
			!(req.query.mrgn === undefined)
		) {
			let margen: number = Number(req.query.mrgn);
			min = min - min * margen;
			max = max + max * margen;
		}
		if (min < 0) min = 0;
		where += ' and cat.precio BETWEEN ' + min + ' AND ' + max;
	}

	// Subconsulta en el where para extraer todas las características que debe reunir un mismo inmueble
	if (!(req.query.caract === undefined) && req.query.caract != '') {
		let SubConsulta: string[] = String(req.query.caract).split(',');
		let j: number = SubConsulta.length;
		if (true) {
			where += ' and inm.id_catastro IN (SELECT id_catastro FROM (';
			for (let i = 0; i < j; i++) {
				where += 'SELECT co' + i + '.id_catastro, ca' + i + '.caracteristica ';
				where += 'FROM caractsecundarias ca' + i + ', contiene co' + i + ' ';
				where +=
					'WHERE ca' +
					i +
					'.id_caractSecundaria = co' +
					i +
					'.id_caractSecundaria and ca' +
					i +
					'.id_caractSecundaria = "' +
					SubConsulta[i] +
					'"';
				if (i + 1 < j) where += ' UNION ALL ';
			}
			where += ') tipos GROUP BY id_catastro HAVING COUNT(id_catastro) = ' + j + ')';
		}
	}
	// Cerrar el where
	where += ')';
	// Criterios de orden
	let orderBy: string = '';
	if (req.query.ord === undefined) {
		orderBy += ' cat.f_insercion';
	} else {
		switch (Number(req.query.ord)) {
			case 1:
				orderBy += ' cat.f_insercion DESC';
				break;
			case 3:
				orderBy += ' cat.precio DESC';
				break;
			case 4:
				orderBy += ' cat.precio';
				break;
			case 5:
				orderBy += ' inm.superficie DESC';
				break;
			case 6:
				orderBy += ' inm.superficie';
				break;
			default:
				orderBy += ' cat.f_insercion';
				break;
		}
	}
	console.log(
		'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ORDER BY ' + orderBy + ';'
	);

	const conn = await connect();
	const catalogo = await conn.query(
		'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ORDER BY ' + orderBy + ';'
	);

	//console.log(getCatastroFiltroPrincipal(1, 3, 46));
	return res.json(catalogo[0]);
}

export async function getProvincias(req: Request, res: Response): Promise<Response> {
	let select: string = 'SELECT * ';
	let from: String = 'FROM Provincias ';
	let where: String = '';
	if (!(req.query.prov === undefined) && Number(req.query.prov) < 53) {
		where += 'WHERE provincia_id = ' + req.query.prov + ';';
	}

	const conn = await connect();
	const provincias = await conn.query(select + from + where);
	return res.json(provincias[0]);
}

export async function getFiltros(req: Request, res: Response): Promise<Response> {
	const id: number = +req.params.id_cliente;

	let select: string = '*';
	let from: string = ' Filtros F ';
	let where: string = ' F.id_cliente = ' + id + '';

	const conn = await connect();
	const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ;');

	return res.json(filter[0]);
}

export async function getCatalog(req: Request, res: Response): Promise<Response> {
	if (
		!criteriosMinimosDeFiltrado(
			Number(req.query.opt),
			Number(req.query.tpoInm),
			Number(req.query.prov)
		)
	) {
		return res.json('Los parámetros introducidos no son suficientes');
	}
	let consulta: string;

	let idProvincia: number = Number(req.query.prov);
	let idTipoInmueble: number = Number(req.query.tpoInm);
	let idModalidad: number = Number(req.query.opt);

	let select: string =
		'inm.id_catastro, inm.superficie, inm.breveDescripcion, ubi.direccion, ubi.latitud, ubi.longitud, ubi.prov, cat.id_modalidad, cat.precio, cat.descuento, cat.id_usuario as propietario, car.nHab, car.nBano, car.nCocina, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, cer.certifEner';
	let from: String =
		'inmueble inm, ubicacion ubi, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI ';
	let where: String =
		'ubi.id_ubicacion = inm.id_ubicacion AND inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion AND inm.id_estadoInmueble = est.id_estadoInmueble AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble';
	where += ' AND cat.id_modalidad = ' + idModalidad;
	where +=
		'' + getSubconsultaModalidadProvinciaTipoinmueble(idModalidad, idTipoInmueble, idProvincia);
	where +=
		'' + getSubconsultaCaracterisiticasSecundarias(String(req.query.caract), 'caracteristica');

	if (!(req.query.tpoViv === undefined) && req.query.tpoViv != '' && Number(req.query.prov) != 1) {
		where += ' AND  inm.id_tipoVivienda in (' + req.query.tpoViv + ')';
	}
	if (!(req.query.stdo === undefined) && req.query.stdo != '') {
		where += ' AND inm.id_estadoInmueble in (' + req.query.stdo + ')';
	}
	if (!(req.query.nHab === undefined)) {
		where += ' AND intr.nHab >= ' + req.query.nHab;
	}
	if (!(req.query.nBan === undefined)) {
		where += ' AND intr.nBano >= ' + req.query.nBan;
	}
	if (!(req.query.supMin === undefined) && !(req.query.supMax === undefined)) {
		where += ' AND inm.superficie BETWEEN ' + req.query.supMin + ' AND ' + req.query.supMax;
	}
	where +=
		'' +
		getPrecio(
			Number(req.query.preMin),
			Number(req.query.preMax),
			String(req.query.aMrgn),
			Number(req.query.mrgn)
		);

	consulta =
		'SELECT ' +
		select +
		' FROM ' +
		from +
		' WHERE ' +
		where +
		' ORDER BY ' +
		getOrderBy(Number(req.query.ord)) +
		';';

	//console.log(consulta);

	const conn = await connect();
	const catalogo = await conn.query(consulta);

	return res.json(catalogo[0]);
}

function criteriosMinimosDeFiltrado(
	idModalidad: Number,
	idTipoInmueble: Number,
	idProvincia: Number
): boolean {
	//console.log(idProvincia + ',' + idTipoInmueble + ',' + idModalidad);
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

function getSubconsultaModalidadProvinciaTipoinmueble(
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

function getSubconsultaCaracterisiticasSecundarias(entrada: string, parametro: string): String {
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

function getOrderBy(entrada: number): String {
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
function getPrecio(minimo: number, maximo: number, aMrgn: string, margen: number): string {
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

	console.log('AND cat.precio BETWEEN ' + min + ' AND ' + max);

	return ' AND cat.precio BETWEEN ' + min + ' AND ' + max;
}
