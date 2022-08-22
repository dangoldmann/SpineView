-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-08-2022 a las 23:10:23
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `osia`
--
CREATE DATABASE IF NOT EXISTS `osia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `osia`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `body_part`
--

CREATE TABLE `body_part` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `injury`
--

CREATE TABLE `injury` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `phone`, `password`) VALUES
(1, 'Dan', 'Goldman', 'goldmandan8@gmail.com', '1138021709', '$2b$10$y/VzzrCBWU6bHCJjUClgv.leNQQeCSrjdcNlogEF1mybfAN8vFdJ.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `x-ray`
--

CREATE TABLE `x-ray` (
  `id` int(11) NOT NULL,
  `image_route` varchar(50) NOT NULL,
  `id_body_part` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `x-ray_injury`
--

CREATE TABLE `x-ray_injury` (
  `id` int(11) NOT NULL,
  `id_x-ray` int(11) NOT NULL,
  `id_injury` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `body_part`
--
ALTER TABLE `body_part`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `injury`
--
ALTER TABLE `injury`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `x-ray`
--
ALTER TABLE `x-ray`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_body_part_idx` (`id_body_part`),
  ADD KEY `FK2_idx` (`id_user`);

--
-- Indices de la tabla `x-ray_injury`
--
ALTER TABLE `x-ray_injury`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1_idx` (`id_x-ray`),
  ADD KEY `FK2_idx` (`id_injury`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `body_part`
--
ALTER TABLE `body_part`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `injury`
--
ALTER TABLE `injury`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `x-ray`
--
ALTER TABLE `x-ray`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `x-ray_injury`
--
ALTER TABLE `x-ray_injury`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `x-ray`
--
ALTER TABLE `x-ray`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`id_body_part`) REFERENCES `body_part` (`id`),
  ADD CONSTRAINT `FK2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `x-ray_injury`
--
ALTER TABLE `x-ray_injury`
  ADD CONSTRAINT `FK3` FOREIGN KEY (`id_x-ray`) REFERENCES `x-ray` (`id`),
  ADD CONSTRAINT `FK4` FOREIGN KEY (`id_injury`) REFERENCES `injury` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
