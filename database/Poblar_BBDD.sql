

-- ----- Datos para poblar la base de datos y que podamos trabajar
USE Trobify;
INSERT INTO Provincias values
	(1, "Álava", "Vitoria-Gasteiz", 42.84641, -2.667893),
	(2, "Albacete", "Albacete", 38.99765, -1.86007),
	(3, "Alicante", "Alicante/Alacant", 38.3452, -0.481006),
	(4, "Almería", "Almería", 36.84016, -2.467922),
	(5, "Ávila", "Ávila", 40.65642, -4.700323),
	(6, "Badajoz", "Badajoz", 38.8786, -6.970284),
	(7, "Islas Baleares", "Palma", 39.56951, 2.649966),
	(8, "Barcelona", "Barcelona", 41.38792, 2.169919),
	(9, "Burgos", "Burgos", 42.34087, -3.699731),
	(10, "Cáceres", "Cáceres", 39.47618, -6.37076),
	(11, "Cádiz", "Cádiz", 36.52969, -6.292657),
	(12, "Castellón", "Castellón de la Plana", 39.98598, -0.0376709),
	(13, "Ciudad Real", "Ciudad Real", 38.9861, -3.927263),
	(14, "Córdoba", "Córdoba", 37.88473, -4.779152),
	(15, "La Coruña", "Coruña (A)", 43.37087, -8.395835),
	(16, "Cuenca", "Cuenca", 40.07183, -2.134005),
	(17, "Girona", "Girona", 41.9818, 2.8237),
	(18, "Granada", "Granada", 37.17649, -3.597929),
	(19, "Guadalajara", "Guadalajara", 40.62981, -3.166493),
	(20, "Gipuzkoa", "San Sebastián", 43.32074, -1.984421),
	(21, "Huelva", "Huelva", 37.2571, -6.949555),
	(22, "Huesca", "Huesca", 42.1401, -0.408898),
	(23, "Jaén", "Jaén", 37.76574, -3.789518),
	(24, "León", "León", 42.59988, -5.571752),
	(25, "Lleida", "Lleida", 41.61415, 0.6257825),
	(26, "La Rioja", "Logroño", 42.46577, -2.449995),
	(27, "Lugo", "Lugo", 43.01208, -7.555851),
	(28, "Madrid", "Madrid", 40.41669, -3.700346),
	(29, "Málaga", "Málaga", 36.71965, -4.420019),
	(30, "Murcia", "Murcia", 37.98344, -1.12989),
	(31, "Navarra", "Pamplona", 42.81721, -1.646767),
	(32, "Ourense", "Ourense", 42.34001, -7.864641),
	(33, "Asturias", "Oviedo", 43.36026, -5.844759),
	(34, "Palencia", "Palencia", 42.01246, -4.531175),
	(35, "Las Palmas", "Las Palmas de Gran Canaria", 28.12482, -15.43001),
	(36, "Pontevedra", "Pontevedra", 42.43362, -8.648053),
	(37, "Salamanca", "Salamanca", 40.96497, -5.663047),
	(38, "Santa Cruz de Tenerife", "Santa Cruz de Tenerife", 28.46981, -16.25486),
	(39, "Cantabria", "Santander", 43.46096, -3.807934),
	(40, "Segovia", "Segovia", 40.94943, -4.119209),
	(41, "Sevilla", "Sevilla", 37.38264, -5.996295),
	(42, "Soria", "Soria", 41.7636, -2.464921),
	(43, "Tarragona", "Tarragona", 41.11866, 1.24533),
	(44, "Teruel", "Teruel", 40.34411, -1.10691),
	(45, "Toledo", "Toledo", 39.85678, -4.024476),
	(46, "Valencia", "Valencia", 39.47024, -0.3768049),
	(47, "Valladolid", "Valladolid", 41.65295, -4.728388),
	(48, "Vizcaya", "Bilbao", 43.25696, -2.923441),
	(49, "Zamora", "Zamora", 41.50368, -5.743778),
	(50, "Zaragoza", "Zaragoza", 41.65629, -0.8765379),
	(51, "Ceuta", "Ceuta", 35.88829, -5.316195),
	(52, "Melilla", "Melilla", 35.29234, -2.938794);
