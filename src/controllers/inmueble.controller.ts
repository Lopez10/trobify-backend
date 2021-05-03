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

	//try {
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
			extras: ext,

			modalidad: modalidad,
			precio: inmueble[0][0].precio,
			descuento: inmueble[0][0].descuento,
			propietario: inmueble[0][0].propietario,
		} || null;
	/*} catch (error) {
		newInmueble = null;
	}*/

	return res.json(newInmueble);
}

export async function existeInmueble(id_catastro: String): Promise<Boolean> {
	let select: string = 'COUNT(id_catastro) as cuenta';
	let from: string = 'Inmueble';
	let where: string = 'id_catastro LIKE ( "' + id_catastro + '")';

	const conn = await connect();
	const consulta = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);

	var contar: number;
	JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
		contar = Number(item.cuenta);
	});

	if (contar == 0) return true;

	return false;
}

export async function registerInmueble(req: Request, res: Response): Promise<Response> {
	if (!existeInmueble(req.body.id_catastro)) {
		return res.json('Este inmueble ya se encuentra registrado en nuestra Base de Datos');
	}
	const id_catastro: string = String(req.body.id_catastro);
	const superficie: number = Number(req.body.superficie);
	const breveDescripcion: string = String(req.body.breveDescripcion);
	const id_tipoInmueble: number = Number(req.body.id_tipoInmueble);
	const id_estadoInmueble: number = Number(req.body.id_estadoInmueble);
	const id_tipoVivienda: number = Number(req.body.id_tipoVivienda);
	const imagen: string[] = req.body.imagen;
	const id_modalidad: number = Number(req.body.id_modalidad);
	const precio: number = Number(req.body.precio);
	const nHab: number = Number(req.body.nHab);
	const nBano: number = Number(req.body.nBano);
	const id_certifEner: number = Number(req.body.id_certifEner);
	const id_caractSecundaria: string[] = req.body.id_caractSecundaria;
	const id_provincia: number = Number(req.body.id_provincia);
	const direccion: string = String(req.body.direccion);
	const longitud: number = Number(req.body.longitud);
	const latitud: number = Number(req.body.latitud);
	const nCocina: number = Number(req.body.nCocina);
	const descuento: number = Number(req.body.descuento);
	const id_usuario: number = Number(req.body.id_usuario);

	const id_imagen = await cargarImagenes(id_catastro, imagen);
	if (id_imagen < 0) {
		return res.json('Error al cargar las imágenes');
	}
	const id_ubicacion = await cargarUbicacion(id_provincia, direccion, longitud, latitud);
	if (id_ubicacion < 0) {
		return res.json('Error al cargar la Ubicacion');
	}

	if (!(req.body.extras === undefined)) {
		if (!cargarExtras(id_catastro, req.body.extras)) {
			return res.json('Error al cargar la información extra');
		}
	}

	//console.log('id_imagen: ' + id_imagen + ', id_ubicacion: ' + id_ubicacion);

	const inmuebleCargado: boolean = Boolean(
		cargarInmueble(
			id_catastro,
			superficie,
			breveDescripcion,
			id_ubicacion,
			id_tipoInmueble,
			id_estadoInmueble,
			id_tipoVivienda,
			id_imagen
		)
	);

	if (!inmuebleCargado) {
		return res.json('Error al cargar el inmueble');
	}

	const catalogoCargado: boolean = Boolean(
		cargarCatalogo(id_catastro, id_modalidad, precio, descuento, id_usuario)
	);
	if (!catalogoCargado) {
		return res.json('Error al cargar el catalogo');
	}

	const caracteristicasIntrinsecasCargado: boolean = Boolean(
		cargarCaractericticasIntrinsecas(id_catastro, nBano, nCocina, id_certifEner, nHab)
	);

	if (!caracteristicasIntrinsecasCargado) {
		return res.json('Error al cargar las características Intrinsecas');
	}

	const contieneCargado: boolean = Boolean(cargarContiene(id_catastro, id_caractSecundaria));

	if (!contieneCargado) {
		return res.json('Error al cargar las características Intrinsecas');
	}

	return res.json('El inmueble se ha registrado satisfactoriamente');
}

