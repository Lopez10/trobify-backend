import { ConexionBD } from '../../ConexionBD';
import { Consultas } from '../../interface/baseDatos.interface';

export class CaracteristicasIntrinsecas implements Consultas {
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

	getDatos(id_catastro: string): CaracteristicasIntrinsecas {
		let datos = new CaracteristicasIntrinsecas();

		let select: string =
			'SELECT breveDescripcion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen ';
		let from: string = 'FROM inmueble ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = ConexionBD.getConsulta(select + from + where);

		datos.id_catastro = id_catastro;
		datos.breveDescripcion = consulta[0].breveDescripcion;
		datos.id_tipoInmueble = consulta[0].id_tipoInmueble;
		datos.id_estadoInmueble = consulta[0].id_estadoInmueble;
		datos.id_tipoVivienda = consulta[0].id_tipoVivienda;
		datos.id_imagen = consulta[0].id_imagen;

		return datos;
	}

	insertDatos(): string {
		try {
			let insert: string = 'INSERT INTO nBano, nCocina, nHab, id_certifEner ';
			let values: string =
				'VALUES ("' +
				this.id_catastro +
				'", ' +
				this.breveDescripcion +
				', ' +
				this.id_tipoInmueble +
				', ' +
				this.id_estadoInmueble +
				', ' +
				this.id_tipoVivienda +
				', ' +
				this.id_imagen +
				');';
			ConexionBD.getConsulta(insert + values);
		} catch {
			return 'ERROR al insertar los datos de INMUEBLE';
		}

		return 'Los datos se han insertado correctamente en INMUEBLE';
	}

	updateDatos(): string {
		throw new Error('Method not implemented.');
	}

	deleteDatos(): string {
		throw new Error('Method not implemented.');
	}
}
