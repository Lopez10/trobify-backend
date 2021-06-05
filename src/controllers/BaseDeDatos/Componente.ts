import { MediadorInterface } from '../../interface/Mediador.interface';

export class Componente implements MediadorInterface {
    notify(Tabla: Componente, notificador: string) {
        throw new Error('Method not implemented.');
    }
    protected Mediator: MediadorInterface;

    getMediador(){
        return this.Mediator;
    };

    setMediador(m: MediadorInterface){
        this.Mediator = m;
    };

    comunicar(msg: string){
        this.getMediador().notify(this, msg);
    }
    recibir(msg: string){
        throw new Error('Method not implemented');
    };
}