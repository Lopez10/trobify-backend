import { Request, Response } from 'express';
import { connect } from '../database';
import { Catalog } from '../interface/catalog.interface';

export async function getCatalog(req: Request, res: Response): Promise<Response> {
	const conn = await connect();
	const catalogo = await conn.query(
		'SELECT * FROM Catalogo C, Inmueble I where I.id_inmueble = C.id_inmueble'
	);

	return res.json(catalogo[0]);
}
