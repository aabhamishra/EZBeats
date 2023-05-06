CREATE TABLE `User Library` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `track_ID` int DEFAULT NULL,
  PRIMARY KEY (`user_ID`),
  KEY `track_ID_idx` (`track_ID`),
  CONSTRAINT `track_ID` FOREIGN KEY (`track_ID`) REFERENCES `Track Library` (`track_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci