import { CaracteristicasIntrinsecas } from '../BaseDeDatos/CaracteristicasIntrinsecas';
import { Catalogo } from '../BaseDeDatos/Catalogo';
import { Contiene } from '../BaseDeDatos/Contiene';
import { DatosCatastro } from '../BaseDeDatos/DatosCatastro';
import { Imagen } from '../BaseDeDatos/Imagen';
import { Inmueble } from '../BaseDeDatos/inmueble';

export class IntercambioInmueble {
	protected contiene: Contiene;
	protected caracteristicas: CaracteristicasIntrinsecas;
	protected catastro: DatosCatastro;
	protected imagen: Imagen;
	protected catalogo: Catalogo;
	protected inmueble: Inmueble;

	protected constructor(id_catastro?: string) {
		if (id_catastro !== undefined) {
			this.setInmueble(id_catastro);
			this.setContiene(id_catastro);
			this.setCaracterísticas(id_catastro);
			this.setCatastro(id_catastro);
			this.setImagen(id_catastro);
			this.setCatalogo(id_catastro);
		}
	}

	setInmueble(id_catastro: string) {
		this.inmueble.getDatos(id_catastro);
	}
	setContiene(id_catastro: string) {
		this.contiene.getDatos(id_catastro);
	}
	setCaracterísticas(id_catastro: string) {
		this.caracteristicas.getDatos(id_catastro);
	}
	setCatastro(id_catastro: string) {
		this.catastro.getDatos(id_catastro);
	}
	setImagen(id_catastro: string) {
		this.imagen.getDatos(id_catastro);
	}
	setCatalogo(id_catastro: string) {
		this.catalogo.getDatos(id_catastro);
	}

	getInmueble(): Inmueble {
		return this.inmueble;
	}
	getContiene(): Contiene {
		return this.contiene;
	}
	getCaracteristicas(): CaracteristicasIntrinsecas {
		return this.caracteristicas;
	}
	getCatastro(): DatosCatastro {
		return this.catastro;
	}
	getImagen(): Imagen {
		return this.imagen;
	}
	getCatalogo(): Catalogo {
		return this.catalogo;
	}

	static async getInmueblesSegunFiltros(req: Request, res: Response): Promise<Response> {
		throw new Error('Method not implemented.');
	}

	static async getInmueblesPorMailDePropietario(req: Request, res: Response): Promise<Response> {
		throw new Error('Method not implemented.');
	}

	static async getInmueblesPorCatastroYModalidad(req: Request, res: Response): Promise<Response> {
		throw new Error('Method not implemented.');
	}

	static async postRegistrarNuevoInmueble(req: Request, res: Response): Promise<Response> {
		throw new Error('Method not implemented.');
	}

	static deleteInmueble(): string {
		throw new Error('Method not implemented.');
	}

	static updateInmueble(): string {
		throw new Error('Method not implemented.');
	}
}
