 drop database hotel_node;
CREATE DATABASE hotel_node;
USE hotel_node;
  select * from restaurant;
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
password VARCHAR(10) UNIQUE NOT NULL
);
CREATE TABLE guest(
guest_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(40) NOT NULL,
last_name VARCHAR(40) NOT NULL,
date_of_birth DATE,
gender ENUM ("M","F","O"),
country VARCHAR(40),
city VARCHAR(40),
username VARCHAR(10) UNIQUE NOT NULL,
password VARCHAR(10) UNIQUE NOT NULL,
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


CREATE TABLE room (
room_number INT PRIMARY KEY,
type_of_room ENUM("Single bed", "Twin bed", "Apartment"),
price_per_night INT NOT NULL,
room_status ENUM ("Avaiable","Ocupated"),
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
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
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
total_price_for_room INT NOT NULL,
comment VARCHAR (4000)
);
select * from booking;
delete from guest where guest_id = 12;
alter table booking modify total_price_for_room INT;
CREATE TABLE sauna (
sauna_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_sauna INT,
total_price_sauna INT,
date_from_sauna DATE ,
date_to_sauna DATE ,
reciept_id INT,
FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id)
);
CREATE TABLE restaurant (
restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_restaurant INT,
date_from_restaurant DATE ,
date_to_restaurant DATE ,
total_price_restaurant INT,
reciept_id INT,
FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id)
);
CREATE TABLE gym (
gym_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_gym INT,
date_from_gym DATE ,
date_to_gym DATE ,
total_price_gym INT,
reciept_id INT,
FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id)
);
CREATE TABLE cinema (
cinema_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_cinema INT ,
date_from_cinema DATE ,
date_to_cinema DATE ,
total_price_cinema INT,
reciept_id INT,
FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id)
);
CREATE TABLE pool (
pool_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_number INT,
FOREIGN KEY (room_number) REFERENCES room(room_number)ON DELETE CASCADE
ON UPDATE CASCADE,
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
price_per_day_pool INT ,
date_from_pool DATE ,
date_to_pool DATE ,
total_price_pool INT,
reciept_id INT,
FOREIGN KEY (reciept_id) REFERENCES reciept(reciept_id)
);
SELECT * FROM room;
CREATE TABLE reciept (
reciept_id INT PRIMARY KEY AUTO_INCREMENT,
guest_id INT,
FOREIGN KEY (guest_id) REFERENCES guest (guest_id)ON DELETE CASCADE
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
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from booking;
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
-- INSERT INTO pool (booking_id,room_number,guest_id,price_per_day_pool,date_from_pool,date_to_pool,total_price_pool)
-- VALUES (1,1,1,10,current_date(),adddate(current_date(),5),datediff(date_to_pool,date_from_pool)*price_per_day_pool);
-- INSERT INTO reciept (guest_id, room_number,pool_id,reciept_status) 
-- VALUES(1,1,1,"active");
select * from reciept
;
-- UPDATE booking 
-- updating total price for room
-- SET total_price_for_room = datediff(check_out_date, check_in_date) * (SELECT price_per_night FROM room WHERE room_number = 1) WHERE booking_id = 1;
-- UPDATE room 
-- SET guest_id= 1,
-- reciept_id =1,
-- booking_id = 1
-- WHERE room_number =1;
select * from sauna;
-- updating reciept

-- UPDATE reciept 
-- SET total_price_for_booking = (SELECT total_price_pool FROM pool WHERE guest_id = 1) + (SELECT total_price_for_room FROM booking WHERE guest_id = 1) WHERE reciept_id = 1;

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


-- ako je manji checkout date od curr date staviti da je curr date chekcout date
SELECT * FROM guest;
-- UPDATE booking SET reciept_id =1 WHERE guest_id =1; 

alter table guest add column status_guest ENUM("Active","Inactive") DEFAULT "Active";
-- INSERT INTO guest (first_name,last_name,date_of_birth,gender,country,city,prefered_language,phone_number,email,document_for_indefication,number_of_document_for_indefication,username,password)
-- VALUES ("Jane","Doe","1989-9-19","M","BIH", "Tuzla","Bosnian","061556555","jane@gmail.com","Passport number","55556","admin","test1");
select * from booking;
select guest_id from guest order by guest_id desc limit 1;

