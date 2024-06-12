--
-- Base de datos: `club de tenis sierra espuña`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `dni` varchar(10) NOT NULL,  
  `correo` varchar(1000) NOT NULL, 
  `telefono` int(9) NOT NULL,
  `genero` varchar(1) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `puntos_premios` int(20) NOT NULL,
  `puntos_ranking` int(20) NOT NULL,
  `torneos_jugados` int(20) NOT NULL,
  `torneos_ganados` int(20) NOT NULL,
  `partidos_jugados` int(20) NOT NULL,
  `partidos_ganados` int(20) NOT NULL,
  `premios_canjeados` int(20) NOT NULL,
  `foto` varchar(1000) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

--
-- SE CREA ADMIN, SOCIO POR DEFECTO Y OTROS SOCIOS DE PRUEBA
--
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Administrador', 'Administrador', '00000000T', 666666666, 'D', 'admin', '1234', 0, 0, 0, 0, 0, 0, 0, '');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(-1, 'Otro Socio', '', '00000000X', 666666666, 'D', 'otro', 'otro', 0, 0, 0, 0, 0, 0, 0, '');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Pablo', 'Romero Martínez', '63506277B', 630654884, 'M', 'pablo', 'pablo', 100, 100, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'María', 'Cánovas Sánchez', '31385987A', 665479331, 'F', 'maria', 'maria', 100, 100, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Luis', 'López Pérez', '86192551M', 600789510, 'M', 'luis', 'luis', 100, 100, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Rosa', 'Martínez Lorente', '40544043B', 622598740, 'F', 'rosa', 'rosa', 100, 100, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Federico', 'Lorca García', '63994238G', 651002103, 'M', 'federico', 'federico', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Isabel', 'Vidal Martínez', '25725393P', 674103001, 'F', 'isabel', 'isabel', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Manuel', 'Andreo Cánovas', '93340003T', 696545890, 'M', 'manuel', 'manuel', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Silvia', 'López García', '31254088D', 610181249, 'F', 'silvia', 'silvia', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Fernando', 'Vivancos Bosque', '84578578B', 685747355, 'M', 'fernando', 'fernando', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Ana', 'Fuentes Del Vas', '25140310E', 656874103, 'F', 'ana', 'ana', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Alberto', 'Paredes Noguera', '29901282V', 620212589, 'M', 'alberto', 'alberto', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Irene', 'Manzanera Sánchez', '26207029R', 661789852, 'F', 'irene', 'irene', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Alejandro', 'Periago Fernández', '65607827M', 686530021, 'M', 'alejandro', 'alejandro', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Nuria', 'Munuera Gómez', '64993863A', 696242309, 'F', 'nuria', 'nuria', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Guillermo', 'García Rico', '37936217V', 654102387, 'M', 'guillermo', 'guillermo', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Sara', 'Crespo Romero', '78222992S', 674123954, 'F', 'sara', 'sara', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Álvaro', 'Muñoz Hernández', '79503875M', 646512028, 'M', 'alvaro', 'alvaro', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');
INSERT INTO `socios` (`id`, `nombre`, `apellidos`, `dni`, `telefono`,  `genero`, `usuario`, `contrasenya`, `puntos_premios`, `puntos_ranking`, `torneos_jugados`, `torneos_ganados`, `partidos_jugados`, `partidos_ganados`, `premios_canjeados`, `foto`) VALUES
(null, 'Sofía', 'Sánchez Ruiz', '74003279C', 640108090, 'F', 'sofia', 'sofia', 0, 0, 0, 0, 0, 0, 0, 'socios/usuario_defecto.png');

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `max_parejas` int(20) NOT NULL,
  `parejas_apuntadas` int(20) NOT NULL,
  `puntos_campeon` int(20) NOT NULL,
  `puntos_subcampeon` int(20) NOT NULL,
  `puntos_semifinal` int(20) NOT NULL,
  `puntos_cuartos` int(20) NOT NULL,
  `puntos_octavos` int(20) NOT NULL,
  `puntos_resto` int(20) NOT NULL,
  `inscripcion_abierta` varchar(1) NOT NULL,
  `finalizado` varchar(1) NOT NULL,
  `fecha` DATE NOT NULL,
  `genero` varchar(1) NOT NULL,
  `foto` varchar(1000) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
--
-- DATOS DE PRUEBA PARA TORNEOS
--
INSERT INTO `torneos` (`id`, `nombre`, `max_parejas`, `parejas_apuntadas`, `puntos_campeon`,  `puntos_subcampeon`, `puntos_semifinal`, `puntos_cuartos`, `puntos_octavos`, `puntos_resto`, `inscripcion_abierta`, `finalizado`, `fecha`, `genero`, `foto`) VALUES
(null, 'Torneo fin de curso Mixto', 4, 3, 50, 40, 30, 20, 10, 0, 'S', 'N', '2024-06-23', 'D', 'torneos/comun.jpg');
INSERT INTO `torneos` (`id`, `nombre`, `max_parejas`, `parejas_apuntadas`, `puntos_campeon`,  `puntos_subcampeon`, `puntos_semifinal`, `puntos_cuartos`, `puntos_octavos`, `puntos_resto`, `inscripcion_abierta`, `finalizado`, `fecha`, `genero`, `foto`) VALUES
(null, 'Torneo fin de curso Femenino', 4, 2, 50, 40, 30, 20, 10, 0, 'S', 'N', '2024-06-23', 'F', 'torneos/comun.jpg');
INSERT INTO `torneos` (`id`, `nombre`, `max_parejas`, `parejas_apuntadas`, `puntos_campeon`,  `puntos_subcampeon`, `puntos_semifinal`, `puntos_cuartos`, `puntos_octavos`, `puntos_resto`, `inscripcion_abierta`, `finalizado`, `fecha`, `genero`, `foto`) VALUES
(null, 'Torneo fin de curso Masculino', 8, 2, 50, 40, 30, 20, 10, 0, 'S', 'N', '2024-06-23', 'M', 'torneos/comun.jpg');

