CREATE DATABASE hotelManagment;
USE hotelManagment;


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
languages VARCHAR(100) DEFAULT "Bosnian",
phone_number VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(40) UNIQUE NOT NULL,
document_for_indefication ENUM("Passport number","ID Card number","Social security number"),
number_of_document_for_indefication VARCHAR (20) NOT NULL UNIQUE,
job_title VARCHAR(40) NOT NULL,
date_for_hiring DATE NOT NULL,
status_for_employee ENUM ("Active","Fired","On leave"),
user_pass_id INT,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guest(
guest_id INT PRIMARY KEY AUTO_INCREMENT,
guests_id INT,
first_name VARCHAR(40) NOT NULL,
last_name VARCHAR(40) NOT NULL,
date_of_birth DATE,
gender ENUM ("M","F","O"),
country VARCHAR(40),
city VARCHAR(40),
prefered_language ENUM ("Bosnian","English"),
phone_number VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(40) UNIQUE NOT NULL,
document_for_indefication ENUM("Passport number","ID Card number","Social security number"),
number_of_document_for_indefication VARCHAR (20) NOT NULL UNIQUE,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guests (
guests_id INT PRIMARY KEY AUTO_INCREMENT,
guest1_id INT NOT NULL UNIQUE,
FOREIGN KEY (guest1_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guest2_id INT ,
FOREIGN KEY (guest2_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guest3_id INT,
FOREIGN KEY (guest3_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guest4_id INT,
FOREIGN KEY (guest4_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guest5_id INT,
FOREIGN KEY (guest5_id) REFERENCES guest(guest_id)ON DELETE CASCADE
ON UPDATE CASCADE,
status_for_guests ENUM ("Checked in","Checked out"),
booking_id INT,
room_id INT,
reciept_id INT

);


CREATE TABLE room (
room_id INT PRIMARY KEY AUTO_INCREMENT,
room_number INT NOT NULL UNIQUE,
type_of_room ENUM("Single bed", "Twin bed", "Apartment"),
price_per_night INT NOT NULL,
room_status ENUM ("Avaiable","Ocupated"),
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
reciept_id INT,
booking_id INT,
cooment VARCHAR (4000)
);
ALTER TABLE room alter  room_status SET DEFAULT "Avaiable";
CREATE TABLE user_pass (
user_pass_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR (20) UNIQUE NOT NULL,
password VARCHAR (20) UNIQUE NOT NULL,
status ENUM ("Active","Inactive") DEFAULT "Active",
isLogged ENUM("Online","Offline"),
reciept_id INT,
booking_id INT
);
ALTER TABLE guests ADD FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
ON UPDATE CASCADE;
CREATE TABLE booking (
booking_id INT PRIMARY KEY AUTO_INCREMENT,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room (room_id)ON DELETE CASCADE
ON UPDATE CASCADE,
user_pass_id INT,
FOREIGN KEY (user_pass_id) REFERENCES user_pass(user_pass_id)ON DELETE CASCADE
ON UPDATE CASCADE,
reciept_id INT,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
total_price_for_room INT NOT NULL,
comment VARCHAR (4000)
);
ALTER TABLE user_pass ADD FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON UPDATE CASCADE ON DELETE CASCADE;


CREATE TABLE sauna (
sauna_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
sauna_status ENUM ("Active","Reserved","Canceled") NOT NULL DEFAULT "Active",
price_per_day_sauna INT NOT NULL,
total_price_sauna INT,
date_from_sauna DATE NOT NULL,
date_to_sauna DATE NOT NULL,
receipt_id INT
);
CREATE TABLE restaurant (
restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
restaurant_status ENUM ("active","reserved","canceled") NOT NULL,
price_per_day_restaurant INT NOT NULL,
date_from_restaurant DATE NOT NULL,
date_to_restaurant DATE NOT NULL,
total_price_restaurant INT
);
CREATE TABLE gym (
gym_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
gym_status ENUM ("active","reserved","canceled") NOT NULL,
price_per_day_gym INT NOT NULL,
date_from_gym DATE NOT NULL,
date_to_gym DATE NOT NULL,
total_price_gym INT
);
CREATE TABLE cinema (
cinema_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
cinema_status ENUM ("active","reserved","canceled") NOT NULL,
price_per_day_cinema INT NOT NULL,
date_from_cinema DATE NOT NULL,
date_to_cinema DATE NOT NULL,
total_price_cinema INT
);
CREATE TABLE pool (
pool_id INT PRIMARY KEY AUTO_INCREMENT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id)ON DELETE CASCADE
ON UPDATE CASCADE,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests(guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
pool_status ENUM ("active","reserved","canceled") NOT NULL,
price_per_day_pool INT NOT NULL,
date_from_pool DATE NOT NULL,
date_to_pool DATE NOT NULL,
total_price_pool INT
);

CREATE TABLE receipt (
reciept_id INT PRIMARY KEY AUTO_INCREMENT,
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests (guests_id)ON DELETE CASCADE
ON UPDATE CASCADE,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room (room_id)ON DELETE CASCADE
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
SELECT * FROM user_pass;
ALTER TABLE user_pass ADD COLUMN guests_id INT;
ALTER TABLE user_pass ADD FOREIGN KEY (guests_id) REFERENCES guests(guests_id) ON UPDATE CASCADE ON DELETE CASCADE;
INSERT INTO guest (first_name,last_name,date_of_birth,gender,country,city,prefered_language,phone_number,email,document_for_indefication,number_of_document_for_indefication)
VALUES ("Adis","Aljic","1989-9-19","M","BIH", "Tuzla","Bosnian","061555555","adis.adis@gmail.com","Passport number","55555");
INSERT INTO guests (guest1_id,status_for_guests) VALUE (1,"checked in");
INSERT INTO room (room_number, type_of_room,price_per_night,room_status) 
VALUES (303,"Apartment",50,"Avaiable");
INSERT INTO user_pass (username, password,status,guests_id) VALUES ("test","test","Active",1);
INSERT INTO booking (room_id,user_pass_id,guests_id,check_in_date,check_out_date,total_price_for_room)
VALUES (1,1,1,current_date(),adddate(current_date(),5),0);
UPDATE room SET room_status = "Ocupated" WHERE room_id =1;
INSERT INTO pool (booking_id,room_id,guests_id,price_per_day_pool,date_from_pool,date_to_pool,total_price_pool)
VALUES (1,1,1,10,current_date(),adddate(current_date(),5),datediff(date_to_pool,date_from_pool)*price_per_day_pool);
INSERT INTO receipt (guests_id, room_id,pool_id,reciept_status) 
VALUES(1,1,1,"active");


SELECT * FROM receipt;

UPDATE booking 
-- updating total price for room
SET total_price_for_room = datediff(check_out_date, check_in_date) * (SELECT price_per_night FROM room WHERE room_id = 1) WHERE booking_id = 1;
UPDATE room 
SET guests_id= 1,
reciept_id =1,
booking_id = 1
WHERE room_id =1;

-- updating reciept

UPDATE receipt 
SET total_price_for_booking = (SELECT total_price_pool FROM pool WHERE guests_id = 1) + (SELECT total_price_for_room FROM booking WHERE guests_id = 1) WHERE reciept_id = 1;

-- for creating online booking, just sending inquire to hotel 
CREATE TABLE create_booking (
create_booking_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(40) NOT NULL,
last_name VARCHAR(40) NOT NULL,
number_of_people ENUM ("1","2","3","4"),
type_of_room ENUM ("Single bed","Twin bed","Apartment"),
date_of_birth DATE,
gender ENUM ("M","F","O"),
country VARCHAR(40),
city VARCHAR(40),
prefered_language ENUM ("Bosnian","English"),
phone_number VARCHAR(15) UNIQUE NOT NULL,
email VARCHAR(40) UNIQUE NOT NULL,
document_for_indefication ENUM("Passport number","ID Card number","Social security number"),
number_of_document_for_indefication VARCHAR (20) NOT NULL UNIQUE,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
aditional_services SET ("Sauna","Restaurant","Cinema","Gym","Pool"),
date_from_sauna DATE,
date_to_sauna DATE,
date_from_restaurant DATE,
date_to_restaurant DATE,
date_from_cinema DATE,
date_to_cinema DATE,
date_from_gym DATE,
date_to_gym DATE,
date_from_pool DATE,
date_to_pool DATE,
comment VARCHAR (4000),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE guest_checkout (
guest_checkout_id INT PRIMARY KEY AUTO_INCREMENT,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id),
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests (guests_id),
comment VARCHAR (4000),
username VARCHAR (20),
password VARCHAR (20),
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE guest_checkout_admin (
guest_checkout_admin_id INT PRIMARY KEY AUTO_INCREMENT,
room_id INT,
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking (booking_id),
FOREIGN KEY (room_id) REFERENCES room(room_id),
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests (guests_id),
comment VARCHAR (4000),
username VARCHAR (20),
password VARCHAR (20),
guest_checkout_id INT,
FOREIGN KEY (guest_checkout_id) REFERENCES guest_checkout (guest_checkout_id),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE change_reservation (
change_reservation_id INT PRIMARY KEY AUTO_INCREMENT,
room_id INT,
FOREIGN KEY (room_id) REFERENCES room(room_id),
booking_id INT,
FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
guests_id INT,
FOREIGN KEY (guests_id) REFERENCES guests (guests_id),
comment VARCHAR (4000),
username VARCHAR (20),
password VARCHAR (20),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ako je manji checkout date od curr date staviti da je curr date chekcout date
SELECT * FROM room;
UPDATE booking 
SET reciept_id =1 WHERE guests_id =1; 


SELECT * FROM booking;



UPDATE user_pass
SET isLogged = "Online"
WHERE user_pass_id =1;