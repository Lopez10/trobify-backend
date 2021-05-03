import { Router } from 'express';
import {
	createInmueble,
	getInmueble,
	getUbicacion,
	modificarInmueble,
	registrarInmueble,
	eliminarInmueble,
} from '../controllers/inmueble.controller';

const router = Router();

router.route('/').post(registrarInmueble);

router.route('/eliminarInmueble').post(eliminarInmueble);

router.route('/editarInmueble').post(modificarInmueble);

router.route('/:inmuebleId/:modalidadId').get(getInmueble);
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
