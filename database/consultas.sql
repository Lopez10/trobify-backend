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



SELECT DISTINCT inm.id_catastro
FROM inmueble inm, ubicacion ubi, provincias pro, tipodeinmueble tpoI, catalogo cat, modalidad mo
WHERE inm.id_tipoInmueble = tpoI.id_tipoInmueble
	AND inm.id_ubicacion = ubi.id_ubicacion
    AND ubi.prov = pro.id_provincia
    AND inm.id_catastro = cat.id_catastro
    AND cat.id_modalidad = mo.id_modalidad
    AND mo.id_modalidad = 2
    AND pro.id_provincia = 46
    AND tpoI.id_tipoInmueble = 3