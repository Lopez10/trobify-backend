import { Request, Response } from 'express';
import { connect } from '../database';
/*
export async function getUsuariosLog(req: Request, res: Response): Promise<Response> {
	const mail: number = +req.params.mail;
	const telefono: number = +req.params.telefono;
	const contrasena: number = +req.params.contrasena;

	let select: string = '*';
	let from: string = ' Usuario u ';
	let where: string = ' u.mail = ' + mail + ' AND u.contrasena ' + contrasena;

	const conn = await connect();
	const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');

	return res.json(filter[0]);
}

*/
export async function getUsuariosLog(req: Request, res: Response) {
	const mail: string = req.body.mail;
	const contrasena = req.body.password;

	let select: string = 'u.mail, u.contrasena';
	let from: string = ' Usuario u ';

	const conn = await connect();
	const consultaLog = await conn.query(
		' SELECT ' +
			select +
			' FROM ' +
			from +
			' WHERE u.mail = "' +
			mail +
			'" AND u.contrasena = "' +
			contrasena +
			'";'
	);
	let loger = consultaLog[0].toString();
	console.log(loger);
	if (loger == '') {
		return res.json(false);
	} else {
		return res.json(true);
	}
}
