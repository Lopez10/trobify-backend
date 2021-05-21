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
	id_catastro: string; //
	direccion: string;
	localidad: string; //
	codPostal: number;
	id_provincia: number;
	superficie: number;
	coordenada: coordenada; //

	getDatosCatastro(id_catastro: string): Promise<DatosCatastro>;
	insertDatosCatastro(datoCatastro: TipoCatastro): Promise<boolean>;
}
