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
exports.createInmueble = void 0;
const database_1 = require("../database");
function createInmueble(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newInmueble = req.body;
        const conn = yield database_1.connect();
        conn.query('INSERT INTO Catalogo SET ?', [newInmueble]);
        return res.json({
            message: 'Inmueble creado'
        });
    });
}
exports.createInmueble = createInmueble;
// Mal ejemplo el de catalog -> Aplicable para usuarios
// export async function getCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalog = conn.query('SELECT * FROM Catalogo WHERE id = ?', [id]);
//      return res.json(catalog);
// }
// Delete
// export async function deleteCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalogo = conn.query('DELETE FROM Catalogo WHERE id = ?',[id]);
//      return res.json({
//           message: 'Catalogo eliminado'
//      });
// }
// Put
// export async function updateCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const updatePost = req.body;
//      const conn = await connect();
//      const catalogo = conn.query('UPDATE Catalogo set ? WHERE id = ?',[updatePost, id]);
//      return res.json({
//           message: 'Catalogo actualizado'
//      });
// }
//# sourceMappingURL=inmueble.controller.js.map