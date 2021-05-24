import { Inmueble } from './Inmueble';
import { Request, Response } from 'express';
import { InmuebleInterface } from '../../interface/inmueble.interface';
import { ConexionBD } from '../../ConexionBD';
import { Consulta } from '../BaseDeDatos/Consulta';

export class Construccion extends Inmueble {
	async getInmueble(req: Request, res: Response) {
		//const modalidad: number = Number(req.params.modalidadId);
		const catastro: string = String(req.params.inmuebleId);

		let select: string =
			'DISTINCT inm.superficie, car.nHab, car.nBano, car.nCocina, ubi.direccion, ubi.codPostal, ubi.localidad, ubi.latitud, ubi.longitud, inm.breveDescripcion, ubi.prov, cat.id_usuario as propietario, cat.publicado, inm.id_tipoInmueble as tipoInmueble, inm.id_estadoInmueble as estadoInmueble, inm.id_tipoVivienda as tipoVivienda, car.id_certifEner as energia';
		let from: String = 'inmueble inm, catalogo cat, CaractIntrinsecas car, ubicacion ubi';
		let where: String =
			'inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND ubi.id_ubicacion = inm.id_ubicacion';
		where += ' AND inm.id_catastro LIKE ("' + catastro + '")';

		let inmueble = await Consulta.getConsulta(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';'
		);

		let imagenes: string[] = await Construccion.getConsultaByCatastro(
			catastro,
			'valor',
			'imagen',
			'id_catastro'
		);
		let caracteristicas: string[] = await Construccion.getConsultaByCatastro(
			catastro,
			'id_caractSecundaria',
			'contiene',
			'id_catastro'
		);
		let modalidades: string[] = await Construccion.getConsultaByCatastro(
			catastro,
			'id_modalidad',
			'catalogo',
			'id_catastro'
		);
		let precios: string[] = await Construccion.getConsultaByCatastro(
			catastro,
			'precio',
			'catalogo',
			'id_catastro'
		);
		let descuentos: string[] = await Construccion.getConsultaByCatastro(
			catastro,
			'descuento',
			'catalogo',
			'id_catastro'
		);

		let newInmueble: InmuebleInterface;
		try {
			newInmueble = {
				id_catastro: catastro,
				tipoInmueble: inmueble[0][0].tipoInmueble,
				estadoInmueble: inmueble[0][0].estadoInmueble,
				energia: inmueble[0][0].energia,
				imagen: imagenes,
				superficie: inmueble[0][0].superficie,
				descripcion: inmueble[0][0].breveDescripcion,
				direccion:
					inmueble[0][0].direccion +
					' (' +
					inmueble[0][0].codPostal +
					' ' +
					inmueble[0][0].localidad +
					')',
				provincia: inmueble[0][0].prov,
				longitud: inmueble[0][0].longitud,
				latitud: inmueble[0][0].latitud,

				tipoVivienda: inmueble[0][0].tipoVivienda,
				nHab: inmueble[0][0].nHab,
				nBanos: inmueble[0][0].nBano,
				nCocinas: inmueble[0][0].nCocina,
				caracteristicas: caracteristicas,

				modalidad: modalidades,
				precio: precios,
				descuento: descuentos,
				propietario: inmueble[0][0].propietario,
				publicado: inmueble[0][0].publicado,
			};
		} catch {
			newInmueble = null;
		}
		return res.json(newInmueble);
	}

	async registrarInmueble(req: Request, res: Response): Promise<Response> {
		let b = Inmueble.regInmueble(req);
		return res.json(b);
	}

	static async getConsultaByCatastro(
		id_catastro: string,
		atributo: string,
		tabla: string,
		atributoComparado: string
	): Promise<string[]> {
		let consulta = await Consulta.getConsulta(
			'SELECT ' +
				atributo +
				' FROM ' +
				tabla +
				' WHERE ' +
				atributoComparado +
				' LIKE ("' +
				id_catastro +
				'")'
		);

		var resultado: string[] = [''];
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			resultado.push(item[atributo]);
		});
		resultado.splice(0, 1);
		return resultado;
	}
}
