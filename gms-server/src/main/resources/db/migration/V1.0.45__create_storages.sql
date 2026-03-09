CREATE TABLE IF NOT EXISTS `storages`
(
    `storageid` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `accountid` INT(11)          NOT NULL DEFAULT '0',
    `world`     INT(2)           NOT NULL,
    `slots`     INT(11)          NOT NULL DEFAULT '0',
    `meso`      INT(11)          NOT NULL DEFAULT '0',
    PRIMARY KEY (`storageid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `character_storage`
(
     `id` int NOT NULL COMMENT '账号或者角色id',
     `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '物品id',
     `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '物品个数',
     PRIMARY KEY (`id`, `key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;