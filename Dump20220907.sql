-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_node
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `room_number` int DEFAULT NULL,
  `reciept_id` int DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `total_price_for_room` int DEFAULT NULL,
  `comment` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `room_number` (`room_number`),
  KEY `username` (`username`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,202,1,'gost','2022-09-01','2022-09-06',560,NULL),(2,202,2,'test','2022-09-05','2022-09-06',400,NULL),(3,101,3,'rukavica','2022-08-31','2022-09-06',180,NULL),(6,301,6,'more','2022-08-30','2022-09-06',550,NULL),(7,102,7,'nova','2022-09-04','2022-09-06',200,NULL),(8,302,8,'ajvar','2022-09-14','2022-09-22',400,NULL);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema`
--

DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema` (
  `cinema_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `price_per_day_cinema` int DEFAULT NULL,
  `date_from_cinema` date DEFAULT NULL,
  `date_to_cinema` date DEFAULT NULL,
  `total_price_cinema` int DEFAULT '0',
  `reciept_id` int DEFAULT NULL,
  PRIMARY KEY (`cinema_id`),
  KEY `booking_id` (`booking_id`),
  KEY `room_number` (`room_number`),
  KEY `username` (`username`),
  KEY `reciept_id` (`reciept_id`),
  CONSTRAINT `cinema_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cinema_ibfk_2` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cinema_ibfk_3` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cinema_ibfk_4` FOREIGN KEY (`reciept_id`) REFERENCES `reciept` (`reciept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (1,1,202,'gost',10,'2022-09-01','2022-09-07',60,1),(2,2,202,'test',10,'2022-09-03','2022-09-03',0,2),(3,3,101,'rukavica',10,'2022-09-03','2022-09-03',0,3),(6,6,301,'more',10,'2022-09-03','2022-09-03',0,6),(7,7,102,'nova',10,'2022-09-04','2022-09-04',0,7),(8,8,302,'ajvar',10,'2022-09-07','2022-09-07',0,8);
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `create_booking`
--

DROP TABLE IF EXISTS `create_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `create_booking` (
  `create_booking_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `type_of_room` enum('Single bed','Twin bed','Apartment') DEFAULT NULL,
  `prefered_language` enum('Bosnian','English') DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `aditional_services` set('Sauna','Restaurant','Cinema','Gym','Pool') DEFAULT NULL,
  `comment` varchar(4000) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`create_booking_id`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `create_booking`
--

LOCK TABLES `create_booking` WRITE;
/*!40000 ALTER TABLE `create_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `create_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('M','F','O') DEFAULT NULL,
  `country` varchar(40) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `languages` enum('Bosnian','English','German') DEFAULT 'Bosnian',
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `document_for_indefication` enum('Passport number','ID Card number','Social security number') DEFAULT NULL,
  `number_of_document_for_indefication` varchar(70) DEFAULT NULL,
  `job_title` varchar(40) NOT NULL,
  `date_for_hiring` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status_for_employee` enum('Active','Fired','On leave') DEFAULT 'Active',
  `username` varchar(10) NOT NULL,
  `password` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `number_of_document_for_indefication` (`number_of_document_for_indefication`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'adis','aljic','2019-01-01','F','Bosnia & Herzegovina','Tuzla','English','045454545','aaaa@aaa.com','Passport number','11111nn','manager','2022-09-02 18:58:20','Active','admin','admin');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('M','F','O') DEFAULT NULL,
  `country` varchar(40) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(70) DEFAULT NULL,
  `isLoged` enum('online','offline') DEFAULT 'offline',
  `prefered_language` enum('Bosnian','English') DEFAULT 'Bosnian',
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `document_for_indefication` enum('Passport number','ID Card number','Social security number') DEFAULT NULL,
  `number_of_document_for_indefication` varchar(70) DEFAULT NULL,
  `booking_id` int DEFAULT NULL,
  `reciept_id` int DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status_guest` enum('Active','Inactive') DEFAULT 'Active',
  PRIMARY KEY (`username`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `number_of_document_for_indefication` (`number_of_document_for_indefication`),
  UNIQUE KEY `password` (`password`),
  KEY `booking_id` (`booking_id`),
  KEY `reciept_id` (`reciept_id`),
  CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `guest_ibfk_2` FOREIGN KEY (`reciept_id`) REFERENCES `reciept` (`reciept_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES ('ajvar','sataras','2025-01-01','M','Bosnia & Herzegovina','Tuzla','ajvar','sataras','offline','English','8888','avvva@aa.com','ID Card number','ID Card number 11111',8,8,'2022-09-07 09:32:02','Active'),('Jack','Radler','2020-01-01','F','Bosnia & Herzegovina','Tuzla','gost','gost','online','English','04545454599','aaaa@aaaaaa.com','ID Card number','66884',1,1,'2022-09-02 18:59:35','Inactive'),('doroj','odojo','2018-01-01','M','Bosnia & Herzegovina','Tuzla','more','more','online','Bosnian','044335','dd@aaa.com','Passport number','Passport number aaaaaaa',6,6,'2022-09-03 15:10:30','Active'),('ma','ma','2023-01-01','M','Iceland','Tuzla','nova','nova','online','English','986532','a78aa@aaa.com','ID Card number','ID Card number 1111',7,7,'2022-09-04 23:01:03','Active'),('Jack','Radler','2018-01-01','F','Bosnia & Herzegovina','Tuzla','rukavica','bijela','online','English','045454545668','aaaa@aaaaaa3.com','ID Card number','666',3,3,'2022-09-03 13:53:45','Inactive'),('roe','doe','2019-01-01','F','Bosnia & Herzegovina','Tuzla','test','$2b$10$qx8tELxbzIyJISl2pkzs8ew2Btk2bw4j64TwUyyfvAEgLkWA6RoM.','offline','English','9999','88aa@aaa.com','ID Card number','wwww',2,2,'2022-09-03 12:44:02','Active');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gym`
--

DROP TABLE IF EXISTS `gym`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gym` (
  `gym_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `price_per_day_gym` int DEFAULT NULL,
  `date_from_gym` date DEFAULT NULL,
  `date_to_gym` date DEFAULT NULL,
  `total_price_gym` int DEFAULT '0',
  `reciept_id` int DEFAULT NULL,
  PRIMARY KEY (`gym_id`),
  KEY `booking_id` (`booking_id`),
  KEY `room_number` (`room_number`),
  KEY `username` (`username`),
  KEY `reciept_id` (`reciept_id`),
  CONSTRAINT `gym_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gym_ibfk_2` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gym_ibfk_3` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gym_ibfk_4` FOREIGN KEY (`reciept_id`) REFERENCES `reciept` (`reciept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gym`
--

LOCK TABLES `gym` WRITE;
/*!40000 ALTER TABLE `gym` DISABLE KEYS */;
INSERT INTO `gym` VALUES (1,1,202,'gost',10,'2022-09-02','2022-09-02',0,1),(2,2,202,'test',10,'2022-09-03','2022-09-03',0,2),(3,3,101,'rukavica',10,'2022-09-03','2022-09-15',120,3),(6,6,301,'more',10,'2022-09-03','2022-09-03',0,6),(7,7,102,'nova',10,'2022-09-04','2022-09-04',0,7),(8,8,302,'ajvar',10,'2022-09-07','2022-09-07',0,8);
/*!40000 ALTER TABLE `gym` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pool`
--

DROP TABLE IF EXISTS `pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pool` (
  `pool_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `price_per_day_pool` int DEFAULT NULL,
  `date_from_pool` date DEFAULT NULL,
  `date_to_pool` date DEFAULT NULL,
  `total_price_pool` int DEFAULT '0',
  `reciept_id` int DEFAULT NULL,
  PRIMARY KEY (`pool_id`),
  KEY `booking_id` (`booking_id`),
  KEY `room_number` (`room_number`),
  KEY `username` (`username`),
  KEY `reciept_id` (`reciept_id`),
  CONSTRAINT `pool_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pool_ibfk_2` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pool_ibfk_3` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pool_ibfk_4` FOREIGN KEY (`reciept_id`) REFERENCES `reciept` (`reciept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pool`
--

LOCK TABLES `pool` WRITE;
/*!40000 ALTER TABLE `pool` DISABLE KEYS */;
INSERT INTO `pool` VALUES (1,1,202,'gost',10,'2022-09-02','2022-09-16',140,1),(2,2,202,'test',10,'2022-09-03','2022-09-03',0,2),(3,3,101,'rukavica',10,'2022-09-03','2022-09-03',0,3),(6,6,301,'more',10,'2022-09-03','2022-09-03',0,6),(7,7,102,'nova',10,'2022-09-04','2022-09-04',0,7),(8,8,302,'ajvar',10,'2022-09-07','2022-09-07',0,8);
/*!40000 ALTER TABLE `pool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reciept`
--

DROP TABLE IF EXISTS `reciept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reciept` (
  `reciept_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `sauna_id` int DEFAULT NULL,
  `restaurant_id` int DEFAULT NULL,
  `gym_id` int DEFAULT NULL,
  `cinema_id` int DEFAULT NULL,
  `pool_id` int DEFAULT NULL,
  `total_price_for_booking` int DEFAULT NULL,
  `reciept_status` enum('active','paid') DEFAULT 'active',
  `booking_id` int DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reciept_id`),
  KEY `username` (`username`),
  KEY `room_number` (`room_number`),
  KEY `sauna_id` (`sauna_id`),
  KEY `restaurant_id` (`restaurant_id`),
  KEY `gym_id` (`gym_id`),
  KEY `cinema_id` (`cinema_id`),
  KEY `pool_id` (`pool_id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `reciept_ibfk_1` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_2` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_3` FOREIGN KEY (`sauna_id`) REFERENCES `sauna` (`sauna_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_4` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_5` FOREIGN KEY (`gym_id`) REFERENCES `gym` (`gym_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_6` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`cinema_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_7` FOREIGN KEY (`pool_id`) REFERENCES `pool` (`pool_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reciept_ibfk_8` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reciept`
--

LOCK TABLES `reciept` WRITE;
/*!40000 ALTER TABLE `reciept` DISABLE KEYS */;
INSERT INTO `reciept` VALUES (1,'gost',202,1,1,NULL,1,NULL,980,'paid',1,'2022-09-02 18:59:35'),(2,'test',202,NULL,NULL,NULL,NULL,NULL,400,'active',2,'2022-09-03 12:44:02'),(3,'rukavica',101,3,NULL,NULL,NULL,NULL,220,'paid',3,'2022-09-03 13:53:45'),(6,'more',301,NULL,NULL,NULL,NULL,NULL,550,'active',6,'2022-09-03 15:10:30'),(7,'nova',102,NULL,NULL,NULL,NULL,NULL,200,'active',7,'2022-09-04 23:01:03'),(8,'ajvar',302,NULL,NULL,NULL,NULL,NULL,400,'active',8,'2022-09-07 09:32:02');
/*!40000 ALTER TABLE `reciept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `price_per_day_restaurant` int DEFAULT NULL,
  `date_from_restaurant` date DEFAULT NULL,
  `date_to_restaurant` date DEFAULT NULL,
  `total_price_restaurant` int DEFAULT '0',
  `reciept_id` int DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`),
  KEY `booking_id` (`booking_id`),
  KEY `room_number` (`room_number`),
  KEY `username` (`username`),
  KEY `reciept_id` (`reciept_id`),
  CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `restaurant_ibfk_2` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `restaurant_ibfk_3` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `restaurant_ibfk_4` FOREIGN KEY (`reciept_id`) REFERENCES `reciept` (`reciept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,1,202,'gost',20,'2022-09-01','2022-09-10',180,1),(2,2,202,'test',20,'2022-09-03','2022-09-03',0,2),(3,3,101,'rukavica',20,'2022-09-03','2022-09-03',0,3),(6,6,301,'more',20,'2022-09-03','2022-09-03',0,6),(7,7,102,'nova',20,'2022-09-04','2022-09-04',0,7),(8,8,302,'ajvar',20,'2022-09-07','2022-09-07',0,8);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_number` int NOT NULL,
  `type_of_room` enum('Single bed','Twin bed','Apartment') DEFAULT NULL,
  `price_per_night` int NOT NULL,
  `room_status` enum('Avaiable','Ocupated') DEFAULT 'Avaiable',
  `username` varchar(10) DEFAULT NULL,
  `reciept_id` int DEFAULT NULL,
  `booking_id` int DEFAULT NULL,
  `cooment` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`room_number`),
  KEY `username` (`username`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (101,'Single bed',20,'Avaiable',NULL,NULL,NULL,NULL),(102,'Single bed',20,'Ocupated','nova',7,7,NULL),(202,'Twin bed',40,'Ocupated','test',2,2,NULL),(301,'Apartment',50,'Ocupated','more',6,6,NULL),(302,'Apartment',50,'Ocupated','ajvar',8,NULL,NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sauna`
--

DROP TABLE IF EXISTS `sauna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sauna` (
  `sauna_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `price_per_day_sauna` int DEFAULT NULL,
  `total_price_sauna` int DEFAULT '0',
  `date_from_sauna` date DEFAULT NULL,
  `date_to_sauna` date DEFAULT NULL,
  `reciept_id` int DEFAULT NULL,
  PRIMARY KEY (`sauna_id`),
  KEY `booking_id` (`booking_id`),
  KEY `room_number` (`room_number`),
  KEY `username` (`username`),
  KEY `reciept_id` (`reciept_id`),
  CONSTRAINT `sauna_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sauna_ibfk_2` FOREIGN KEY (`room_number`) REFERENCES `room` (`room_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sauna_ibfk_3` FOREIGN KEY (`username`) REFERENCES `guest` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sauna_ibfk_4` FOREIGN KEY (`reciept_id`) REFERENCES `reciept` (`reciept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sauna`
--

LOCK TABLES `sauna` WRITE;
/*!40000 ALTER TABLE `sauna` DISABLE KEYS */;
INSERT INTO `sauna` VALUES (1,1,202,'gost',20,80,'2022-09-01','2022-09-05',1),(2,2,202,'test',20,0,'2022-09-03','2022-09-03',2),(3,3,101,'rukavica',20,40,'2022-09-08','2022-09-10',3),(6,6,301,'more',20,0,'2022-09-03','2022-09-03',6),(7,7,102,'nova',20,0,'2022-09-04','2022-09-04',7),(8,8,302,'ajvar',20,0,'2022-09-07','2022-09-07',8);
/*!40000 ALTER TABLE `sauna` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-07 19:33:47
