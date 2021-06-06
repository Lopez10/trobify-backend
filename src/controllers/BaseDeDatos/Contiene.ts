import { Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';
import { MediadorInterface } from '../../interface/Mediador.interface';

export class Contiene implements Consultas {
	private id_catastro: string;
	private id_caractSecundaria: number[];

	constructor(id_catastro?: string, id_caractSecundaria?: number[]) {
		this.id_catastro = id_catastro;
		this.id_caractSecundaria = id_caractSecundaria;
	}

	getId_catastro(): string {
		return this.id_catastro;
	}
	getId_Caracteristicas(): number[] {
		return this.id_caractSecundaria;
	}
	async getCaracteristicas(): Promise<string[]> {
		let caracteristicas: string[] = [];

		for (let i = 0; i < this.id_caractSecundaria.length; i++) {
			caracteristicas.push(
				Consulta.getStringify(
					await Consulta.getConsulta(
						'SELECT caracteristica FROM CaractSecundarias WHERE id_caractSecundaria=' +
							this.id_caractSecundaria[i] +
							';'
					),
					'caracteristica'
				).toString()
			);
		}
		return caracteristicas;
	}

	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla('contiene', 'id_catastro', this.id_catastro);
	}

	async getDatos(id_catastro: string): Promise<Contiene> {
		let datos = new Contiene();

		let select: string = 'SELECT id_caractSecundaria ';
		let from: string = 'FROM Contiene ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;
		datos.id_caractSecundaria = Consulta.getStringify(consulta, 'id_caractSecundaria');

		return datos;
	}

	async insertDatos(): Promise<string> {
		try {
			for (let i = 0; i < this.id_caractSecundaria.length; i++) {
				let insert: string = 'INSERT INTO Contiene(id_catastro, id_caractSecundaria) ';
				let values: string =
					'VALUES ("' + this.id_catastro + '", ' + this.id_caractSecundaria[i] + ');';
				await Consulta.getConsulta(insert + values);
			}
		} catch {
			return 'ERROR al insertar los datos de CONTIENE';
		}

		return 'Los datos se han insertado correctamente en CONTIENE';
	}

	async updateDatos(): Promise<string> {
		try {
			this.deleteDatos(this.id_catastro);
			this.insertDatos();
		} catch {
			return 'ERROR los datos no se han actualizado en CONTIENE';
		}
		return 'Los datos se han actualizado correctamente';
	}

	async deleteDatos(id_catastro: string): Promise<string> {
		try {
			let delet: string = 'DELETE FROM Contiene ';
			let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

			let consulta: string = delet + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR los datos no se han eliminado';
		}
		return 'Los datos se han eliminado correctamente en CONTIENE';
	}
}
