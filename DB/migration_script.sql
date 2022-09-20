SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema osia
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `osia` ;
CREATE SCHEMA IF NOT EXISTS `osia` ;

-- ----------------------------------------------------------------------------
-- Table osia.body_part
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `osia`.`body_part` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table osia.injury
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `osia`.`injury` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table osia.radiography
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `osia`.`radiography` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `image_route` VARCHAR(50) NOT NULL,
  `id_body_part` INT(11) NOT NULL,
  `id_user` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_body_part_idx` (`id_body_part` ASC) VISIBLE,
  INDEX `FK2_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `FK1`
    FOREIGN KEY (`id_body_part`)
    REFERENCES `osia`.`body_part` (`id`),
  CONSTRAINT `FK2`
    FOREIGN KEY (`id_user`)
    REFERENCES `osia`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table osia.radiography_injury
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `osia`.`radiography_injury` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_radiography` INT(11) NOT NULL,
  `id_injury` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK1_idx` (`id_radiography` ASC) VISIBLE,
  INDEX `FK2_idx` (`id_injury` ASC) VISIBLE,
  CONSTRAINT `FK3`
    FOREIGN KEY (`id_radiography`)
    REFERENCES `osia`.`radiography` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK4`
    FOREIGN KEY (`id_injury`)
    REFERENCES `osia`.`injury` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table osia.user
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `osia`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  `surname` VARCHAR(30) NULL DEFAULT NULL,
  `email` VARCHAR(40) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
