import { coordenada } from '../interface/ubicacion.interface';

class Catastro {
	id_catastro: string;
	direccion: string;
	coordenadaEPSG25830: coordenada;

	//7138804YJ2773G0006ET
	//https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx?op=Consulta_CPMRC
	constructor(id_catastro: string) {
		if (this.validarReferenciaCatastral(id_catastro)) {
			this.id_catastro = id_catastro;
		}
	}

	calculaRC(id_catastro: string): string {
		return id_catastro.substring(0, 14);
	}

	codigoSRS(id?: number): string {
		if (id == null || id < 1 || id > 14) return 'EPSG:25830';
		let SRS: string;
		switch (id) {
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
			case 3: {
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

let catastro = new Catastro('7138804YJ2773G0006ET');
