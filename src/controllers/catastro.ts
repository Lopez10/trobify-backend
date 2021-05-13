import { coordenada } from '../interface/ubicacion.interface';
import axios from 'axios';

export class Catastro {
	id_catastro: string; //
	direccion: string;
	localidad: string; //
	codigoPostal: number;
	codigoProvincia: number;
	superficie: number;
	coordenada: coordenada; //

	//7138804YJ2773G0006ET
	//0230809UH0403S0001LF
	//https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx?op=Consulta_CPMRC

	private constructor() {}

	static async create(id_catastro: string, SRS?: number): Promise<Catastro> {
		const catastro = new Catastro();
		catastro.id_catastro = id_catastro;

		const ubicacionCatastro = await Catastro.consultaCatastroUbicacion(id_catastro);
		catastro.coordenada = {
			yLatitud: Number(ubicacionCatastro[1]),
			xLongitud: Number(ubicacionCatastro[0]),
		};
		catastro.localidad = ubicacionCatastro[2];

		const otrosDatosCatastro = await Catastro.consultaCatastroDatosInmueble(id_catastro);
		catastro.direccion = otrosDatosCatastro[0];
		catastro.codigoPostal = Number(otrosDatosCatastro[1]);
		catastro.codigoProvincia = Number(otrosDatosCatastro[2]);
		catastro.superficie = Number(otrosDatosCatastro[3]);

		return catastro;
	}

	static async consultaCatastroUbicacion(id_catastro: string, SRS?: number): Promise<string[]> {
		const host: string = 'http://ovc.catastro.meh.es';
		let httpGet: string =
			'/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx/Consulta_CPMRC?Provincia=&Municipio=';
		httpGet += '&SRS=' + Catastro.codigoSRS();
		httpGet += '&RC=' + Catastro.calculaRC(id_catastro);

		return await axios.get(host + httpGet).then((result) => {
			var cadenaTexto: string = JSON.stringify(result.data).trim();

			var direccion: string = cadenaTexto.substring(
				cadenaTexto.indexOf('<ldt>') + 5,
				cadenaTexto.indexOf('</ldt>')
			);
			direccion = direccion.substring(0, direccion.indexOf(' ('));

			var clave: number = direccion.lastIndexOf(' ');

			var localidad: string = direccion.substring(clave + 1, direccion.length);

			direccion = direccion.substring(0, clave);

			return [
				cadenaTexto
					.substring(cadenaTexto.indexOf('<xcen>') + 6, cadenaTexto.indexOf('</xcen>'))
					.trim(),
				cadenaTexto.substring(cadenaTexto.indexOf('<ycen>') + 6, cadenaTexto.indexOf('</ycen>')),
				localidad,
			];
		});
	}

	static async consultaCatastroDatosInmueble(id_catastro: string): Promise<string[]> {
		const host: string = 'http://ovc.catastro.meh.es';
		let httpGet: string =
			'/ovcservweb/OVCSWLocalizacionRC/OVCCallejeroCodigos.asmx/Consulta_DNPRC_Codigos?CodigoProvincia=&CodigoMunicipio=&CodigoMunicipioINE=';
		httpGet += '&RC=' + id_catastro;

		return await axios.get(host + httpGet).then((result) => {
			var cadenaTexto: string = JSON.stringify(result.data).trim();

			var direccion: string = cadenaTexto.substring(
				cadenaTexto.indexOf('<ldt>') + 5,
				cadenaTexto.indexOf('</ldt>')
			);
			direccion = direccion.substring(0, direccion.indexOf(' ('));
			direccion = direccion.substring(0, direccion.lastIndexOf(' '));
			var clave: number = direccion.lastIndexOf(' ');

			var cP: string = direccion.substring(clave + 1, direccion.length);
			direccion = direccion.substring(0, clave);

			return [
				direccion,
				cP,
				cadenaTexto.substring(cadenaTexto.indexOf('<cp>') + 4, cadenaTexto.indexOf('</cp>')),
				cadenaTexto.substring(cadenaTexto.indexOf('<sfc>') + 5, cadenaTexto.indexOf('</sfc>')),
			];
		});
	}

	static calculaRC(id_catastro: string): string {
		return id_catastro.substring(0, 14);
	}

	static codigoSRS(idSRS?: number): string {
		let SRS: string;
		switch (idSRS) {
			case 1: {
				//Geográficas en ED 50
				SRS = 'EPSG:4230';
				break;
			}
			case 2: {
				//Geográficas en WGS 80
				SRS = 'EPSG:4326';
				break;
			}
			default: {
				//Geográficas en ETRS89
				SRS = 'EPSG:4258';
				break;
			}
		}
		return SRS;
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
