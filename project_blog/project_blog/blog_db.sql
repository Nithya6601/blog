CREATE DATABASE blog_db;
CREATE DATABASE blogdb;
CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'nithya6601Niya';
GRANT ALL PRIVILEGES ON blogdb.* TO 'bloguser'@'localhost';
FLUSH PRIVILEGES;
SELECT User , Host FROM mysql.user;