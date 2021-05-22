import { DatosCatastro } from '../controllers/BaseDeDatos/DatosCatastro';

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
	getDatosCatastro(id_catastro: string): Promise<any>;
}

export interface Consultas {
	getDatos(id_catastro: string): any;
	insertDatos(): string;
	updateDatos(): string;
	deleteDatos(): string;
}
