import { Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';
import { Componente } from './Mediador/Componente';
import { MediadorInterface } from '../../interface/Mediador.interface';

export class Catalogo extends Componente implements Consultas  {
	private id_catastro: string;
	private id_modalidad: number[];
	private precio: number[];
	private descuento: number[];
	private f_insercion: Date;
	private id_usuario: number;
	private publicado: boolean[];

	constructor(
		id_catastro?: string,
		id_modalidad?: number[],
		precio?: number[],
		descuento?: number[],
		f_insercion?: Date,
		id_usuario?: number,
		publicado?: boolean[]
	) {
		super();
		this.id_catastro = id_catastro;
		this.id_modalidad = id_modalidad;
		this.precio = precio;
		this.descuento = descuento;
		this.f_insercion = f_insercion;
		this.id_usuario = id_usuario;
		this.publicado = publicado;
	}
	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla('catalogo', 'id_catastro', this.id_catastro);
	}

	async getDatos(id_catastro: string): Promise<Catalogo> {
		let datos = new Catalogo();

		let select: string =
			'SELECT id_modalidad, precio, descuento, f_insercion, id_usuario, publicado ';
		let from: string = 'FROM catalogo ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;
		datos.f_insercion = consulta[0].f_insercion;
		datos.id_usuario = consulta[0].id_usuario;
		// habrá que extraer un array
		datos.id_modalidad = consulta[0].id_modalidad;
		datos.precio = consulta[0].precio;
		datos.descuento = consulta[0].descuento;
		datos.publicado = consulta[0].publicado;

		return datos;
	}

	insertDatos(): string {
		try {
			for (let i = 0; i < this.id_modalidad.length; i++) {
				let conversion: number = 0;
				if (this.publicado[i]) conversion = 1;
				let insert: string =
					'INSERT INTO id_catastro, id_modalidad, precio, descuento, f_insercion,id_usuario, publicado ';
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
				Consulta.getConsulta(insert + values);
			}
		} catch {
			return 'ERROR al insertar los datos de CATALOGO';
		}

		return 'Los datos se han insertado correctamente en CATALOGO';
	}

	updateDatos(): string {
		try {
			this.deleteDatos();
			this.insertDatos();
		} catch {
			return 'ERROR el catalogo no ha podido actualizarse.';
		}
		return 'El catalogo ha sido actualizado.';
	}

	deleteDatos(): string {
		try {
			let delet: string = 'DELETE FROM Catalogo ';
			let where: string = 'WHERE id_catastro = "' + this.id_catastro + '";';

			let consulta = delet + where;
			Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR el catalogo no ha podido ser eliminado.';
		}
		return 'El catalogo ha sido eliminado.';
	}

	setMediadot(mediator: MediadorInterface){
		this.setMediador(mediator);
	};

	recibir(msg: string): string{
		return ("Catalogo ha recibido:" + msg);
	}
}
