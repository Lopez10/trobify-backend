import { Router } from 'express';
import { getUsuariosLog } from '../controllers/login.controller';

const router = Router();

router.route('/login').post(getUsuariosLog);

export default router;
