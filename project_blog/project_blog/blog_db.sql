CREATE DATABASE blog_db;
CREATE DATABASE blogdb CHARACTER SET UTF8MB4 COLLATE utf8mb4_general_ci;
CREATE USER 'bloguser'@'localhost' IDENTIFIED BY 'blogUser6601';
GRANT ALL PRIVILEGES ON blogdb.* TO 'bloguser'@'localhost';
FLUSH PRIVILEGES;
SELECT User , Host FROM mysql.user;

