-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table kraken.twitch_channels
CREATE TABLE IF NOT EXISTS `twitch_channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(50) NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table kraken.twitch_channels: ~6 rows (approximately)
/*!40000 ALTER TABLE `twitch_channels` DISABLE KEYS */;
INSERT INTO `twitch_channels` (`id`, `channel_name`, `data`) VALUES
	(7, 'njbl_reborns', '{"online":false,"timestamp":1542279397.23}'),
	(8, 'RivalZlive', '{"online":false,"timestamp":0}'),
	(9, 'MikSchultzy', '{"online":false,"timestamp":0}'),
	(10, 'BreakinSkullz', '{"online":false,"timestamp":1542532032.154}'),
	(11, 'CaptSh1thead', '{"online":false,"timestamp":0}'),
	(12, 'Klean', '{"online":false,"timestamp":0}');
/*!40000 ALTER TABLE `twitch_channels` ENABLE KEYS */;

-- Dumping structure for table kraken.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(50) NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=utf8;

-- Dumping data for table kraken.users: ~53 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `client_id`, `data`) VALUES
	(258, '181560985029574656', '{"cRep":{"lastRecieve":1547040914.041,"amount":27},"tRep":{"amount":0,"givenRepTo":[]},"warns":null}'),
	(259, '139636353594818560', '{"cRep":{"lastRecieve":1547131231.073,"amount":47},"warns":null}'),
	(260, '175211600045670400', '{"cRep":{"lastRecieve":1542156227.143,"amount":1}}'),
	(261, '181468996414078976', '{"cRep":{"lastRecieve":1545632076.435,"amount":3}}'),
	(262, '397873027800367106', '{"cRep":{"lastRecieve":1546837510.739,"amount":9}}'),
	(263, '344090142627201035', '{"cRep":{"lastRecieve":1542156880.631,"amount":1}}'),
	(264, '195732656485302272', '{"cRep":{"lastRecieve":1546883651.945,"amount":8}}'),
	(265, '145220086305652736', '{"cRep":{"lastRecieve":1542157523.595,"amount":1}}'),
	(266, '250491961985859585', '{"cRep":{"lastRecieve":1547177447.821,"amount":25}}'),
	(267, '243539913369190401', '{"cRep":{"lastRecieve":1546747999.97,"amount":29}}'),
	(268, '167822033642586112', '{"cRep":{"lastRecieve":1544160659.524,"amount":5}}'),
	(269, '331689111515693067', '{"cRep":{"lastRecieve":1547165361.219,"amount":45}}'),
	(270, '146841331464011776', '{"cRep":{"lastRecieve":1547091861.569,"amount":43}}'),
	(271, '416032301672038401', '{"cRep":{"lastRecieve":1546160436.854,"amount":2}}'),
	(272, '211329545993846784', '{"cRep":{"lastRecieve":1546933198.628,"amount":4}}'),
	(273, '158403414835986432', '{"cRep":{"lastRecieve":1546661450.471,"amount":7}}'),
	(274, '147895628389679104', '{"cRep":{"lastRecieve":1547178379.119,"amount":26}}'),
	(275, '200803055913009153', '{"cRep":{"lastRecieve":1546733061.898,"amount":9}}'),
	(276, '484608224688078858', '{"cRep":{"lastRecieve":1543729782.62,"amount":3}}'),
	(277, '269768350383603712', '{"cRep":{"lastRecieve":1547003762.677,"amount":28}}'),
	(278, '208698838712582145', '{"cRep":{"lastRecieve":1546828432.342,"amount":16}}'),
	(279, '250789386659037185', '{"cRep":{"lastRecieve":1543014621.783,"amount":4}}'),
	(280, '166931945744367616', '{"cRep":{"lastRecieve":1542186879.45,"amount":1}}'),
	(281, '309230530610855936', '{"cRep":{"lastRecieve":1542196054.496,"amount":1}}'),
	(282, '207259271031816194', '{"cRep":{"lastRecieve":1543421078.424,"amount":3}}'),
	(283, '479308058174947339', '{"cRep":{"lastRecieve":1542213432.373,"amount":1}}'),
	(284, '272544777759621121', '{"cRep":{"lastRecieve":1547175252.102,"amount":11}}'),
	(285, '228936370117148673', '{"cRep":{"lastRecieve":1547058709.416,"amount":4}}'),
	(286, '345225575104774144', '{"cRep":{"lastRecieve":1542904847.925,"amount":2}}'),
	(287, '196392242686984192', '{"cRep":{"lastRecieve":1546539737.695,"amount":11}}'),
	(288, '293423810118418434', '{"cRep":{"lastRecieve":1545867619.45,"amount":6}}'),
	(289, '353374851047751681', '{"cRep":{"lastRecieve":1544153971.566,"amount":6}}'),
	(290, '192816237141688320', '{"cRep":{"lastRecieve":1546465513.447,"amount":3}}'),
	(291, '394005719747133460', '{"cRep":{"lastRecieve":1547166269.577,"amount":29}}'),
	(292, '381617509834555392', '{"cRep":{"lastRecieve":1546815935.357,"amount":24}}'),
	(293, '320026624860880896', '{"cRep":{"lastRecieve":1546225772.385,"amount":3}}'),
	(294, '130479672646565888', '{"cRep":{"lastRecieve":1542245142.619,"amount":1}}'),
	(295, '335593871545335809', '{"cRep":{"lastRecieve":1542246206.67,"amount":1}}'),
	(296, '283075150340030464', '{"cRep":{"lastRecieve":1542246764.74,"amount":1}}'),
	(297, '227227546159284225', '{"cRep":{"lastRecieve":1542250865.416,"amount":1}}'),
	(298, '255144200239185931', '{"cRep":{"lastRecieve":1542251572.745,"amount":1}}'),
	(299, '259597234457280512', '{"cRep":{"lastRecieve":1546553285.313,"amount":12}}'),
	(300, '226545462004416514', '{"cRep":{"lastRecieve":1547084692.938,"amount":10}}'),
	(301, '206650807565811712', '{"cRep":{"lastRecieve":1544833963.013,"amount":2}}'),
	(302, '439806109793124363', '{"cRep":{"lastRecieve":1542259145.116,"amount":1}}'),
	(303, '242116966649823232', '{"cRep":{"lastRecieve":1543905418.732,"amount":2}}'),
	(304, '206433726358487040', '{"cRep":{"lastRecieve":1542338335.415,"amount":1}}'),
	(305, '249417460732657664', '{"cRep":{"lastRecieve":1542580722.019,"amount":2}}'),
	(306, '407470715584118785', '{"cRep":{"lastRecieve":1547161655.329,"amount":19}}'),
	(307, '263106401046364161', '{"cRep":{"lastRecieve":1543376409.524,"amount":2}}'),
	(308, '304659545261735939', '{"cRep":{"lastRecieve":1542998391.185,"amount":1}}'),
	(309, '248923340247531520', '{"cRep":{"lastRecieve":1547175875.209,"amount":20}}'),
	(310, '280175496950448130', '{"cRep":{"lastRecieve":1543371105.619,"amount":1}}');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
