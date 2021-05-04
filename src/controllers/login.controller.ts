import { Request, Response } from 'express';
import { connect } from '../database';

export async function getUsuariosLog(req: Request, res: Response) {
	const mail: string = req.body.mail;
	const contrasena: string = req.body.password;

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
	if (loger == '') {
		return res.json(false);
	} else {
		return res.json(true);
	}
}
