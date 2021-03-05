import {Request, Response} from 'express'
import { connect } from '../database';
import { Inmueble } from '../interface/inmueble.interface';

export async function createInmueble(req: Request, res:Response){
     const newInmueble: Inmueble = req.body;
     const conn = await connect();
     conn.query('INSERT INTO Catalogo SET ?', [newInmueble])
     return res.json({
          message: 'Inmueble creado'
     });
}

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