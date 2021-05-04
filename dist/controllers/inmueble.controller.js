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
Object.defineProperty(exports, "__esModule", { value: true });
exports.modificarInmueble = exports.eliminarInmueble = exports.registrarInmueble = exports.existeCatastro = exports.getInmueble = exports.getUbicacion = exports.createInmueble = void 0;
const database_1 = require("../database");
function createInmueble(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newInmueble = req.body;
        const conn = yield database_1.connect();
        conn.query('INSERT INTO Catalogo SET ?', [newInmueble]);
        return res.json({
            message: 'Inmueble creado',
        });
    });
}
exports.createInmueble = createInmueble;
function getUbicacion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const ubicacion = yield conn.query('SELECT i.catastro_id, u.longitud, u.latitud FROM Inmueble i, Ubicacion u WHERE u.ubicacion_id = i.ubicacion_id');
        return res.json(ubicacion[0]);
    });
}
exports.getUbicacion = getUbicacion;
function getInmueble(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const modalidad = Number(req.params.modalidadId);
        const catastro = String(req.params.inmuebleId);
        let select = 'cat.precio, cat.descuento, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, inm.superficie, car.nHab, car.nBano, car.nCocina, cer.certifEner, ubi.direccion, ubi.latitud, ubi.longitud, inm.breveDescripcion, ubi.prov, cat.id_usuario as propietario';
        let from = 'inmueble inm, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, ubicacion ubi, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI';
        let where = 'inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion AND inm.id_estadoInmueble = est.id_estadoInmueble  AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble';
        where += ' AND cat.id_modalidad = ' + modalidad + ' ';
        where += ' AND inm.id_catastro LIKE ("' + catastro + '")';
        const conn = yield database_1.connect();
        const inmueble = yield conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ';');
        const imagenes = yield conn.query('SELECT valor FROM imagen WHERE id_catastro LIKE ("' + catastro + '")');
        var img = [''];
        JSON.parse(JSON.stringify(imagenes[0])).forEach((item) => {
            img.push(item.valor);
        });
        img.splice(0, 1);
        const caracteristicas = yield conn.query('SELECT ca.caracteristica FROM contiene co, caractsecundarias ca WHERE co.id_caractSecundaria = ca.id_caractSecundaria AND co.id_catastro LIKE ("' +
            catastro +
            '")');
        var caract = [''];
        JSON.parse(JSON.stringify(caracteristicas[0])).forEach((item) => {
            caract.push(item.caracteristica);
        });
        caract.splice(0, 1);
        const extras = yield conn.query('SELECT valor FROM extra WHERE id_catastro LIKE ("' + catastro + '")');
        var ext = [''];
        JSON.parse(JSON.stringify(extras[0])).forEach((item) => {
            ext.push(item.valor);
        });
        ext.splice(0, 1);
        let newInmueble;
        newInmueble =
            {
                id_catastro: catastro,
                tipoInmueble: inmueble[0][0].tipoInmueble,
                estadoInmueble: inmueble[0][0].estadoInmueble,
                energia: inmueble[0][0].certifEner,
                imagen: img,
                superficie: inmueble[0][0].superficie,
                descripcion: inmueble[0][0].breveDescripcion,
                direccion: inmueble[0][0].direccion,
                provincia: inmueble[0][0].prov,
                longitud: inmueble[0][0].longitud,
                latitud: inmueble[0][0].latitud,
                tipoVivienda: inmueble[0][0].tipoVivienda,
                nHab: inmueble[0][0].nHab,
                nBanos: inmueble[0][0].nBano,
                nCocinas: inmueble[0][0].nCocina,
                caracteristicas: caract,
                extras: ext,
                modalidad: modalidad,
                precio: inmueble[0][0].precio,
                descuento: inmueble[0][0].descuento,
                propietario: inmueble[0][0].propietario,
            } || null;
        return res.json(newInmueble);
    });
}
exports.getInmueble = getInmueble;
function existeInmueble(id_catastro) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield existeCatastro('Imagen', id_catastro)) > 0)
            return true;
        if ((yield existeCatastro('Inmueble', id_catastro)) > 0)
            return true;
        if ((yield existeCatastro('catalogo', id_catastro)) > 0)
            return true;
        if ((yield existeCatastro('caractintrinsecas', id_catastro)) > 0)
            return true;
        if ((yield existeCatastro('contiene', id_catastro)) > 0)
            return true;
        return false;
    });
}
function existeCatastro(from, id_catastro) {
    return __awaiter(this, void 0, void 0, function* () {
        let select = 'COUNT(id_catastro) as cuenta';
        let where = 'id_catastro LIKE ( "' + id_catastro + '")';
        const conn = yield database_1.connect();
        const consulta = yield conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
        var contar = 0;
        JSON.parse(JSON.stringify(consulta[0])).forEach((item) => {
            contar = item.cuenta;
        });
        return contar;
    });
}
exports.existeCatastro = existeCatastro;
function registrarInmueble(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_catastro = String(req.body.id_catastro);
        if (yield existeInmueble(id_catastro)) {
            return res.json('Este inmueble ya se encuentra registrado en nuestra Base de Datos');
        }
        const superficie = Number(req.body.superficie);
        const breveDescripcion = String(req.body.breveDescripcion);
        const id_tipoInmueble = Number(req.body.id_tipoInmueble);
        const id_estadoInmueble = Number(req.body.id_estadoInmueble);
        const id_tipoVivienda = Number(req.body.id_tipoVivienda);
        const imagen = req.body.imagen;
        const id_modalidad = req.body.id_modalidad;
        const precio = req.body.precio;
        const nHab = Number(req.body.nHab);
        const nBano = Number(req.body.nBano);
        const id_certifEner = Number(req.body.id_certifEner);
        const id_caractSecundaria = req.body.id_caractSecundaria;
        const id_provincia = Number(req.body.id_provincia);
        const direccion = String(req.body.direccion);
        const longitud = Number(req.body.longitud);
        const latitud = Number(req.body.latitud);
        const nCocina = Number(req.body.nCocina);
        const descuento = Number(req.body.descuento);
        const id_usuario = Number(req.body.id_usuario);
        const id_imagen = yield cargarImagenes(id_catastro, imagen);
        if (id_imagen < 0) {
            return res.json('Error al cargar las imágenes');
        }
        const id_ubicacion = yield cargarUbicacion(id_provincia, direccion, longitud, latitud);
        if (id_ubicacion < 0) {
            return res.json('Error al cargar la Ubicacion');
        }
        const inmuebleCargado = Boolean(yield cargarInmueble(id_catastro, superficie, breveDescripcion, id_ubicacion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen));
        if (!inmuebleCargado) {
            return res.json('Error al cargar el inmueble');
        }
        const caracteristicasIntrinsecasCargado = Boolean(yield cargarCaractericticasIntrinsecas(id_catastro, nBano, nCocina, id_certifEner, nHab));
        if (!caracteristicasIntrinsecasCargado) {
            return res.json('Error al cargar las características Intrinsecas');
        }
        const contieneCargado = Boolean(yield cargarContiene(id_catastro, id_caractSecundaria));
        if (!contieneCargado) {
            return res.json('Error al cargar las características Secundarias');
        }
        if (!(req.body.extras === undefined)) {
            if (!cargarExtras(id_catastro, req.body.extras)) {
                return res.json('Error al cargar la información extra');
            }
        }
        const catalogoCargado = Boolean(yield cargarCatalogo(id_catastro, id_modalidad, precio, descuento, id_usuario));
        if (!catalogoCargado) {
            return res.json('Error al cargar el catalogo');
        }
        return res.json('El inmueble se ha registrado satisfactoriamente');
    });
}
exports.registrarInmueble = registrarInmueble;
function cargarImagenes(id_catastro, imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        try {
            let insert = ' INSERT INTO Imagen (id_catastro, valor)';
            for (var i = 0; i < imagen.length; i++) {
                let value = 'VALUES ("' + id_catastro + '", "' + imagen[i] + '");';
                yield conn.query(insert + ' ' + value);
            }
        }
        catch (_a) {
            return -1;
        }
        const calculoMinimo = yield conn.query('SELECT MIN(id_imagen) as minimo FROM Imagen WHERE id_catastro = "' + id_catastro + '";');
        var idMinimo;
        JSON.parse(JSON.stringify(calculoMinimo[0])).forEach((item) => {
            idMinimo = item.minimo;
        });
        return idMinimo;
    });
}
function cargarExtras(id_catastro, extras) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        try {
            for (var i = 0; i < extras.length; i++) {
                let insert = ' INSERT INTO Imagen (id_catastro, valor)';
                let value = 'VALUES ("' + id_catastro + '", "' + extras[i] + '");';
                yield conn.query(insert + ' ' + value);
            }
        }
        catch (_a) {
            return false;
        }
        return true;
    });
}
function cargarUbicacion(id_provincia, direccion, longitud, latitud) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        try {
            let insert = 'INSERT INTO Ubicacion (direccion, prov, latitud, longitud) ';
            let value = 'VALUES ("' + direccion + '", ' + id_provincia + ', ' + latitud + ', ' + longitud + ');';
            yield conn.query(insert + ' ' + value);
        }
        catch (_a) {
            return -1;
        }
        const calculoMaximo = yield conn.query('Select MAX(id_ubicacion) as maximo from ubicacion;');
        var idMaximo;
        JSON.parse(JSON.stringify(calculoMaximo[0])).forEach((item) => {
            idMaximo = Number(item.maximo);
        });
        return idMaximo;
    });
}
function cargarInmueble(id_catastro, superficie, breveDescripcion, id_ubicacion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        try {
            let insert = 'INSERT INTO Inmueble ';
            let value = 'VALUES ("' +
                id_catastro +
                '", ' +
                superficie +
                ', "' +
                breveDescripcion +
                '", ' +
                id_ubicacion +
                ', ' +
                id_tipoInmueble +
                ', ' +
                id_estadoInmueble +
                ', ' +
                id_tipoVivienda +
                ', ' +
                id_imagen +
                ');';
            yield conn.query(insert + ' ' + value);
        }
        catch (_a) {
            return false;
        }
        return true;
    });
}
function cargarCatalogo(id_catastro, id_modalidad, precio, descuento, id_usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const fecha = new Date();
        const hoy = '' + fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay();
        try {
            let insert = 'INSERT INTO Catalogo ';
            for (var i = 0; i < id_modalidad.length; i++) {
                let value = 'VALUES ("' +
                    id_catastro +
                    '", ' +
                    parseInt(id_modalidad[i]) +
                    ', ' +
                    parseInt(precio[i]) +
                    ', ' +
                    descuento +
                    ', "' +
                    hoy +
                    '", ' +
                    id_usuario +
                    ');';
                yield conn.query(insert + ' ' + value);
            }
        }
        catch (_a) {
            return false;
        }
        return true;
    });
}
function cargarCaractericticasIntrinsecas(id_catastro, nBano, nCocina, id_certifEner, nHab) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        try {
            let insert = 'INSERT INTO CaractIntrinsecas ';
            let value = 'VALUES ("' +
                id_catastro +
                '", ' +
                nBano +
                ', ' +
                nCocina +
                ', ' +
                id_certifEner +
                ', ' +
                nHab +
                ');';
            yield conn.query(insert + ' ' + value);
        }
        catch (_a) {
            return false;
        }
        return true;
    });
}
function cargarContiene(id_catastro, caracteristicas) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        try {
            for (var i = 0; i < caracteristicas.length; i++) {
                let insert = 'INSERT INTO Contiene ';
                let value = 'VALUES (' + parseInt(caracteristicas[i]) + ', "' + id_catastro + '");';
                yield conn.query(insert + ' ' + value);
            }
        }
        catch (_a) {
            return false;
        }
        return true;
    });
}
function eliminarSegunId(tabla, columna, parametro) {
    return __awaiter(this, void 0, void 0, function* () {
        let consulta = 'DELETE FROM ' + tabla + ' WHERE ' + columna + ' = "' + parametro + '";';
        try {
            const conn = yield database_1.connect();
            yield conn.query(consulta);
        }
        catch (_a) {
            //return false;
        }
        return true;
    });
}
function eliminarInmueble(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_catastro = String(req.body.id_catastro);
        const conn = yield database_1.connect();
        const ubicacion = yield conn.query('SELECT id_ubicacion as ubicacion FROM Inmueble WHERE id_catastro = "' + id_catastro + '";');
        var id_ubicacion;
        JSON.parse(JSON.stringify(ubicacion[0])).forEach((item) => {
            id_ubicacion = item.ubicacion;
        });
        if (!(yield existeInmueble(id_catastro))) {
            return res.json('Este inmueble NO se encuentra en nuestra Base de Datos');
        }
        let mensajeFin = 'Los datos se han eliminado correctamente';
        let fallo;
        let tablasALimpiar = [
            'Contiene',
            'CaractIntrinsecas',
            'Catalogo',
            'Inmueble',
            'Imagen',
        ];
        for (let i = 0; i < tablasALimpiar.length; i++) {
            fallo = yield eliminarSegunId(tablasALimpiar[i], 'id_catastro', id_catastro);
            if (!fallo)
                mensajeFin = 'No se puede eliminar ' + id_catastro + ' de la tabla ' + tablasALimpiar[i];
        }
        fallo = yield eliminarSegunId('Ubicacion', 'id_ubicacion', '' + id_ubicacion);
        if (!fallo)
            mensajeFin = 'No se puede eliminar ' + id_ubicacion + ' de la tabla ' + 'Ubicacion';
        return res.json(mensajeFin);
    });
}
exports.eliminarInmueble = eliminarInmueble;
function modificarInmueble(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //eliminarInmueble(req, res);
        //registrarInmueble(req, res);
        return res.json('Tus muertos, so desgraciado');
    });
}
exports.modificarInmueble = modificarInmueble;
//# sourceMappingURL=inmueble.controller.js.map