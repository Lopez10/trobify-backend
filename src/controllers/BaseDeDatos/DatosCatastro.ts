import { coordenada, Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';

export class DatosCatastro implements Consultas {
	private id_catastro: string; //
	private direccion: string;
	private localidad: string; //
	private codPostal: number;
	private id_provincia: number;
	private superficie: number;
	private coordenada: coordenada; //

	private constructor() {}

	async getDatos(id_catastro: string): Promise<DatosCatastro> {
		return DatosCatastro.getDatos(id_catastro);
	}

	static async getDatos(id_catastro: string): Promise<DatosCatastro> {
		let catastro = new DatosCatastro();

		let select: string =
			'direccion, codPostal, localidad, d_provincia, superficie, latitud, longitud';
		let from: string = 'datoscatastro';
		let where: string = 'id_catastro LIKE "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(
			'SELECT ' + select + ' FROM ' + from + ' WHERE ' + where
		);

		let coordenadas: coordenada = {
			yLatitud: consulta[0][0].latitud,
			xLongitud: consulta[0][0].longitud,
		};

		catastro.id_catastro = id_catastro;
		catastro.direccion = consulta[0][0].direccion;
		catastro.localidad = consulta[0][0].localidad;
		catastro.codPostal = consulta[0][0].codPostal;
		catastro.id_provincia = consulta[0][0].id_provincia;
		catastro.superficie = consulta[0][0].superficie;
		catastro.coordenada = coordenadas;

		return catastro;
	}

	insertDatos(): Promise<string> {
		throw new Error('Method not implemented.');
	}
	updateDatos(): Promise<string> {
		throw new Error('Method not implemented.');
	}
	deleteDatos(): Promise<string> {
		throw new Error('Method not implemented.');
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
		//Valor por el que se debe multiplicar cada posición de cada subcadena
		const pesoPosicion: number[] = [13, 15, 12, 5, 4, 17, 9, 21, 3, 7, 1];
		const letraDc: string = 'MQWERTYUIOPASDFGHJKLBZX';

		//Sólo se comprueban las referencias catastrales con 20 carácteres alfanuméricos,
		//los dos últimos corresponden a los dígitos de control.
		if (referenciaCatastral === null || referenciaCatastral.length !== 20) {
			return false;
		}
		referenciaCatastral = referenciaCatastral.toUpperCase();

		//Para calcular cada dígito de control se utilizan siguientes subcadenas
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

			/*
               Para el cálculo de cada dígito de control, se deben de sumar cada
               uno de los carácteres de cada cadena.
               Si el carácter no es numérico el valor corresponde de la siguiente 
               manera: A = 1, B = 2, ..., Z = 27.
               */
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

			//Valor del dígito de control calculado
			dcCalculado += letraDc.charAt(sumaDigitos);
		});

		if (dcCalculado !== referenciaCatastral.substring(18, 20)) {
			return false;
		}
		return true;
	}
}
