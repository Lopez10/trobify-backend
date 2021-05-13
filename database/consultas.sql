USE Trobify;

-- consultas de tablas unitarias
SELECT * FROM Filtros; 
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

INSERT INTO Catalogo  VALUES ("CARMELO0000000000001", 0, 100000, 0, 0,1);

SELECT COUNT(id_catastro) as cuenta FROM Imagen WHERE id_catastro LIKE ( "CARMELO0000000000001");

INSERT INTO Ubicacion (direccion, codPostal, localidad, prov, latitud, longitud)  VALUES ("CL DOS DE MAYO 22", 14200, "PEÑARROYA-PUEBLONUEVO", 14, -5.2861881176833, 38.3110188651098);

INSERT INTO Catalogo  VALUES ("0230809UH0403S0001LF", 1, NaN, 0, "2021-4-4", 1);
INSERT INTO Catalogo  VALUES ("0230809UH0403S0001LF", 1, 0, 0, "2021-4-4", 1,1);



SELECT cat.precio, cat.descuento, tpoI.tipoInmueble, tpoV.tipoVivienda, est.estadoInmueble, inm.superficie, car.nHab, car.nBano, car.nCocina, cer.certifEner, ubi.direccion, ubi.latitud, ubi.longitud, inm.breveDescripcion, ubi.prov, cat.id_usuario as propietario 
FROM inmueble inm, catalogo cat, CaractIntrinsecas car, CertificacionEnergetica cer, ubicacion ubi, EstadoInmueble est, TipoDeVivienda tpoV, TipoDeInmueble tpoI 
WHERE inm.id_catastro = cat.id_catastro 
	AND inm.id_catastro = car.id_catastro 
    AND cer.id_certifEner = car.id_certifEner 
    AND ubi.id_ubicacion = inm.id_ubicacion 
    AND inm.id_estadoInmueble = est.id_estadoInmueble  
    AND inm.id_tipoVivienda = tpoV.id_tipoVivienda 
    AND inm.id_tipoInmueble = tpoI.id_tipoInmueble 
    AND cat.id_modalidad = 2  
    AND inm.id_catastro LIKE ("0230809UH0403S0001LF");
