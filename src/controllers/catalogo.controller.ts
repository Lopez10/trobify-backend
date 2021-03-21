import { Request, Response } from 'express';
import { connect } from '../database';
import { Catalog } from '../interface/catalog.interface';

export async function getCatalog(req: Request, res: Response): Promise<Response> {
	let select:string = 'inm.catastro_id as "catastro", cat.precio, inm.cant_Habitaciones as "nHab", inm.banos as "nBan", inm.cocina as "nCoc", inm.superficie as "area", ce.nombre as "certif", inm.breveDescripcion as "descrip", est.tipo as "estado", img.valor as "urlImg", pro.provincia, ubi.longitud, ubi.latitud, tpv.tipo as tpoViv, tpv.id as tpoId'
	let from:String = 'catalogo cat, inmueble inm, ubicacion ubi, provincias pro, imagen img, CertificacionEnergetica ce, estado est, tipodevivienda tpv';
	let where:String = '(cat.catastro_id = inm.catastro_id';
				where += ' and tpv.id = inm.id_vivienda';
				where += ' and ubi.ubicacion_id = inm.ubicacion_id';
				where += ' and ubi.prov = pro.provincia_id' ;
				where += ' and img.catastro_id = inm.catastro_id';
				where += ' and ce.id_certifEner = inm.id_certifEner';
				where += ' and est.id = inm.id_estado';
	// Filtros de grano grueso
	if ( req.query.opc === undefined ) { where += ' and cat.id_modalidad = ' + 1; } else { where += ' and cat.id_modalidad = ' + req.query.opc; }
	if ( !( req.query.prov === undefined ) && Number( req.query.prov ) != 0 ) { where += ' and pro.provincia_id = ' + req.query.prov; }
	// Filtros de grano fino
	if ( !( req.query.nHab === undefined ) ) { where += ' and inm.cant_Habitaciones >= ' + req.query.nHab; }
	if ( !( req.query.nBan === undefined ) ) { where += ' and inm.banos >= ' + req.query.nBan; }
	if ( !( req.query.supMin === undefined ) && !( req.query.supMax === undefined ) ) { 
		where += ' and inm.superficie BETWEEN ' + req.query.supMin + ' AND ' +  req.query.supMax;
	}
	if ( !( req.query.preMin === undefined ) && !( req.query.preMax === undefined ) ) { 
		let min:number = Number( req.query.preMin );
		let max:number = Number( req.query.preMax );
		if ( min > max ) {
			let aux:number = min;
			min = max;
			max = aux;
		}
		if ( !( req.query.aMrgn === undefined ) && String( req.query.aMrgn ) === 'on' && !( req.query.mrgn === undefined ) ) {
			let margen:number = Number( req.query.mrgn );
			min = min - (min * margen);
			max = max + (max * margen);
		}
		if ( min < 0 ) min = 0;
		where += ' and cat.precio BETWEEN ' + min + ' AND ' +  max;
	}
	if ( !( req.query.tpoViv === undefined ) && req.query.tpoViv != ""  ) { where += ' and id_vivienda in (' + req.query.tpoViv + ')'; }
	if ( !( req.query.stdo === undefined ) && req.query.stdo != "" ) { where += ' and id_estado in (' + req.query.stdo + ')'; }
	// Subconsulta en el where para extraer todas las características que debe reunir un mismo inmueble
	if ( !( req.query.caract === undefined ) && req.query.caract != "" ) {
		let SubConsulta:string[] = String( req.query.caract ).split(',');
		let j:number=SubConsulta.length;
		if (true) {
			where += ' and inm.catastro_id IN (SELECT catastro_id FROM (';
			for (let i = 0; i<j; i++) {
				where += 'SELECT co'+ i +'.catastro_id, ca' + i + '.tipo ';
				where += 'FROM caracteristicas ca' + i + ', contiene co' + i + ' ';
				where += 'WHERE ca'+ i +'.id = co'+ i +'.id and ca'+ i +'.id = "' + SubConsulta[i] + '"';
				if (i + 1 < j) where += ' UNION ALL ';
			}
			where += ') tipos GROUP BY catastro_id HAVING COUNT(catastro_id) = ' + j + ')';
		}
	}
	// Cerrar el where
	where += ')';
	// Criterios de orden
	let orderBy:string = ''
	if ( req.query.ord === undefined ) { 
		orderBy += ' cat.f_insercion' 
	} else { 
		switch (Number(req.query.ord)) {
			case (1):
				orderBy += ' cat.f_insercion DESC' 
			break;
			case (2):
				orderBy += ' cat.f_insercion' 
			break;  
			case (3):
				orderBy += ' cat.precio DESC' 
			break;  
			case (4):
				orderBy += ' cat.precio' 
			break;
			case (5):
				orderBy += ' inm.superficie DESC' 
			break;
			case (6):
				orderBy += ' inm.superficie' 
			break;
			case (2):
			default:
				orderBy += ' cat.f_insercion'
			break;
		}
	}
	//console.log('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ORDER BY ' + orderBy + ';')
	const conn = await connect();	
	const catalogo = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ORDER BY ' + orderBy + ';');
	return res.json(catalogo[0]);
}


export async function getProvincias(req: Request, res: Response): Promise<Response> {
	let select:string = 'SELECT * '
	let from:String = 'FROM Provincias ';
	let where:String = '';
	if ( !( req.query.prov === undefined ) && Number( req.query.prov ) <53 ) { where += 'WHERE provincia_id = ' + req.query.prov + ';'; }


	const conn = await connect();	
	const provincias = await conn.query(select + from + where);
	return res.json(provincias[0]);
}

export async function getFiltros(req: Request, res: Response): Promise<Response> {
	const id:number = + req.params.id_cliente;
	
	let select:string = '*';
	let from:string = ' Filtros F ';
	let where:string = ' F.id_cliente = ' + id + '';

	const conn = await connect();
	const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ;');

	return res.json(filter[0]);
}
