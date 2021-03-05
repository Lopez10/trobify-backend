import {Request, Response} from 'express'
import { connect } from '../database';
import { Catalog } from '../interface/catalog.interface';

export async function getCatalog(req: Request, res:Response): Promise<Response> {
     
     const conn = await connect();
     const catalogo = conn.query('SELECT * FROM Catalogo');

     return res.json(catalogo);
}