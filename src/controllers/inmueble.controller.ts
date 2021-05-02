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
		'cat.precio, cat.descuento, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, inm.superficie, car.nHab, car.nBano, car.nCocina, cer.certifEner, ubi.direccion, ubi.latitud, ubi.longitud, inm.breveDescripcion, ubi.prov, cat.id_usuario as propietario';
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
			nHab: inmueble[0][0].nHab,
			nBanos: inmueble[0][0].nBano,
			nCocinas: inmueble[0][0].nCocina,
			caracteristicas: caract,
			extras: ext,

			modalidad: modalidad,
			precio: inmueble[0][0].precio,
			descuento: inmueble[0][0].descuento,
			propietario: inmueble[0][0].propietario,
		};
	} catch (error) {
		newInmueble = null;
	}

	return res.json(newInmueble);
}

export async function registerInmueble(req: Request, res: Response): Promise<Response> {
	const id_catastro = req.body.id_catastro;

	let select: string = 'I.id_catastro';
	let from: string = 'Inmueble I';
	let where: string = '"' + id_catastro + '" = I.id_catastro;';

	const conn = await connect();
	const consultaReg = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
	const reggy = consultaReg[0].toString();
	console.log(reggy);
	if (!(reggy == "")) {
		return res.json('Este inmueble ya existe.');
	} else {
		const superficie = req.body.superficie;
		const breveDescripcion = req.body.breveDescripcion;
		const id_tipoInmueble = req.body.id_tipoInmueble;
		const id_estadoInmueble = req.body.id_estadoInmueble;
		const id_tipoVivienda = req.body.id_tipoVivienda;
		const imagen = req.body.imagen;
		const id_modalidad = req.body.id_modalidad;
		const precio = req.body.precio;
		const nHab = req.body.nHab;
		const nBano = req.body.nBano;
		const id_certifEner = req.body.id_certifEner;
		const id_caractSecundaria = req.body.id_caractSecundaria;
		const id_provincia = req.body.id_provincia;
		const direccion = req.body.direccion;
		const longitud = req.body.longitud;
		const latitud = req.body.latitud;
		const nCocina = req.body.nCocina;
		const descuento = req.body.descuento;
		const id_usuario = req.body.id_usuario;

		const conn2 = await connect();

		if(!(req.body.extras === undefined)){
			const extras = req.body.extras;
			let insertintoextra: string = 'INSERT INTO Extra (id_catastro, valor) '
			let valuesextra: string = 'VALUES ("' +
									  id_catastro +
									  '", "' +
									  extras +
									  '");';
			conn2.query(insertintoextra + valuesextra);
		}

		let insertintoubi: string = 'INSERT INTO Ubicacion (direccion, prov, latitud, longitud) '
		let valuesubi: string = 'VALUES ("' +
								direccion +
								'", ' +
								id_provincia +
								', ' + 
								latitud +
								', ' +
								longitud +
								');';
		
		console.log(insertintoubi + valuesubi);
		conn2.query(insertintoubi + valuesubi);

		//tipoInmueble: inmueble[0][0].tipoInmueble
		const consultaubicacion = conn2.query('Select MAX(id_ubicacion) from ubicacion;');
/*
		consultaubicacion.then(val => {
			let x = val[0];
			console.log(x[0][0]);
		});
*/
		const id_ubicacion = consultaubicacion[0];
		//console.log(id_ubicacion);

		const imagenes =imagen.toString().split(" ");

		for (var i = 0; i < imagenes.length; i++){
			let insertImagen: string = ' INSERT INTO Imagen (id_catastro, valor)';
			let valImagen: string = 'VALUES ("' +
									id_catastro +
									'", "' +
									imagenes[i] +
									'");';
			conn2.query(insertImagen + valImagen);
		}

		//const consultaimagen = conn2.query('SELECT MIN(Im.id_imagen) FROM Im.Imagen, I.Inmueble WHERE I.id_catastro = Im.id_catastro AND I.id_catastro = "' + id_catastro + '";');
		const id_imagen = 34;//consultaimagen[0];

		let insertinto: string = 'INSERT INTO Inmueble ';
		let values: string =
			'VALUES ("' +
			id_catastro +
			'", ' +
			superficie +
			', "' +
			breveDescripcion +
			'", ' +
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

		let insertinto2: string = ' INSERT INTO Catalogo ';
		let val2: string = 'VALUES ("' +
							id_catastro +
							'", ' +
							id_modalidad +
							', ' +
							precio +
							', ' +
							descuento +
							', 0,' +
							id_usuario +
							');';
/*
		let insertinto3: string = ' INSERT INTO Contiene ';					
		let val3: string = 'VALUES ('+
						   caracteristica + 
						   ', ' +
						   catast + 
						   ');';
*/
		let insertinto4: string = 'INSERT INTO CaractIntrinsencas ';
		let val4: string = 'VALUES ("' +
							id_catastro +
							'", ' +
							nBano +
							', ' +
							nCocina +
							', ' +
							id_certifEner +
							', ' +
							nHab +
							');';

		console.log(insertinto + values);
		//conn2.query(insertinto + values);
		conn2.query(insertinto2 + val2);
		const caracteristicas = id_caractSecundaria.toString().split(" ");
		for (var i = 0; i < caracteristicas.length; i++){
			let insertinto3: string = ' INSERT INTO Contiene ';					
			let val3: string = 'VALUES ("'+
								caracteristicas[i] + 
							   '", "' +
							   id_catastro + 
							   '");';
			conn2.query(insertinto3 + val3);
		}
		conn2.query(insertinto4 + val4);

		return res.json('Inmueble creado');
	}
}

