import { Router } from 'express';
import { ConsultaSedeCatastral } from '../controllers/BaseDeDatos/ConsultaSedeCatastral';
import { DatosCatastro } from '../controllers/BaseDeDatos/DatosCatastro';

const router = Router();

//const catastro:ConsultaSedeCatastral;

router.route('/').get(DatosCatastro.create('0230809UH0403S0001LF'));

export default router;
