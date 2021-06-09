import { Request, Response } from 'express';
import { DatosInmueble } from '../../interface/ObjetosDeIntercambio.interface';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { IntercambioInmueble } from '../IntercambioInmueble';
import { RegistrarInmueble } from './RegistrarInmueble';
import { SedeCatastral } from '../../BaseDeDatos/Decorador/SedeCatastral';
import { Consulta } from '../../BaseDeDatos/Consulta';

export class EditarInmueble extends IntercambioInmueble {
	protected objetoDeIntercambio: DatosInmueble;

	constructor(id_catastro?: string) {
		super(id_catastro);
	}

	async updateInmueble(req: Request, res: Response): Promise<Response> {
		let urlImagen: string[] = String(req.body.imagen).split(',');
		let caractSec: string[] = String(req.body.id_caractSecundaria).split(',');
		let modalidad: string[] = String(req.body.id_modalidad).split(',');
		let precio: string[] = String(req.body.precio).split(',');
		let descuento: string[] = String(req.body.descuento).split(',');
		let publicado: string[] = String(req.body.publicado).split(',');

		const fecha: Date = new Date();
		const hoy: string = '' + fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay();

		const nuevaIdImagen: number = Number(await Consulta.siguienteId('imagen', 'id_imagen'));

		let casa: Inmueble = new Inmueble(
			String(req.body.id_catastro),
			String(req.body.breveDescripcion),
			Number(req.body.id_tipoInmueble),
			Number(req.body.id_estadoInmueble),
			Number(req.body.id_tipoVivienda),
			nuevaIdImagen
		);

		let imagen = new Imagen(null, String(req.body.id_catastro), urlImagen);

		let contain = new Contiene(
			String(req.body.id_catastro),
			RegistrarInmueble.numberFromString(caractSec)
		);

		let catalo = new Catalogo(
			String(req.body.id_catastro),
			RegistrarInmueble.numberFromString(modalidad),
			RegistrarInmueble.numberFromString(precio),
			RegistrarInmueble.numberFromString(descuento),
			hoy,
			Number(req.body.id_usuario),
			RegistrarInmueble.numberFromString(publicado)
		);

		let caractInt = new CaracteristicasIntrinsecas(
			String(req.body.id_catastro),
			Number(req.body.nBano),
			Number(req.body.nCocina),
			Number(req.body.nHab),
			Number(req.body.id_certifEner)
		);

		let datos: DatosCatastro = new DatosCatastro(
			String(req.body.id_catastro),
			null,
			null,
			null,
			null,
			null,
			null,
			null
		);

		let aux = new SedeCatastral(datos);
		await aux.getDatos(datos.getId_catastro());

		await imagen.updateDatos();
		await casa.updateDatos();
		await datos.updateDatos();
		await caractInt.updateDatos();
		await contain.updateDatos();
		await catalo.updateDatos();
		return res.json('Los datos se han actualizado correctamente');
	}
}
