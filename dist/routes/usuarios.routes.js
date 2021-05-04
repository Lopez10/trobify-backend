"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = express_1.Router();
router.route('/').post(usuarios_controller_1.getUsuarios);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map