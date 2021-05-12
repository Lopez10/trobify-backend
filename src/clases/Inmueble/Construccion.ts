import { Inmueble } from './Inmueble';
import { Request, Response } from 'express';
import { InmuebleInterface } from '../../interface/inmueble.interface';

export class Construccion extends Inmueble {
	async getInmueble(req: Request, res: Response) {
		const modalidad: number = Number(req.params.modalidadId);
		const catastro: string = String(req.params.inmuebleId);

		let select: string =
			'cat.precio, cat.descuento, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, inm.superficie, car.nHab, car.nBano, car.nCocina, cer.certifEner, ubi.direccion, ubi.latitud, ubi.longitud, inm.breveDescripcion, ubi.prov, cat.id_usuario as propietario';
		let from: String =
			'inmueble inm, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, ubicacion ubi, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI';
		let where: String =
			'inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion AND inm.id_estadoInmueble = est.id_estadoInmueble  AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble';
		where += ' AND cat.id_modalidad = ' + modalidad + ' ';
		where += ' AND inm.id_catastro LIKE ("' + catastro + '")';

		let inmueble = await Inmueble.BD.accesoBD(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';'
		);
		let imagenes = await Inmueble.BD.accesoBD(
			'SELECT valor FROM imagen WHERE id_catastro LIKE ("' + catastro + '")'
		);
		var img: string[] = [''];
		JSON.parse(JSON.stringify(imagenes[0])).forEach((item) => {
			img.push(item.valor);
		});
		img.splice(0, 1);

		let caracteristicas = await Inmueble.BD.accesoBD(
			'SELECT ca.caracteristica FROM contiene co, caractsecundarias ca WHERE co.id_caractSecundaria = ca.id_caractSecundaria AND co.id_catastro LIKE ("' +
				catastro +
				'")'
		);
		var caract: string[] = [''];
		JSON.parse(JSON.stringify(caracteristicas[0])).forEach((item) => {
			caract.push(item.caracteristica);
		});
		caract.splice(0, 1);

		let newInmueble: InmuebleInterface;

		newInmueble =
			{
				id_catastro: catastro,
				tipoInmueble: inmueble[0][0].tipoInmueble,
				estadoInmueble: inmueble[0][0].estadoInmueble,
				energia: inmueble[0][0].certifEner,
				imagen: img,
				superficie: inmueble[0][0].superficie,
				descripcion: inmueble[0][0].breveDescripcion,
				direccion: inmueble[0][0].direccion,
				provincia: inmueble[0][0].prov,
				longitud: inmueble[0][0].longitud,
				latitud: inmueble[0][0].latitud,

				tipoVivienda: inmueble[0][0].tipoVivienda,
				nHab: inmueble[0][0].nHab,
				nBanos: inmueble[0][0].nBano,
				nCocinas: inmueble[0][0].nCocina,
				caracteristicas: caract,

				modalidad: modalidad,
				precio: inmueble[0][0].precio,
				descuento: inmueble[0][0].descuento,
				propietario: inmueble[0][0].propietario,
			} || null;
		return res.json(newInmueble);
	}

	async registrarInmueble(req: Request, res: Response): Promise<Response> {
		let b = Inmueble.regInmueble(req);
		return res.json(b);
	}
}
