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
exports.getCatalog = exports.getFiltros = exports.getProvincias = void 0;
const database_1 = require("../database");
function getProvincias(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let select = 'SELECT * ';
        let from = 'FROM Provincias ';
        let where = '';
        if (!(req.query.prov === undefined) && Number(req.query.prov) < 53) {
            where += 'WHERE provincia_id = ' + req.query.prov + ';';
        }
        const conn = yield database_1.connect();
        const provincias = yield conn.query(select + from + where);
        return res.json(provincias[0]);
    });
}
exports.getProvincias = getProvincias;
function getFiltros(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = +req.params.id_cliente;
        let select = '*';
        let from = ' Filtros F ';
        let where = ' F.id_cliente = ' + id + '';
        const conn = yield database_1.connect();
        const filter = yield conn.query(' SELECT ' + select + ' FROM ' + from + ' WHERE ' + where + ' ;');
        return res.json(filter[0]);
    });
}
exports.getFiltros = getFiltros;
function getCatalog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!criteriosMinimosDeFiltrado(Number(req.query.opt), Number(req.query.tpoInm), Number(req.query.prov))) {
            return res.json('Los parámetros introducidos no son suficientes');
        }
        let consulta;
        let idProvincia = Number(req.query.prov);
        let idTipoInmueble = Number(req.query.tpoInm);
        let idModalidad = Number(req.query.opt);
        let select = 'inm.id_catastro, inm.superficie, inm.breveDescripcion, ubi.direccion, ubi.latitud, ubi.longitud, ubi.prov, cat.id_modalidad, cat.precio, cat.descuento, cat.id_usuario as propietario, car.nHab, car.nBano, car.nCocina, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, cer.certifEner, img.valor as urlImg';
        let from = 'inmueble inm, ubicacion ubi, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI, caractintrinsecas intr, imagen img';
        let where = 'ubi.id_ubicacion = inm.id_ubicacion AND inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND inm.id_imagen = img.id_imagen AND inm.id_catastro = intr.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion AND inm.id_estadoInmueble = est.id_estadoInmueble AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble';
        where += ' AND cat.id_modalidad = ' + idModalidad;
        where +=
            '' + getSubconsultaModalidadProvinciaTipoinmueble(idModalidad, idTipoInmueble, idProvincia);
        where +=
            '' + getSubconsultaCaracterisiticasSecundarias(String(req.query.caract), 'caracteristica');
        if (!(req.query.tpoViv === undefined) && req.query.tpoViv != '' && Number(req.query.prov) != 1) {
            where += ' AND  inm.id_tipoVivienda in (' + req.query.tpoViv + ')';
        }
        if (!(req.query.stdo === undefined) && req.query.stdo != '') {
            where += ' AND inm.id_estadoInmueble in (' + req.query.stdo + ')';
        }
        if (!(req.query.nHab === undefined)) {
            where += ' AND intr.nHab >= ' + req.query.nHab;
        }
        if (!(req.query.nBan === undefined)) {
            where += ' AND intr.nBano >= ' + req.query.nBan;
        }
        if (!(req.query.supMin === undefined) && !(req.query.supMax === undefined)) {
            where += ' AND inm.superficie BETWEEN ' + req.query.supMin + ' AND ' + req.query.supMax;
        }
        where +=
            '' +
                getPrecio(Number(req.query.preMin), Number(req.query.preMax), String(req.query.aMrgn), Number(req.query.mrgn));
        consulta =
            'SELECT ' +
                select +
                ' FROM ' +
                from +
                ' WHERE ' +
                where +
                ' ORDER BY ' +
                getOrderBy(Number(req.query.ord)) +
                ';';
        //console.log(consulta);
        const conn = yield database_1.connect();
        const catalogo = yield conn.query(consulta);
        return res.json(catalogo[0]);
    });
}
exports.getCatalog = getCatalog;
function criteriosMinimosDeFiltrado(idModalidad, idTipoInmueble, idProvincia) {
    //console.log(idProvincia + ',' + idTipoInmueble + ',' + idModalidad);
    if (isNaN(+idProvincia) || idProvincia < 0 || idProvincia > 52) {
        return false;
    }
    if (isNaN(+idTipoInmueble) || idTipoInmueble < 0 || idTipoInmueble > 10) {
        return false;
    }
    if (isNaN(+idModalidad) || idModalidad < 0 || idModalidad > 3) {
        return false;
    }
    return true;
}
function getSubconsultaModalidadProvinciaTipoinmueble(idModalidad, idTipoInmueble, idProvincia) {
    let subConsulta = '';
    let select = 'inm.id_catastro';
    let from = 'inmueble inm, ubicacion ubi, provincias pro, tipodeinmueble tpoI, catalogo cat, modalidad mo';
    let where = 'inm.id_tipoInmueble = tpoI.id_tipoInmueble AND inm.id_ubicacion = ubi.id_ubicacion AND ubi.prov = pro.id_provincia AND inm.id_catastro = cat.id_catastro AND cat.id_modalidad = mo.id_modalidad';
    where += ' AND mo.id_modalidad = ' + idModalidad;
    where += ' AND pro.id_provincia = ' + idProvincia;
    where += ' AND tpoI.id_tipoInmueble = ' + idTipoInmueble;
    subConsulta =
        ' AND inm.id_catastro IN (SELECT DISTINCT ' +
            select +
            ' FROM ' +
            from +
            ' WHERE ' +
            where +
            ')';
    return subConsulta;
}
function getSubconsultaCaracterisiticasSecundarias(entrada, parametro) {
    if (entrada === 'undefined' || entrada == '') {
        return '';
    }
    let subConsulta = String(entrada).split(',');
    let j = subConsulta.length;
    let resultado = '';
    let select = 'id_catastro';
    let from = '(';
    for (let i = 0; i < j; i++) {
        from += 'SELECT co' + i + '.id_catastro, ca' + i + '.caracteristica ';
        from += 'FROM caractsecundarias ca' + i + ', contiene co' + i + ' ';
        from +=
            'WHERE ca' +
                i +
                '.id_caractSecundaria = co' +
                i +
                '.id_caractSecundaria and ca' +
                i +
                '.id_caractSecundaria = "' +
                subConsulta[i] +
                '"';
        if (i + 1 < j)
            from += ' UNION ALL ';
    }
    from += ') ' + parametro;
    let group = 'id_catastro HAVING COUNT(id_catastro) = ' + j;
    resultado =
        ' AND inm.id_catastro IN (SELECT ' + select + ' FROM ' + from + ' GROUP BY ' + group + ')';
    return resultado;
}
function getOrderBy(entrada) {
    let resultado = '';
    if (isNaN(+entrada) || entrada < 1 || entrada > 6) {
        resultado = ' cat.f_insercion';
    }
    switch (entrada) {
        case 1:
            resultado = ' cat.f_insercion DESC';
            break;
        case 3:
            resultado = ' cat.precio DESC';
            break;
        case 4:
            resultado = ' cat.precio';
            break;
        case 5:
            resultado = ' inm.superficie DESC';
            break;
        case 6:
            resultado = ' inm.superficie';
            break;
        default:
            resultado = ' cat.f_insercion';
            break;
    }
    return resultado;
}
function getPrecio(minimo, maximo, aMrgn, margen) {
    if (isNaN(+minimo) || minimo < 0) {
        return '';
    }
    if (isNaN(+maximo) || maximo < 0) {
        return '';
    }
    if (isNaN(+margen) || margen < 0 || margen > 100) {
        return '';
    }
    let min = minimo;
    let max = maximo;
    if (min > max) {
        let aux = min;
        min = max;
        max = aux;
    }
    if (aMrgn === 'on') {
        min = min - min * margen;
        max = max + max * margen;
    }
    if (min < 0)
        min = 0;
    //console.log('AND cat.precio BETWEEN ' + min + ' AND ' + max);
    return ' AND cat.precio BETWEEN ' + min + ' AND ' + max;
}
//# sourceMappingURL=catalogo.controller.js.map