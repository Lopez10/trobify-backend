import { Singleton } from '../../Singleton';
import { Request, Response } from 'express';
import { UsuariosInterface } from '../../interface/usuarios.interface';

export class Usuario {
	BD: Singleton;
	constructor() {
		this.BD = Singleton.getInstance();
	}

	async getUsuariosLog(req: Request, res: Response) {
		const mail: string = req.body.mail;
		const contrasena: string = req.body.password;

		let select: string = 'u.mail, u.contrasena';
		let from: string = ' Usuario u ';

		const consultaLog = this.BD.accesoBD(
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
	async getUsuarios(req: Request, res: Response): Promise<Response> {
		let select: string = '*';
		let from: string = ' Usuario';

		const filter = this.BD.accesoBD(' SELECT ' + select + ' FROM ' + from + ';');

		return res.json(filter[0]);
	}
}
