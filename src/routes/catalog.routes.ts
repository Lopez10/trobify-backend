import { Router } from 'express';
import { Construccion } from '../clases/Catalogo/Construccion';

const router = Router();
let construccionCatalogo = new Construccion();

router.route('/').get(construccionCatalogo.getCatalog);

router.route('/Provincias').get(construccionCatalogo.getProvincias);

router.route('/:id_cliente').get(construccionCatalogo.getFiltros);

export default router;
