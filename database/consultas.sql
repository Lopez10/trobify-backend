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
select * from modalidad;
select * from usuario;
select * from CertificacionEnergetica;


-- -------------------------------------------------------------------------------------


-- devolver longitud, latitud y catastro
SELECT i.catastro_id, u.longitud, u.latitud 
FROM Inmueble i, Ubicacion u 
WHERE u.ubicacion_id = i.ubicacion_id;

SELECT i.catastro_id as "catastro", i.cant_habitaciones as "nHabitaciones", i.banos as "nBanos", i.cocina as "nCocinas", tp.tipo as "tipoVivienda" , e.tipo as "estado", ca.tipo as "caracteristicas"
FROM Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca
WHERE (tp.id = i.id_vivienda and
		e.id = i.id_estado and
        c.id = ca.id and
        c.catastro_id = i.catastro_id);  
        
        
        
        
-- devolver tabla para filtrar
SELECT distinct i.catastro_id , i.cant_habitaciones , i.banos , i.cocina , tp.tipo as "tipoVivienda" , e.tipo as "estado", ce.nombre , u.longitud, u.latitud
FROM Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca, certificacionEnergetica ce, ubicacion u
WHERE (tp.id = i.id_vivienda and
		e.id = i.id_estado and
        c.id = ca.id and
        i.id_certifEner = ce.id_certifEner and
        i.ubicacion_id = u.ubicacion_id and
        c.catastro_id = i.catastro_id and
        i.catastro_id IN (select c1.catastro_id
							from caracteristicas ca1, contiene c1
							where ca1.id = c1.id and
									ca1.tipo = 'Garaje'));
                                    
                                    
SELECT distinct i.catastro_id as "catastro", i.cant_habitaciones as "nHabitaciones", i.banos as "nBanos", i.cocina as "nCocinas", tp.tipo as "tipoVivienda" , e.tipo as "estado", ce.nombre as "energia", u.longitud, u.latitud
FROM Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca, certificacionEnergetica ce, ubicacion u
WHERE (tp.id = i.id_vivienda and
		e.id = i.id_estado and
        c.id = ca.id and
        i.id_certifEner = ce.id_certifEner and
        i.ubicacion_id = u.ubicacion_id and
        c.catastro_id = i.catastro_id);                                  
                                    
select c1.catastro_id, ca1.tipo
from caracteristicas ca1, contiene c1
where ca1.id = c1.id and
        ca1.tipo = "Piscina" and
        c1.id in (select c12.catastro_id
					from caracteristicas ca12, contiene c12
					where ca12.id = c12.id and
							ca12.tipo = "Garaje") ;   
        
select c1.catastro_id, ca1.tipo
from caracteristicas ca1, contiene c1
where ca1.id = c1.id;


select catastro_id
from (
	select co1.catastro_id, ca1.tipo
	from caracteristicas ca1, contiene co1
	where ca1.id = co1.id and
			ca1.tipo = 'Garaje'
            
	union all
    
    select co.catastro_id, ca.tipo
	from caracteristicas ca, contiene co
	where ca.id = co.id and
			ca.tipo = 'Aire Acondicionado'
) tipos 
group by catastro_id
having count(catastro_id) = 2;


select co.catastro_id, ca.tipo
from caracteristicas ca, contiene co
where ca.id = co.id
Order by catastro_id;



-- group by ca1.tipo
-- having ca1.tipo = 'Piscina';








-- devolver tabla para filtrar
SELECT distinct i.catastro_id as "catastro", i.cant_habitaciones as "nHabitaciones", i.banos as "nBanos", i.cocina as "nCocinas", tp.tipo as "tipoVivienda" , e.tipo as "estado", ce.nombre as "energia", u.longitud, u.latitud
FROM Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca, certificacionEnergetica ce, ubicacion u
WHERE (tp.id = i.id_vivienda and
		e.id = i.id_estado and
        c.id = ca.id and
        i.id_certifEner = ce.id_certifEner and
        i.ubicacion_id = u.ubicacion_id and
        c.catastro_id = i.catastro_id and
        i.catastro_id IN (select catastro_id
							from (
								select co1.catastro_id, ca1.tipo
								from caracteristicas ca1, contiene co1
								where ca1.id = co1.id and
										ca1.tipo = 'Garaje'
										
								union all
								
								select co.catastro_id, ca.tipo
								from caracteristicas ca, contiene co
								where ca.id = co.id and
										ca.tipo = 'Aire Acondicionado'
							) tipos 
							group by catastro_id
							having count(catastro_id) = 2));


SELECT DISTINCT i.catastro_id as "catastro", u.longitud, u.latitud 
FROM Inmueble i, TipoDeVivienda tp, Estado e, contiene c, caracteristicas ca, certificacionEnergetica ce, ubicacion u 
WHERE (tp.id = i.id_vivienda 
		and c.id = ca.id 
        and i.id_certifEner = ce.id_certifEner 
        and i.ubicacion_id = u.ubicacion_id 
        and c.catastro_id = i.catastro_id 
        and i.cant_Habitaciones = 1);