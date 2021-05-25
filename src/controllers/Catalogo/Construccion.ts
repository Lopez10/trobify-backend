import { Catalogo } from './Catalogo';
import { Request, Response } from 'express';
import { ConexionBD } from '../../ConexionBD';
import { Consulta } from '../BaseDeDatos/Consulta';
//import { connect } from '../../database';

export class Construccion extends Catalogo {
	public async getCatalog(req: Request, res: Response): Promise<Response> {
		let consulta: string;

		let idProvincia: number = Number(req.query.prov);
		let idTipoInmueble: number = Number(req.query.tpoInm);
		let idModalidad: number = Number(req.query.opt);

		let select: string =
			'inm.id_catastro, inm.superficie, inm.breveDescripcion, ubi.direccion, ubi.latitud, ubi.longitud, ubi.prov, cat.id_modalidad, cat.precio, cat.descuento, cat.id_usuario as propietario, car.nHab, car.nBano, car.nCocina, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, cer.certifEner, img.valor as urlImg';
		let from: String =
			'inmueble inm, ubicacion ubi, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI, imagen img';
		let where: String =
			'ubi.id_ubicacion = inm.id_ubicacion AND inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND inm.id_imagen = img.id_imagen AND cer.id_certifEner = car.id_certifEner AND inm.id_estadoInmueble = est.id_estadoInmueble AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble AND cat.publicado = 1';
		where += ' AND cat.id_modalidad = ' + idModalidad;
		where +=
			'' +
			super.getSubconsultaModalidadProvinciaTipoinmueble(idModalidad, idTipoInmueble, idProvincia);
		where +=
			'' +
			super.getSubconsultaCaracterisiticasSecundarias(String(req.query.caract), 'caracteristica');

		where = Construccion.comprobacionUndefined(req, where);
		where +=
			'' +
			super.getPrecio(
				Number(req.query.preMin),
				Number(req.query.preMax),
				String(req.query.aMrgn),
				Number(req.query.mrgn)
			);

		consulta =
			'SELECT ' +
			select +
			' FROM ' +
			from +
			' WHERE ' +
			where +
			' ORDER BY ' +
			super.getOrderBy(Number(req.query.ord)) +
			';';

		const catalogo = await Consulta.getConsulta(consulta);
		return res.json(catalogo[0]);
	}

	async getInmueblesPropietario(req: Request, res: Response): Promise<Response> {
		let mail: string = req.params.mailPropietario;

		let select: string =
			'inm.id_catastro, inm.superficie, inm.breveDescripcion, ubi.direccion, ubi.latitud, ubi.longitud, ubi.prov, cat.id_modalidad, cat.precio, cat.descuento, cat.id_usuario as propietario, car.nHab, car.nBano, car.nCocina, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, cer.certifEner, img.valor as urlImg';
		let from: String =
			'inmueble inm, ubicacion ubi, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI, imagen img, usuario usu';
		let where: String =
			'ubi.id_ubicacion = inm.id_ubicacion AND inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND inm.id_imagen = img.id_imagen AND cer.id_certifEner = car.id_certifEner AND inm.id_estadoInmueble = est.id_estadoInmueble AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble ';

		const inmuebles = await Consulta.getConsulta(
			'SELECT ' +
				select +
				' FROM ' +
				from +
				' WHERE ' +
				where +
				'AND cat.id_usuario = usu.id_usuario AND usu.mail = ?;',
			[mail]
		);

		return res.json(inmuebles[0]);
	}

	static comprobacionUndefined(req, where: String) {
		if (
			!(req.query.tpoViv === undefined) &&
			req.query.tpoViv != '' &&
			Number(req.query.prov) != 1
		) {
			where += ' AND  inm.id_tipoVivienda in (' + req.query.tpoViv + ')';
		}
		if (!(req.query.stdo === undefined) && req.query.stdo != '') {
			where += ' AND inm.id_estadoInmueble in (' + req.query.stdo + ')';
		}
		if (!(req.query.nHab === undefined)) {
			where += ' AND car.nHab >= ' + req.query.nHab;
		}
		if (!(req.query.nBan === undefined)) {
			where += ' AND car.nBano >= ' + req.query.nBan;
		}
		if (!(req.query.supMin === undefined) && !(req.query.supMax === undefined)) {
			where += ' AND inm.superficie BETWEEN ' + req.query.supMin + ' AND ' + req.query.supMax;
		}
		return where;
	}
}
