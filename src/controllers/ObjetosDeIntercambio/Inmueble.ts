import { DatosInmueble } from '../../interface/ObjetosDeIntercambio.interface';

export class Inmueble implements DatosInmueble {
	id_catastro: string;
	tipoInmueble: number;
	estadoInmueble: number;
	energia: number;
	superficie: number;
	descripcion: string;
	direccion: string;
	provincia: number;
	longitud: number;
	latitud: number;
	tipoVivienda: number;
	nHab: number;
	nBanos: number;
	nCocinas: number;
	propietario: number;
	publicado: boolean;
	imagen: string | string[];
	caracteristicas: number | number[];
	modalidad: number | number[];
	precio: number | number[];
	descuento: number | number[];

	getInmueblesSegunFiltros() {
		throw new Error('Method not implemented.');
	}

	getInmueblesPorMailDePropietario() {
		throw new Error('Method not implemented.');
	}

	getInmueblesPorCatastroYModalidad() {
		throw new Error('Method not implemented.');
	}

	postRegistrarNuevoInmueble(): string {
		throw new Error('Method not implemented.');
	}

	eliminarInmueble(): string {
		throw new Error('Method not implemented.');
	}

	nodificarInmueble(): string {
		throw new Error('Method not implemented.');
	}
}
