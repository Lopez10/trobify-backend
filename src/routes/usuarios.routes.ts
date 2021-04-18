import { Router } from 'express';
import { getUsuarios } from '../controllers/usuarios.controller';

const router = Router();

router.route('/').get(getUsuarios);

export default router;
