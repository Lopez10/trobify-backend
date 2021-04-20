import { Request, Response } from 'express';
import { connect } from '../database';
/*
export async function getUsuariosLog(req: Request, res: Response): Promise<Response> {
	const mail: number = +req.params.mail;
	const telefono: number = +req.params.telefono;
	const contraseña: number = +req.params.contraseña;

	let select: string = '*';
	let from: string = ' Usuario U ';
	let where: string = ' U.mail = ' + mail + ' AND U.contraseña ' + contraseña;

	const conn = await connect();
	const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');

	return res.json(filter[0]);
}

*/
export async function getUsuariosLog(req: Request, res: Response){
	const mail: string = req.body.mail;
	const contraseña = req.body.password;

	let select: string = 'U.mail, U.contraseña';
	let from: string = ' Usuario U ';

	const conn = await connect();
	const logerMail = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE U.mail = "' + mail + '" AND U.contraseña = "' + contraseña + '";');
	
	if(logerMail[0].toString.length == 0){
		return res.json(false);
	}
	else {return res.json(true);}
}

