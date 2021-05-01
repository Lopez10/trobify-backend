import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
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
	const modalidad: number = Number(req.params.modalidadId);
	const catastro: string = String(req.params.inmuebleId);

	let select: string =
		'cat.precio, cat.descuento, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, inm.superficie, car.nHab, car.nBano, cer.certifEner, ubi.direccion, ubi.latitud, ubi.longitud, inm.breveDescripcion, ubi.prov, cat.id_usuario as propietario';
	let from: String =
		'inmueble inm, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, ubicacion ubi, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI';
	let where: String =
		'inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion AND inm.id_estadoInmueble = est.id_estadoInmueble  AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble';
	where += ' AND cat.id_modalidad = ' + modalidad + ' ';
	where += ' AND inm.id_catastro LIKE ("' + catastro + '")';

	const conn = await connect();
	const inmueble = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');

	const imagenes = await conn.query(
		'SELECT valor FROM imagen WHERE id_catastro LIKE ("' + catastro + '")'
	);
	var img: string[] = [''];
	JSON.parse(JSON.stringify(imagenes[0])).forEach((item) => {
		img.push(item.valor);
	});
	img.splice(0, 1);

	const caracteristicas = await conn.query(
		'SELECT ca.caracteristica FROM contiene co, caractsecundarias ca WHERE co.id_caractSecundaria = ca.id_caractSecundaria AND co.id_catastro LIKE ("' +
			catastro +
			'")'
	);
	var caract: string[] = [''];
	JSON.parse(JSON.stringify(caracteristicas[0])).forEach((item) => {
		caract.push(item.caracteristica);
	});
	caract.splice(0, 1);

	const extras = await conn.query(
		'SELECT valor FROM extra WHERE id_catastro LIKE ("' + catastro + '")'
	);
	var ext: string[] = [''];
	JSON.parse(JSON.stringify(extras[0])).forEach((item) => {
		ext.push(item.valor);
	});
	ext.splice(0, 1);

	let newInmueble: Inmueble;

	try {
		newInmueble = {
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
			cantHab: inmueble[0][0].nHab,
			cantBanos: inmueble[0][0].nBano,
			caracteristicas: caract,
			extras: ext,

			modalidad: modalidad,
			precio: inmueble[0][0].precio,
			descuento: inmueble[0][0].descuento,
			propietario: 1,
		};
	} catch (error) {
		newInmueble = null;
	}

	return res.json(newInmueble);
}

export async function registerInmueble(req: Request, res: Response): Promise<Response> {
	const catast = req.body.id_catastro;

	let select: string = 'I.id_catastro';
	let from: string = 'Inmueble I';
	let where: string = '"' + catast + '" = I.id_catastro;';

	const conn = await connect();
	const consultaReg = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
	const reggy = consultaReg[0].toString();
	if (reggy != ' ') {
		return res.json('Este inmueble ya existe.');
	} else {
		const superficie = req.body.superficie;
		const breveDescripcion = req.body.breveDescripcion;
		const id_ubicacion = req.body.id_ubicacion;
		const id_tipoInmueble = req.body.id_tipoInmueble;
		const id_estadoInmueble = req.body.id_estadoInmueble;
		const id_tipoVivienda = req.body.id_tipoVivienda;
		const id_imagen = req.body.id_imagen;
		const id_modalidad = req.body.id_modalidad;
		const precio = req.body.precio;
		const nHab = req.body.nHab;
		const nBano = req.body.nBano;
		const id_certifEner = req.body.id_certifEner;
		const caracteristica = req.body.caracteristica;		

		let insertinto: string = 'INSERT INTO Inmueble '
		let values: string = 'VALUES (' + 
							 catast +
							 ', ' +
							 superficie +
							 ', ' +
							 breveDescripcion +
							 ', ' +
							 id_ubicacion +
							 ', ' +
							 id_tipoInmueble +
							 ', ' +
							 id_estadoInmueble +
							 ', ' + 
							 id_tipoVivienda +
							 ', ' +
							 id_imagen +
							 ');';
	
	const conn2 = await connect();
	const insertintoReg = await conn2.query(insertinto + values);
					 
	return res.json(insertintoReg);

	}




}

export async function editInmueble(req: Request, res: Response): Promise<Response> {
	const catast = req.body.id_catastro;

	let select: string = 'I.id_catastro';
	let from: string = 'Inmueble I';
	let where: string = '"' + catast + '" = I.id_catastro;';

	const conn = await connect();
	const consultaEdit = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
	const eddy = consultaEdit[0].toString();
	if (eddy == ' ') {
		return res.json('Este inmueble no existe.');
	} else {
		const superficie = req.body.superficie;
		const breveDescripcion = req.body.breveDescripcion;
		const id_ubicacion = req.body.id_ubicacion;
		const id_tipoInmueble = req.body.id_tipoInmueble;
		const id_estadoInmueble = req.body.id_estadoInmueble;
		const id_tipoVivienda = req.body.id_tipoVivienda;
		const id_imagen = req.body.id_imagen;
		const id_modalidad = req.body.id_modalidad;
		const precio = req.body.precio;
		const nHab = req.body.nHab;
		const nBano = req.body.nBano;
		const id_certifEner = req.body.id_certifEner;
		const caracteristica = req.body.caracteristica;

		let update: string = ' Inmueble I, Catalogo C, CaractIntrinsecas CI, CaractSecundarias CS';
		let set: string =
			' I.id_tipoInmueble = "' +
			id_tipoInmueble +
			'" AND C.id_modalidad = "' +
			id_modalidad +
			'" AND I.id_ubicacion = "' +
			id_ubicacion +
			'" AND I.superficie = "' +
			superficie +
			'" AND C.precio = "' +
			precio +
			'" AND I.id_tipoVivienda = "' +
			id_tipoVivienda +
			'" AND CI.nHab = "' +
			nHab +
			'" AND CI.nBano = "' +
			nBano +
			'" AND CI.id_certifEner = "' +
			id_certifEner +
			'" AND I.id_estadoInmueble = "' +
			id_estadoInmueble +
			'" AND CS.caracteristica = "' +
			caracteristica +
			'" AND id_imagen = "' +
			id_imagen +
			'" AND breveDescripcion = "' +
			breveDescripcion;
		let were: string =
			' I.id_catastro = C.id_catastro AND I.id_catastro = CI.id_catastro AND I.id_catastro = CS.id_catastro';

		const conn2 = await connect();
		const updateEdit = await conn2.query('UPDATE ' + update + ' SET ' + set + ' WHERE ' + were);

		return res.json(updateEdit);
	}
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
