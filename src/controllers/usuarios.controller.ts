import { Request, Response } from 'express';
import { connect } from '../database';
import { usuarios } from '../interface/usuarios.interface';

export async function getUsuarios(req: Request, res: Response): Promise<Response> {
	let select: string = '*';
	let from: string = ' Usuario';

	const conn = await connect();
	const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ';');

	return res.json(filter[0]);
}
