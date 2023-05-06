CREATE TABLE `Track Library` (
  `track_ID` int NOT NULL AUTO_INCREMENT,
  `track_name` varchar(45) DEFAULT NULL,
  `track_description` varchar(45) DEFAULT NULL,
  `track_fileType` varchar(45) DEFAULT NULL,
  `track_file` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`track_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci