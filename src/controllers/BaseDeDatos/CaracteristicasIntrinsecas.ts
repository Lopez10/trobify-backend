import { ConexionBD } from '../../ConexionBD';
import { Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';
import { MediadorInterface } from '../../interface/Mediador.interface';

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

	setId_catastro(id_catastro: string) {
		this.id_catastro = id_catastro;
	}
	setNBano(nbano: number) {
		this.nBano = this.nBano;
	}
	setNCocina(nCocina: number) {
		this.nCocina = nCocina;
	}
	setNHab(nHab: number) {
		this.nHab = nHab;
	}
	setId_certifener(id_certifEner: number) {
		this.id_certifEner = id_certifEner;
	}

	getId_catastro(): string {
		return this.id_catastro;
	}
	getNBano(): number {
		return this.nBano;
	}
	getNCocina(): number {
		return this.nCocina;
	}
	getNHab(): number {
		return this.nHab;
	}
	getId_certifener(): number {
		return this.id_certifEner;
	}
	async getCertifEner(): Promise<string> {
		return await Consulta.getConsulta(
			'SELECT certifEner FROM certificacionenergetica WHERE id_certifEner = (SELECT id_certifEner FROM CaractIntrinsecas WHERE id_catastro = "' +
				this.id_catastro +
				'");'
		);
	}

	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla('catalogo', 'id_catastro', this.id_catastro);
	}

	async getDatos(id_catastro: string): Promise<CaracteristicasIntrinsecas> {
		let datos = new CaracteristicasIntrinsecas();

		let select: string = 'SELECT nBano, nCocina, nHab, id_certifEner ';
		let from: string = 'FROM caractintrinsecas ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;
		datos.nBano = consulta[0].nBanos;
		datos.nCocina = consulta[0].nCocina;
		datos.nHab = consulta[0].nHab;
		datos.id_certifEner = consulta[0].id_certifEner;

		return datos;
	}

	async insertDatos(): Promise<string> {
		try {
			let insert: string =
				'INSERT INTO CaractIntrinsecas (id_catastro, nBano, nCocina, nHab, id_certifEner) ';
			let values: string =
				'VALUES (' +
				this.id_catastro +
				', ' +
				this.nBano +
				', ' +
				this.nCocina +
				', ' +
				this.id_certifEner +
				', ' +
				this.nHab +
				');';
			await Consulta.getConsulta(insert + values);
		} catch {
			return 'ERROR al insertar los datos de CARACTINTRINSECAS';
		}

		return 'Los datos se han insertado correctamente en CARACTINTRINSECAS';
	}

	async updateDatos(): Promise<string> {
		try {
			let update: string = 'UPDATE CaractIntrinsecas ';
			let set: string =
				'SET nBano = ' +
				this.nBano +
				', nCocina = ' +
				this.nCocina +
				', id_certifEner = ' +
				this.id_certifEner +
				', nHab = ' +
				this.nHab;
			let where: string = ' WHERE id_catastro = "' + this.id_catastro + '";';

			let consulta: string = update + set + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR las características intrinsecas no han podido actualizarse.';
		}
		return 'Las características intrinsecas han sido actualizadas.';
	}

	async deleteDatos(id_catastro: string): Promise<string> {
		try {
			let delet: string = 'DELETE FROM CaractIntrinsecas ';
			let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

			let consulta: string = delet + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR las caracteríscticas intrinsecas no han podido eliminarse.';
		}
		return 'Las características intrinsecas se han eliminado correctamente.';
	}
}
