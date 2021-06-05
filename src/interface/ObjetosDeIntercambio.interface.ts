export type DatosInmueble = {
	id_catastro: string;
	tipoInmueble: number;
	estadoInmueble: number;
	energia: number | string;
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
	publicado?: boolean | boolean[];

	caracteristicas: string[] | number[];
	imagen: string[] | string;
	modalidad: number[] | number;
	precio: number[] | number;
	descuento: number[] | number;
};

export interface DatosInmueble2 {
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

	imagen: string[] | string;
	caracteristicas: number[] | number;
	modalidad: number[] | number;
	precio: number[] | number;
	descuento: number[] | number;

	//catalog.routes.ts
	getInmueblesSegunFiltros(): any;
	getInmueblesPorMailDePropietario(): any;

	//inmueble.routes.ts
	getInmueblesPorCatastroYModalidad(): any;
	postRegistrarNuevoInmueble(): string;
	eliminarInmueble(): string;
	nodificarInmueble(): string;
}
