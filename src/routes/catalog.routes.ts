import { Router } from 'express';
import { Construccion } from '../clases/Catalogo/Construccion';

const router = Router();
let construccionCatalogo = new Construccion();

router.route('/').get(construccionCatalogo.getCatalog);
router.route('/:mailPropietario').get(construccionCatalogo.getInmueblePropietario);

export default router;
