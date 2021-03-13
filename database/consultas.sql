USE Trobify;

-- consultas de tablas unitarias
select * from habitacion;
select * from extra;
select * from imagen;
select * from tipodevivienda;
select * from estado;
select * from caracteristicas;
select * from inmueble;
select * from contiene;
select * from ubicacion;
select * from favoritos;
select * from cliente;
select * from catalogo;
select * from usuario;
select * from CertificacionEnergetica;

-- devolver longitud, latitud y catastro
SELECT i.catastro_id, u.longitud, u.latitud 
FROM Inmueble i, Ubicacion u 
WHERE u.ubicacion_id = i.ubicacion_id;

-- relaciona los catastro_id con la longitud y latitud, además del resto de elementos para filtrar (las condiciones de filtro habrá que añadirlas al where)
SELECT i.catastro_id as "catastro", i.cant_habitaciones as "nHabitaciones", i.banos as "nBanos", i.cocina as "nCocinas", tp.tipo as "tipoVivienda" , e.tipo as "estado", ca.tipo as "caracteristicas"
FROM Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca
WHERE (tp.id = i.id_vivienda and
		e.id = i.id_estado and
        c.id = ca.id and
        c.catastro_id = i.catastro_id);

