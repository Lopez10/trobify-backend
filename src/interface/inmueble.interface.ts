export interface Inmueble {
	id_catastro: string;
	tipoInmueble: string;
	estadoInmueble: string;
	energia: string;
	imagen: string[];
	superficie: number;
	descripcion: string;
	direccion: string;
	longitud: number;
	latitud: number;

	tipoVivienda?: string;
	cantHab?: number;
	cantBanos?: number;
	caracteristicas?: string[];
	extras?: string[];

	modalidad?: string;
	submodalidad?: string;
	precio?: number;
	descuento?: number;
}