INSERT INTO Ubicacion values 
	(1, "Av. Primado Reig, 151 Es:1 Pl:B0 Pt:Dr, 46020, Valencia", 46, -0.3605097019263287, 39.4824580556214),
	(2, "Av. Primado Reig, 151 Es:1 Pl:02 Pt:04, 46020, Valencia", 46, -0.3605097019263287, 39.4824580556214),
	(3, "CL LUIS SANTANGEL 27 Es:1 Pl:B0 Pt:01, 46005, Valencia", 46, -0.36648071565416274, 39.461720317273375),
	(4, "CL ANTONIO APARISI 2 Es:1 Pl:01 Pt:01, 46920, Valencia", 46, -0.4141619307622086, 39.47196011110214);
INSERT INTO Usuario values 
    (1, 'Alfredo', 'Sauce Marinada', 'ChickenWings26@gmail.com', "1990-07-23", 'NoKetchup', 987654321, 'Chef'),
    (2, 'Diego', 'Caramelo Caricia', 'SweetFlavour@hotmail.com', "1997-02-14", 'LaMarSalá', 987654322, 'Pastelero'),
    (3, 'Carlos', 'Molinillo Loco', 'DonQX@hotmail.com', "2003-12-01", 'NOpuedojugarsinAIM', 987654323, 'Gamer'),
    (4, 'Juan Carlos', 'Rey Fugado', 'LoSientoNoLoVolvereAHacerMas@gmail.com', "1887-08-22", 'Megustaeldinero', 987655424, 'Ninguno');
 INSERT INTO Modalidad values
	(1, "Venta"),
	(2, "Alquiler"),
	(3, "Alquiler de Habitaciones");
 INSERT TipoDeVivienda values
	(1, "Ático"),
	(2, "Plantas intermedias"),
	(3, "Dúplex"),
	(4, "Loft"),
	(5, "Planta Baja"),
	(6, "Casa"),
	(7, "Chalet"),
	(8, "Adosado"),
	(9, "Finca Rústica");
 INSERT CertificacionEnergetica values
	(1, "A++"),
	(2, "A+"),
	(3, "A"),
	(4, "B"),
	(5, "C"),
	(6, "D"),
	(7, "E"),
	(8, "F"),
	(9, "G");
INSERT Estado values
	(1, "Obra nueva")
	(2, "Buen estado"),
	(3, "Reformado"),
	(4, "A reformar");
INSERT Caracteristicas values
	(1, "Ascensor"),
	(2, "Amueblado"),
	(3, "Terraza o balcón"),
	(4, "Aire acondicionado"),
	(5, "Armario empotrado"),
	(6, "Garaje"),
	(7, "Jardín"),
	(8, "Piscina"),
	(9, "Trastero");
INSERT INTO Inmueble values 
	("7138804YJ2773G0001ZM", 1, 1, 0, 106, 1, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 3, 1, 1, 1),
	("7138804YJ2773G0006ET", 6, 2, 1, 200, 3, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 100, 2, 3, 2),
	("6715712YJ2761F0001IX", 3, 2, 1, 250, 5, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 300, 3, 5, 3),
	("2524205YJ2722S0001GA", 8, 3, 2, 352, 7, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 1500, 4, 9, 1);
