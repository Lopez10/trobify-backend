import { Router } from 'express';
import { createInmueble, getInmueble, getUbicacion } from '../controllers/inmueble.controller';

const router = Router();

router.route('/').post(createInmueble);

//router.route('/').get(getUbicacion);

router.route('/').get(getInmueble);

router.route('/:inmuebleId').get(getInmueble);
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
