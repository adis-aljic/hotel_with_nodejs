-- drop database hotel_node;
CREATE DATABASE hotel_node;
USE hotel_node;
-- select * from guest;
-- creating tables for guest and employees
-- username and pass are tied to room (one booking)
-- additional guest in same room will be added via form but reciept and room are tied to first guest
CREATE TABLE employees (
employee_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(40) NOT NULL,
last_name VARCHAR(40) NOT NULL,
date_of_birth DATE,
gender ENUM ("M","F","O"),
country VARCHAR(40),
city VARCHAR(40),
languages ENUM("Bosnian","English","German") DEFAULT "Bosnian",
phone_number VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(40) UNIQUE NOT NULL,
document_for_indefication ENUM("Passport number","ID Card number","Social security number"),
number_of_document_for_indefication VARCHAR (20) NOT NULL UNIQUE,
job_title VARCHAR(40) NOT NULL,
date_for_hiring TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status_for_employee ENUM ("Active","Fired","On leave") DEFAULT "Active",
username VARCHAR(10) UNIQUE NOT NULL,
password VARCHAR(50) UNIQUE NOT NULL
);
ALTER TABLE employees MODIFY languages VARCHAR(40) DEFAULT "Bosnian";
select isLoged from guest where username = "more";
select * from guest;
CREATE TABLE guest(
first_name VARCHAR(40) NOT NULL,
last_name VARCHAR(40) NOT NULL,
date_of_birth DATE,
gender ENUM ("M","F","O"),
country VARCHAR(40),
city VARCHAR(40),
username VARCHAR(10) PRIMARY KEY,
password VARCHAR(50) UNIQUE NOT NULL,
isLoged ENUM ("online","offline") DEFAULT "offline",
prefered_language ENUM ("Bosnian","English") DEFAULT "Bosnian",
phone_number VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(40) UNIQUE NOT NULL,
document_for_indefication ENUM("Passport number","ID Card number","Social security number"),
number_of_document_for_indefication VARCHAR (20) NOT NULL UNIQUE,
booking_id INT,
reciept_id INT,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- delete  from guest where username = "test";
-- select * from room	;
SELECT username, password  FROM employees;
ALTER TABLE guest
MODIFY COLUMN password VARCHAR(70);
ALTER TABLE employees
MODIFY COLUMN password VARCHAR(70);
ALTER TABLE guest
MODIFY COLUMN number_of_document_for_indefication VARCHAR(70);
ALTER TABLE employees	
MODIFY COLUMN number_of_document_for_indefication VARCHAR(70);
CREATE TABLE room (
room_number INT PRIMARY KEY,
type_of_room ENUM("Single bed", "Twin bed", "Apartment"),
price_per_night INT NOT NULL,
room_status ENUM ("Avaiable","Ocupated"),
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
reciept_id INT,
booking_id INT,
cooment VARCHAR (4000)
);
ALTER TABLE room alter  room_status SET DEFAULT "Avaiable";

CREATE TABLE booking (
booking_id INT PRIMARY KEY AUTO_INCREMENT,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room (room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
reciept_id INT,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
total_price_for_room INT NOT NULL DEFAULT 0,
comment VARCHAR (4000)
);
select * from booking;
alter table booking modify total_price_for_room INT;
CREATE TABLE sauna (
sauna_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_sauna INT,
total_price_sauna INT DEFAULT 0,
date_from_sauna DATE ,
date_to_sauna DATE ,
reciept_id INT
);
CREATE TABLE restaurant (
restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_restaurant INT,
date_from_restaurant DATE DEFAULT NULL,
date_to_restaurant DATE ,
total_price_restaurant INT DEFAULT 0,
reciept_id INT
);
CREATE TABLE gym (
gym_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_gym INT,
date_from_gym DATE ,
date_to_gym DATE ,
total_price_gym INT DEFAULT 0,
reciept_id INT
);
CREATE TABLE cinema (
cinema_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_cinema INT ,
date_from_cinema DATE ,
date_to_cinema DATE ,
total_price_cinema INT DEFAULT 0,
reciept_id INT
);
CREATE TABLE pool (
pool_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest(username)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_pool INT ,
date_from_pool DATE ,
date_to_pool DATE ,
total_price_pool INT DEFAULT 0,
reciept_id INT
);
SELECT * FROM room;
CREATE TABLE reciept (
reciept_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(10),
FOREIGN KEY (username) REFERENCES guest (username)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room (room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
sauna_id INT,
FOREIGN KEY (sauna_id) REFERENCES sauna (sauna_id)ON DELETE CASCADE
ON UPDATE CASCADE,
restaurant_id INT,
FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id)ON DELETE CASCADE
ON UPDATE CASCADE,
gym_id INT,
FOREIGN KEY (gym_id) REFERENCES gym (gym_id)ON DELETE CASCADE
ON UPDATE CASCADE,
cinema_id INT,
FOREIGN KEY (cinema_id) REFERENCES cinema (cinema_id)ON DELETE CASCADE
ON UPDATE CASCADE,
pool_id INT,
FOREIGN KEY (pool_id) REFERENCES pool (pool_id)ON DELETE CASCADE
ON UPDATE CASCADE,
total_price_for_booking INT,
reciept_status ENUM ("active","paid") DEFAULT "active",
booking_id INT,
FOREIGN KEY(booking_id) REFERENCES booking(booking_id) ON UPDATE CASCADE ON DELETE CASCADE,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from reciept;
ALTER TABLE guest ADD FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE guest ADD FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id) ON UPDATE CASCADE ON DELETE CASCADE;

INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (101,"Single bed",20,"Avaiable");
INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (102,"Single bed",20,"Avaiable");
INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (201,"Twin bed",40,"Avaiable");
INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (202,"Twin bed",40,"Avaiable");
INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (301,"Apartment",50,"Avaiable");
INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (302,"Apartment",50,"Avaiable");

-- UPDATE room SET room_status = "Ocupated" WHERE room_number =1;
-- INSERT INTO pool (booking_id,room_number,username,price_per_day_pool,date_from_pool,date_to_pool,total_price_pool)
-- VALUES (1,1,1,10,current_date(),adddate(current_date(),5),datediff(date_to_pool,date_from_pool)*price_per_day_pool);
-- INSERT INTO reciept (username, room_number,pool_id,reciept_status) 
-- VALUES(1,1,1,"active");
select * from guest
;
-- UPDATE booking 
-- updating total price for room
-- SET total_price_for_room = datediff(check_out_date, check_in_date) * (SELECT price_per_night FROM room WHERE room_number = 1) WHERE booking_id = 1;
-- UPDATE room 
-- SET username= 1,
-- reciept_id =1,
-- booking_id = 1
-- WHERE room_number =1;
select * from sauna;
-- updating reciept

-- UPDATE reciept 
-- SET total_price_for_booking = (SELECT total_price_pool FROM pool WHERE username = 1) + (SELECT total_price_for_room FROM booking WHERE username = 1) WHERE reciept_id = 1;

-- for creating online booking, just sending inquire to hotel 
CREATE TABLE create_booking (
create_booking_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(40) NOT NULL,
last_name VARCHAR(40) NOT NULL,
type_of_room ENUM ("Single bed","Twin bed","Apartment"),
prefered_language ENUM ("Bosnian","English"),
phone_number VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(40) UNIQUE NOT NULL,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
aditional_services SET ("Sauna","Restaurant","Cinema","Gym","Pool"),
comment VARCHAR (4000),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

alter table cinema add FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id);
alter table restaurant add FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id);
alter table gym add FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id);
alter table pool add FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id);
alter table sauna add FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id);
-- ako je manji checkout date od curr date staviti da je curr date chekcout date
SELECT * FROM guest;
-- UPDATE booking SET reciept_id =1 WHERE username =1; 

alter table guest add column status_guest ENUM("Active","Inactive") DEFAULT "Active";
select * from employees;
select username from guest order by username desc limit 1;

CREATE TABLE sessions (
session_id INT PRIMARY KEY AUTO_INCREMENT,
session_username VARCHAR(40) NOT NULL,
session_password VARCHAR(40) NOT NULL
);
select * from sessions;
-- INSERT INTO employees (first_name,last_name,username,password,phone_number,email,document_for_indefication,number_of_document_for_indefication,job_title)
-- VALUES ("Adis","Aljic","admin","admin","125469","aaa@bb.com","Passport number","77777","Manager");