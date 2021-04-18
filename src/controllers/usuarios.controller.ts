import passport from 'passport';
import passportLocal from 'passport-local';
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
    const filter = await conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');

    return res.json(filter[0]);

}

export async function 

export async function rightUser (req: Request, res: Response): Promise <Response> {
    var passport = require('passport'), 
    LocalStrategy = require('passport-local').Strategy;

    let users = getUsuarios;

    passport.use(new LocalStrategy(
        //A la función se le pasa el usuario(mail) y la contraseña
        function(mail, password, done){
            users.findOne({ mail: mail }, function(err,))
        }
    ))
}