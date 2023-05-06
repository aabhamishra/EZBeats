CREATE TABLE `Users` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `type_ID` int DEFAULT NULL,
  `login_ID` int DEFAULT NULL,
  `sign_ID` int DEFAULT NULL,
  PRIMARY KEY (`user_ID`),
  KEY `type_ID_idx` (`type_ID`),
  KEY `login_ID_idx` (`login_ID`),
  KEY `sign_ID_idx` (`sign_ID`),
  CONSTRAINT `login_ID` FOREIGN KEY (`login_ID`) REFERENCES `Login Details` (`login_ID`),
  CONSTRAINT `sign_ID` FOREIGN KEY (`sign_ID`) REFERENCES `Registered Users` (`sign_ID`),
  CONSTRAINT `type_ID` FOREIGN KEY (`type_ID`) REFERENCES `User Type` (`type_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci