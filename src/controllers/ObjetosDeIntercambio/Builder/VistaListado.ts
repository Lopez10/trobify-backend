import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { IntercambioInmueble } from '../IntercambioInmueble';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Catalogo } from '../../BaseDeDatos/Catalogo';

export class FiltrosEx extends IntercambioInmueble {
	protected inmuebleCompartido: DatosInmueble[];

	protected constructor(id_catastro: string) {
		super(id_catastro);
	}

	getInmuebleCompartido(): DatosInmueble[] {
		return this.inmuebleCompartido;
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

			this.inmuebleCompartido.push({
				id_catastro: lista[i],
				tipoInmueble: inmueble.getId_tipoInmueble(),
				estadoInmueble: inmueble.getId_estadoInmueble(),
				energia: await caractesiticas.getCertifEner(),
				superficie: catastro.getSuperficie(),
				descripcion: inmueble.getBreveDescipcion(),
				direccion: catastro.getDireccionCompleta(),
				provincia: catastro.getId_provincia(),
				longitud: catastro.getLongitud(),
				latitud: catastro.getLatitud(),
				tipoVivienda: inmueble.getId_tipoVivienda(),
				nHab: caractesiticas.getNHab(),
				nBanos: caractesiticas.getNBano(),
				nCocinas: caractesiticas.getNCocina(),
				propietario: catalogo.getId_usuario(),
				//publicado: catalogo.getPublicado(),

				caracteristicas: await contiene.getCaracteristicas(),
				imagen: await inmueble.getUrlToIdImagen(),
				modalidad: catalogo.getModalidad(),
				precio: catalogo.getPrecio(),
				descuento: catalogo.getDescuento(),
			});
		}
	}
}
