import { Router } from 'express';
import { createInmueble, getUbicacion } from '../controllers/inmueble.controller';

const router = Router();

router.route('/')
     .post(createInmueble);

 router.route('/')
     .get(getUbicacion);


// router.route('/:catalogId')
//     .get(getCatalog)
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;
