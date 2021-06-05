import { DatosInmueble } from '../../../interface/ObjetosDeIntercambio.interface';
import { Director } from './Director';
import { Consulta } from '../../BaseDeDatos/Consulta';
import { Esqueleto } from './Esqueleto';


export class FiltrosEx extends Esqueleto{
    protected objetoDeIntercambio: DatosInmueble;
    protected datosInmuebles: DatosInmueble[];

    protected constructor() {super();}

    getResult(lista: string[]){
        for(let i = 0; i < lista.length; i++){
            this.setInmueble(lista[i]);
            this.setContiene(lista[i]);
            this.setCaracterísticas(lista[i]);
            this.setCatastro(lista[i]);
            this.setImagen(lista[i]);
            this.setCatalogo(lista[i]);
        }
    }
}
