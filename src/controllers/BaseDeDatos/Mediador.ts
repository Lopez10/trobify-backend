import { MediadorInterface } from '../../interface/Mediador.interface';
import { Componente } from '../BaseDeDatos/Componente';

export class Mediador implements MediadorInterface {
    private notificador: string;
    private coleccion: Componente[]; 

    agregarAColeccion(componentes: Componente){
        this.coleccion.splice(this.coleccion.length,this.coleccion.length,componentes);
    }

    notify(componente: Componente, msg: string){
        for( let i = 0; i<this.coleccion.length; i++ ){
            if( componente != this.coleccion[i] ){
                this.coleccion[i].recibir( msg );
            }
        }

    };

}