import { Router } from 'express';
import { EditarInmueble } from '../controllers/ObjetosDeIntercambio/Builder/EditarInmueble';
import { EliminarInmueble } from '../controllers/ObjetosDeIntercambio/Builder/EliminarInmueble';
import { RegistrarInmueble } from '../controllers/ObjetosDeIntercambio/Builder/RegistrarInmueble';
import { VistaListado } from '../controllers/ObjetosDeIntercambio/Builder/VistaListado';
import { VistaPorInmueble } from '../controllers/ObjetosDeIntercambio/Builder/VistaPorInmueble';
import { VistaPorPropietario } from '../controllers/ObjetosDeIntercambio/Builder/VistaPorPropietario';

const router = Router();

const inmueblesFiltrados1: VistaListado = new VistaListado();
const inmueblesFiltrados2: VistaPorPropietario = new VistaPorPropietario();
const inmueblesFiltrados3: VistaPorInmueble = new VistaPorInmueble();

router.route('/').get(inmueblesFiltrados1.getInmueblesSegunFiltros);
router.route('/:mailPropietario').get(inmueblesFiltrados2.getInmueblesPorMailDePropietario);
router
	.route('/:id_catastro/:modalidadId')
	.get(inmueblesFiltrados3.getInmueblesPorCatastroYModalidad);

const crud1: RegistrarInmueble = new RegistrarInmueble();
router.route('/').post(crud1.postRegistrarNuevoInmueble);
router.route('/').delete(EliminarInmueble.deleteInmueble);
router.route('/').put(EditarInmueble.updateInmueble);

export default router;
