import { Router } from 'express';
import { getCatalog, getInmueblesPropietario } from '../controllers/catalogo.controller';
const router = Router();

router.route('/').get(getCatalog);

router.route('/:id_mail').get(getInmueblesPropietario);

export default router;