async function cargarImagenes(id_catastro: string, imagen: string[]): Promise<number> {
	const conn = await connect();
	try {
		for (var i = 0; i < imagen.length; i++) {
			let insert: string = ' INSERT INTO Imagen (id_catastro, valor)';
			let value: string = 'VALUES ("' + id_catastro + '", "' + imagen[i] + '");';
			await conn.query(insert + ' ' + value);
		}
	} catch {
		return -1;
	}

	const calculoMinimo = await conn.query(
		'SELECT MIN(id_imagen) as minimo FROM Imagen WHERE id_catastro = "' + id_catastro + '";'
	);

	var idMinimo: number;
	JSON.parse(JSON.stringify(calculoMinimo[0])).forEach((item) => {
		idMinimo = item.minimo;
	});

	return idMinimo;
}

async function cargarExtras(id_catastro: String, extras: String[]): Promise<Boolean> {
	const conn = await connect();
	try {
		for (var i = 0; i < extras.length; i++) {
			let insert: string = ' INSERT INTO Imagen (id_catastro, valor)';
			let value: string = 'VALUES ("' + id_catastro + '", "' + extras[i] + '");';
			await conn.query(insert + ' ' + value);
		}
	} catch {
		return false;
	}

	return true;
}

async function cargarUbicacion(
	id_provincia: number,
	direccion: string,
	longitud: number,
	latitud: number
): Promise<number> {
	const conn = await connect();
	try {
		let insert: string = 'INSERT INTO Ubicacion (direccion, prov, latitud, longitud) ';
		let value: string =
			'VALUES ("' + direccion + '", ' + id_provincia + ', ' + latitud + ', ' + longitud + ');';
		await conn.query(insert + ' ' + value);
	} catch {
		return -1;
	}

	const calculoMaximo = await conn.query('Select MAX(id_ubicacion) as maximo from ubicacion;');

	var idMaximo: number;
	JSON.parse(JSON.stringify(calculoMaximo[0])).forEach((item) => {
		idMaximo = Number(item.maximo);
	});

	return idMaximo;
}

async function cargarInmueble(
	id_catastro: string,
	superficie: number,
	breveDescripcion: string,
	id_ubicacion: number,
	id_tipoInmueble: number,
	id_estadoInmueble: number,
	id_tipoVivienda: number,
	id_imagen: number
): Promise<Boolean> {
	const conn = await connect();
	try {
		let insert: string = 'INSERT INTO Inmueble ';
		let value: string =
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
		console.log(insert + ' ' + value);
		await conn.query(insert + ' ' + value);
	} catch {
		return false;
	}
	return true;
}

async function cargarCatalogo(
	id_catastro: string,
	id_modalidad: number,
	precio: number,
	descuento: number,
	id_usuario: number
): Promise<Boolean> {
	const conn = await connect();
	try {
		let insert: string = ' INSERT INTO Catalogo ';
		let value: string =
			'VALUES ("' +
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
		await conn.query(insert + ' ' + value);
	} catch {
		return false;
	}
	return true;
}

async function cargarCaractericticasIntrinsecas(
	id_catastro: string,
	nBano: number,
	nCocina: number,
	id_certifEner: number,
	nHab: number
): Promise<Boolean> {
	const conn = await connect();
	try {
		let insert: string = 'INSERT INTO CaractIntrinsecas ';
		let value: string =
			'VALUES ("' +
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
		await conn.query(insert + ' ' + value);
	} catch {
		return false;
	}
	return true;
}

