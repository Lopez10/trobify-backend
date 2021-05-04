"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// Routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const catalog_routes_1 = __importDefault(require("./routes/catalog.routes"));
const inmueble_routes_1 = __importDefault(require("./routes/inmueble.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.headers();
        this.settings();
        this.middlewares();
        this.routes();
        this.static();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/catalogo', catalog_routes_1.default);
        this.app.use('/inmueble', inmueble_routes_1.default);
        this.app.use('/usuarios', usuarios_routes_1.default);
        this.app.use('/login', login_routes_1.default);
    }
    static() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'views')));
    }
    headers() {
        this.app.use((req, res, next) => {
            res.append('Access-Control-Allow-Origin', ['*']);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', 3000);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map