import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { Consulta } from '../../BaseDeDatos/Consulta';
import { IntercambioInmueble } from '../IntercambioInmueble';
import { Request } from 'express';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { Imagen } from '../../BaseDeDatos/Imagen';

export class VistaPorPropietario extends IntercambioInmueble {
	protected objetoDeIntercambio: DatosInmueble[];

	protected constructor(id_catastro: string) {
		super(id_catastro);
	}

	async getResult(lista: string[]) {
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

			this.objetoDeIntercambio.push({
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
			});
		}
	}

	async getInmueblesPorMailDePropietario(req: Request) {
		let definitiva = await Consulta.getCatastroFromUsuario(Number(req.query.propietario));
		return await this.getResult(definitiva);
	}
	//¿Cómo se cogen la información? Aquí es solo rellenarlo con lo que nos pasan.
}
