import { Router } from 'express';
import { createInmueble } from '../controllers/inmueble.controller';

const router = Router();

router.route('/')
     .post(createInmueble);

// router.route('/:catalogId')
//     .get(getCatalog)
//     .delete(deleteCatalog)
//     .put(updateCatalog);

export default router;