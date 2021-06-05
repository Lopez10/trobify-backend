import { Request, Response } from 'express';
import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { IntercambioInmueble } from '../IntercambioInmueble';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { Consulta } from '../../BaseDeDatos/Consulta';

export class VistaListado extends IntercambioInmueble {
	protected inmuebleCompartido: DatosInmueble[];

	protected constructor(id_catastro: string) {
		super(id_catastro);
	}

	getInmuebleCompartido(): DatosInmueble[] {
		return this.inmuebleCompartido;
	}

	public async getCatalog(req: Request): Promise<string[]> {
		let tenemos: string[] = await Consulta.getCatastroIdToModProvTpoinm(
			Number(req.query.opt),
			Number(req.query.tpoInm),
			Number(req.query.prov)
		);
		let compartimos: string[];

		if (
			!(req.query.nBan === undefined) ||
			!(req.query.nHab === undefined) ||
			!(req.query.clfEn === undefined)
		) {
			compartimos = await Consulta.getCatastroToCaracteristicasIntrinsecas(
				Number(req.query.nBan),
				Number(req.query.nHab),
				Number(req.query.clfEn)
			);

			if (tenemos == null || compartimos == null) return null;
			tenemos = Consulta.interseccionDeDosArray(tenemos, compartimos);
		}

		if (!(req.query.supMin === undefined) && !(req.query.supMax === undefined)) {
			compartimos = await Consulta.getCatastroToSuperficie(
				Number(req.query.supMin),
				Number(req.query.supMax)
			);

			if (compartimos == null) return null;
			tenemos = Consulta.interseccionDeDosArray(tenemos, compartimos);
		}

		if (!(req.query.caract === undefined)) {
			compartimos = await Consulta.getCatastroToContiene('(' + String(req.query.caract) + ')');

			if (compartimos == null) return null;
			tenemos = Consulta.interseccionDeDosArray(tenemos, compartimos);
		}

		if (!(req.query.preMin === undefined) && !(req.query.preMax === undefined)) {
			compartimos = await Consulta.getCatastroToCatalogo(
				Number(req.query.preMin),
				Number(req.query.preMax)
			);

			if (compartimos == null) return null;
			tenemos = Consulta.interseccionDeDosArray(tenemos, compartimos);
		}

		if (!(req.query.preMin === undefined) && !(req.query.preMax === undefined)) {
			compartimos = await Consulta.getCatastroToCatalogo(
				Number(req.query.preMin),
				Number(req.query.preMax),
				String(req.query.aMrgn),
				Number(req.query.mrgn)
			);

			if (compartimos == null) return null;
			tenemos = Consulta.interseccionDeDosArray(tenemos, compartimos);
		}

		if (
			!(req.query.stdo === undefined) &&
			!(req.query.tpoInm === undefined) &&
			!(req.query.tpoViv === undefined)
		) {
			compartimos = await Consulta.getCatastroToInmueble(
				Number(req.query.tpoInm),
				Number(req.query.stoInm),
				Number(req.query.tpoViv)
			);

			if (compartimos == null) return null;
			tenemos = Consulta.interseccionDeDosArray(tenemos, compartimos);
		}

		return tenemos;
	}

	async getResult(lista: string[]) {
		for (let i = 0; i < lista.length; i++) {
			let inmueble: Inmueble = new Inmueble();
			inmueble = await inmueble.getDatos(lista[i]);

			let contiene: Contiene = new Contiene();
			contiene = await contiene.getDatos(lista[i]);

			let caractesiticas: CaracteristicasIntrinsecas = new CaracteristicasIntrinsecas();
			caractesiticas = await caractesiticas.getDatos(lista[i]);

			let catastro: DatosCatastro = await DatosCatastro.getDatos(lista[i]);

			let imagen: Imagen = new Imagen();
			imagen = await imagen.getDatos(lista[i]);

			let catalogo: Catalogo = await Catalogo.getDatos(lista[i]);

			this.inmuebleCompartido.push({
				id_catastro: lista[i],
				tipoInmueble: inmueble.getId_tipoInmueble(),
				estadoInmueble: inmueble.getId_estadoInmueble(),
				descripcion: inmueble.getBreveDescipcion(),
				tipoVivienda: inmueble.getId_tipoVivienda(),
				imagen: await inmueble.getUrlToIdImagen(),

				energia: await caractesiticas.getCertifEner(),
				nHab: caractesiticas.getNHab(),
				nBanos: caractesiticas.getNBano(),
				nCocinas: caractesiticas.getNCocina(),

				superficie: catastro.getSuperficie(),
				direccion: catastro.getDireccionCompleta(),
				provincia: catastro.getId_provincia(),
				longitud: catastro.getLongitud(),
				latitud: catastro.getLatitud(),

				propietario: catalogo.getId_usuario(),
				//publicado: catalogo.getPublicado(),
				modalidad: catalogo.getModalidad(),
				precio: catalogo.getPrecio(),
				descuento: catalogo.getDescuento(),

				caracteristicas: await contiene.getCaracteristicas(),
			});
		}
	}

	static getInmueblesSegunFiltros() {
		throw new Error('Method not implemented.');
	}
}
