import { Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';
import { MediadorInterface } from '../../interface/Mediador.interface';

export class Catalogo implements Consultas {
	private id_catastro: string;
	private id_modalidad: number[];
	private precio: number[];
	private descuento: number[];
	private f_insercion: string;
	private id_usuario: number;
	private publicado: number[];

	constructor(
		id_catastro?: string,
		id_modalidad?: number[],
		precio?: number[],
		descuento?: number[],
		f_insercion?: string,
		id_usuario?: number,
		publicado?: number[]
	) {
		this.id_catastro = id_catastro;
		this.id_modalidad = id_modalidad;
		this.precio = precio;
		this.descuento = descuento;
		this.f_insercion = f_insercion;
		this.id_usuario = id_usuario;
		this.publicado = publicado;
	}

	setId_catastro(id_catastro: string) {}
	setModalidad(id_modalidad: number[]) {}
	setPrecio(precio: number[]) {}
	setDescuento(descuento: number[]) {}
	setId_usuario(id_usuario: number) {}
	setPublicado(publicado: boolean[]) {}

	getId_catastro(): string {
		return this.id_catastro;
	}
	getModalidad(): number[] {
		return this.id_modalidad;
	}
	getPrecio(): number[] {
		return this.precio;
	}
	getDescuento(): number[] {
		return this.descuento;
	}
	getId_usuario(): number {
		return this.id_usuario;
	}
	getPublicado(): number[] {
		return this.publicado;
	}

	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla('catalogo', 'id_catastro', this.id_catastro);
	}

	async getDatos(id_catastro: string): Promise<Catalogo> {
		return Catalogo.getDatos(id_catastro);
	}

	static async getDatos(id_catastro: string): Promise<Catalogo> {
		let select: string =
			'SELECT id_modalidad, precio, descuento, f_insercion, id_usuario, publicado ';
		let from: string = 'FROM catalogo ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

		let datos = new Catalogo(
			id_catastro,
			consulta[0][0].id_modalidad,
			consulta[0][0].precio,
			consulta[0][0].descuento,
			consulta[0][0].f_insercion,
			consulta[0][0].id_usuario,
			consulta[0][0].publicado
		);
		return datos;
	}

	async insertDatos(): Promise<string> {
		try {
			for (let i = 0; i < this.id_modalidad.length; i++) {
				let conversion: number = 0;
				if (this.publicado[i]) conversion = 1;
				let insert: string =
					'INSERT INTO Catalogo(id_catastro, id_modalidad, precio, descuento, f_insercion,id_usuario, publicado) ';
				let values: string =
					'VALUES ("' +
					this.id_catastro +
					'", ' +
					this.id_modalidad +
					', ' +
					this.precio +
					', ' +
					this.descuento +
					', ' +
					this.f_insercion +
					', ' +
					this.id_usuario +
					', ' +
					conversion +
					');';
				await Consulta.getConsulta(insert + values);
			}
		} catch {
			return 'ERROR al insertar los datos de CATALOGO';
		}

		return 'Los datos se han insertado correctamente en CATALOGO';
	}

	async updateDatos(): Promise<string> {
		try {
			this.deleteDatos(this.id_catastro);
			this.insertDatos();
		} catch {
			return 'ERROR el catalogo no ha podido actualizarse.';
		}
		return 'El catalogo ha sido actualizado.';
	}

	async deleteDatos(id_catastro: string): Promise<string> {
		try {
			let delet: string = 'DELETE FROM Catalogo ';
			let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

			let consulta = delet + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR el catalogo no ha podido ser eliminado.';
		}
		return 'El catalogo ha sido eliminado.';
	}
}
