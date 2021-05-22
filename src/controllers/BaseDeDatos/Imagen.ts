import { ConexionBD } from '../../ConexionBD';
import { Consultas } from '../../interface/baseDatos.interface';

export class Imagen implements Consultas {
	private id_imagen: number[];
	private id_catastro: string;
	private url: string[];

	constructor(id_imagen?: number[], id_catastro?: string, url?: string[]) {
		this.id_imagen = id_imagen;
		this.id_catastro = id_catastro;
		this.url = url;
	}

	getDatos(id_catastro: string) {
		let datos = new Imagen();

		let select: string = 'SELECT id_imagen, valor ';
		let from: string = 'FROM imagen ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = ConexionBD.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;

		// habrá que extraer un array
		datos.id_imagen = consulta[0].id_imagen;
		datos.url = consulta[0].valor;

		return datos;
	}
	insertDatos(): string {
		try {
			for (let i = 0; i < this.id_imagen.length; i++) {
				let insert: string = 'INSERT INTO id_imagen, id_catastro, valor ';
				let values: string =
					'VALUES (' + this.id_imagen[i] + ', "' + this.id_catastro + '", "' + this.url[i] + '");';
				ConexionBD.getConsulta(insert + values);
			}
		} catch {
			return 'ERROR al insertar los datos de IMEGEN';
		}

		return 'Los datos se han insertado correctamente en IMAGEN';
	}
	updateDatos(): string {
		throw new Error('Method not implemented.');
	}
	deleteDatos(): string {
		throw new Error('Method not implemented.');
	}
}
