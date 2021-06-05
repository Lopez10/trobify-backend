import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { Esqueleto } from './Esqueleto';

export class ModalidadAlquilarEx extends Esqueleto{
    protected objetoDeIntercambio: DatosInmueble;

    protected constructor() {super();}
    //¿Cómo se cogen la información? Aquí es solo rellenarlo con lo que nos pasan.
}