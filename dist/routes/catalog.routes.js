"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogo_controller_1 = require("../controllers/catalogo.controller");
const router = express_1.Router();
router.route('/')
    .get(catalogo_controller_1.getCatalog);
exports.default = router;
//# sourceMappingURL=catalog.routes.js.map