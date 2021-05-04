"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const router = express_1.Router();
router.route('/').post(login_controller_1.getUsuariosLog);
exports.default = router;
//# sourceMappingURL=login.routes.js.map