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
exports.getUsuariosLog = exports.getUsuarios = void 0;
const database_1 = require("../database");
function getUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let select = '*';
        let from = ' Usuario';
        const conn = yield database_1.connect();
        const filter = yield conn.query(' SELECT ' + select + ' FROM ' + from + ';');
        return res.json(filter[0]);
    });
}
exports.getUsuarios = getUsuarios;
function getUsuariosLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
        return res.json({ message: 'usuario no logeado' });
    });
}
exports.getUsuariosLog = getUsuariosLog;
//# sourceMappingURL=usuarios.controller.js.map