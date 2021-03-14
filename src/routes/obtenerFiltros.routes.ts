import { Router } from 'express';
import { getInmueblesFiltrados } from '../controllers/obtenerFiltros.controller';
const router = Router();

router.route('/')
     .get(getInmueblesFiltrados)

export default router;