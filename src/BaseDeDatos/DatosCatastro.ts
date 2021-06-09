import { coordenada, Consultas } from '../interface/baseDatos.interface';
import { Consulta } from './Consulta';

export class DatosCatastro implements Consultas {
	private id_catastro: string; //
	private direccion: string;
	private localidad: string; //
	private codPostal: number;
	private id_provincia: number;
	private superficie: number;
	private coordenada: coordenada; //

	constructor(
		id_catastro: string,
		direccion: string,
		localidad: string,
		codPostal: number,
		id_provincia: number,
		superficie: number,
		latitud: number,
		longitud: number
	) {
		this.id_catastro = id_catastro;
		this.direccion = direccion;
		this.localidad = localidad;
		this.codPostal = codPostal;
		this.id_provincia = id_provincia;
		this.superficie = superficie;
		this.coordenada = {
			yLatitud: latitud,
			xLongitud: longitud,
		};
	}

	async getDatos(id_catastro: string): Promise<DatosCatastro> {
		return DatosCatastro.getDatos(id_catastro);
	}

	static async getDatos(id_catastro: string): Promise<DatosCatastro> {
		let select: string =
			'direccion, codPostal, localidad, id_provincia, superficie, latitud, longitud';
		let from: string = 'datoscatastro';
		let where: string = 'id_catastro LIKE "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where
		);

		let catastro: DatosCatastro = new DatosCatastro(
			id_catastro,
			consulta[0][0].direccion,
			consulta[0][0].localidad,
			consulta[0][0].codPostal,
			consulta[0][0].id_provincia,
			consulta[0][0].superficie,
			consulta[0][0].latitud,
			consulta[0][0].longitud
		);

		return catastro;
	}

	async insertDatos(): Promise<string> {
		try {
			let insert: string =
				'INSERT INTO DatosCatastro(id_catastro, direccion, codPostal, localidad, id_provincia, superficie, latitud, longitud) ';
			let values: string =
				'VALUES ("' +
				this.id_catastro +
				'", "' +
				this.direccion +
				'", "' +
				this.codPostal +
				'", "' +
				this.localidad +
				'", ' +
				this.id_provincia +
				', ' +
				this.superficie +
				', ' +
				this.coordenada.yLatitud +
				', ' +
				this.coordenada.xLongitud +
				');';
			await Consulta.getConsulta(insert + values);
		} catch {
			return 'ERROR al insertar los datos';
		}
		return 'Los datos se han insertado correctamente';
	}

	async updateDatos(): Promise<string> {
		try {
			let update: string = 'UPDATE DatosCatastro ';
			let set: string =
				'SET id_catastro ="' +
				this.id_catastro +
				'", direccion ="' +
				this.direccion +
				'", codPostal = "' +
				this.codPostal +
				'", localidad = "' +
				this.localidad +
				'", id_provincia = ' +
				this.id_provincia +
				', superficie = ' +
				this.superficie +
				', latitud = ' +
				this.coordenada.yLatitud;
			', superficie = ' + this.coordenada.xLongitud + ';';
			let where: string = 'WHERE id_catastro ="' + this.id_catastro + ';';
			await Consulta.getConsulta(update + set + where);
		} catch {
			return 'ERROR los datos no han podido ser actualizados';
		}
		return 'los datos han sido actualizados satisfactoriamente';
	}

	async deleteDatos(id_catastro: string): Promise<string> {
		try {
			let delet: string = 'DELETE FROM DatosCatastro ';
			let where: string = 'WHERE id_catastro ="' + id_catastro + '";';

			let consulta: string = delet + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR Ha sido imposible eliminar estos datos';
		}
		return 'Los datos han sido eliminados';
	}

	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla('datoscatastro', 'id_catastro', this.id_catastro);
	}

	setId_catastro(id_catastro: string) {
		this.id_catastro = id_catastro;
	}
	setDireccion(direccion: string) {
		this.direccion = direccion;
	}
	setLocalidad(localidad: string) {
		this.localidad = localidad;
	}
	setCodPostal(codPostal: number) {
		this.codPostal = codPostal;
	}
	setId_provincia(id_provincia: number) {
		this.id_provincia = id_provincia;
	}
	setSuperficie(superficie: number) {
		this.superficie = superficie;
	}
	setCoordenada(latitud: number, longitud: number) {
		this.coordenada.xLongitud = longitud;
		this.coordenada.yLatitud = latitud;
	}

	getId_catastro(): string {
		return this.id_catastro;
	}
	getDireccion(): string {
		return this.direccion;
	}
	getLocalidad(): string {
		return this.localidad;
	}
	getCodPostal(): number {
		return this.codPostal;
	}
	getDireccionCompleta(): string {
		return this.getDireccion() + ' (' + this.getCodPostal() + ' ' + this.getLocalidad() + ')';
	}
	getId_provincia(): number {
		return this.id_provincia;
	}
	getSuperficie(): number {
		return this.superficie;
	}
	getLatitud(): number {
		return this.coordenada.yLatitud;
	}
	getLongitud(): number {
		return this.coordenada.xLongitud;
	}

	validarReferenciaCatastral(referenciaCatastral: string): boolean {
		const pesoPosicion: number[] = [13, 15, 12, 5, 4, 17, 9, 21, 3, 7, 1];
		const letraDc: string = 'MQWERTYUIOPASDFGHJKLBZX';

		if (referenciaCatastral === null || referenciaCatastral.length !== 20) {
			return false;
		}
		referenciaCatastral = referenciaCatastral.toUpperCase();

		var cadenaPrimerDC: string = (
			referenciaCatastral.substring(0, 7) + referenciaCatastral.substring(14, 18)
		).toUpperCase();

		var cadenaSegundoDC: string = (
			referenciaCatastral.substring(7, 14) + referenciaCatastral.substring(14, 18)
		).toUpperCase();

		var cadenasDC: string[] = [cadenaPrimerDC, cadenaSegundoDC];
		var dcCalculado: string = '';

		cadenasDC.forEach(function (cadena) {
			let sumaDigitos: number = 0;
			cadena.split('').forEach(function (caracter: string, posicion: number) {
				var valorCaracter: number = parseInt(caracter);

				if (caracter >= 'A' && caracter <= 'N') {
					valorCaracter = caracter.charCodeAt(0) - 64;
				} else if (caracter === 'Ñ') {
					valorCaracter = 15;
				} else if (caracter > 'N') {
					valorCaracter = caracter.charCodeAt(0) - 63;
				}

				sumaDigitos = (sumaDigitos + valorCaracter * pesoPosicion[posicion]) % 23;
			});

			dcCalculado += letraDc.charAt(sumaDigitos);
		});

		if (dcCalculado !== referenciaCatastral.substring(18, 20)) {
			return false;
		}
		return true;
	}
}
