import { Request } from 'express';
import { DatosInmueble } from "../../../interface/ObjetosDeIntercambio.interface";
import { CaracteristicasIntrinsecas } from '../../BaseDeDatos/CaracteristicasIntrinsecas';
import { Contiene } from '../../BaseDeDatos/Contiene';
import { Imagen } from '../../BaseDeDatos/Imagen';
import { Inmueble } from '../../BaseDeDatos/inmueble';
import { Catalogo } from '../../BaseDeDatos/Catalogo';
import { IntercambioInmueble } from "../IntercambioInmueble";

export class Registro extends IntercambioInmueble{
    protected objetoDeIntercambio: DatosInmueble;


    registrar(req: Request) {
        let pic: string[] = String(req.query.imagen).split(',');
        let url: string[] = String(req.query.url).split(',');
        let caractSec: string[] = String(req.query.caracteristica).split(',');
        let modal: string[] = String(req.query.modalidad).split(',');
        let precio: string[] = String(req.query.precio).split(',');
        let descuento: string[] = String(req.query.descuento).split(',');
        let publicado: string[] = String(req.query.publicado).split(',');
        

        let pic2: number[];
        let caractSec2: number[];
        let modal2: number[];
        let precio2: number[];
        let descuento2: number[];
        let publicado2: number[];

        const fecha: Date = new Date();
        const hoy: string = '' + fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay();

        for( let i = 0; i < pic.length; i++){
            pic2[i] = parseInt(pic[i]);
        }

        for( let i = 0; i < pic.length; i++){
            caractSec2[i] = parseInt(caractSec[i]);
        }

        for( let i = 0; i < pic.length; i++){
            modal2[i] = parseInt(modal[i]);
        }

        for( let i = 0; i < pic.length; i++){
            precio2[i] = parseInt(precio[i]);
        }

        for( let i = 0; i < pic.length; i++){
            descuento2[i] = parseInt(descuento[i]);
        }

        for( let i = 0; i < pic.length; i++){
            publicado2[i] = parseInt(publicado[i]);
        }

        let casa: Inmueble = new Inmueble(String(req.query.catastro), String(req.query.descripcion), Number(req.query.tipoInmueble), Number(req.query.estadoInmueble), Number(req.query.tipoVivienda), Number(req.query.imagen));
        let imagen = new Imagen(pic2, String(req.query.catastro), url);
        let contain = new Contiene(String(req.query.catastro), caractSec2);
        let catalo = new Catalogo(String(req.query.catastro), modal2, precio2, descuento2, hoy, Number(req.query.propietario), publicado2);
        let caractInt = new CaracteristicasIntrinsecas(String(req.query.catastro), Number(req.query.nBano), Number(req.query.nCocina), Number(req.query.nHab), Number(req.query.id_certifEner));
        
        casa.insertDatos();
        imagen.insertDatos();
        contain.insertDatos();
        catalo.insertDatos();
        caractInt.insertDatos();
    }
	private id_catastro: string;
	private nBano: number;
	private nCocina: number;
	private nHab: number;
	private id_certifEner: number;

}