import { Router } from 'express';
import { Usuario } from '../controllers/Usuario/Usuario';

const router = Router();

const usuario = new Usuario();

router.route('/').post(usuario.getUsuariosLog);

export default router;
