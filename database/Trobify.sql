CREATE DATABASE IF NOT EXISTS Trobify;

USE Trobify;

CREATE TABLE Provincias (
	id_provincia TINYINT AUTO_INCREMENT,
	provincia VARCHAR(25) NOT NULL,
	capital VARCHAR(30) NOT NULL,
	latitud DOUBLE NOT NULL,
	longitud DOUBLE NOT NULL,	
	PRIMARY KEY(id_provincia)
);
CREATE TABLE Ubicacion (
	id_ubicacion INT AUTO_INCREMENT,
	direccion VARCHAR(250) NOT NULL,
	prov TINYINT NOT NULL,
	latitud DOUBLE NOT NULL,
	longitud DOUBLE NOT NULL,
	PRIMARY KEY(id_ubicacion),
	FOREIGN KEY (prov) REFERENCES Provincias (id_provincia)
);
CREATE TABLE RolUsuario (
	id_rol INT AUTO_INCREMENT,
	rolUsuario VARCHAR(30) NOT NULL,
	PRIMARY KEY(id_rol)
);
CREATE TABLE Usuario (
	id_usuario INT AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	apellidos VARCHAR(75),
	id_rol INT NOT NULL,
	vendedor BOOLEAN NOT NULL,
	mail VARCHAR(50) NOT NULL,
	contrasena VARCHAR(30) NOT NULL,
	telefono INT NOT NULL,
	mayorEdad BOOLEAN NOT NULL,
	PRIMARY KEY(id_usuario),
	FOREIGN KEY (id_rol) REFERENCES RolUsuario (id_rol)
);
CREATE TABLE Modalidad (
	id_modalidad INT AUTO_INCREMENT,
	modalidad VARCHAR(25) NOT NULL,
	PRIMARY KEY (id_modalidad)
);
CREATE TABLE TipoDeInmueble (
	id_tipoInmueble TINYINT AUTO_INCREMENT,
	tipoInmueble VARCHAR(20) NOT NULL,
	PRIMARY KEY (id_tipoInmueble)
);
CREATE TABLE TipoDeVivienda (
	id_tipoVivienda TINYINT AUTO_INCREMENT,
	tipoVivienda VARCHAR(20) NOT NULL,
	PRIMARY KEY (id_tipoVivienda)
);
CREATE TABLE EstadoInmueble (
	id_estadoInmueble TINYINT AUTO_INCREMENT,	
	estadoInmueble VARCHAR(20) NOT NULL,
	PRIMARY KEY (id_estadoInmueble)
);
CREATE TABLE CertificacionEnergetica (
	id_certifEner TINYINT AUTO_INCREMENT,	
	certifEner VARCHAR(3),
	PRIMARY KEY (id_certifEner)
);
CREATE TABLE Caracteristicas (
	id TINYINT AUTO_INCREMENT,	
	tipo VARCHAR(20),
	PRIMARY KEY (id)
);
CREATE TABLE Inmueble (
	id_catastro CHAR(20),
    superficie SMALLINT NOT NULL,
    breveDescripcion TEXT NOT NULL,
	id_ubicacion INT NOT NULL,
	id_tipoInmueble TINYINT NOT NULL,
	id_estadoInmueble TINYINT NOT NULL,
	PRIMARY KEY (id_catastro),
	FOREIGN KEY (id_ubicacion) REFERENCES Ubicacion (id_ubicacion),
	FOREIGN KEY (id_tipoInmueble) REFERENCES TipoDeInmueble (id_tipoInmueble),
	FOREIGN KEY (id_estadoInmueble) REFERENCES EstadoInmueble (id_estadoInmueble)
);
CREATE TABLE Catalogo (
	id_catastro CHAR(20) NOT NULL,
	id_modalidad INT NOT NULL,
	precio DOUBLE NOT NULL,
	descuento DOUBLE NOT NULL,
	f_insercion DATE NOT NULL,
	id_usuario INT NOT NULL,
	PRIMARY KEY (id_modalidad, id_catastro),
	FOREIGN KEY (id_modalidad) REFERENCES Modalidad (id_modalidad),
	FOREIGN KEY (id_catastro) REFERENCES Inmueble (id_catastro),
	FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);
CREATE TABLE Contiene (
	id TINYINT NOT NULL,
	id_catastro CHAR(20) NOT NULL,
	PRIMARY KEY (id, id_catastro),
	FOREIGN KEY (id) REFERENCES Caracteristicas (id),
	FOREIGN KEY (id_catastro) REFERENCES Inmueble (id_catastro)
);
CREATE TABLE Imagen (
	id_imagen INT AUTO_INCREMENT,
	id_catastro CHAR(20),
	valor TINYTEXT NOT NULL,
	PRIMARY KEY (id_imagen),
	FOREIGN KEY (id_catastro) REFERENCES Inmueble (id_catastro)
);
CREATE TABLE Extra (
	id_extra INT AUTO_INCREMENT,
	id_catastro CHAR(20),
	valor TEXT NOT NULL,
	PRIMARY KEY (id_extra),
	FOREIGN KEY (id_catastro) REFERENCES Inmueble (id_catastro)
);
CREATE TABLE Filtros (
	id_filtro INT AUTO_INCREMENT,
	id_usuario INT,
	opt INT,
	vis TINYINT,
	prov TINYINT,
	ord TINYINT,
	preMin DOUBLE,
	preMax DOUBLE,
	aMrgn TINYINT,
	mrgn DOUBLE,
	supMin SMALLINT,
	supMax SMALLINT,	
	nHab TINYINT,
	nBan TINYINT,
	clfEn TINYINT,
	stdo VARCHAR(25),
	tipoViv VARCHAR(50),
	caract VARCHAR(50),
	PRIMARY KEY (id_filtro),
	FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);
CREATE TABLE Favoritos (
	id_usuario INT NOT NULL,
	id_catastro CHAR(20) NOT NULL,
	id_modalidad INT NOT NULL,
	FOREIGN KEY (id_modalidad, id_catastro) REFERENCES Catalogo (id_modalidad, id_catastro),
	FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);