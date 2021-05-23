export interface TipoCatastro {
	id_catastro: string;
	direccion: string;
	localidad: string;
	codPostal: string;
	id_provincia: string;
	superficie: number;
	coordenada: coordenada;
}

export interface coordenada {
	yLatitud: number;
	xLongitud: number;
}

export interface SedeCatastro {
	getDatos(id_catastro: string): Promise<any>;
}

export interface Consultas extends SedeCatastro {
	insertDatos(): string;
	updateDatos(): string;
	deleteDatos(): string;
	existeYaElDato(): Promise<boolean>;
}
