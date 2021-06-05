import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { IntercambioInmueble } from '../IntercambioInmueble';

export class ModalidadVentaEx extends IntercambioInmueble {
	protected objetoDeIntercambio: DatosInmueble;

	protected constructor(id_catastro: string) {
		super(id_catastro);
	}
	//¿Cómo se cogen la información? Aquí es solo rellenarlo con lo que nos pasan.
}
