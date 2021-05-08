import { Request, Response } from 'express';
import { Singleton } from '../../Singleton';

export class Inmueble {
	BD: Singleton;
	constructor() {
		this.BD = Singleton.getInstance();
	}

	async existeInmueble(id_catastro: string): Promise<Boolean> {
		let tabla = ['Imagen', 'Inmueble', 'catalogo', 'caractintrinsecas', 'contiene'];
		for (var i = 0; i < tabla.length; i++) {
			if ((await this.existeCatastro(tabla[i], id_catastro)) > 0) return true;
			return false;
		}
	}

	async existeCatastro(from: string, id_catastro: string): Promise<number> {
		let select: string = 'COUNT(id_catastro) as cuenta';
		let where: string = 'id_catastro LIKE ( "' + id_catastro + '")';
		const consulta = this.BD.accesoBD('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
		var contar: number = 0;
		JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
			contar = item.cuenta;
		});
		return contar;
	}

	async regInmueble(req: Request): Promise<string> {
		const id_catastro: string = String(req.body.id_catastro);
		if (await this.existeInmueble(id_catastro)) {
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

		const id_imagen = await this.cargarImagenes(id_catastro, imagen);
		if (id_imagen < 0) {
			return 'Error al cargar las imágenes';
		}

		const id_ubicacion = await this.cargarUbicacion(id_provincia, direccion, longitud, latitud);
		if (id_ubicacion < 0) {
			return 'Error al cargar la Ubicacion';
		}

		const inmuebleCargado: boolean = Boolean(
			await this.cargarInmueble(
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
			await this.cargarCaractericticasIntrinsecas(id_catastro, nBano, nCocina, id_certifEner, nHab)
		);
		if (!caracteristicasIntrinsecasCargado) {
			return 'Error al cargar las características Intrinsecas';
		}

		const contieneCargado: boolean = Boolean(
			await this.cargarContiene(id_catastro, id_caractSecundaria)
		);
		if (!contieneCargado) {
			return 'Error al cargar las características Secundarias';
		}

		if (!(req.body.extras === undefined)) {
			if (!this.cargarExtras(id_catastro, req.body.extras)) {
				return 'Error al cargar la información extra';
			}
		}

		const catalogoCargado: boolean = Boolean(
			await this.cargarCatalogo(id_catastro, id_modalidad, precio, descuento, id_usuario)
		);
		if (!catalogoCargado) {
			return 'Error al cargar el catalogo';
		}
	}

	async cargarImagenes(id_catastro: string, imagen: string[]): Promise<number> {
		try {
			let insert: string = ' INSERT INTO Imagen (id_catastro, valor)';
			for (var i = 0; i < imagen.length; i++) {
				let value: string = 'VALUES ("' + id_catastro + '", "' + imagen[i] + '");';
				await this.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return -1;
		}

		const calculoMinimo = this.BD.accesoBD(
			'SELECT MIN(id_imagen) as minimo FROM Imagen WHERE id_catastro = "' + id_catastro + '";'
		);

		var idMinimo: number;
		JSON.parse(JSON.stringify(calculoMinimo[0])).forEach((item) => {
			idMinimo = item.minimo;
		});

		return idMinimo;
	}

	async cargarExtras(id_catastro: String, extras: String[]): Promise<Boolean> {
		try {
			for (var i = 0; i < extras.length; i++) {
				let insert: string = ' INSERT INTO Imagen (id_catastro, valor)';
				let value: string = 'VALUES ("' + id_catastro + '", "' + extras[i] + '");';
				this.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return false;
		}

		return true;
	}

	async cargarUbicacion(
		id_provincia: number,
		direccion: string,
		longitud: number,
		latitud: number
	): Promise<number> {
		try {
			let insert: string = 'INSERT INTO Ubicacion (direccion, prov, latitud, longitud) ';
			let value: string =
				'VALUES ("' + direccion + '", ' + id_provincia + ', ' + latitud + ', ' + longitud + ');';
			this.BD.accesoBD(insert + ' ' + value);
		} catch {
			return -1;
		}

		const calculoMaximo = this.BD.accesoBD('Select MAX(id_ubicacion) as maximo from ubicacion;');

		var idMaximo: number;
		JSON.parse(JSON.stringify(calculoMaximo[0])).forEach((item) => {
			idMaximo = Number(item.maximo);
		});

		return idMaximo;
	}

	async cargarInmueble(
		id_catastro: string,
		superficie: number,
		breveDescripcion: string,
		id_ubicacion: number,
		id_tipoInmueble: number,
		id_estadoInmueble: number,
		id_tipoVivienda: number,
		id_imagen: number
	): Promise<Boolean> {
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
			this.BD.accesoBD(insert + ' ' + value);
		} catch {
			return false;
		}
		return true;
	}

	async cargarCatalogo(
		id_catastro: string,
		id_modalidad: string[],
		precio: string[],
		descuento: number,
		id_usuario: number
	): Promise<Boolean> {
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
				this.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return false;
		}
		return true;
	}

	async cargarCaractericticasIntrinsecas(
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
			this.BD.accesoBD(insert + ' ' + value);
		} catch {
			return false;
		}
		return true;
	}

	async cargarContiene(id_catastro: string, caracteristicas: string[]): Promise<Boolean> {
		try {
			for (var i = 0; i < caracteristicas.length; i++) {
				let insert: string = 'INSERT INTO Contiene ';
				let value: string = 'VALUES (' + parseInt(caracteristicas[i]) + ', "' + id_catastro + '");';
				this.BD.accesoBD(insert + ' ' + value);
			}
		} catch {
			return false;
		}

		return true;
	}
}
