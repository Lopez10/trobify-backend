import { Componente } from '../controllers/BaseDeDatos/Componente';

export interface MediadorInterface {
    notify(Tabla: Componente, notificador: string);
}
    
