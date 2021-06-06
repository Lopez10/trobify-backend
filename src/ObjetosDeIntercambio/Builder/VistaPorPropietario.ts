import { DatosInmueble } from '../../interface/ObjetosDeIntercambio.interface';
import { Consulta } from '../../BaseDeDatos/Consulta';
import { IntercambioInmueble } from '../IntercambioInmueble';
import { Request, Response } from 'express';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { Imagen } from '../../BaseDeDatos/Imagen';

export class VistaPorPropietario extends IntercambioInmueble {
	protected objetoDeIntercambio: DatosInmueble[];

	constructor(id_catastro?: string) {
		super(id_catastro);
	}

	static async getResult(lista: string[]): Promise<DatosInmueble[]> {
		console.log(lista);

		let aux: DatosInmueble[] = [];

		for (let i = 0; i < lista.length; i++) {
			let inmueble: Inmueble = new Inmueble();
			inmueble = await inmueble.getDatos(lista[i]);

			let contiene: Contiene = new Contiene();
			contiene = await contiene.getDatos(lista[i]);

			let caractesiticas: CaracteristicasIntrinsecas = new CaracteristicasIntrinsecas();
			caractesiticas = await caractesiticas.getDatos(lista[i]);

			let catastro: DatosCatastro = await DatosCatastro.getDatos(lista[i]);

			let imagen: Imagen = new Imagen();
			imagen = await imagen.getDatos(lista[i]);

			let catalogo: Catalogo = await Catalogo.getDatos(lista[i]);

			let inmuebleAux: DatosInmueble = {
				id_catastro: lista[i],
				tipoInmueble: inmueble.getId_tipoInmueble(),
				estadoInmueble: inmueble.getId_estadoInmueble(),
				descripcion: inmueble.getBreveDescipcion(),
				tipoVivienda: inmueble.getId_tipoVivienda(),
				imagen: await inmueble.getUrlToIdImagen(),

				energia: await caractesiticas.getCertifEner(),
				nHab: caractesiticas.getNHab(),
				nBanos: caractesiticas.getNBano(),
				nCocinas: caractesiticas.getNCocina(),

				superficie: catastro.getSuperficie(),
				direccion: catastro.getDireccionCompleta(),
				provincia: catastro.getId_provincia(),
				longitud: catastro.getLongitud(),
				latitud: catastro.getLatitud(),

				propietario: catalogo.getId_usuario(),
				//publicado: catalogo.getPublicado(),
				modalidad: catalogo.getModalidad(),
				precio: catalogo.getPrecio(),
				descuento: catalogo.getDescuento(),

				caracteristicas: await contiene.getCaracteristicas(),
			};

			aux.push(inmuebleAux);
		}
		return aux;
	}

	async getInmueblesPorMailDePropietario(req: Request, res: Response): Promise<Response> {
		let id_usuario: number = Number(
			await Consulta.getUsuarioFromMail(String(req.params.mailPropietario))
		);
		if (id_usuario == 0) return res.json([]);

		let definitiva: string[] = await Consulta.getCatastroFromUsuario(id_usuario);

		const catastros: DatosInmueble[] = await VistaPorPropietario.getResult(definitiva);

		return res.json(catastros);
	}
}
