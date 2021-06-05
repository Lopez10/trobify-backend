import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Inmueble } from '../../BaseDeDatos/inmueble';

export class Esqueleto {
	protected inmuebleCompartido: DatosInmueble;

	protected contiene: Contiene;
	protected caracteristicas: CaracteristicasIntrinsecas;
	protected catastro: DatosCatastro;
	protected imagen: Imagen;
	protected catalogo: Catalogo;
	protected inmueble: Inmueble;

	protected constructor() {}

	setInmueble(id_catastro: string) {
		this.inmueble.getDatos(id_catastro);
	}

	getInmueble(): Inmueble {
		return this.inmueble;
	}
}
