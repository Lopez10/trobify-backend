import { Router } from 'express';
import { createInmueble, getUbicacion, getFiltrados } from '../controllers/inmueble.controller';

const router = Router();

router.route('/')
     .post(createInmueble);

 router.route('/')
     .get(getUbicacion);

router.route('/filtros')
     .get(getFiltrados);



// router.route('/:catalogId')
//     .get(getCatalog)
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
