create database if not exists ephotos_dev;
create database if not exists ephotos_test;

create user if not exists 'ephotos'@'localhost' identified by 'ephotos';
grant all on ephotos_dev.* to 'ephotos'@'localhost';
grant all on ephotos_test.* to 'ephotos'@'localhost';

create user if not exists 'travis'@'localhost' identified by '';
grant all on ephotos_test.* to 'travis'@'localhost';
