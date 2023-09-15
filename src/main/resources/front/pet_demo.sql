create database pet_demo;

create table `food`(
    `food_id` int(11) not null AUTO_INCREMENT,
    `food_mood` decimal(5,2) DEFAULT null,
    `food_thirsty` decimal(5,2) DEFAULT null,
    `food_name` varchar(20) not null,
    `food_price` decimal(5,2) DEFAULT null,
    `food_hunger` decimal(5,2) DEFAULT null,
    `food_pic_path` varchar(20) not null,
    `food_endu` decimal(5,2) not null,
    `food_exp` decimal(5,2) not null,
    `food_health` decimal(5,2) not null,
    primary key(`food_id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=gbk;

create table `drink`(
    `drink_id` int(11) not null AUTO_INCREMENT,
    `drink_price` decimal(5,2) DEFAULT null,
    `drink_hunger` decimal(5,2) DEFAULT null,
    `drink_mood` decimal(5,2) DEFAULT null,
    `drink_thirsty` decimal(5,2) DEFAULT null,
    `drink_name` varchar(20) not null,
    `drink_pic_path` varchar(20) not null,
    `drink_endu` decimal(5,2) not null,
    `drink_exp` decimal(5,2) not null,
    `drink_health` decimal(5,2) not null,
    primary key(`drink_id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=gbk;

create table `medicine`(
                        `medicine_id` int(11) not null AUTO_INCREMENT,
                        `medicine_price` decimal(5,2) DEFAULT null,
                        `medicine_mood` decimal(5,2) DEFAULT null,
                        `medicine_name` varchar(20) not null,
                        `medicine_pic_path` varchar(20) not null,
                        `medicine_endu` decimal(5,2) not null,
                        `medicine_exp` decimal(5,2) not null,
                        `medicine_health` decimal(5,2) not null,
                        primary key(`medicine_id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

create table `present`(
                           `present_id` int(11) not null AUTO_INCREMENT,
                           `present_price` decimal(18,2) DEFAULT null,
                           `present_mood` decimal(10,2) DEFAULT null,
                           `present_name` varchar(20) not null,
                           `present_pic_path` varchar(20) not null,
                           `present_exp` decimal(24,2) not null,
                           `present_performance` decimal(5,2) not null,
                           primary key(`present_id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

alter table `present` modify column `present_mood` decimal(10,2);

update present set present_mood = 1490 where present_id = 10;