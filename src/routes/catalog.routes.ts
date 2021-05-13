import { Router } from 'express';
import { Construccion } from '../controllers/Catalogo/Construccion';

const router = Router();
let construccionCatalogo = new Construccion();

router.route('/').get(construccionCatalogo.getCatalog);
router.route('/:mailPropietario').get(construccionCatalogo.getInmueblesPropietario);

export default router;
