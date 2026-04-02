drop table if exists shitu_system;

CREATE TABLE if not exists shitu_system  (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `teacherid` int NOT NULL,
    `studentid` int NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `teacherId`(`teacherid`) USING BTREE,
    INDEX `studentId`(`studentid`) USING BTREE
);