DROP DATABASE IF EXISTS bucketList_db;

CREATE DATABASE bucketList_db;

USE bucketList_db;

CREATE TABLE bucketlist (
    id INTEGER(3) AUTO_INCREMENT NOT NULL,
    activity VARCHAR(300),
    crossed_off BOOLEAN,
    PRIMARY KEY (id)
)