export interface TipoCatastro {
	id_catastro: string;
	direccion: string;
	localidad: string;
	codPostal: string;
	id_provincia: string[];
	superficie: number;
	coordenada: coordenada;
}

interface coordenada {
	yLatitud: number;
	xLongitud: number;
}

export interface BD {
	instance: BD;
	constructor();
	getInstance(): BD;

	getConexion();
	getConsulta(consulta: string, mas?: string[]): Promise<any>;
}
