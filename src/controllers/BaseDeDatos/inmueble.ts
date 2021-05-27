import { ConexionBD } from '../../ConexionBD';
import { Consultas } from '../../interface/baseDatos.interface';
import { BaseDeDatos } from './BaseDeDatos';
import { Consulta } from './Consulta';

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

	async existeYaElDato(): Promise<boolean> {
		return await Consulta.existeElementoEnTabla(
			'caractintrinsecas',
			'id_catastro',
			this.id_catastro
		);
	}

	async getDatos(id_catastro: string): Promise<Inmueble> {
		let datos = new Inmueble();

		let select: string =
			'SELECT breveDescripcion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen ';
		let from: string = 'FROM inmueble ';
		let where: string = 'WHERE id_catastro = "' + id_catastro + '";';

		let consulta = await Consulta.getConsulta(select + from + where);

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
			let insert: string = 'INSERT INTO id_catastro, breveDescripcion, id_tipoInmueble, id_tipoVivienda, id_imagen ';
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
			Consulta.getConsulta(insert + values);
		} catch {
			return 'ERROR al insertar los datos de INMUEBLE';
		}

		return 'Los datos se han insertado correctamente en INMUEBLE';
	}

	updateDatos(): string {
		try{
			let update: string = 'UPDATE Inmueble ';
			let set: string = 'SET id_catastro ="' +
			                  'dato1' +
							  '", breveDescripcion ="' +
							  'dato1' +
							  '", id_tipoInmueble = ' +
							  'dato1' +
							  ', id_estadoInmueble = ' +
							  'dato1' +
							  ', id_tipoVivienda = ' +
							  'dato1' +
							  ', id_imagen = '
							  'dato1 ';
			let where: string = 'WHERE id_catastro ="' +
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
								this.id_imagen + ';';
			let consulta: string = update + set + where;
			Consulta.getConsulta(consulta);
		} catch{
			return 'El inmueble no ha podido ser actualizado';
		}
		return 'El inmueble ha sido actualizado satisfactoriamente';
	}

	deleteDatos(): string {
		try{
			let delet: string = 'DELETE FROM Inmueble '
			let where: string = 'WHERE id_catastro ="' +
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
								this.id_imagen + ';';
			let consulta: string = delet + where;
			Consulta.getConsulta(consulta);
		} catch{
			return 'Ha sido imposible eliminar este inmueble';
		}
		return 'El inmueble ha sido eliminado';
	}
}
