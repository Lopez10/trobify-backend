import { ConexionBD } from '../../ConexionBD';
import { Consultas } from '../../interface/baseDatos.interface';

export class CaracteristicasIntrinsecas implements Consultas {
	private id_catastro: string;
	private nBano: number;
	private nCocina: number;
	private nHab: number;
	private id_certifEner: number;

	constructor(
		id_catastro?: string,
		nBano?: number,
		nCocina?: number,
		nHab?: number,
		id_certifEner?: number
	) {
		this.id_catastro = id_catastro;
		this.nBano = nBano;
		this.nCocina = nCocina;
		this.nHab = nHab;
		this.id_certifEner = id_certifEner;
	}

	getDatos(id_catastro: string): CaracteristicasIntrinsecas {
		let datos = new CaracteristicasIntrinsecas();

		let select: string = 'SELECT nBano, nCocina, nHab, id_certifEner ';
		let from: string = 'FROM caractintrinsecas ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = ConexionBD.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;
		datos.nBano = consulta[0].nBanos;
		datos.nCocina = consulta[0].nCocina;
		datos.nHab = consulta[0].nHab;
		datos.id_certifEner = consulta[0].id_certifEner;

		return datos;
	}

	insertDatos(): string {
		try {
			let insert: string = 'INSERT INTO nBano, nCocina, nHab, id_certifEner ';
			let values: string =
				'VALUES ("' +
				this.id_catastro +
				'", ' +
				this.nBano +
				', ' +
				this.nCocina +
				', ' +
				this.id_certifEner +
				', ' +
				this.nHab +
				');';
			ConexionBD.getConsulta(insert + values);
		} catch {
			return 'ERROR al insertar los datos de CARACTINTRINSECAS';
		}

		return 'Los datos se han insertado correctamente en CARACTINTRINSECAS';
	}

	updateDatos(): string {
		throw new Error('Method not implemented.');
	}

	deleteDatos(): string {
		throw new Error('Method not implemented.');
	}
}
