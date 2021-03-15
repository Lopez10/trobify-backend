import { Request, Response } from 'express';
import { connect } from '../database';
import { Inmueble } from '../interface/inmueble.interface';

export async function createInmueble(req: Request, res: Response) {
	const newInmueble: Inmueble = req.body;
	const conn = await connect();
	conn.query('INSERT INTO Catalogo SET ?', [newInmueble]);
	return res.json({
		message: 'Inmueble creado',
	});
}

export async function getUbicacion(req: Request, res: Response): Promise<Response> {
	const conn = await connect();
	const ubicacion = await conn.query('SELECT i.catastro_id, u.longitud, u.latitud FROM Inmueble i, Ubicacion u WHERE u.ubicacion_id = i.ubicacion_id');
	
	return res.json(ubicacion[0]);
}

export async function getFiltrados(req: Request, res: Response): Promise<Response> {
	let select:string = 'i.catastro_id as "catastro", i.cant_habitaciones as "nHabitaciones", i.banos as "nBanos", i.cocina as "nCocinas", tp.tipo as "tipoVivienda" , e.tipo as "estado", ca.tipo as "caracteristicas"'
	let from:String = 'Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca';
	let where:String = '(tp.id = i.id_vivienda and e.id = i.id_estado and c.id = ca.id and c.catastro_id = i.catastro_id';
	//if (nHab>0) where += 'and nHabitaciones = ' + nHab;

	where += ');';

	const conn = await connect();
	const paraFilrar = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);

	
	return res.json(paraFilrar[0]);
}


// export async function getCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalog = conn.query('SELECT * FROM Catalogo WHERE id = ?', [id]);
//      return res.json(catalog);
// }

// Delete
// export async function deleteCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalogo = conn.query('DELETE FROM Catalogo WHERE id = ?',[id]);
//      return res.json({
//           message: 'Catalogo eliminado'
//      });
// }

// Put
// export async function updateCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const updatePost = req.body;
//      const conn = await connect();
//      const catalogo = conn.query('UPDATE Catalogo set ? WHERE id = ?',[updatePost, id]);
//      return res.json({
//           message: 'Catalogo actualizado'
//      });
// }
