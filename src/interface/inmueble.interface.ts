export interface InmuebleInterface {
	id_catastro: string;
	tipoInmueble: string;
	estadoInmueble: string;
	energia: string;
	imagen: string[];
	superficie: number;
	descripcion: string;
	direccion: string;
	provincia: number;
	longitud: number;
	latitud: number;

	tipoVivienda: string;
	nHab: number;
	nBanos: number;
	nCocinas: number;
	caracteristicas: string[];
	extras?: string[];

	modalidad: number | string[];
	precio: number | string[];
	descuento: number | string[];
	propietario: number;
	publicado: number;
}
