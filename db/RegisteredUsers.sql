CREATE TABLE `Registered Users` (
  `sign_ID` int NOT NULL AUTO_INCREMENT,
  `type_ID` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `login_ID` int DEFAULT NULL,
  `upload_ID` int DEFAULT NULL,
  PRIMARY KEY (`sign_ID`),
  KEY `upload_ID_idx` (`upload_ID`),
  KEY `login_ID_idx` (`login_ID`),
  KEY `type_ID_idx` (`type_ID`),
  CONSTRAINT `upload_ID` FOREIGN KEY (`upload_ID`) REFERENCES `Uploaded Sounds` (`upload_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci