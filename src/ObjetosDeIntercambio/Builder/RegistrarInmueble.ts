import { Request, Response } from 'express';
import { DatosInmueble } from '../../interface/ObjetosDeIntercambio.interface';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { IntercambioInmueble } from '../IntercambioInmueble';
import { Consulta } from '../../BaseDeDatos/Consulta';
import { SedeCatastral } from '../../BaseDeDatos/Decorador/SedeCatastral';

export class RegistrarInmueble extends IntercambioInmueble {
	protected objetoDeIntercambio: DatosInmueble;

	constructor(id_catastro?: string) {
		super(id_catastro);
	}

	static numberFromString(lista: string[]) {
		let stringToNumber: number[] = [];
		for (let i = 0; i < lista.length; i++) {
			stringToNumber.push(parseInt(lista[i]));
		}
		return stringToNumber;
	}

	async postRegistrarNuevoInmueble(req: Request, res: Response): Promise<Response> {
		console.log(req.body);
		//let id_imagen: string[] = String(req.body.imagen).split(',');
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

		let imagen = new Imagen(
			null,
			//RegistrarInmueble.numberFromString(id_imagen),
			String(req.body.id_catastro),
			urlImagen
		);

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

		await imagen.insertDatos();
		await casa.insertDatos();
		await datos.insertDatos();

		await caractInt.insertDatos();
		await contain.insertDatos();
		await catalo.insertDatos();

		return res.json('Los datos se han actualizado correctamente');
	}
}
