import { Request, Response } from 'express';
import { connect } from '../database';
import { Ubicacion } from '../interface/ubicacion.interface';

export async function getInmueblesFiltrados(req: Request, res: Response): Promise<Response> {
	let select:string = 'i.catastro_id as "catastro", i.cant_habitaciones as "nHabitaciones", i.banos as "nBanos", i.cocina as "nCocinas", tp.tipo as "tipoVivienda" , e.tipo as "estado", ca.tipo as "caracteristicas"'
	let from:String = 'Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca';
	let where:String = '(tp.id = i.id_vivienda and e.id = i.id_estado and c.id = ca.id and c.catastro_id = i.catastro_id';
	//if (nHab>0) where += 'and nHabitaciones = ' + nHab;

	where += ');';

	const conn = await connect();
	const paraFilrar = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);

	
	return res.json(paraFilrar[0]);
}