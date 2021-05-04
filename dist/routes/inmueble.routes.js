"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inmueble_controller_1 = require("../controllers/inmueble.controller");
const router = express_1.Router();
router.route('/').post(inmueble_controller_1.registrarInmueble);
router.route('/').delete(inmueble_controller_1.eliminarInmueble);
router.route('/').put(inmueble_controller_1.modificarInmueble);
router.route('/:inmuebleId/:modalidadId').get(inmueble_controller_1.getInmueble);
//     .delete(deleteCatalog)
//     .put(updateCatalog);
exports.default = router;
//# sourceMappingURL=inmueble.routes.js.map