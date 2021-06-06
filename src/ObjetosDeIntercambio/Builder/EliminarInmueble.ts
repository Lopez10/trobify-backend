import { Request } from 'express';
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

	async postRegistrarNuevoInmueble(req: Request) {
		let casa: Inmueble;
		let imagen: Imagen;
		let contain: Contiene;
		let catalo: Catalogo;
		let caractInt: CaracteristicasIntrinsecas;
		let datos: DatosCatastro;

		await catalo.deleteDatos(String(req.query.catastro));
		await contain.deleteDatos(String(req.query.catastro));
		await imagen.deleteDatos(String(req.query.catastro));
		await caractInt.deleteDatos(String(req.query.catastro));
		await datos.deleteDatos(String(req.query.catastro));
		await casa.deleteDatos(String(req.query.catastro));
	}
}
