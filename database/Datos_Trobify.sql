

------- Datos para poblar la base de datos y que podamos trabajar
USE Trobify;

INSERT INTO Ubicacion values 
	(1, "Av. Primado Reig, 151 Es:1 Pl:B0 Pt:Dr, 46020, Valencia, Valencia", 39.4824580556214, -0.3605097019263287),
	(2, "Av. Primado Reig, 151 Es:1 Pl:02 Pt:04, 46020, Valencia, Valencia", 39.4824580556214, -0.3605097019263287),
	(3, "CL LUIS SANTANGEL 27 Es:1 Pl:B0 Pt:01, 46005, Valencia, Valencia", 39.461720317273375, -0.36648071565416274),
	(4, "CL ANTONIO APARISI 2 Es:1 Pl:01 Pt:01, 46920, Valencia, Valencia", 39.47196011110214, -0.4141619307622086);
INSERT INTO Usuario values 
    (1, 'Alfredo', 'Sauce Marinada', 'ChickenWings26@gmail.com', "1990-07-23", 'NoKetchup', 987654321, 'Chef'),
    (2, 'Diego', 'Caramelo Caricia', 'SweetFlavour@hotmail.com', "1997-02-14", 'LaMarSalá', 987654322, 'Pastelero'),
    (3, 'Carlos', 'Molinillo Loco', 'DonQX@hotmail.com', "2003-12-01", 'NOpuedojugarsinAIM', 987654323, 'Gamer'),
    (4, 'Juan Carlos', 'Rey Fugado', 'LoSientoNoLoVolvereAHacerMas@gmail.com', "1887-08-22", 'Megustaeldinero', 987655424, 'Ninguno'); 		
INSERT INTO Catalogo values 
    (1, 20000.99),
    (2, 30000.99),
    (3, 40000.99),
    (4, 50000.99);
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
	(1, "Reformado"),
	(2, "Buen estado"),
	(3, "A reformar");
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
	("7138804YJ2773G0001ZM", 1, 1, 0, 106, 1, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 3, 1, 1, 1, 1),
	("7138804YJ2773G0006ET", 6, 2, 1, 200, 3, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 100, 2, 2, 3, 2),
	("6715712YJ2761F0001IX", 3, 2, 1, 250, 5, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 300, 3, 3, 5, 3),
	("2524205YJ2722S0001GA", 8, 3, 2, 352, 7, "Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum, congue turpis quis sapien ultricies maecenas arcu, et eleifend pellentesque luctus in quisque etiam.", 0, 1500, 4, 4, 9, 1);
INSERT INTO Imagen values 
    (1, "7138804YJ2773G0001ZM", "https://static.wikia.nocookie.net/bobesponja/images/4/4c/Casa-pi%C3%B1a-de-bob-esponja-11.jpg/revision/latest/smart/width/200/height/200?cb=20141204184826"),
    (2, "7138804YJ2773G0006ET", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaCFZi5BNmbsjhgHljBjXMQSK6IaAftRYrdw&usqp=CAU"),
    (3, "6715712YJ2761F0001IX", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZPEWBwl0CBz5X1g4VxVITgfNZ9YJPZCriA&usqp=CAU"),
    (4, "6715712YJ2761F0001IX", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Tl4Nq5FTc-QoKvVwZ-bRATbRe8DKDr0X2w&usqp=CAU"),
	(5, "2524205YJ2722S0001GA", "https://static.wikia.nocookie.net/bobesponja/images/3/37/Calle_concha.jpg/revision/latest/scale-to-width-down/340?cb=20110305080711");
INSERT INTO Extra values 
    (1, "2524205YJ2722S0001GA", "Urna gravida porttitor phasellus sagittis habitasse quam interdum ultricies arcu quis elementum enim sapien risus litora eleifend, rhoncus curabitur vitae leo malesuada eget luctus rutrum tincidunt proin nec cum laoreet aliquet." ),
    (2, "2524205YJ2722S0001GA", "Inceptos tempus rutrum netus rhoncus elementum morbi integer eget dictumst venenatis torquent tellus sociis mollis, nec cras justo ornare velit pretium gravida sodales aenean vulputate curae purus ultrices. Pharetra purus sodales nisl semper maecenas fames neque, facilisi luctus torquent ad faucibus vivamus conubia, donec mauris interdum primis dictumst phasellus."),
    (3, "7138804YJ2773G0006ET", "Se cree ampliamente que la historia de Lorem Ipsum se origina con Cicerón en el siglo I aC y su texto De Finibus bonorum et malorum. Esta obra filosófica, también conocida como En los extremos del bien y del mal, se dividió en cinco libros."); 
INSERT INTO Habitacion values 
    (1, 'A01', "2021-07-26", "2021-08-12", 375, 0, 2, "7138804YJ2773G0006ET"),
    (2, 'A01', "2021-08-12", "2021-12-12", 700, 0, 2, "7138804YJ2773G0006ET"),
    (3, 'C01', "2021-02-14", "2021-02-15", 200, 75, 3, "6715712YJ2761F0001IX"),
    (4, 'D01', "2021-07-15", "2021-07-20", 500, 250, 4, "2524205YJ2722S0001GA");
INSERT INTO Cliente values 
    (1, 'Alfredo', 'Sauce Marinada', 'ChickenWings26@gmail.com', "1990-07-23", 'NoKetchup', 987654321, 'Chef', 2),
    (2, 'Diego', 'Caramelo Caricia', 'SweetFlavour@hotmail.com', "1997-02-14", 'LaMarSalá', 987654322, 'Pastelero', 3),
    (3, 'Carlos', 'Molinillo Loco', 'DonQX@hotmail.com', "2003-12-01", 'NOpuedojugarsinAIM', 987654323, 'Gamer', 4),
	(4, 'Juan Carlos', 'Rey Fugado', 'LoSientoNoLoVolvereAHacerMas@gmail.com', "1887-08-22", 'Megustaeldinero', 987655424, 'Ninguno', 1);
INSERT INTO Favoritos values 
    (1, 3),
    (1, 2),
    (1, 1),
    (2, 2),
    (3, 4),
    (3, 1),
    (4, 1);
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