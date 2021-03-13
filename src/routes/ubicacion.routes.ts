import { Router } from 'express';
import { getUbicacion } from '../controllers/ubicacionInmuebles.controller';
const router = Router();

router.route('/')
     .get(getUbicacion)

export default router;