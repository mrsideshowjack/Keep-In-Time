CREATE DATABASE kit_db;
USE kit_db;
CREATE TABLE project (
project_id INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
tasks VARCHAR(9999),
wbt VARCHAR(9999),
pert VARCHAR(9999),
PRIMARY KEY (project_id)
);

insert into project (name) values ("inse");
insert into project (name) values ("art");
insert into project (name) values ("porsmouth");
select * from project;
