CREATE DATABASE IF NOT EXISTS Trobify;

USE Trobify;

CREATE TABLE Provincias (
	provincia_id TINYINT AUTO_INCREMENT,
	provincia VARCHAR(25) NOT NULL,
	capital VARCHAR(30) NOT NULL,
	latitud DOUBLE NOT NULL,
	longitud DOUBLE NOT NULL,	
	PRIMARY KEY(provincia_id)
);
CREATE TABLE Ubicacion (
	ubicacion_id INT AUTO_INCREMENT,
	direccion VARCHAR(250) NOT NULL,
	prov TINYINT NOT NULL,
	latitud DOUBLE NOT NULL,
	longitud DOUBLE NOT NULL,
	PRIMARY KEY(ubicacion_id),
	FOREIGN KEY (prov) REFERENCES Provincias (provincia_id)
);
CREATE TABLE Usuario (
	id INT AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	apellidos VARCHAR(75),
	mail VARCHAR(50) NOT NULL,
	f_nac DATE NOT NULL,
	contraseña VARCHAR(25) NOT NULL,
	telefono INT NOT NULL,
	rol VARCHAR(10) NOT NULL,
	PRIMARY KEY(id),
	KEY idx_id (nombre,apellidos,mail,f_nac,contraseña,telefono,rol)
);
CREATE TABLE Modalidad (
	id_modalidad INT AUTO_INCREMENT,
	modalidad VARCHAR(25) NOT NULL,
	PRIMARY KEY (id_modalidad)
);
CREATE TABLE TipoDeVivienda (
	id TINYINT AUTO_INCREMENT,
	tipo VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE Estado (
	id TINYINT AUTO_INCREMENT,	
	tipo VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE CertificacionEnergetica (
	id_certifEner TINYINT AUTO_INCREMENT,	
	nombre VARCHAR(3),
	PRIMARY KEY (id_certifEner)
);
CREATE TABLE Caracteristicas (
	id TINYINT AUTO_INCREMENT,	
	tipo VARCHAR(20),
	PRIMARY KEY (id)
);
CREATE TABLE Inmueble (
	catastro_id CHAR(20),
	cant_habitaciones TINYINT NOT NULL,
	banos TINYINT NOT NULL,
	cocina TINYINT NOT NULL,
	superficie SMALLINT NOT NULL,
	id_certifEner TINYINT NOT NULL,
	breveDescripcion TEXT NOT NULL,
	disponible BOOL NOT NULL,
	consultas INT NOT NULL,
	ubicacion_id INT NOT NULL,
	id_vivienda TINYINT NOT NULL,
	id_estado TINYINT NOT NULL,
	PRIMARY KEY (catastro_id),
	FOREIGN KEY (ubicacion_id) REFERENCES Ubicacion (ubicacion_id),
	FOREIGN KEY (id_vivienda) REFERENCES TipoDeVivienda (id),
	FOREIGN KEY (id_certifEner) REFERENCES CertificacionEnergetica (id_certifEner),
	FOREIGN KEY (id_estado) REFERENCES Estado (id)
);
CREATE TABLE Catalogo (
	catastro_id CHAR(20) NOT NULL,
	id_modalidad INT NOT NULL,
	precio DOUBLE NOT NULL,
	f_insercion DATE NOT NULL,
	PRIMARY KEY (id_modalidad, catastro_id),
	FOREIGN KEY (id_modalidad) REFERENCES Modalidad (id_modalidad),
	FOREIGN KEY (catastro_id) REFERENCES Inmueble (catastro_id)
);
CREATE TABLE Contiene (
	id TINYINT NOT NULL,
	catastro_id CHAR(20) NOT NULL,
	PRIMARY KEY (id, catastro_id),
	FOREIGN KEY (id) REFERENCES Caracteristicas (id),
	FOREIGN KEY (catastro_id) REFERENCES Inmueble (catastro_id)
);
CREATE TABLE Imagen (
	id_imagen INT AUTO_INCREMENT,
	catastro_id CHAR(20),
	valor TINYTEXT NOT NULL,
	PRIMARY KEY (id_imagen),
	FOREIGN KEY (catastro_id) REFERENCES Inmueble (catastro_id)
);
CREATE TABLE Extra (
	id_extra INT AUTO_INCREMENT,
	catastro_id CHAR(20),
	valor TEXT NOT NULL,
	PRIMARY KEY (id_extra),
	FOREIGN KEY (catastro_id) REFERENCES Inmueble (catastro_id)
);
CREATE TABLE Habitacion (
	id_operacion INT AUTO_INCREMENT,
	id_habitacion CHAR(3) NOT NULL,
	f_entrada DATE NOT NULL,
	f_salida DATE NOT NULL,
	precio FLOAT NOT NULL,
	descuento FLOAT NOT NULL,
	catastro_id CHAR(20) NOT NULL,
	id_modalidad INT NOT NULL,
	FOREIGN KEY (id_modalidad, catastro_id) REFERENCES Catalogo (id_modalidad, catastro_id),
	PRIMARY KEY(id_operacion),
	FOREIGN KEY (catastro_id) REFERENCES Inmueble (catastro_id)
);
CREATE TABLE Cliente (
	id INT AUTO_INCREMENT,
	nombre VARCHAR(25) NOT NULL,
	apellidos VARCHAR(50),
	mail VARCHAR(50) NOT NULL,
	f_nac DATE NOT NULL,
	contraseña VARCHAR(25) NOT NULL,
	telefono INT NOT NULL,
	rol VARCHAR(10) NOT NULL,
	catastro_id CHAR(20) NOT NULL,
	id_modalidad INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (id_modalidad, catastro_id) REFERENCES Catalogo (id_modalidad, catastro_id),
	FOREIGN KEY (nombre,apellidos,mail,f_nac,contraseña,telefono,rol) REFERENCES Usuario (nombre,apellidos,mail,f_nac,contraseña,telefono,rol),
	FOREIGN KEY (id) REFERENCES usuario (id)
);
CREATE TABLE Filtros (
	id_cliente INT,
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
	PRIMARY KEY (id_cliente),
	FOREIGN KEY (id_cliente) REFERENCES Cliente (id)
);
CREATE TABLE Favoritos (
	id INT NOT NULL,
	catastro_id CHAR(20) NOT NULL,
	id_modalidad INT NOT NULL,
	FOREIGN KEY (id_modalidad, catastro_id) REFERENCES Catalogo (id_modalidad, catastro_id),
	FOREIGN KEY (id) REFERENCES Cliente (id)
);