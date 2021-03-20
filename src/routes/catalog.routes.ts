import { Router } from 'express';
import { getCatalog, getProvincias } from '../controllers/catalogo.controller';
const router = Router();

router.route('/')
     .get(getCatalog)

router.route('/Provincias')
     .get(getProvincias)


export default router;