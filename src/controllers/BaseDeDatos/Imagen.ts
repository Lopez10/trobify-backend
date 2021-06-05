import { Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';
import { Componente } from './Mediador/Componente';
import { MediadorInterface } from '../../interface/Mediador.interface';

export class Imagen extends Componente implements Consultas {
	private id_imagen: number[];
	private id_catastro: string;
	private url: string[];

	constructor(id_imagen?: number[], id_catastro?: string, url?: string[]) {
		super();
		this.id_imagen = id_imagen;
		this.id_catastro = id_catastro;
		this.url = url;
	}

	setId_imagen(id: number[]) {
		this.id_imagen = id;
	}
	setId_catastro(id: string) {
		this.id_catastro = id;
	}
	setUrl(url: string[]) {
		this.url = url;
	}

	getId_imagen(): number[] {
		return this.id_imagen;
	}
	getId_catastro(): string {
		return this.id_catastro;
	}
	getUrl(): string[] {
		return this.url;
	}

	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla('imagen', 'id_catastro', this.id_catastro);
	}

	async getDatos(id_catastro: string): Promise<Imagen> {
		let datos = new Imagen();

		let select: string = 'SELECT id_imagen, valor ';
		let from: string = 'FROM imagen ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;

		// habrá que extraer un array
		datos.id_imagen = consulta[0].id_imagen;
		datos.url = consulta[0].valor;

		return datos;
	}

	async insertDatos(): Promise<string> {
		try {
			for (let i = 0; i < this.id_imagen.length; i++) {
				let insert: string = 'INSERT INTO id_imagen, id_catastro, valor ';
				let values: string =
					'VALUES (' + this.id_imagen[i] + ', "' + this.id_catastro + '", "' + this.url[i] + '");';
				await Consulta.getConsulta(insert + values);
			}
		} catch {
			return 'ERROR al insertar los datos de IMAGEN';
		}

		return 'Los datos se han insertado correctamente en IMAGEN';
	}

	async updateDatos(): Promise<string> {
		try {
			this.deleteDatos();
			this.insertDatos();
		} catch {
			return 'ERROR al actualizar las imagenes';
		}
		return 'Las imagenes han sido actualizadas satisfactoriamente';
	}

	async deleteDatos(): Promise<string> {
		try {
			let delet: string = 'DELETE FROM Imagen ';
			let where: string = 'WHERE id_catastro = "' + this.id_catastro + '";';

			let consulta: string = delet + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'Las imagenes no han podido elimnarse.';
		}
		return 'Las imagenes han sido eliminadas correctamente.';
	}

	setMediator(mediator: MediadorInterface) {
		this.setMediador(mediator);
	}

	recibir(msg: string): string {
		return 'Imagen ha recibido:' + msg;
	}
}
