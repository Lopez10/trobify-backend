import { Router } from 'express';
import { BaseDeDatos } from '../controllers/BaseDeDatos/BaseDeDatos';
import { Construccion } from '../controllers/Catalogo/Construccion';
import { VistaListado } from '../controllers/ObjetosDeIntercambio/Builder/VistaListado';

const router = Router();

let inmueblesFiltrados = new VistaListado();

//let construccionCatalogo = new Construccion();

router.route('/').get(inmueblesFiltrados.getInmueblesSegunFiltros);
//router.route('/:mailPropietario').get(construccionCatalogo.getInmueblesPropietario);

//let prueba = new Inmueble('0230809UH0403S0001LF');
//let prueba = BaseDeDatos.getConexion;
//router.route('/').get(BaseDeDatos.reiniciarDataBase);

export default router;
