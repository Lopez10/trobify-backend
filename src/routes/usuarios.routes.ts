import { Router } from 'express';
import { getUsuarios } from '../controllers/usuarios.controller';

const router = Router();

router.route('/').post(getUsuarios);

export default router;
