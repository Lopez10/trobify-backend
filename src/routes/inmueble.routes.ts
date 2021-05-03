import { request, response, Router } from 'express';
import {
	getInmueble,
	modificarInmueble,
	registrarInmueble,
	eliminarInmueble,
} from '../controllers/inmueble.controller';

const router = Router();

router.route('/').post(registrarInmueble);

router.route('/').delete(eliminarInmueble);

router.route('/').put(modificarInmueble);

router.route('/:inmuebleId/:modalidadId').get(getInmueble);
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
