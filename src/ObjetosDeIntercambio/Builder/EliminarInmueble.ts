import { Request, Response } from 'express';
import { DatosInmueble } from '../../interface/ObjetosDeIntercambio.interface';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { IntercambioInmueble } from '../IntercambioInmueble';

export class EliminarInmueble extends IntercambioInmueble {
	protected objetoDeIntercambio: DatosInmueble;

	constructor(id_catastro?: string) {
		super(id_catastro);
	}

	async deleteInmueble(req: Request, res: Response): Promise<Response> {
		let casa: Inmueble;
		let imagen: Imagen;
		let contain: Contiene;
		let catalo: Catalogo;
		let caractInt: CaracteristicasIntrinsecas;
		let datos: DatosCatastro;

		await catalo.deleteDatos(String(req.body.catastro));
		await contain.deleteDatos(String(req.body.catastro));
		await imagen.deleteDatos(String(req.body.catastro));
		await caractInt.deleteDatos(String(req.body.catastro));
		await datos.deleteDatos(String(req.body.catastro));
		await casa.deleteDatos(String(req.body.catastro));

		return res.json('Los datos se han eliminado correctamente');
	}
}
