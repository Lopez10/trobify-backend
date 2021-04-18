import { Request, Response } from 'express';
import { connect } from '../database';
import { usuarios } from '../interface/usuarios.interface';

export async function getUsuarios (req: Request, res: Response): Promise <Response> {
    let select: string = '*';
    let from: string = ' Usuario';

    const conn = await connect();
    const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ';'); 

    return res.json(filter[0]);
}

export async function getUsuariosLog (req: Request, res: Response): Promise <Response> {
    const mail: number = +req.params.mail;
    const telefono: number = +req.params.telefono;
    const contraseña: number = +req.params.contraseña;

    let select: string = '*';
    let from: string = ' Usuario U ';
    let where: string = ' (U.mail = ' + mail + ' AND U.contraseña ' + contraseña + ') OR (U.telefono = ' + telefono + ' AND U.contraseña ' + contraseña + ')';

    const conn = await connect();
    console.log(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');
    const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');

    return res.json(filter[0]);

}