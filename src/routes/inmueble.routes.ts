import { Router } from 'express';
import { createInmueble, getInmueble, getUbicacion } from '../controllers/inmueble.controller';

const router = Router();

router.route('/').post(createInmueble);

router.route('/:inmuebleId/:modalidadId').get(getInmueble);
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
