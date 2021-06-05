import { Request } from 'express';
import { DatosInmueble } from "../../../interface/ObjetosDeIntercambio.interface";
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { DatosCatastro } from '../../BaseDeDatos/DatosCatastro';
import { IntercambioInmueble } from "../IntercambioInmueble";
import { VistaListado } from './VistaListado';

export class Registro extends IntercambioInmueble{
    protected objetoDeIntercambio: DatosInmueble;

    numberFromString(lista: string[]){
        let pic2: number[];
        for( let i = 0; i < lista.length; i++){
            pic2[i] = parseInt(lista[i]);
        }
        return pic2;
    }

    async registrar(req: Request) {
        let pic: string[] = String(req.query.imagen).split(',');
        let url: string[] = String(req.query.url).split(',');
        let caractSec: string[] = String(req.query.caracteristica).split(',');
        let modal: string[] = String(req.query.modalidad).split(',');
        let precio: string[] = String(req.query.precio).split(',');
        let descuento: string[] = String(req.query.descuento).split(',');
        let publicado: string[] = String(req.query.publicado).split(',');

        const fecha: Date = new Date();
        const hoy: string = '' + fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay();

        let casa: Inmueble = new Inmueble(String(req.query.catastro), String(req.query.descripcion), Number(req.query.tipoInmueble), Number(req.query.estadoInmueble), Number(req.query.tipoVivienda), Number(req.query.imagen));
        let imagen = new Imagen(this.numberFromString(pic), String(req.query.catastro), url);
        let contain = new Contiene(String(req.query.catastro), this.numberFromString(caractSec));
        let catalo = new Catalogo(String(req.query.catastro), this.numberFromString(modal), this.numberFromString(precio), this.numberFromString(descuento), hoy, Number(req.query.propietario), this.numberFromString(publicado));
        let caractInt = new CaracteristicasIntrinsecas(String(req.query.catastro), Number(req.query.nBano), Number(req.query.nCocina), Number(req.query.nHab), Number(req.query.id_certifEner));
        let datos = new DatosCatastro(String(req.query.catastro), String(req.query.direccion), String(req.query.localidad), Number(req.query.codPostal), Number(req.query.provincia), Number(req.query.superficie), Number(req.query.latitud), Number(req.query.longitud));

        await casa.insertDatos();
        await imagen.insertDatos();
        await contain.insertDatos();
        await catalo.insertDatos();
        await caractInt.insertDatos();
        await datos.insertDatos();
    }

}