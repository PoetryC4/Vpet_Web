-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: pet_demo
-- ------------------------------------------------------
-- Server version	10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `drink`
--

DROP TABLE IF EXISTS `drink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drink` (
  `drink_id` int(11) NOT NULL AUTO_INCREMENT,
  `drink_price` decimal(5,2) DEFAULT NULL,
  `drink_hunger` decimal(5,2) DEFAULT NULL,
  `drink_mood` decimal(5,2) DEFAULT NULL,
  `drink_thirsty` decimal(5,2) DEFAULT NULL,
  `drink_name` varchar(20) NOT NULL,
  `drink_pic_path` varchar(20) NOT NULL,
  `drink_endu` decimal(5,2) NOT NULL,
  `drink_exp` decimal(5,2) NOT NULL,
  `drink_health` decimal(5,2) NOT NULL,
  PRIMARY KEY (`drink_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drink`
--

LOCK TABLES `drink` WRITE;
/*!40000 ALTER TABLE `drink` DISABLE KEYS */;
INSERT INTO `drink` VALUES (1,7.50,3.00,37.00,45.00,'雷碧','雷碧.png',5.00,3.00,-1.00),(2,7.50,5.00,2.00,35.00,'维他奶','维他奶.png',15.00,10.00,1.00),(3,8.50,3.00,37.00,40.00,'盐汽水','盐汽水.png',15.00,10.00,-0.50),(4,11.50,4.00,25.00,50.00,'椰汁','椰汁.png',15.00,10.00,2.00),(5,9.50,4.00,7.00,40.00,'果汁','果汁.png',10.00,10.00,3.00),(6,9.00,2.00,50.00,50.00,'可乐','可乐.png',10.00,5.00,-1.00),(7,14.50,1.00,12.00,60.00,'凉茶','凉茶.png',10.00,20.00,5.00),(8,7.00,5.00,2.00,40.00,'ab钙奶','ab钙奶.png',10.00,5.00,1.00),(9,14.00,3.00,25.00,20.00,'黄牛','黄牛.png',85.00,80.00,-1.00),(10,13.50,3.00,20.00,20.00,'能量饮料','能量饮料.png',80.00,140.00,-5.00),(11,13.00,3.00,25.00,20.00,'大鹏特饮','大鹏特饮.png',85.00,60.00,-1.00),(12,0.00,75.00,-100.00,75.00,'地球','地球.png',-50.00,-100.00,0.00),(13,9.50,3.00,20.00,20.00,'咖啡饮料','咖啡饮料.png',80.00,40.00,-1.00);
/*!40000 ALTER TABLE `drink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food` (
  `food_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_mood` decimal(5,2) DEFAULT NULL,
  `food_thirsty` decimal(5,2) DEFAULT NULL,
  `food_name` varchar(20) NOT NULL,
  `food_price` decimal(5,2) DEFAULT NULL,
  `food_hunger` decimal(5,2) DEFAULT NULL,
  `food_pic_path` varchar(20) NOT NULL,
  `food_endu` decimal(5,2) NOT NULL,
  `food_exp` decimal(5,2) NOT NULL,
  `food_health` decimal(5,2) NOT NULL,
  PRIMARY KEY (`food_id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,100.00,100.00,'辣子鸡',43.00,120.00,'辣子鸡.png',100.00,150.00,0.00),(2,75.00,0.00,'麻婆豆腐',35.00,110.00,'麻婆豆腐.png',100.00,100.00,0.00),(3,50.00,0.00,'鸡翅',24.50,75.00,'鸡翅.png',100.00,30.00,0.00),(4,125.00,30.00,'香煎牛仔骨',83.00,160.00,'香煎牛仔骨.png',120.00,300.00,10.00),(5,25.00,0.00,'面包',21.00,100.00,'面包.png',50.00,0.00,0.00),(6,37.00,0.00,'酿豆腐',27.00,80.00,'酿豆腐.png',100.00,75.00,0.00),(7,87.00,50.00,'酸菜鱼',42.00,110.00,'酸菜鱼.png',120.00,150.00,0.00),(8,100.00,30.00,'西冷牛排',74.50,140.00,'西冷牛排.png',120.00,250.00,15.00),(9,75.00,0.00,'芝士焗虾',30.00,70.00,'芝士焗虾.png',80.00,125.00,0.00),(10,12.00,0.00,'臭豆腐',19.50,55.00,'臭豆腐.png',100.00,50.00,0.00),(11,75.00,80.00,'罗宋汤',36.50,110.00,'罗宋汤.png',100.00,100.00,0.00),(12,75.00,30.00,'纸包鸡',29.50,75.00,'纸包鸡.png',85.00,100.00,0.00),(13,75.00,30.00,'红烧狮子头',39.00,90.00,'红烧狮子头.png',120.00,150.00,1.00),(14,75.00,50.00,'红烧牛肉',47.00,130.00,'红烧牛肉.png',140.00,150.00,1.00),(15,75.00,40.00,'盐焗鸡',36.50,90.00,'盐焗鸡.png',100.00,150.00,0.00),(16,50.00,40.00,'番茄意面',36.00,110.00,'番茄意面.png',100.00,100.00,1.00),(17,100.00,30.00,'煎西冷牛排',71.00,150.00,'煎西冷牛排.png',140.00,225.00,15.00),(18,75.00,30.00,'烧鹅',39.50,100.00,'烧鹅.png',120.00,150.00,0.00),(19,50.00,10.00,'炸鸡腿',16.00,40.00,'炸鸡腿.png',40.00,50.00,-2.00),(20,12.00,35.00,'沙拉',39.00,80.00,'沙拉.png',80.00,150.00,10.00),(21,50.00,10.00,'汉堡',20.50,60.00,'汉堡.png',60.00,50.00,-2.00),(22,62.00,30.00,'梅菜扣肉',35.50,100.00,'梅菜扣肉.png',100.00,125.00,0.00),(23,50.00,10.00,'披萨',36.50,100.00,'披萨.png',100.00,150.00,-1.50),(24,37.00,10.00,'南瓜吐司',27.50,100.00,'南瓜吐司.png',80.00,50.00,0.00),(25,75.00,30.00,'华夫饼',29.50,80.00,'华夫饼.png',100.00,70.00,0.00),(26,75.00,50.00,'东坡肘子',36.50,85.00,'东坡肘子.png',100.00,150.00,1.00),(27,37.00,30.00,'三明治',25.00,85.00,'三明治.png',80.00,50.00,0.00),(28,25.00,5.00,'雪饼',6.00,15.00,'雪饼.png',10.00,10.00,-1.00),(29,12.00,-2.00,'软糖',3.50,12.00,'软糖.png',5.00,10.00,-1.00),(30,12.00,-5.00,'薯片',6.00,28.00,'薯片.png',10.00,10.00,-1.50),(31,4.00,-5.00,'花生米',4.00,20.00,'花生米.png',20.00,5.00,0.00),(32,5.00,15.00,'老冰棍',4.00,5.00,'老冰棍.png',15.00,10.00,0.00),(33,12.00,15.00,'绿色心情',3.00,5.00,'绿色心情.png',5.00,5.00,0.00),(34,37.00,-2.00,'瓜子',8.50,26.00,'瓜子.png',30.00,5.00,0.00),(35,37.00,0.00,'猪肉脯',14.00,48.00,'猪肉脯.png',40.00,15.00,0.00),(36,25.00,-1.00,'牛板筋',3.00,8.00,'牛板筋.png',10.00,10.00,-1.00),(37,37.00,-2.00,'牛扎糖',4.50,8.00,'牛扎糖.png',10.00,10.00,0.00),(38,25.00,-5.00,'爆米花',8.00,30.00,'爆米花.png',40.00,10.00,-1.00),(39,30.00,-2.00,'火腿肠',8.50,38.00,'火腿肠.png',40.00,5.00,-0.50),(40,42.00,-1.00,'泡泡糖',4.50,5.00,'泡泡糖.png',5.00,15.00,0.00),(41,5.00,-2.00,'核桃仁',9.50,5.00,'核桃仁.png',20.00,40.00,0.50),(42,20.00,10.00,'散射雪糕',7.00,20.00,'散射雪糕.png',10.00,5.00,0.00),(43,20.00,-2.00,'戒指糖',2.50,10.00,'戒指糖.png',20.00,5.00,-0.50),(44,37.00,-5.00,'巧克力',10.50,38.00,'巧克力.png',30.00,10.00,0.00),(45,12.00,5.00,'小布丁',4.00,10.00,'小布丁.png',10.00,10.00,0.00),(46,25.00,-2.00,'娃仔小馒头',5.00,12.00,'娃仔小馒头.png',15.00,10.00,-0.50),(47,37.00,-2.00,'奶糖',6.00,15.00,'奶糖.png',8.00,15.00,0.00),(48,17.00,-2.00,'奶片',3.00,8.00,'奶片.png',8.00,10.00,0.00),(49,50.00,5.00,'冰激凌',10.00,24.00,'冰激凌.png',40.00,5.00,-0.50),(50,20.00,-10.00,'土力架',17.50,80.00,'土力架.png',80.00,5.00,0.00),(51,5.00,-20.00,'压缩饼干',18.50,100.00,'压缩饼干.png',60.00,5.00,0.00);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicine` (
  `medicine_id` int(11) NOT NULL AUTO_INCREMENT,
  `medicine_price` decimal(5,2) DEFAULT NULL,
  `medicine_mood` decimal(5,2) DEFAULT NULL,
  `medicine_name` varchar(20) NOT NULL,
  `medicine_pic_path` varchar(20) NOT NULL,
  `medicine_endu` decimal(5,2) NOT NULL,
  `medicine_exp` decimal(5,2) NOT NULL,
  `medicine_health` decimal(5,2) NOT NULL,
  PRIMARY KEY (`medicine_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES (1,98.00,20.00,'阿司匹林','阿司匹林.png',30.00,500.00,65.00),(2,18.00,20.00,'钙片','钙片.png',20.00,100.00,10.00),(3,128.00,20.00,'速效救心丸','速效救心丸.png',20.00,800.00,75.00),(4,54.50,10.00,'脑黑金','脑黑金.png',20.00,600.00,15.00),(5,13.00,10.00,'维生素C含片','维生素C含片.png',0.00,50.00,10.00),(6,76.00,20.00,'布洛芬缓释胶囊','布洛芬缓释胶囊.png',20.00,600.00,35.00),(7,0.00,0.00,'太阳系','太阳系.png',20.00,-300.00,100.00),(8,74.50,50.00,'大力丸','大力丸.png',20.00,300.00,50.00),(9,41.50,25.00,'健胃整肠丸','健胃整肠丸.png',20.00,230.00,25.00),(10,33.00,20.00,'666感冒灵颗粒','666感冒灵颗粒.png',20.00,200.00,20.00);
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `present`
--

DROP TABLE IF EXISTS `present`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `present` (
  `present_id` int(11) NOT NULL AUTO_INCREMENT,
  `present_price` decimal(18,2) DEFAULT NULL,
  `present_mood` decimal(10,2) DEFAULT NULL,
  `present_name` varchar(20) NOT NULL,
  `present_pic_path` varchar(20) NOT NULL,
  `present_exp` decimal(24,2) DEFAULT NULL,
  `present_performance` decimal(5,2) NOT NULL,
  PRIMARY KEY (`present_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=gbk;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `present`
--

LOCK TABLES `present` WRITE;
/*!40000 ALTER TABLE `present` DISABLE KEYS */;
INSERT INTO `present` VALUES (1,897.00,70.00,'非常好的麦克风','非常好的麦克风.png',5000.00,0.90),(2,97.00,160.00,'较好的麦克风','较好的麦克风.png',500.00,0.10),(3,1898.00,35.00,'超级好的麦克风','超级好的麦克风.png',10000.00,1.90),(4,48.00,30.00,'普通麦克风','普通麦克风.png',250.00,0.04),(5,444.00,50.00,'很好的麦克风','很好的麦克风.png',2500.00,0.45),(6,190.00,30.00,'好的麦克风','好的麦克风.png',1150.00,0.20),(7,929.00,190.00,'Shiori v7','Shiori v7.png',1500.00,0.85),(8,621.00,150.00,'Shiori v5','Shiori v5.png',1000.00,0.65),(9,214.00,110.00,'Shiori v1','Shiori v1.png',500.00,0.20),(10,2124.00,1490.00,'Inter i7-11700','Inter i7-11700.png',10000.00,2.10),(11,1099.00,290.00,'Inter i5-8400','Inter i5-8400.png',5000.00,1.00),(12,3099.00,1790.00,'Inter i9-14900','Inter i9-14900.png',15000.00,1.00),(13,5999.00,1490.00,'GTC4090','GTC4090.png',25000.00,7.00),(14,2889.00,1010.00,'GTC2070','GTC2070.png',12500.00,3.00),(15,800.00,150.00,'GTC1660','GTC1660.png',2500.00,0.85),(16,974.00,290.00,'APhone X','APhone X.png',5000.00,1.00),(17,4399.00,1190.00,'APhone 14 Pro','APhone 14 Pro.png',20000.00,4.80),(18,2199.00,590.00,'APhone 12','APhone 12.png',10000.00,2.30);
/*!40000 ALTER TABLE `present` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-15 14:08:41