async function cargarContiene(id_catastro: String, caracteristicas: String[]): Promise<Boolean> {
	const conn = await connect();

	try {
		for (var i = 0; i < caracteristicas.length; i++) {
			let insert: string = 'INSERT INTO Contiene ';
			let value: string = 'VALUES (' + caracteristicas[i] + ', "' + id_catastro + '");';
			await conn.query(insert + ' ' + value);
		}
	} catch {
		return false;
	}

	return true;
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
		const id_ubicacion = conn2.query(
			'SELECT id_ubicacion FROM Inmueble WHERE id_catastro = "' + id_catastro + '";'
		);

		if (!(req.body.extras === undefined)) {
			const extras = req.body.extras;
			let updateextra: string = 'DELETE FROM Extra ';
			let wherextra: string = 'WHERE id_catastro = "' + id_catastro + '";';
			await conn2.query(updateextra + wherextra);
		}

		let deleteContiene: string = 'DELETE FROM Contiene ';
		let whereContiene: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let deleteCaracteristicas: string = 'DELETE FROM CaracteristicaIntrinseca ';
		let whereCaracteristicas: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let deleteCatalogo: string = 'DELETE FROM Catalogo ';
		let whereCatalogo: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let deleteInmueble: string = 'DELETE FROM Inmueble ';
		let whereInmueble: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let deleteImagen: string = 'DELETE FROM Imagen ';
		let whereImagen: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let deleteUbicacion: string = 'DELETE FROM Ubicacion ';
		let whereUbicacion: string = 'WHERE id_ubicacion = "' + id_ubicacion + '";';

		await conn2.query(deleteContiene + whereContiene);
		await conn2.query(deleteCaracteristicas + whereCaracteristicas);
		await conn2.query(deleteCatalogo + whereCatalogo);
		await conn2.query(deleteInmueble + whereInmueble);
		await conn2.query(deleteImagen + whereImagen);
		await conn2.query(deleteUbicacion + whereUbicacion);

		return res.json('Inmueble editado');
	}
}
/* anterior editInmuebe

		for (var i = 0; i < imagenes.length; i++){
			let insertintoImagen: string = 'INSERT INTO Imagen (id_catastro, valor)';
			let valuesImagen: string = 'Values ("'+
										id_catastro + 
										'", "' +
										imagenes[i] +
										'";';
			await conn2.query(insertintoImagen + valuesImagen);
		}

		const consultaimagen = await conn2.query('SELECT MIN(Im.id_imagen) as minimo FROM Im.Imagen, I.Inmueble WHERE I.id_catastro = Im.id_catastro AND I.id_catastro = "' + id_catastro + '";');

		console.log(consultaimagen[0]);
        var minimo: number;
        JSON.parse(JSON.stringify(consultaimagen[0])).forEach((item) => {
            minimo = item.minimo;
        });

        const id_imagen = minimo;
        console.log(minimo);

		let update: string = 'Inmueble I, CaractIntrinsecas CI';
		let set: string =
			' I.id_tipoInmueble = "' +
			id_tipoInmueble +
			'" AND I.superficie = "' +
			superficie +
			'" AND I.id_tipoVivienda = "' +
			id_tipoVivienda +
			'" AND CI.nHab = "' +
			nHab +
			'" AND CI.nBano = "' +
			nBano +
			'" AND CI.nCocina = "' +
			nCocina +
			'" AND CI.id_certifEner = "' +
			id_certifEner +
			'" AND I.id_estadoInmueble = "' +
			id_estadoInmueble +
			'" AND I.id_imagen = "' +
			id_imagen +
			'" AND I.breveDescripcion = "' +
			breveDescripcion;
		let were: string =
			'I.id_catastro = "'+ id_catastro + '" AND I.id_catastro = CI.id_catastro;';

		let delet: string = 'DELETE FROM Catalogo C, Contiene CO ';
		let were2: string = 'WHERE C.id_catastro = CO.id_catastro AND C.id_catastro = "'+ id_catastro + '" AND C.id_modalidad = "'+ id_modalidad + ';';

		let inse: string = 'INSERT INTO Catalogo ';
		let values: string = 'VALUES ("'+
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

		let inse2: string = ' INSERT INTO Contiene CO';
		let values2: string = ' VALUES (' +
							  caracteristica +
							  ', ' +
							  catast +
							  ');';

		let updateubi: string = 'UPDATE Ubicacion '
		let setubi: string = 'SET direccion = "' +
								direccion +
								'" AND prov = "' +
								id_provincia +
								'" AND latitud = "' + 
								latitud +
								'" AND longitud = "' +
								longitud +
								'";';

		console.log(updateubi + setubi);
		await conn2.query(delet + were2);
		await conn2.query(updateubi + setubi);


		await conn2.query('UPDATE ' + update + ' SET' + set + ' WHERE ' + were);

		await conn2.query(inse + values);
		for (var i = 0; i < id_caractSecundaria.toString().length; i++){
			let inse2: string = 'UPDATE Contiene ';
			let values2: string = 'VALUES ("' +
								  id_caractSecundaria.toString().split(" ") +
								  '", "' +
								  id_catastro +
								  '");';
			await conn2.query(inse2 + values2);
		}
		*/

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
