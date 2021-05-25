import { Router } from 'express';
import { BaseDeDatos } from '../controllers/BaseDeDatos/BaseDeDatos';
import { Construccion } from '../controllers/Catalogo/Construccion';

const router = Router();
let construccionCatalogo = new Construccion();

//router.route('/').get(construccionCatalogo.getCatalog);
router.route('/:mailPropietario').get(construccionCatalogo.getInmueblesPropietario);

//let prueba = new Inmueble('0230809UH0403S0001LF');
//let prueba = BaseDeDatos.getConexion;
router.route('/').get(BaseDeDatos.reiniciarDataBase);

export default router;
