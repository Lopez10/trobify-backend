import { Inmueble } from './Inmueble';
import { Request, Response } from 'express';

export class Eliminar extends Inmueble {
	async eliminarInmueble(req: Request, res: Response): Promise<Response> {
		let a = this.deleteInmueble(req, false);
		return res.json(a);
	}

	async modificarInmueble(req: Request, res: Response): Promise<Response> {
		this.deleteInmueble(req, true);
		return res.json('Tus muertos, so desgraciado');
	}

	async eliminarSegunId(tabla: string, columna: string, parametro: string): Promise<boolean> {
		let consulta: string = 'DELETE FROM ' + tabla + ' WHERE ' + columna + ' = "' + parametro + '";';

		await Inmueble.BD.accesoBD(consulta);

		return true;
	}
	async deleteInmueble(req: Request, roll: Boolean): Promise<string> {
		const id_catastro: string = String(req.body.id_catastro);

		const ubicacion = await Inmueble.BD.accesoBD(
			'SELECT id_ubicacion as ubicacion FROM Inmueble WHERE id_catastro = "' + id_catastro + '";'
		);

		var id_ubicacion: number;
		JSON.parse(JSON.stringify(ubicacion[0])).forEach((item) => {
			id_ubicacion = item.ubicacion;
		});
		if (!(await Inmueble.existeInmueble(id_catastro))) {
			return 'Este inmueble NO se encuentra en nuestra Base de Datos';
		}

		let mensajeFin: string = 'Los datos se han eliminado correctamente';
		let fallo: boolean;

		let tablasALimpiar: string[] = [
			'Contiene',
			'CaractIntrinsecas',
			'Catalogo',
			'Inmueble',
			'Imagen',
		];
		for (let i = 0; i < tablasALimpiar.length; i++) {
			fallo = await this.eliminarSegunId(tablasALimpiar[i], 'id_catastro', id_catastro);
			if (!fallo)
				mensajeFin = 'No se puede eliminar ' + id_catastro + ' de la tabla ' + tablasALimpiar[i];
		}
		fallo = await this.eliminarSegunId('Ubicacion', 'id_ubicacion', '' + id_ubicacion);
		if (!fallo) mensajeFin = 'No se puede eliminar ' + id_ubicacion + ' de la tabla ' + 'Ubicacion';

		if (roll) this.regInmueble(req);
		return mensajeFin;
	}
}
