import { Request, Response } from 'express';
import { Singleton } from '../../Singleton';
import { Catastro } from '../catastro';

export class Inmueble {
	static BD: Singleton;
	constructor() {
		Inmueble.BD = Singleton.getInstance();
	}

	static async existeInmueble(id_catastro: string): Promise<Boolean> {
		let tabla = ['Imagen', 'Inmueble', 'catalogo', 'caractintrinsecas', 'contiene'];
		for (var i = 0; i < tabla.length; i++) {
			if ((await Inmueble.existeCatastro(tabla[i], id_catastro)) > 0) return true;
			return false;
		}
	}

	static async existeCatastro(from: string, id_catastro: string): Promise<number> {
		let select: string = 'COUNT(id_catastro) as cuenta';
		let where: string = 'id_catastro LIKE ( "' + id_catastro + '")';
		const consulta = await Inmueble.BD.accesoBD(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where
		);
		var contar: number = 0;
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			contar = item.cuenta;
		});
		return contar;
	}

	static async regInmueble(req: Request): Promise<string> {
		const id_catastro: string = String(req.body.id_catastro);
		if (await Inmueble.existeInmueble(id_catastro)) {
			return 'Este inmueble ya se encuentra registrado en nuestra Base de Datos';
		}
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
		const nCocina: number = Number(req.body.nCocina);
		const descuento: number = Number(req.body.descuento);
		const mail: string = req.body.mail;
		const publicado: number = Number(req.body.publicado);

		const id_imagen = await Inmueble.cargarImagenes(id_catastro, imagen);

		if (id_imagen < 0) {
			return 'Error al cargar las imágenes';
		}

		let consultaCatastro: Catastro = await Catastro.create(id_catastro);

		const id_ubicacion = await Inmueble.cargarUbicacion(consultaCatastro);
		if (id_ubicacion < 0) {
			return 'Error al cargar la Ubicacion';
		}

		const inmuebleCargado: boolean = Boolean(
			await Inmueble.cargarInmueble(
				id_catastro,
				consultaCatastro.superficie,
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
			await Inmueble.cargarCaractericticasIntrinsecas(
				id_catastro,
				nBano,
				nCocina,
				id_certifEner,
				nHab
			)
		);
		if (!caracteristicasIntrinsecasCargado) {
			return 'Error al cargar las características Intrinsecas';
		}

		const contieneCargado: boolean = Boolean(
			await Inmueble.cargarContiene(id_catastro, id_caractSecundaria)
		);
		if (!contieneCargado) {
			return 'Error al cargar las características Secundarias';
		}

		const catalogoCargado: boolean = Boolean(
			await Inmueble.cargarCatalogo(id_catastro, id_modalidad, precio, descuento, mail, publicado)
		);
		if (!catalogoCargado) {
			return 'Error al cargar el catalogo';
		}
	}

	static async cargarImagenes(id_catastro: string, imagen: string[]): Promise<number> {
		try {
			let insert: string = ' INSERT INTO Imagen (id_catastro, valor)';
			for (var i = 0; i < imagen.length; i++) {
				let value: string = 'VALUES ("' + id_catastro + '", "' + imagen[i] + '");';
				await Inmueble.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return -1;
		}

		const calculoMinimo = await Inmueble.BD.accesoBD(
			'SELECT MIN(id_imagen) as minimo FROM Imagen WHERE id_catastro = "' + id_catastro + '";'
		);
		var idMinimo: number;
		JSON.parse(JSON.stringify(calculoMinimo[0])).forEach((item) => {
			idMinimo = item.minimo;
		});

		return idMinimo;
	}

	static async cargarUbicacion(catastro: Catastro): Promise<number> {
		try {
			let insert: string =
				'INSERT INTO Ubicacion (direccion, codPostal, localidad, prov, latitud, longitud) ';
			let value: string =
				'VALUES ("' +
				catastro.direccion +
				'", ' +
				catastro.codigoPostal +
				', "' +
				catastro.localidad +
				'", ' +
				catastro.codigoProvincia +
				', ' +
				catastro.coordenada.yLatitud +
				', ' +
				catastro.coordenada.xLongitud +
				');';
			await Inmueble.BD.accesoBD(insert + ' ' + value);
		} catch {
			return -1;
		}

		const calculoMaximo = await Inmueble.BD.accesoBD(
			'Select MAX(id_ubicacion) as maximo from ubicacion;'
		);

		var idMaximo: number;
		JSON.parse(JSON.stringify(calculoMaximo[0])).forEach((item) => {
			idMaximo = Number(item.maximo);
		});
		return idMaximo;
	}

	static async cargarInmueble(
		id_catastro: string,
		superficie: number,
		breveDescripcion: string,
		id_ubicacion: number,
		id_tipoInmueble: number,
		id_estadoInmueble: number,
		id_tipoVivienda: number,
		id_imagen: number
	): Promise<Boolean> {
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
		await Inmueble.BD.accesoBD(insert + ' ' + value);
		return true;
	}

	static async cargarCatalogo(
		id_catastro: string,
		id_modalidad: string[],
		precio: string[],
		descuento: number,
		mail: string,
		publicado: number
	): Promise<Boolean> {
		const fecha: Date = new Date();

		let id_usuario = await this.obtenerUsuario(mail);

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
					', ' +
					publicado +
					');';
				await Inmueble.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return false;
		}
		return true;
	}

	static async cargarCaractericticasIntrinsecas(
		id_catastro: string,
		nBano: number,
		nCocina: number,
		id_certifEner: number,
		nHab: number
	): Promise<Boolean> {
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
			await Inmueble.BD.accesoBD(insert + ' ' + value);
		} catch {
			return false;
		}
		return true;
	}

	static async cargarContiene(id_catastro: string, caracteristicas: string[]): Promise<Boolean> {
		try {
			for (var i = 0; i < caracteristicas.length; i++) {
				let insert: string = 'INSERT INTO Contiene ';
				let value: string = 'VALUES (' + parseInt(caracteristicas[i]) + ', "' + id_catastro + '");';
				await Inmueble.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return false;
		}

		return true;
	}

	static async obtenerUsuario(mail: string): Promise<string> {
		let select: string = 'SELECT id_usuario as user ';
		let from: string = 'FROM Usuario ';
		let where: string = 'WHERE mail = "' + mail + '";';

		let id_usuario = await Inmueble.BD.accesoBD(select + from + where);

		var User: string;
		JSON.parse(JSON.stringify(id_usuario[0])).forEach((item) => {
			User = item.user;
		});

		return User;
	}
}
