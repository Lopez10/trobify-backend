import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { Esqueleto } from './Esqueleto';

export class MailEx extends Esqueleto{
    protected objetoDeIntercambio: DatosInmueble;

    protected constructor() {super();}
    //Método que extraiga el mail del usuario, actualmente tenemos id_usuario en catalogo y necesitamos el mail
    //Debemos llamar a todos los métodos en esqueletos y rellenarlos aquí
}