import { Router } from 'express';
import { getUsuarios, getUsuariosLog } from '../controllers/usuarios.controller';

const router = Router();

 router.route('/')
    .get(getUsuarios);

 router.route('/login')
     .get(getUsuariosLog);

export default router;