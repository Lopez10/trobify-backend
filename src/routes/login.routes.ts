import { Router } from 'express';
import { getUsuariosLog } from '../controllers/login.controller';

const router = Router();

router.route('/').post(getUsuariosLog);

export default router;
