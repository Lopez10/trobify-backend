import { Request, Response } from 'express';
import { connect } from '../database';
import { Inmueble } from '../interface/inmueble.interface';

export async function createInmueble(req: Request, res: Response) {
	const newInmueble: Inmueble = req.body;
	const conn = await connect();
	conn.query('INSERT INTO Catalogo SET ?', [newInmueble]);
	return res.json({
		message: 'Inmueble creado',
	});
}

export async function getUbicacion(req: Request, res: Response): Promise<Response> {
	const conn = await connect();
	const ubicacion = await conn.query(
		'SELECT i.catastro_id, u.longitud, u.latitud FROM Inmueble i, Ubicacion u WHERE u.ubicacion_id = i.ubicacion_id'
	);

	return res.json(ubicacion[0]);
}

export async function getInmueble(req: Request, res: Response): Promise<Response> {
	const modalidad = req.query.opt;
	const catastro = req.query.idImn;

	let select: string =
		'cat.precio, cat.descuento, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, inm.superficie, car.nHab, car.nBano, cer.certifEner, ubi.direccion, ubi.latitud, ubi.longitud, inm.breveDescripcion';
	let from: String =
		'inmueble inm, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, ubicacion ubi, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI';
	let where: String =
		'inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion  AND inm.id_estadoInmueble = est.id_estadoInmueble  AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble';
	where += ' AND cat.id_modalidad = ' + modalidad;
	where += ' AND	inm.id_catastro LIKE ("' + catastro + '")';

	const conn = await connect();
	const inmueble = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');

	const imagenes = await conn.query(
		'SELECT valor FROM imagen WHERE id_catastro LIKE ("' + catastro + '")'
	);

	const caracteristicas = await conn.query(
		'SELECT ca.caracteristica FROM contiene co, caractsecundarias ca WHERE co.id_caractSecundaria = ca.id_caractSecundaria AND co.id_catastro LIKE ("' +
			catastro +
			'")'
	);

	let json = { datos: inmueble[0], imagenes: imagenes[0], caracteristicas: caracteristicas[0] };

	return res.json(json);
}

// Delete
// export async function deleteCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalogo = conn.query('DELETE FROM Catalogo WHERE id = ?',[id]);
//      return res.json({
//           message: 'Catalogo eliminado'
//      });
// }

// Put
// export async function updateCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const updatePost = req.body;
//      const conn = await connect();
//      const catalogo = conn.query('UPDATE Catalogo set ? WHERE id = ?',[updatePost, id]);
//      return res.json({
//           message: 'Catalogo actualizado'
//      });
// }
