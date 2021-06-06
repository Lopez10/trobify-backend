import { Router } from 'express';
import { VistaListado } from '../controllers/ObjetosDeIntercambio/Builder/VistaListado';
import { VistaPorInmueble } from '../controllers/ObjetosDeIntercambio/Builder/VistaPorInmueble';
import { VistaPorPropietario } from '../controllers/ObjetosDeIntercambio/Builder/VistaPorPropietario';

const router = Router();

const inmueblesFiltrados1 = new VistaListado();
const inmueblesFiltrados2 = new VistaPorPropietario();
const inmueblesFiltrados3 = new VistaPorInmueble();

router.route('/').get(inmueblesFiltrados1.getInmueblesSegunFiltros);
router.route('/:mailPropietario').get(inmueblesFiltrados2.getInmueblesPorMailDePropietario);
router
	.route('/:id_catastro/:modalidadId')
	.get(inmueblesFiltrados3.getInmueblesPorCatastroYModalidad);

export default router;
