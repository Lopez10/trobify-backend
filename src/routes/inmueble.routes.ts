import { Router } from 'express';
import { Construccion } from '../clases/Inmueble/Construccion';
import { Eliminar } from '../clases/Inmueble/Eliminar';
const router = Router();

let construccionInmueble = new Construccion();
let eliminacionInmueble = new Eliminar();

router.route('/').post(construccionInmueble.registrarInmueble);

router.route('/').delete(eliminacionInmueble.eliminarInmueble);

router.route('/').put(eliminacionInmueble.modificarInmueble);

router.route('/:inmuebleId/:modalidadId').get(construccionInmueble.getInmueble);
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
