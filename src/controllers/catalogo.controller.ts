import { Request, Response } from 'express';
import { connect } from '../database';

export async function getCatalog(req: Request, res: Response): Promise<Response> {
	let select: string =
		'inm.id_catastro as "catastro", inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif"';
	let from: String =
		'inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert';
	let where: String = '(inm.id_estadoInmueble = est.id_estadoInmueble';
	where += ' AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble';
	where += ' AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda';
	where += ' AND cat.id_catastro = inm.id_catastro';
	where += ' AND inm.id_ubicacion = ub.id_ubicacion';
	where += ' AND ub.prov = pro.id_provincia';
	where += ' AND img.id_catastro = inm.id_catastro';
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
	// Filtro del precio
	if (!(req.query.supMin === undefined) && !(req.query.supMax === undefined)) {
		where += ' and inm.superficie BETWEEN ' + req.query.supMin + ' AND ' + req.query.supMax;
	}
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
	const conn = await connect();
	const catalogo = await conn.query(
		'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ORDER BY ' + orderBy + ';'
	);
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
