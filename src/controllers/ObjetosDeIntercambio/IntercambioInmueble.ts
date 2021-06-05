import { CaracteristicasIntrinsecas } from '../BaseDeDatos/CaracteristicasIntrinsecas';
import { Catalogo } from '../BaseDeDatos/Catalogo';
import { Contiene } from '../BaseDeDatos/Contiene';
import { DatosCatastro } from '../BaseDeDatos/DatosCatastro';
import { Imagen } from '../BaseDeDatos/Imagen';
import { Inmueble } from '../BaseDeDatos/inmueble';

export class IntercambioInmueble {
	private contiene: Contiene;
	private caracteristicas: CaracteristicasIntrinsecas;
	private catastro: DatosCatastro;
	private imagen: Imagen;
	private catalogo: Catalogo;
	private inmueble: Inmueble;

	private constructor() {}

	getInmueblesSegunFiltros() {
		throw new Error('Method not implemented.');
	}

	getInmueblesPorMailDePropietario() {
		throw new Error('Method not implemented.');
	}

	getInmueblesPorCatastroYModalidad() {
		throw new Error('Method not implemented.');
	}

	postRegistrarNuevoInmueble(): string {
		throw new Error('Method not implemented.');
	}

	deleteInmueble(): string {
		throw new Error('Method not implemented.');
	}

	updateInmueble(): string {
		throw new Error('Method not implemented.');
	}
}
