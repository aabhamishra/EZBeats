CREATE TABLE `Uploaded Sounds` (
  `sound_ID` int DEFAULT NULL,
  `upload_ID` int NOT NULL AUTO_INCREMENT,
  `sound_name` varchar(45) DEFAULT NULL,
  `sound_description` varchar(45) DEFAULT NULL,
  `sound_fileType` varchar(45) DEFAULT NULL,
  `sound_file` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`upload_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci