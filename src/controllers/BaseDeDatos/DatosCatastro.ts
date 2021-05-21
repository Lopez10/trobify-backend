import { ConexionBD } from '../../ConexionBD';
import { SedeCatastro, TipoCatastro, coordenada } from '../../interface/baseDatos.interface';

export class DatosCatastro implements SedeCatastro {
	id_catastro: string; //
	direccion: string;
	localidad: string; //
	codPostal: number;
	id_provincia: number;
	superficie: number;
	coordenada: coordenada; //

	private constructor() {}

	async getDatosCatastro(id_catastro: string): Promise<DatosCatastro> {
		let catastro = new DatosCatastro();

		let select: string =
			'direccion, codPostal, localidad, d_provincia, superficie, latitud, longitud';
		let from: string = 'datoscatastro';
		let where: string = 'id_catastro LIKE "' + id_catastro + '";';

		let consulta = await ConexionBD.getConsulta(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where
		);

		let coordenadas: coordenada = {
			yLatitud: consulta[0][0].latitud,
			xLongitud: consulta[0][0].longitud,
		};

		catastro.id_catastro = id_catastro;
		catastro.direccion = consulta[0][0].direccion;
		catastro.localidad = consulta[0][0].localidad;
		catastro.codPostal = consulta[0][0].codPostal;
		catastro.id_provincia = consulta[0][0].id_provincia;
		catastro.superficie = consulta[0][0].superficie;
		catastro.coordenada = coordenadas;

		return catastro;
	}

	insertDatosCatastro(datoCatastro: TipoCatastro): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
