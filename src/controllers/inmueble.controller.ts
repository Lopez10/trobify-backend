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
	const ubicacion = await conn.query(
		'SELECT i.catastro_id, u.longitud, u.latitud FROM Inmueble i, Ubicacion u WHERE u.ubicacion_id = i.ubicacion_id'
	);

	return res.json(ubicacion[0]);
}

export async function getInmueble(req: Request, res: Response): Promise<Response> {
	const id = req.params.inmuebleId;
	const conn = await connect();
	const inmueble = conn.query('SELECT * FROM Inmueble WHERE id_catastro = ?', [id]);
	inmueble.then((content) => {
		console.log(content[0]);
	});
	return res.json(inmueble[0]);
}

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
