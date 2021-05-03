export interface Inmueble {
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
}

export interface InmuebleFront {
	id_catastro: string;
	tipoInmueble: number;
	estadoInmueble: number;
	energia: number;
	imagen: string[];
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
	caracteristicas: number[];
	extras?: string[];

	modalidad: number;
	precio: number;
	descuento: number;
	propietario: number;
}
