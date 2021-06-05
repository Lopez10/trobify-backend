import { Componente } from '../controllers/BaseDeDatos/Mediador/Componente';

export interface MediadorInterface {
    notify(Tabla: Componente, notificador: string);
}
    
