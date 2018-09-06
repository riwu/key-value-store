CREATE DATABASE  IF NOT EXISTS `dictionary` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dictionary`;

DROP TABLE IF EXISTS `data`;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(300) NOT NULL,
  `value` varchar(300) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `timestamp_INDEX` (`timestamp`),
  KEY `key_INDEX` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;