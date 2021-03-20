import { Router } from 'express';
import { getCatalog, getProvincias, getFiltros } from '../controllers/catalogo.controller';
const router = Router();

router.route('/')
     .get(getCatalog)

router.route('/Provincias')
     .get(getProvincias)

     
router.route('/:id_cliente')
     .get(getFiltros) 

export default router;