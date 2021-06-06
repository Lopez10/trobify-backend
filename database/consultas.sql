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
SELECT * FROM DatosCatastro;
SELECT * FROM Provincias;

SELECT distinct id_catastro 
FROM contiene
WHERE id_caractSecundaria IN (1,5,6,7);

SELECT inm.id_catastro 
FROM inmueble inm, datoscatastro dat, catalogo cat 
WHERE inm.id_catastro = dat.id_catastro 
	AND inm.id_catastro = cat.id_catastro 
    AND cat.publicado = 1  
    AND cat.id_modalidad = 1 
    AND dat.id_provincia = 46 
    AND inm.id_tipoInmueble = 3;
    
    SELECT id_catastro FROM caractintrinsecas WHERE 1=1 AND nHab = 3;
    
    
    
SELECT breveDescripcion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen FROM inmueble WHERE id_catastro = "5699408YJ2659H0025QQ";
SELECT id_caractSecundaria FROM Contiene WHERE id_catastro = "5699408YJ2659H0025QQ";
SELECT nBano, nCocina, nHab, id_certifEner FROM caractintrinsecas WHERE id_catastro = "5699408YJ2659H0025QQ";
SELECT direccion, codPostal, localidad, id_provincia, superficie, latitud, longitud FROM datoscatastro WHERE id_catastro LIKE "5699408YJ2659H0025QQ";


SELECT valor FROM imagen WHERE id_imagen In (SELECT MIN(id_imagen) as minimo FROM Imagen WHERE id_catastro = "5139410YJ2753G0019EU");