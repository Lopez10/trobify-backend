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



INSERT INTO Imagen(id_catastro, valor) VALUES ("0230809UH0403S0001LF", "data:image/png;base64");
INSERT INTO Imagen(id_catastro, valor) VALUES ("0230809UH0403S0001LF", "iVBORw0KGgoAAAANSUhEUgAAApMA…ECIhJP0CAAAECBAgQIJAFHsktBKLkeVPsAAAAAElFTkSuQmCC");
INSERT INTO Imagen(id_catastro, valor) VALUES ("0230809UH0403S0001LF", "data:image/png;base64");
INSERT INTO Imagen(id_catastro, valor) VALUES ("0230809UH0403S0001LF", "iVBORw0KGgoAAAANSUhEUgAABrcA…AAQIECBAgQIAAgcoQ+H8uwQzqRwxg0QAAAABJRU5ErkJggg==");

INSERT INTO Inmueble(id_catastro, breveDescripcion, id_tipoInmueble, id_estadoInmueble, id_tipoVivienda, id_imagen) VALUES ("0230809UH0403S0001LF", "Pues aquí estamos pegandonos ostias con esto", 3, 1, 1, 1);
INSERT INTO DatosCatastro(id_catastro, direccion, codPostal, localidad, id_provincia, superficie, latitud, longitud) VALUES ("0230809UH0403S0001LF", "CL DOS DE MAYO 22", "14200", "PEÑARROYA-PUEBLONUEVO", 14, 239, -5.2861881176833, 38.3110188651098);

INSERT INTO CaractIntrinsecas (id_catastro, nBano, nCocina, id_certifEner, nHab) VALUES ("0230809UH0403S0001LF", 0, 1, 1, 0);
INSERT INTO Contiene(id_catastro, id_caractSecundaria) VALUES ("0230809UH0403S0001LF", 1);

INSERT INTO Catalogo(id_catastro, id_modalidad, precio, descuento, f_insercion, id_usuario, publicado) VALUES ("0230809UH0403S0001LF", 1, 100000, 0, "2021-5-0", 1, 1);


