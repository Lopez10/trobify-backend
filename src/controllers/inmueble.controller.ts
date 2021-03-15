import { Request, Response } from 'express';
import { connect } from '../database';
import { Inmueble } from '../interface/inmueble.interface';

export async function createInmueble(req: Request, res: Response) {
	const newInmueble: Inmueble = req.body;
	const conn = await connect();
	conn.query('INSERT INTO Catalogo SET ?', [newInmueble]);
	return res.json({
		message: 'Inmueble creado',
	});
}

export async function getUbicacion(req: Request, res: Response): Promise<Response> {
	const conn = await connect();
	const ubicacion = await conn.query('SELECT i.catastro_id, u.longitud, u.latitud FROM Inmueble i, Ubicacion u WHERE u.ubicacion_id = i.ubicacion_id');
	
	return res.json(ubicacion[0]);
}

export async function getFiltrados(req: Request, res: Response): Promise<Response> {
	/*
	nHab	= número de habitaciones
	nBan	= número de baños
	nCoc	= número de cocinas
	tip		= tipo de vivienda (dúplex, funca rústica,...)
	est		= estado (reformado, buen estado,...)
	cla		= clasificación energética
	*/

	// Encabezado de la consulta
	let select:string = 'DISTINCT i.catastro_id as "catastro", u.longitud, u.latitud'
	let from:String = 'Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca, certificacionEnergetica ce, ubicacion u';
	let where:String = '(tp.id = i.id_vivienda and c.id = ca.id and i.id_certifEner = ce.id_certifEner and i.ubicacion_id = u.ubicacion_id and c.catastro_id = i.catastro_id';

	// Parámetros de la consulta
	if ( !isNaN( Number( req.query.nHab ) ) ) { where += ' and i.cant_Habitaciones = ' + Number(req.query.nHab); }
	if ( !isNaN( Number( req.query.nBan ) ) ) { where += ' and i.cant_Habitaciones = ' + Number(req.query.nBan); }
	if ( !isNaN( Number( req.query.nCoc ) ) ) { where += ' and i.cant_Habitaciones = ' + Number(req.query.nCoc); }









	// Configuración de la subconsulta para lostipos de caracteristicas que pueden tener varias fílas
	/*
	let SubConsulta:string[] = ['Amueblado', 'Aire Acondicionado']
	let j:number=SubConsulta.length;

	if (true) {
		where += ' and i.catastro_id IN (SELECT catastro_id FROM (';
		for (let i = 0; i<j; i++) {
			where += 'SELECT co'+ i +'.catastro_id, ca' + i + '.tipo ';
			where += 'FROM caracteristicas ca' + i + ', contiene co' + i + ' ';
			where += 'WHERE ca'+ i +'.id = co'+ i +'.id and ca'+ i +'.tipo = "' + SubConsulta[i] + '"';
			if (i + 1 < j) where += ' UNION ALL ';
		}
		where += ') tipos GROUP BY catastro_id HAVING COUNT(catastro_id) = ' + j + ')';
	}
	*/

	// Final de la consulta chupiguay
	where += ');';
	const conn = await connect();

	console.log('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);
	const paraFilrar = await conn.query('SELECT ' + select + ' FROM ' + from + ' WHERE ' + where);

	
	return res.json(paraFilrar[0]);
}


// export async function getCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalog = conn.query('SELECT * FROM Catalogo WHERE id = ?', [id]);
//      return res.json(catalog);
// }

// Delete
// export async function deleteCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const conn = await connect();
//      const catalogo = conn.query('DELETE FROM Catalogo WHERE id = ?',[id]);
//      return res.json({
//           message: 'Catalogo eliminado'
//      });
// }

// Put
// export async function updateCatalog(req: Request, res:Response): Promise<Response> {
//      const id = req.params.postId;
//      const updatePost = req.body;
//      const conn = await connect();
//      const catalogo = conn.query('UPDATE Catalogo set ? WHERE id = ?',[updatePost, id]);
//      return res.json({
//           message: 'Catalogo actualizado'
//      });
// }
