"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuariosLog = void 0;
const database_1 = require("../database");
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
function getUsuariosLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mail = req.body.mail;
        const contrasena = req.body.password;
        let select = 'u.mail, u.contrasena';
        let from = ' Usuario u ';
        const conn = yield database_1.connect();
        const consultaLog = yield conn.query(' SELECT ' +
            select +
            ' FROM ' +
            from +
            ' WHERE u.mail = "' +
            mail +
            '" AND u.contrasena = "' +
            contrasena +
            '";');
        let loger = consultaLog[0].toString();
        if (loger == '') {
            return res.json(false);
        }
        else {
            return res.json(true);
        }
    });
}
exports.getUsuariosLog = getUsuariosLog;
//# sourceMappingURL=login.controller.js.map