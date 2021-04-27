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




SELECT inm.id_catastro as "catastro", inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif"
FROM inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert
WHERE inm.id_estadoInmueble = est.id_estadoInmueble
	AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble
    AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda
    AND cat.id_catastro = inm.id_catastro
    AND inm.id_ubicacion = ub.id_ubicacion
    AND ub.prov = pro.id_provincia
    AND img.id_catastro = inm.id_catastro
    AND intr.id_catastro = inm.id_catastro
	AND intr.id_certifEner = cert.id_certifEner;



SELECT inm.id_catastro as "catastro", inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif" FROM inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert WHERE (inm.id_estadoInmueble = est.id_estadoInmueble AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda AND cat.id_catastro = inm.id_catastro AND inm.id_ubicacion = ub.id_ubicacion AND ub.prov = pro.id_provincia AND img.id_catastro = inm.id_catastro AND intr.id_catastro = inm.id_catastro AND intr.id_certifEner = cert.id_certifEner and cat.id_modalidad = 1 and  inm.id_tipoVivienda in (1)) ORDER BY  cat.f_insercion;
SELECT inm.id_catastro as "catastro", inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif" FROM inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert WHERE (inm.id_estadoInmueble = est.id_estadoInmueble AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda AND cat.id_catastro = inm.id_catastro AND inm.id_ubicacion = ub.id_ubicacion AND ub.prov = pro.id_provincia AND img.id_catastro = inm.id_catastro AND intr.id_catastro = inm.id_catastro AND intr.id_certifEner = cert.id_certifEner and cat.id_modalidad = 1) ORDER BY  cat.f_insercion;


SELECT distinct inm.id_catastro as "catastro", inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif" 
FROM inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert 
WHERE (inm.id_estadoInmueble = est.id_estadoInmueble 
	AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble 
    AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda 
    AND cat.id_catastro = inm.id_catastro 
    AND inm.id_ubicacion = ub.id_ubicacion 
    AND ub.prov = pro.id_provincia 
    AND intr.id_catastro = inm.id_catastro 
    AND intr.id_certifEner = cert.id_certifEner 
    and cat.id_modalidad = 1 
    and inm.id_catastro IN (SELECT id_catastro 
							FROM (SELECT co0.id_catastro, ca0.caracteristica
									FROM caractsecundarias ca0, contiene co0 
                                    WHERE ca0.id_caractSecundaria = co0.id_caractSecundaria and ca0.id_caractSecundaria = "1" 
										UNION ALL 
									SELECT co1.id_catastro, ca1.caracteristica
                                    FROM caractsecundarias ca1, contiene co1 
                                    WHERE ca1.id_caractSecundaria = co1.id_caractSecundaria and ca1.id_caractSecundaria = "2") tipos 
							GROUP BY id_catastro 
                            HAVING COUNT(id_catastro) =2 )
                            ) 
	ORDER BY  cat.f_insercion; 
    
    
SELECT inm.id_catastro as "catastro", inm.superficie as area, inm.breveDescripcion as "descrip", est.estadoInmueble as "estado", tpoInm.tipoInmueble as "tipoInm", tpoViv.tipoVivienda as "tipoViv", cat.precio, cat.descuento, ub.direccion, pro.provincia, ub.latitud, ub.longitud, img.valor as "urlImg", intr.nBano, intr.nHab, intr.nCocina, cert.certifEner as "certif" FROM inmueble inm, estadoinmueble est, tipodeinmueble tpoInm, tipodevivienda tpoViv, catalogo cat, ubicacion ub, provincias pro, imagen img, caractintrinsecas intr, certificacionenergetica cert WHERE (inm.id_estadoInmueble = est.id_estadoInmueble AND tpoInm.id_tipoInmueble = inm.id_tipoInmueble AND tpoViv.id_tipoVivienda = inm.id_tipoVivienda AND cat.id_catastro = inm.id_catastro AND inm.id_ubicacion = ub.id_ubicacion AND ub.prov = pro.id_provincia AND img.id_catastro = inm.id_catastro AND intr.id_catastro = inm.id_catastro AND intr.id_certifEner = cert.id_certifEner and cat.id_modalidad = 1 and inm.id_catastro IN (SELECT id_catastro FROM (SELECT co0.id_catastro, ca0.caracteristica FROM caractsecundarias ca0, contiene co0 WHERE ca0.id_caractSecundaria = co0.id_caractSecundaria and ca0.id_caractSecundaria = "1" UNION ALL SELECT co1.id_catastro, ca1.caracteristica FROM caractsecundarias ca1, contiene co1 WHERE ca1.id_caractSecundaria = co1.id_caractSecundaria 
and ca1.id_caractSecundaria = "2") tipos GROUP BY id_catastro HAVING COUNT(id_catastro) = 2)) ORDER BY  cat.f_insercion;