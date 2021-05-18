import { Singleton } from '../../Singleton';
import { Request, Response } from 'express';
import { UsuariosInterface } from '../../interface/usuarios.interface';

export class Usuario {
	static BD: Singleton;
	constructor() {
		Usuario.BD = Singleton.getInstance();
	}

	async getUsuariosLog(req: Request, res: Response) {
		const mail: string = req.body.mail;
		const contrasena: string = req.body.password;

		let select: string = 'u.mail, u.contrasena';
		let from: string = ' Usuario u ';

		const consultaLog = await Usuario.BD.accesoBD(
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

		const filter = await Usuario.BD.accesoBD(' SELECT ' + select + ' FROM ' + from + ';');

		return res.json(filter[0]);
	}

	static async existeUsuario(mail: string): Promise<boolean> {
		let select: string = 'COUNT(mail) as cuenta';
		let from: string = 'Usuario';
		let where: string = 'mail LIKE ( "' + mail + '")';
		const consulta = await Usuario.BD.accesoBD(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where
		);
		var contar: number = 0;
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			contar = item.cuenta;
		});
		if (contar != 0) return true;
		return false;
	}

	async regUsuario(req: Request, res: Response): Promise<Response> {
		const mail: string = String(req.body.mail);
		if (await Usuario.existeUsuario(mail)) {
			return res.json(false);
		}

		let usuario: UsuariosInterface = {
			nombre: String(req.body.nombre),
			apellidos: String(req.body.apellidos),
			id_rol: Number(parseInt(req.body.id_rol)),
			vendedor: false,
			mail: mail,
			contrasena: String(req.body.contrasena),
			telefono: Number(parseInt(req.body.telefono)),
		};

		const usuarioCargado: boolean = Boolean(await Usuario.cargarUsuario(usuario));

		if (!usuarioCargado) {
			return res.json(false);
		}

		return res.json(true);
	}

	static async cargarUsuario(usuario: UsuariosInterface): Promise<Boolean> {
		let insert: string =
			'INSERT INTO Usuario (nombre, apellidos, id_rol, vendedor, mail, contrasena, telefono) ';
		let value: string =
			'VALUES ("' +
			usuario.nombre +
			'", "' +
			usuario.apellidos +
			'", ' +
			usuario.id_rol +
			', ' +
			usuario.vendedor +
			', "' +
			usuario.mail +
			'", "' +
			usuario.contrasena +
			'", ' +
			usuario.telefono +
			');';
		try {
			await Usuario.BD.accesoBD(insert + ' ' + value);
			return true;
		} catch {
			return false;
		}
	}
}
