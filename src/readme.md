Códigos en la URL para aplicar filtros

    - "opt="
        1 - Comprar
        2 - Alquilar
        3 - Alquilar Habitación
    - "vis=" --> no tiene ningún uso por ahora
        1 - Lista
        2 - Mapa
    - "prov="
        desde el 1 hasta el 52, son los códigos de provincias según correos, están en la tabla 'provincia'
    - "ord="
        1 - Menor a mayor antigüedad
        2 - Mayor a menor antigüedad
        3 - Mayor a menor precio
        4 - Menor a mayor precio
        5 - Mayor a menor superficie
        6 - Menor a mayor superficie
    - "preMin=" Precio Minimo
    - "preMax=" Precio Maximo
    - "aMrgn=" 	Aplicar Margen
        off - No
        on - Si
    - "mrgn="   porcentaje de Holgura de precio, como separador decimal usar punto
        0 --> 0 %
        1 --> 100 %
    - "supMin=" Superficie Minima
    - "supMax=" Superficie Maxima
    - "nHab="   Cantidad de Habitaciones mínima
    - "nBan="   Cantidad de baños minima
    - "clfEn="  Clasificación Energética va desde 1 -> A++ hasta 9 --> G
    - "stdo="    , , , ... string con los Estados a filtrar. Como puede haber varios seleccionados, el SEPARADOR DEBE SER COMAS ',' y NUNCA usar paréntesis ni corchetes
        1 - Reformado
        ...
        x - Usar el id según la tabla EstadoInmueble
    - "tpoInm="  , , , ... string con los TiposDeInmuebles a filtrar. Como puede haber varios seleccionados, el SEPARADOR DEBE SER COMAS ',' y NUNCA usar paréntesis ni corchetes
        1 - Garaje
        2 - Local comercial
        ...
        x - Usar el id según la tabla tipoDeInmueble
    - "tpoViv="  , , , ... string con los TiposDeVivienda a filtrar. Como puede haber varios seleccionados, el SEPARADOR DEBE SER COMAS ',' y NUNCA usar paréntesis ni corchetes
        1 - No es vivienda --> para los inmuebles como garajes, solares, locales comerciales...
        2 - Ático
        ...
        x - Usar el id según la tabla tipoDeVivienda
    - "caract="  , , , ... string de Características que debe reunir un mismo inmueble. El SEPARADOR DEBE SER COMAS ',' y NUNCA usar paréntesis ni corchetes

Códigos en la URL para pasar el catastro del inmueble buscado - idImn : corresponde al catastro, solo se pasa uno cada vez - "opt="
1 - Comprar
2 - Alquilar
3 - Alquilar Habitación
