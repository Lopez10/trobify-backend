import { Request, Response } from 'express';
import { connect } from '../database';
import { Inmueble } from '../interface/inmueble.interface';

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

	return res.json(newInmueble);
}

async function existeInmueble(id_catastro: string): Promise<Boolean> {
	let tabla = ['Imagen', 'Inmueble', 'catalogo', 'caractintrinsecas', 'contiene'];
	for(var i = 0; i < tabla.length; i++){
		if((await existeCatastro(tabla[i], id_catastro)) > 0) return true;
		return false;
	} 
}

export async function existeCatastro(from: string, id_catastro: string): Promise<number> {
	let select: string = 'COUNT(id_catastro) as cuenta';
	let where: string = 'id_catastro LIKE ( "' + id_catastro + '")';
	const conn = await connect();
	const consulta = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
	var contar: number = 0;
	JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
		contar = item.cuenta;
	});
	return contar;
}

export async function regInmueble(req: Request): Promise<string> {
	const id_catastro: string = String(req.body.id_catastro);
	if (await existeInmueble(id_catastro)) {
		return 'Este inmueble ya se encuentra registrado en nuestra Base de Datos';
	}
	const superficie: number = Number(req.body.superficie);
	const breveDescripcion: string = String(req.body.breveDescripcion);
	const id_tipoInmueble: number = Number(req.body.id_tipoInmueble);
	const id_estadoInmueble: number = Number(req.body.id_estadoInmueble);
	const id_tipoVivienda: number = Number(req.body.id_tipoVivienda);
	const imagen: string[] = req.body.imagen;
	const id_modalidad: string[] = req.body.id_modalidad;
	const precio: string[] = req.body.precio;
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
		return 'Error al cargar las imágenes';
	}

	const id_ubicacion = await cargarUbicacion(id_provincia, direccion, longitud, latitud);
	if (id_ubicacion < 0) {
		return 'Error al cargar la Ubicacion';
	}

	const inmuebleCargado: boolean = Boolean(
		await cargarInmueble(
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
		return 'Error al cargar el inmueble';
	}

	const caracteristicasIntrinsecasCargado: boolean = Boolean(
		await cargarCaractericticasIntrinsecas(id_catastro, nBano, nCocina, id_certifEner, nHab)
	);
	if (!caracteristicasIntrinsecasCargado) {
		return 'Error al cargar las características Intrinsecas';
	}

	const contieneCargado: boolean = Boolean(await cargarContiene(id_catastro, id_caractSecundaria));
	if (!contieneCargado) {
		return 'Error al cargar las características Secundarias';
	}

	if (!(req.body.extras === undefined)) {
		if (!cargarExtras(id_catastro, req.body.extras)) {
			return 'Error al cargar la información extra';
		}
	}

	const catalogoCargado: boolean = Boolean(
		await cargarCatalogo(id_catastro, id_modalidad, precio, descuento, id_usuario)
	);
	if (!catalogoCargado) {
		return 'Error al cargar el catalogo';
	}
}

export async function registrarInmueble(req: Request, res: Response): Promise<Response> {
	let b = regInmueble(req);
	return res.json(b);
}

async function cargarImagenes(id_catastro: string, imagen: string[]): Promise<number> {
	const conn = await connect();
	try {
		let insert: string = ' INSERT INTO Imagen (id_catastro, valor)';
		for (var i = 0; i < imagen.length; i++) {
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
		await conn.query(insert + ' ' + value);
	} catch {
		return false;
	}
	return true;
}

async function cargarCatalogo(
	id_catastro: string,
	id_modalidad: string[],
	precio: string[],
	descuento: number,
	id_usuario: number
): Promise<Boolean> {
	const conn = await connect();
	const fecha: Date = new Date();

	const hoy: string = '' + fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay();
	try {
		let insert: string = 'INSERT INTO Catalogo ';
		for (var i = 0; i < id_modalidad.length; i++) {
			let value: string =
				'VALUES ("' +
				id_catastro +
				'", ' +
				parseInt(id_modalidad[i]) +
				', ' +
				parseInt(precio[i]) +
				', ' +
				descuento +
				', "' +
				hoy +
				'", ' +
				id_usuario +
				');';
			await conn.query(insert + ' ' + value);
		}
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

async function cargarContiene(id_catastro: string, caracteristicas: string[]): Promise<Boolean> {
	const conn = await connect();
	try {
		for (var i = 0; i < caracteristicas.length; i++) {
			let insert: string = 'INSERT INTO Contiene ';
			let value: string = 'VALUES (' + parseInt(caracteristicas[i]) + ', "' + id_catastro + '");';
			await conn.query(insert + ' ' + value);
		}
	} catch {
		return false;
	}
	return true;
}

async function eliminarSegunId(
	tabla: string,
	columna: string,
	parametro: string
): Promise<boolean> {
	let consulta: string = 'DELETE FROM ' + tabla + ' WHERE ' + columna + ' = "' + parametro + '";';
	try {
		const conn = await connect();
		await conn.query(consulta);
	} catch {
		//return false;
	}

	return true;
}

export async function deleteInmueble(req:Request, roll: Boolean): Promise<string> {
	const id_catastro: string = String(req.params.id_catastro);

	const conn = await connect();
	const ubicacion = await conn.query(
		'SELECT id_ubicacion as ubicacion FROM Inmueble WHERE id_catastro = "' + id_catastro + '";'
	);

	var id_ubicacion: number;
	JSON.parse(JSON.stringify(ubicacion[0])).forEach((item) => {
		id_ubicacion = item.ubicacion;
	});
	if (!(await existeInmueble(id_catastro))) {
		return 'Este inmueble NO se encuentra en nuestra Base de Datos';
	}

	let mensajeFin: string = 'Los datos se han eliminado correctamente';
	let fallo: boolean;

	let tablasALimpiar: string[] = [
		'Contiene',
		'CaractIntrinsecas',
		'Catalogo',
		'Inmueble',
		'Imagen',
	];
	for (let i = 0; i < tablasALimpiar.length; i++) {
		fallo = await eliminarSegunId(tablasALimpiar[i], 'id_catastro', id_catastro);
		if (!fallo)
			mensajeFin = 'No se puede eliminar ' + id_catastro + ' de la tabla ' + tablasALimpiar[i];
	}
	fallo = await eliminarSegunId('Ubicacion', 'id_ubicacion', '' + id_ubicacion);
	if (!fallo) mensajeFin = 'No se puede eliminar ' + id_ubicacion + ' de la tabla ' + 'Ubicacion';

	if(roll) {regInmueble(req);}
	return 'Este inmueble ha sido eliminado';
}

export async function eliminarInmueble(req: Request, res: Response): Promise<Response> {
	let a = deleteInmueble(req, false);
	return res.json(a);
}

export async function modificarInmueble(req: Request, res: Response): Promise<Response> {
	deleteInmueble(req, true);
	return res.json('Tus muertos, so desgraciado');
}