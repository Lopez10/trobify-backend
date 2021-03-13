import { Request, Response } from 'express';
import { connect } from '../database';
import { ubicacion } from '../interface/ubicacion.interface';

export async function getUbicacionTodosInmuebles(req: Request, res: Response): Promise<Response> {
	const conn = await connect();
	const ubicaciones = await conn.query('SELECT * FROM Catalogo');

	return res.json(ubicaciones[0]);
}