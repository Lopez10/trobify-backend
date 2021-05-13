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

	modalidad: number;
	precio: number;
	descuento: number;
	propietario: number;
	publicado: number;
}