INSERT INTO Imagen values 
    (1, "7138804YJ2773G0001ZM", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F861735709923243470%2F&psig=AOvVaw1E2oX_ce6IWbrz0im1g8g9&ust=1615935556231000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPC1rKGzs-8CFQAAAAAdAAAAABAf"),
    (2, "7138804YJ2773G0006ET", "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Fhector4x%2Fstatus%2F1127134042112057346%3Flang%3Dko&psig=AOvVaw1E2oX_ce6IWbrz0im1g8g9&ust=1615935556231000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPC1rKGzs-8CFQAAAAAdAAAAABAT"),
    (3, "6715712YJ2761F0001IX", "https://cde.laprensa.e3.pe/ima/0/0/2/3/7/237229.jpg"),
    (4, "6715712YJ2761F0001IX", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DV07tpCdeHys&psig=AOvVaw1E2oX_ce6IWbrz0im1g8g9&ust=1615935556231000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPC1rKGzs-8CFQAAAAAdAAAAABAI"),
	(5, "2524205YJ2722S0001GA", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fatomix.vg%2Festa-seria-la-ubicacion-real-de-la-casa-de-goku-y-su-familia%2F&psig=AOvVaw1E2oX_ce6IWbrz0im1g8g9&ust=1615935556231000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPC1rKGzs-8CFQAAAAAdAAAAABAN");
INSERT INTO Extra values 
    (1, "2524205YJ2722S0001GA", "Urna gravida porttitor phasellus sagittis habitasse quam interdum ultricies arcu quis elementum enim sapien risus litora eleifend, rhoncus curabitur vitae leo malesuada eget luctus rutrum tincidunt proin nec cum laoreet aliquet." ),
    (2, "2524205YJ2722S0001GA", "Inceptos tempus rutrum netus rhoncus elementum morbi integer eget dictumst venenatis torquent tellus sociis mollis, nec cras justo ornare velit pretium gravida sodales aenean vulputate curae purus ultrices. Pharetra purus sodales nisl semper maecenas fames neque, facilisi luctus torquent ad faucibus vivamus conubia, donec mauris interdum primis dictumst phasellus."),
    (3, "7138804YJ2773G0006ET", "Se cree ampliamente que la historia de Lorem Ipsum se origina con Cicerón en el siglo I aC y su texto De Finibus bonorum et malorum. Esta obra filosófica, también conocida como En los extremos del bien y del mal, se dividió en cinco libros."); 
INSERT INTO Catalogo values 
    ("7138804YJ2773G0001ZM", 1, 20000.99, "2020-08-12"),
    ("7138804YJ2773G0001ZM", 2, 253, "2020-08-12"),
    ("7138804YJ2773G0006ET", 1, 30000.99, "2019-08-12"),
    ("6715712YJ2761F0001IX", 1, 40000.99, "2018-08-12"),
    ("2524205YJ2722S0001GA", 1, 50000.99, "2017-08-12");
INSERT INTO Cliente values 
    (1, 'Alfredo', 'Sauce Marinada', 'ChickenWings26@gmail.com', "1990-07-23", 'NoKetchup', 987654321, 'Chef', "7138804YJ2773G0006ET", 1),
    (2, 'Diego', 'Caramelo Caricia', 'SweetFlavour@hotmail.com', "1997-02-14", 'LaMarSalá', 987654322, 'Pastelero', "6715712YJ2761F0001IX", 1),
    (3, 'Carlos', 'Molinillo Loco', 'DonQX@hotmail.com', "2003-12-01", 'NOpuedojugarsinAIM', 987654323, 'Gamer', "2524205YJ2722S0001GA", 1),
	(4, 'Juan Carlos', 'Rey Fugado', 'LoSientoNoLoVolvereAHacerMas@gmail.com', "1887-08-22", 'Megustaeldinero', 987655424, 'Ninguno', "7138804YJ2773G0001ZM", 1);
INSERT INTO Filtros values
	(1, 1, 1, 32, 5, 1000, 500000, 0, 0, 10, 70, 1, 1, 7, '1', '1,9', '1,2,3'),
    (2, 1, 1, 12, 3, 1000, 400000, 0, 0, 20, 50, 2, 2, 5, '2', '3,6', '4,5,6'); 
INSERT INTO Favoritos values 
    (1, "7138804YJ2773G0006ET", 1),
    (1, "2524205YJ2722S0001GA", 1),
    (1, "6715712YJ2761F0001IX", 1),
    (2, "6715712YJ2761F0001IX", 1),
    (3, "2524205YJ2722S0001GA", 1),
    (3, "7138804YJ2773G0006ET", 1),
    (4, "7138804YJ2773G0006ET", 1);
INSERT Contiene values
	(1, "7138804YJ2773G0001ZM"),
	(2, "7138804YJ2773G0001ZM"),
	(3, "7138804YJ2773G0001ZM"),
	(4, "7138804YJ2773G0001ZM"),
	(8, "7138804YJ2773G0001ZM"),
	(5, "7138804YJ2773G0006ET"),
	(2, "7138804YJ2773G0006ET"),
	(6, "7138804YJ2773G0006ET"),
	(4, "7138804YJ2773G0006ET"),
	(8, "7138804YJ2773G0006ET"),
	(8, "6715712YJ2761F0001IX"),
	(2, "6715712YJ2761F0001IX"),
	(5, "6715712YJ2761F0001IX"),
	(4, "6715712YJ2761F0001IX"),
	(9, "6715712YJ2761F0001IX"),
	(2, "2524205YJ2722S0001GA"),
	(6, "2524205YJ2722S0001GA"),
	(4, "2524205YJ2722S0001GA");
INSERT INTO Habitacion values 
    (1, 'A01', "2021-07-26", "2021-08-12", 375, 0, "7138804YJ2773G0006ET", 1),
    (2, 'A01', "2021-08-12", "2021-12-12", 700, 0, "2524205YJ2722S0001GA", 1),
    (3, 'C01', "2021-02-14", "2021-02-15", 200, 75, "6715712YJ2761F0001IX", 1),
    (4, 'D01', "2021-07-15", "2021-07-20", 500, 250, "7138804YJ2773G0001ZM", 1);