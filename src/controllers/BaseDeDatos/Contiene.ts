import { ConexionBD } from '../../ConexionBD';
import { Consultas } from '../../interface/baseDatos.interface';

export class Contiene implements Consultas {
	private id_catastro: string;
	private id_caractSecundaria: number[];

	constructor(id_catastro?: string, id_caractSecundaria?: number[]) {
		this.id_catastro = id_catastro;
		this.id_caractSecundaria = id_caractSecundaria;
	}

	getDatos(id_catastro: string): Contiene {
		let datos = new Contiene();

		let select: string = 'SELECT id_caractSecundaria ';
		let from: string = 'FROM Contiene ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = ConexionBD.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;

		// habrá que extraer un array
		datos.id_caractSecundaria = consulta[0].id_caractSecundaria;

		return datos;
	}

	insertDatos(): string {
		try {
			for (let i = 0; i < this.id_caractSecundaria.length; i++) {
				let insert: string = 'INSERT INTO id_catastro, id_caractSecundaria ';
				let values: string =
					'VALUES ("' + this.id_catastro + '", ' + this.id_caractSecundaria[i] + ');';
				ConexionBD.getConsulta(insert + values);
			}
		} catch {
			return 'ERROR al insertar los datos de CONTIENE';
		}

		return 'Los datos se han insertado correctamente en CONTIENE';
	}

	updateDatos(): string {
		throw new Error('Method not implemented.');
	}

	deleteDatos(): string {
		throw new Error('Method not implemented.');
	}
}
