import { Router } from 'express';
import { getCatalog } from '../controllers/catalogo.controller';
const router = Router();

router.route('/')
     .get(getCatalog)

export default router;