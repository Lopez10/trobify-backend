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
	cantHab: number;
	cantBanos: number;
	caracteristicas: string[];
	extras?: string[];

	modalidad: number;
	precio: number;
	descuento: number;
}
