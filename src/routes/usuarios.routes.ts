import { Router } from 'express';
import { Usuario } from '../clases/Usuario/Usuario';

const router = Router();

const usuario = new Usuario();

router.route('/').post(usuario.getUsuarios);

export default router;
