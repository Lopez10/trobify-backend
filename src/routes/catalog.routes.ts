import { Router } from 'express';
import { Inmueble } from '../controllers/BaseDeDatos/Inmueble';
import { Construccion } from '../controllers/Catalogo/Construccion';

const router = Router();
let construccionCatalogo = new Construccion();

router.route('/').get(construccionCatalogo.getCatalog);
router.route('/:mailPropietario').get(construccionCatalogo.getInmueblesPropietario);

//let prueba = new Inmueble('0230809UH0403S0001LF');
//router.route('/').get(prueba.getDatos);

export default router;
