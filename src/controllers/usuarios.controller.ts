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

export async function getUsuariosLog(req: Request, res: Response): Promise<Response> {
	const mail = req.body;
	//const contraseña: usuarios = req.body.password;

	console.log(mail);
	/*
	console.log(contraseña);
	
	let select: string = '*';
	let from: string = ' Usuario U ';
	let where: string = ' U.mail = ' + mail; //+ ' AND U.contraseña = ' + contraseña;

	const conn = await connect();
	const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');
	*/
	return res.json({message: 'usuario no logeado'});
}