--
-- Estructura de tabla para la tabla `parejas_torneos`
--

CREATE TABLE `parejas_torneos` (
  `id` int(11) NOT NULL,
  `torneo` int(11) NOT NULL,
  `socio1` int(11) NOT NULL,
  `socio2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indices de la tabla `parejas_torneos`
--
ALTER TABLE `parejas_torneos`
	ADD PRIMARY KEY (`id`);
	
ALTER TABLE parejas_torneos 
	ADD constraint FK_parejas_torneos_torneos 
	FOREIGN KEY (torneo) REFERENCES torneos(id) ON DELETE CASCADE;
	
ALTER TABLE parejas_torneos 
	ADD constraint FK_parejas_torneos_socio1 
	FOREIGN KEY (socio1) REFERENCES socios(id) ON DELETE CASCADE;
	
ALTER TABLE parejas_torneos 
	ADD constraint FK_parejas_torneos_socio2 
	FOREIGN KEY (socio2) REFERENCES socios(id) ON DELETE CASCADE;

--
-- AUTO_INCREMENT de la tabla `parejas_torneos`
--
ALTER TABLE `parejas_torneos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

--
-- DATOS DE PRUEBA PARA PAREJAS_TORNEOS
--
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 1, 5, 6);
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 1, 7, 8);
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 1, 9, 10);
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 2, 6, 8);
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 2, 10, 12);
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 3, 7, 9);
INSERT INTO `parejas_torneos` (`id`, `torneo`, `socio1`, `socio2`) VALUES
(null, 3, 11, 13);

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `id` int(11) NOT NULL,
  `socio1` int(11) NOT NULL,
  `socio2` int(11) NULL,
  `socio3` int(11) NULL,
  `socio4` int(11) NULL,
  `pista` int(2) NULL,
  `fecha` DATE NOT NULL,
  `hora` varchar(10) NOT NULL,
  `pareja_ganadora` varchar(10) NULL,
  `abierto` varchar(2) NOT NULL,
  `finalizado` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
	ADD PRIMARY KEY (`id`);
	
ALTER TABLE partidos 
	ADD constraint FK_partidos_socio1
	FOREIGN KEY (socio1) REFERENCES socios(id) ON DELETE CASCADE;
	
ALTER TABLE partidos 
	ADD constraint FK_partidos_socio2
	FOREIGN KEY (socio2) REFERENCES socios(id) ON DELETE CASCADE;
	
ALTER TABLE partidos 
	ADD constraint FK_partidos_socio3
	FOREIGN KEY (socio3) REFERENCES socios(id) ON DELETE CASCADE;
	
ALTER TABLE partidos 
	ADD constraint FK_partidos_socio4
	FOREIGN KEY (socio4) REFERENCES socios(id) ON DELETE CASCADE;
	

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

--
-- Estructura de tabla para la tabla `premios`
--

CREATE TABLE `premios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `puntos` int(20) NOT NULL,
  `foto` varchar(1000) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indices de la tabla `premios`
--
ALTER TABLE `premios`
	ADD PRIMARY KEY (`id`);
	

--
-- AUTO_INCREMENT de la tabla `premios`
--
ALTER TABLE `premios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
--
-- DATOS DE PRUEBA PREMIOS
--
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Pala Nox', 575, 'premios/comun.jpg');
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Pala Adidas', 500, 'premios/comun.jpg');
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Pala Bullpadel', 450, 'premios/comun.jpg');
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Pala Joma', 350, 'premios/comun.jpg');
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Camiseta Joma', 100, 'premios/comun.jpg');
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Paletero Joma', 300, 'premios/comun.jpg');
INSERT INTO `premios` (`id`, `nombre`, `puntos`, `foto`) VALUES
(null, 'Paletero Nox', 400, 'premios/comun.jpg');

--
-- Estructura de tabla para la tabla `historico_premios`
--

CREATE TABLE `historico_premios` (
  `id` int(11) NOT NULL,
  `premio` int(11) NOT NULL,
  `socio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indices de la tabla `historico_premios`
--
ALTER TABLE `historico_premios`
	ADD PRIMARY KEY (`id`);
	
ALTER TABLE historico_premios 
	ADD constraint FK_historico_premios_premio
	FOREIGN KEY (premio) REFERENCES premios(id) ON DELETE CASCADE;
	
ALTER TABLE historico_premios 
	ADD constraint FK_historico_premios_socio
	FOREIGN KEY (socio) REFERENCES socios(id) ON DELETE CASCADE;
	
	
--
-- AUTO_INCREMENT de la tabla `historico_premios`
--
ALTER TABLE `historico_premios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;





