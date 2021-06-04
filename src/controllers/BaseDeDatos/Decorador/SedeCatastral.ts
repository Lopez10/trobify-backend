import axios from 'axios';
import { DatosCatastro } from '../DatosCatastro';
import { DatosCatastroDecorado } from './DatosCatastroDecorado';

export class SedeCatastral extends DatosCatastroDecorado {
	//7138804YJ2773G0006ET
	//0230809UH0403S0001LF
	//https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx?op=Consulta_CPMRC

	async getDatos(id_catastro: string, SRS?: number): Promise<boolean> {
		//const catastro = new DatosCatastro();
		this.wrappee.setId_catastro(id_catastro);

		const ubicacionCatastro = await SedeCatastral.consultaCatastroUbicacion(id_catastro);
		this.wrappee.setCoordenada(Number(ubicacionCatastro[0]), Number(ubicacionCatastro[1]));
		this.wrappee.setLocalidad(ubicacionCatastro[2]);

		const otrosDatosCatastro = await SedeCatastral.consultaCatastroDatosInmueble(id_catastro);
		this.wrappee.setDireccion(otrosDatosCatastro[0]);
		this.wrappee.setCodPostal(Number(otrosDatosCatastro[1]));
		this.wrappee.setId_provincia(Number(otrosDatosCatastro[2]));
		this.wrappee.setSuperficie(Number(otrosDatosCatastro[3]));

		return true;
	}

	static async consultaCatastroUbicacion(id_catastro: string, SRS?: number): Promise<string[]> {
		const host: string = 'http://ovc.catastro.meh.es';
		let httpGet: string =
			'/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx/Consulta_CPMRC?Provincia=&Municipio=';
		httpGet += '&SRS=' + SedeCatastral.codigoSRS();
		httpGet += '&RC=' + SedeCatastral.calculaRC(id_catastro);

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
}