export async function editInmueble(req: Request, res: Response): Promise<Response> {
	const id_catastro = req.body.id_catastro;

	let select: string = 'I.id_catastro';
	let from: string = 'Inmueble I';
	let where: string = '"' + id_catastro + '" = I.id_catastro;';

	const conn = await connect();
	const consultaEdit = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
	const eddy = consultaEdit[0].toString();
	if (eddy == ' ') {
		return res.json('Este inmueble no existe.');
	} else {
		const superficie = req.body.superficie;
		const breveDescripcion = req.body.breveDescripcion;
		const id_tipoInmueble = req.body.id_tipoInmueble;
		const id_estadoInmueble = req.body.id_estadoInmueble;
		const id_tipoVivienda = req.body.id_tipoVivienda;
		const imagen = req.body.imagen;
		const id_modalidad = req.body.id_modalidad;
		const precio = req.body.precio;
		const nHab = req.body.nHab;
		const nBano = req.body.nBano;
		const id_certifEner = req.body.id_certifEner;
		const id_caractSecundaria = req.body.id_caractSecundaria;
		const id_provincia = req.body.id_provincia;
		const direccion = req.body.direccion;
		const longitud = req.body.longitud;
		const latitud = req.body.latitud;
		const nCocina = req.body.nCocina;
		const descuento = req.body.descuento;
		const id_usuario = req.body.id_usuario;

		const conn2 = await connect();

		if(!(req.body.extras === undefined)){
			const extras = req.body.extras;
			let updateextra: string = 'UPDATE Extra ';
			let setextra: string = 'SET valor = "' +
									  extras +
									  '";';
			let wherextra: string = 'WHERE id_catastro = "' + id_catastro + '";';
			conn2.query(updateextra + setextra + wherextra);
		}

		let insertintoubi: string = 'UPDATE Ubicacion (direccion, prov, latitud, longitud) '
		let valuesubi: string = 'SET direccion = "' +
								direccion +
								'" AND id_provincia = "' +
								id_provincia +
								'" AND latitud = "' + 
								latitud +
								'" AND longitud = "' +
								longitud 
								'";';
		
		conn2.query(insertintoubi + valuesubi);

		const id_ubicacion = conn2.query('SELECT MAX(id_ubicacion) from Ubicacion ');

		let update: string = ' Inmueble I, CaractIntrinsecas CI';
		let set: string =
			' I.id_tipoInmueble = "' +
			id_tipoInmueble +
			'" AND I.id_ubicacion = "' +
			id_ubicacion +
			'" AND I.superficie = "' +
			superficie +
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
			'" AND I.id_imagen = "' +
			imagen +
			'" AND I.breveDescripcion = "' +
			breveDescripcion;
		let were: string =
			' I.id_catastro = "'+ id_catastro + '" AND I.id_catastro = CI.id_catastro;';

		let delet: string = ' DELETE FROM Catalogo C, Contiene CO ';
		let were2: string = ' WHERE C.id_catastro = CO.id_catastro AND C.id_catastro = "'+ id_catastro + '" AND C.id_modalidad = "'+ id_modalidad + ';';

		let inse: string = ' INSERT INTO Catalogo C';
		let values: string = ' VALUES ("'+
							 id_catastro +
							 '", ' +
							 id_modalidad +
							 ', ' +
							 precio +
							 ', ' +
							 descuento +
							 ', 0, ' +
							 id_usuario +
							 ');';
/*
		let inse2: string = ' INSERT INTO Contiene CO';
		let values2: string = ' VALUES (' +
							  caracteristica +
							  ', ' +
							  catast +
							  ');';
*/
		conn2.query('UPDATE ' + update + ' SET ' + set + ' WHERE ' + were);
		conn2.query(delet + were2);
		conn2.query(inse + values);
		for (var i = 0; i < id_caractSecundaria.toString().length; i++){
			let inse2: string = ' INSERT INTO Contiene CO';
			let values2: string = ' VALUES (' +
								  id_caractSecundaria.toString().split(" ") +
								  ', ' +
								  id_catastro +
								  ');';
			conn2.query(inse2 + values2);
		}
		//conn2.query(inse2 + values2);

		return res.json('Inmueble editado');
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
