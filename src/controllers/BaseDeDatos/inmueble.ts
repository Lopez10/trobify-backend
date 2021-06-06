import { Consultas } from '../../interface/baseDatos.interface';
import { Consulta } from './Consulta';
import { MediadorInterface } from '../../interface/Mediador.interface';

export class Inmueble implements Consultas {
	private id_catastro: string;
	private breveDescripcion: string;
	private id_tipoInmueble: number;
	private id_estadoInmueble: number;
	private id_tipoVivienda: number;
	private id_imagen: number;

	constructor(
		id_catastro?: string,
		breveDescripcion?: string,
		id_tipoInmueble?: number,
		id_estadoInmueble?: number,
		id_tipoVivienda?: number,
		id_imagen?: number
	) {
		this.id_catastro = id_catastro;
		this.breveDescripcion = breveDescripcion;
		this.id_tipoInmueble = id_tipoInmueble;
		this.id_estadoInmueble = id_estadoInmueble;
		this.id_tipoVivienda = id_tipoVivienda;
		this.id_imagen = id_imagen;
	}

	setId_catastro(id_catastro: string) {
		this.id_catastro = id_catastro;
	}
	setBreveDescipcion(breveDescripcion: string) {
		this.breveDescripcion = breveDescripcion;
	}
	setId_tipoInmueble(id_tipoInmueble: number) {
		this.id_tipoInmueble = id_tipoInmueble;
	}
	setId_estadoInmueble(id_estadoInmueble: number) {
		this.id_estadoInmueble = id_estadoInmueble;
	}
	setId_tipoVivienda(id_tipoVivienda: number) {
		this.id_tipoVivienda = id_tipoVivienda;
	}
	setId_imagen(id_imagen: number) {
		this.id_imagen = id_imagen;
	}

	getId_catastro(): string {
		return this.id_catastro;
	}
	getBreveDescipcion(): string {
		return this.breveDescripcion;
	}
	getId_tipoInmueble(): number {
		return this.id_tipoInmueble;
	}
	getId_estadoInmueble(): number {
		return this.id_estadoInmueble;
	}
	getId_tipoVivienda(): number {
		return this.id_tipoVivienda;
	}
	getId_imagen(): number | string {
		return this.id_imagen;
	}
	async getUrlToIdImagen(): Promise<string> {
		return Consulta.getStringify(
			await Consulta.getConsulta(
				'SELECT valor FROM imagen WHERE id_imagen IN (SELECT MIN(id_imagen) as minimo FROM Imagen WHERE id_catastro = "' +
					this.id_catastro +
					'");'
			),
			'valor'
		).toString();
	}
	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla(
			'caractintrinsecas',
			'id_catastro',
			this.id_catastro
		);
	}

	async getDatos(id_catastro: string): Promise<Inmueble> {
		let select: string =
			'SELECT breveDescripcion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen ';
		let from: string = 'FROM inmueble ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

		let datos = new Inmueble(
			id_catastro,
			consulta[0][0].breveDescripcion,
			consulta[0][0].id_tipoInmueble,
			consulta[0][0].id_estadoInmueble,
			consulta[0][0].id_tipoVivienda,
			consulta[0][0].id_imagen
		);
		return datos;
	}

	async insertDatos(): Promise<string> {
		try {
			let insert: string =
				'INSERT INTO Inmueble(id_catastro, breveDescripcion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen) ';
			let values: string =
				'VALUES ("' +
				this.id_catastro +
				'", "' +
				this.breveDescripcion +
				'", ' +
				this.id_tipoInmueble +
				', ' +
				this.id_estadoInmueble +
				', ' +
				this.id_tipoVivienda +
				', ' +
				this.id_imagen +
				');';
			await Consulta.getConsulta(insert + values);
		} catch {
			return 'ERROR al insertar los datos de INMUEBLE';
		}

		return 'Los datos se han insertado correctamente en INMUEBLE';
	}

	async updateDatos(): Promise<string> {
		try {
			let update: string = 'UPDATE Inmueble ';
			let set: string =
				'SET id_catastro ="' +
				this.id_catastro +
				'", breveDescripcion ="' +
				this.breveDescripcion +
				'", id_tipoInmueble = ' +
				this.id_tipoInmueble +
				', id_estadoInmueble = ' +
				this.id_estadoInmueble +
				', id_tipoVivienda = ' +
				this.id_tipoVivienda +
				', id_imagen = ' +
				this.id_imagen +
				';';
			let where: string = 'WHERE id_catastro ="' + this.id_catastro + ';';
			await Consulta.getConsulta(update + set + where);
		} catch {
			return 'ERROR El inmueble no ha podido ser actualizado';
		}
		return 'El inmueble ha sido actualizado satisfactoriamente';
	}

	async deleteDatos(id_catastro: string): Promise<string> {
		try {
			let delet: string = 'DELETE FROM Inmueble ';
			let where: string = 'WHERE id_catastro ="' + id_catastro + '";';

			let consulta: string = delet + where;
			await Consulta.getConsulta(consulta);
		} catch {
			return 'ERROR Ha sido imposible eliminar este inmueble';
		}
		return 'El inmueble ha sido eliminado';
	}
}
