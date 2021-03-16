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
select * from provincias;


-- -------------------------------------------------------------------------------------
SELECT inm.catastro_id as "catastro", cat.precio, inm.cant_Habitaciones as "nHab", inm.banos as "nBan", inm.cocina as "nCoc", inm.superficie as "area", ce.nombre as "certif", inm.breveDescripcion as "descrip", est.tipo as "tipoViv", img.valor as "urlImg", pro.provincia, ubi.longitud, ubi.latitud 
FROM catalogo cat, inmueble inm, ubicacion ubi, provincias pro, imagen img, CertificacionEnergetica ce, estado est 
WHERE (cat.catastro_id = inm.catastro_id 
	and ubi.ubicacion_id = inm.ubicacion_id 
    and ubi.prov = pro.provincia_id 
    and img.catastro_id = inm.catastro_id 
    and ce.id_certifEner = inm.id_certifEner 
    and est.id = inm.id_estado 
    and cat.id_modalidad = 2 
    and pro.provincia_id = 46
    );