USE Trobify;

-- consultas de tablas unitarias
SELECT * FROM Favoritos; 
SELECT * FROM Filtros; 
SELECT * FROM Extra; 
SELECT * FROM Imagen; 
SELECT * FROM Contiene; 
SELECT * FROM CaractSecundarias;
SELECT * FROM CaractIntrinsecas;
SELECT * FROM DiferentesTiposInmuebles; 
SELECT * FROM Catalogo; 
SELECT * FROM Inmueble; 
SELECT * FROM CertificacionEnergetica; 
SELECT * FROM EstadoInmueble; 
SELECT * FROM TipoDeVivienda; 
SELECT * FROM TipoDeInmueble; 
SELECT * FROM Modalidad; 
SELECT * FROM Usuario;
SELECT * FROM RolUsuario; 
SELECT * FROM Ubicacion;
SELECT * FROM Provincias;

DELETE FROM Ubicacion WHERE id_ubicacion = "18";

SELECT inm.id_catastro, inm.superficie, inm.breveDescripcion, ubi.direccion, ubi.latitud, ubi.longitud, ubi.prov, cat.id_modalidad, cat.precio, cat.descuento, cat.id_usuario as propietario, car.nHab, car.nBano, car.nCocina, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, cer.certifEner 
FROM inmueble inm, ubicacion ubi, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI  
WHERE ubi.id_ubicacion = inm.id_ubicacion AND inm.id_catastro = cat.id_catastro AND inm.id_catastro = car.id_catastro AND cer.id_certifEner = car.id_certifEner AND ubi.id_ubicacion = inm.id_ubicacion AND inm.id_estadoInmueble = est.id_estadoInmueble AND inm.id_tipoVivienda = tpoV.id_tipoVivienda AND inm.id_tipoInmueble = tpoI.id_tipoInmueble AND cat.id_modalidad = 1 AND inm.id_catastro IN (SELECT DISTINCT inm.id_catastro FROM inmueble inm, ubicacion ubi, provincias pro, tipodeinmueble tpoI, catalogo cat, modalidad mo WHERE inm.id_tipoInmueble = tpoI.id_tipoInmueble AND inm.id_ubicacion = ubi.id_ubicacion AND ubi.prov = pro.id_provincia AND inm.id_catastro = cat.id_catastro AND cat.id_modalidad = mo.id_modalidad AND mo.id_modalidad = 1 AND pro.id_provincia = 46 AND tpoI.id_tipoInmueble = 3) AND inm.id_catastro IN (SELECT id_catastro FROM (SELECT co0.id_catastro, ca0.caracteristica FROM caractsecundarias ca0, contiene co0 WHERE ca0.id_caractSecundaria = co0.id_caractSecundaria and ca0.id_caractSecundaria = "1" UNION ALL SELECT co1.id_catastro, ca1.caracteristica FROM caractsecundarias ca1, contiene co1 WHERE ca1.id_caractSecundaria = co1.id_caractSecundaria and ca1.id_caractSecundaria = "2") caracteristica GROUP BY id_catastro HAVING COUNT(id_catastro) = 2)
ORDER BY  cat.f_insercion;


SELECT MAX(id_ubicacion) as maximo
FROM ubicacion;


SELECT MIN(Im.id_imagen) as minimo FROM Imagen Im WHERE Im.id_catastro = "CARMELO0000000000001";

SELECT COUNT(id_catastro) as cuenta FROM Imagen WHERE id_catastro LIKE ( "CARMELO0000000000002");
SELECT COUNT(id_catastro) as cuenta FROM Inmueble WHERE id_catastro LIKE ( "CARMELO0000000000001");
SELECT COUNT(id_catastro) as cuenta FROM catalogo WHERE id_catastro LIKE ( "CARMELO0000000000001");
SELECT COUNT(id_catastro) as cuenta FROM caractintrinsecas WHERE id_catastro LIKE ( "CARMELO0000000000001");
SELECT COUNT(id_catastro) as cuenta FROM contiene WHERE id_catastro LIKE ( "CARMELO0000000000001");



INSERT INTO Contiene  VALUES (3, "CARMELO0000000000001");