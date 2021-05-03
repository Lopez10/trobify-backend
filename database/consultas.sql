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

INSERT INTO Catalogo  VALUES ("CARMELO0000000000001", 0, 100000, 0, 0,1);

SELECT COUNT(id_catastro) as cuenta FROM Imagen WHERE id_catastro LIKE ( "CARMELO0000000000001")
