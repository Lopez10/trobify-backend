import { Request, Response } from 'express';
import { connect } from '../database';
import { Catalog } from '../interface/catalog.interface';

export async function getCatalog(req: Request, res: Response): Promise<Response> {
	let select:string = 'inm.catastro_id as "catastro", cat.precio, inm.cant_Habitaciones as "nHab", inm.banos as "nBan", inm.cocina as "nCoc", inm.superficie as "area", ce.nombre as "certif", inm.breveDescripcion as "descrip", est.tipo as "tipoViv", img.valor as "urlImg", pro.provincia, ubi.longitud, ubi.latitud'
	let from:String = 'catalogo cat, inmueble inm, ubicacion ubi, provincias pro, imagen img, CertificacionEnergetica ce, estado est';
	let where:String = '(cat.catastro_id = inm.catastro_id';
				where += ' and ubi.ubicacion_id = inm.ubicacion_id';
				where += ' and ubi.prov = pro.provincia_id' ;
				where += ' and img.catastro_id = inm.catastro_id';
				where += ' and ce.id_certifEner = inm.id_certifEner';
				where += ' and est.id = inm.id_estado';
	// Filtros de grano grueso
	if ( req.query.opc === undefined ) { where += ' and cat.id_modalidad = ' + 1; } else { where += ' and cat.id_modalidad = ' + req.query.opc; }
	if ( req.query.prov === undefined ) { where += ' and pro.provincia_id = ' + 46; } else { where += ' and pro.provincia_id = ' + req.query.prov; }
	// Filtros de grano fino
	if ( !( req.query.nHab === undefined ) ) { where += ' and inm.cant_Habitaciones = ' + req.query.nHab; }
	if ( !( req.query.nBan === undefined ) ) { where += ' and inm.banos = ' + req.query.nBan; }
	if ( !( req.query.supMin === undefined ) && !( req.query.supMax === undefined ) ) { 
		where += ' and inm.superficie BETWEEN ' + req.query.supMin + ' AND ' +  req.query.supMax
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
