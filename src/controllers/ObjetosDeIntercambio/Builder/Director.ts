import { Request, Response } from 'express';
import { Consulta } from '../../BaseDeDatos/Consulta';

export class Director {
    async filterIndex(req: Request, res: Response): Promise<string[]>{
        let id: string[] = await Consulta.getCatastroIdToModProvTpoinm(Number(req.query.opt), Number(req.query.tpoInm), Number(req.query.prov));
        return id;
    }
}
