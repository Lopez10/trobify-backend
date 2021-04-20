USE Trobify;

-- consultas de tablas unitarias
select * from habitacion;
select * from extra;
select * from imagen;
select * from tipodevivienda;
select * from estado;
select * from caracteristicas;
select * from contiene;
select * from inmueble;

select * from ubicacion;
select * from favoritos;
select * from cliente;
select * from filtros;
select * from catalogo;
select * from modalidad;
select * from usuario;
select * from CertificacionEnergetica;
select * from provincias;


-- -------------------------------------------------------------------------------------

-- Consulta de la hiperfunción chupiguay

SELECT inm.catastro_id as "catastro", cat.precio, inm.cant_Habitaciones as "nHab", inm.banos as "nBan", inm.cocina as "nCoc", inm.superficie as "area", ce.nombre as "certif", inm.breveDescripcion as "descrip", est.tipo as "estado", img.valor as "urlImg", pro.provincia, ubi.longitud, ubi.latitud, ubi.direccion, tpv.tipo as tpoViv 
FROM catalogo cat, inmueble inm, ubicacion ubi, provincias pro, imagen img, CertificacionEnergetica ce, estado est, tipodevivienda tpv 
WHERE (cat.catastro_id = inm.catastro_id 
	and tpv.id = inm.id_vivienda 
    and ubi.ubicacion_id = inm.ubicacion_id 
    and ubi.prov = pro.provincia_id 
    and img.catastro_id = inm.catastro_id 
    and ce.id_certifEner = inm.id_certifEner 
    and est.id = inm.id_estado 
    and cat.id_modalidad = 1) 
ORDER BY  cat.f_insercion DESC;


SELECT inm.catastro_id as "catastro", cat.precio, inm.cant_Habitaciones as "nHab", inm.banos as "nBan", inm.cocina as "nCoc", inm.superficie as "area", ce.nombre as "certif", inm.breveDescripcion as "descrip", est.tipo as "estado", img.valor as "urlImg", pro.provincia, ubi.longitud, ubi.latitud, tpv.tipo as tpoViv, tpv.id as tpoId 
FROM catalogo cat, inmueble inm, ubicacion ubi, provincias pro, imagen img, CertificacionEnergetica ce, estado est, tipodevivienda tpv 
WHERE (cat.catastro_id = inm.catastro_id 
	and tpv.id = inm.id_vivienda 
    and ubi.ubicacion_id = inm.ubicacion_id 
    and ubi.prov = pro.provincia_id 
    and img.catastro_id = inm.catastro_id 
    and ce.id_certifEner = inm.id_certifEner 
    and est.id = inm.id_estado
    and cat.id_modalidad = 1 
    and pro.provincia_id = 0) 
ORDER BY  cat.f_insercion;



SELECT inm.catastro_id as "catastro", cat.precio, inm.cant_Habitaciones as "nHab", inm.banos as "nBan", inm.cocina as "nCoc", inm.superficie as "area", ce.nombre as "certif", inm.breveDescripcion as "descrip", est.tipo as "estado", img.valor as "urlImg", pro.provincia, ubi.longitud, ubi.latitud, ubi.direccion, tpv.tipo as tpoViv, tpv.id as tpoId 
FROM catalogo cat, inmueble inm, ubicacion ubi, provincias pro, imagen img, CertificacionEnergetica ce, estado est, tipodevivienda tpv 
WHERE (cat.catastro_id = inm.catastro_id 
	and tpv.id = inm.id_vivienda 
    and ubi.ubicacion_id = inm.ubicacion_id
    and ubi.prov = pro.provincia_id 
    and img.catastro_id = inm.catastro_id 
    and ce.id_certifEner = inm.id_certifEner 
    and est.id = inm.id_estado 
    and cat.id_modalidad = 2) 
ORDER BY  cat.f_insercion;


select * 
from caracteristicas ca, contiene co
where ca.id = co.id
order by catastro_id;
