import { Router } from 'express';
import { createCatalog, getCatalog, deleteCatalog, updateCatalog } from '../controllers/catalogo.controller';
const router = Router();

router.route('/')
     .get(getCatalog)
     .post(createCatalog);

// Ejemplo adaptable a usuarios
router.route('/:catalogId')
    .get(getCatalog)
    .delete(deleteCatalog)
    .put(updateCatalog);

export default router;