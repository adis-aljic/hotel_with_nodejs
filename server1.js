const express = require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser")
const app = express();
const mysql = require("mysql2")
const con = require("./databaseCon.js");
const { Console } = require("console");
// const roomPrice = require("./js/price");


const db = mysql.createConnection(con)
db.connect((err) => {
    if (err) throw err
    else
        console.log("database is connected")
})

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname));
app.set("view engine", "ejs")


app.get("/", function (req, res) {
    res.render("index")
})
app.get("/contact", function (req, res) {
    res.render("contact")
})
app.get("/booking", function (req, res) {
    res.render("booking")
})
app.get("/login", function (req, res) {
    res.render("login")
})
app.get("/adminguest", function (req, res) {
    res.render("adminguest")
})
app.get("/adminemployee", function (req, res) {
    res.render("adminemployee")
})

app.get("/findbooking", function (req, res) {
    res.render("findbooking")
})


    app.post("/adminguest", urlencodedParser, function (req, res) {
    

    res.render("newguest", { info: req.body })
    const info = req.body;
    console.log(req.body)
    class newguestClass {
        static id=0;
        first_name;
        last_name;
        date_of_birth;
        country;
        city;
        phone_number;
        email;
        gender;
        prefered_language;
        username;
        password;
        document_for_indefication;
        number_of_document_for_indefication;
        constructor(first_name,last_name,date_of_birth,country,city,phone_number,email,gender,prefered_languages,username,password,document_for_indefication,number_of_document_for_indefication){
        this.first_name = first_name,
        this.last_name= last_name,
        this.date_of_birth= date_of_birth,
        this.country= country,
        this.city= city,
        this.phone_number= phone_number,
        this.email= email,
        this.gender= gender,
        this.prefered_language= prefered_languages,
        this.username= username,
        this.password= password,
        this.document_for_indefication= document_for_indefication,
        this.number_of_document_for_indefication= number_of_document_for_indefication
    }
}
class guestRoomClass {
    room_number;
        room_status;
        constructor(room_number){
            this.room_number = room_number,
            this.room_status = "Ocupated"
        }
    }
    class guestBookingClass {
        static id = 1;
        check_in_date;
        check_out_date;
        constructor(check_in_date,check_out_date,price_per_night){
            this.bookingid = guestBookingClass.id++,
            this.check_in_date= check_in_date,
            this.check_out_date= check_out_date,
            this.price_per_night = price_per_night
        }
    }
    
    class guestSaunaClass {
        static id = 0;
        date_to_sauna;
        date_from_sauna;
        constructor(date_from_sauna,date_to_sauna){
            this.saunaid = ++guestSaunaClass.id,
            this.date_from_sauna= date_from_sauna,
            this.date_to_sauna=  date_to_sauna,
            this.price_per_day_sauna = 20
        }
    }
    class guestRestaurantClass {
        static id = 0;
        date_to_restaurant;
        date_from_restaurant;
        constructor(date_from_restaurant,date_to_restaurant){
            this.restaurantid = ++guestRestaurantClass.id,
            this.date_from_restaurant= date_from_restaurant,
            this.date_to_restaurant=  date_to_restaurant,
            this.price_per_day_restaurant = 20
        }
    }
    class guestPoolClass {
        static id = 0;
        date_to_pool;
        date_from_pool
        constructor(date_to_pool,date_from_pool){
            this.poolid = ++guestPoolClass.id,
            this.date_from_pool= date_from_pool,
            this.date_to_pool=  date_to_pool,
            this.price_per_day_pool = 10

        }
    }
    
    class guestGymClass {
        static id = 0;
        date_to_gym;
        date_from_gym
        constructor(date_to_gym,date_from_gym){
            this.gymid = ++guestGymClass.id,
            this.date_from_gym= date_from_gym,
            this.date_to_gym=  date_to_gym,
            this.price_per_day_gym = 10       
        }
    }
    
    class guestCinemaClass {
        static id = 0;
        date_to_cinema;
        date_from_cinema
        constructor(date_to_cinema,date_from_cinema){
            this. cinemaid = ++guestCinemaClass.id,
            this.date_from_cinema= date_from_cinema,
            this.date_to_cinema=  date_to_cinema,
            this.price_per_day_cinema = 10
            
        }
    }
    class guestRecieptClass {
        static id =0;
        constructor(){
            this.recieptid= ++guestRecieptClass.id;
        }
    }

        var newguest = new newguestClass(info.first_name,info.last_name,info.date_of_birth,info.country,info.city,info.phone_number,info.email,info.gender,info.prefered_language,info.username,info.password,info.document_for_indefication,info.number_of_document_for_indefication)
        var guestRoom = new guestRoomClass(info.room_number)
        var guestSauna = new guestSaunaClass(info.date_from_sauna,info.date_to_sauna)
        var guestBooking = new guestBookingClass(info.check_in_date,info.check_out_date,info.price_per_night)
        var guestRestaurant= new guestRestaurantClass(info.date_from_restaurant,info.date_to_restaurant)
        var guestPool= new guestPoolClass (info.date_from_restaurant,info.date_to_restaurant) 
        var guestGym= new guestGymClass (info.date_from_restaurant,info.date_to_restaurant)
        var guestCinema= new guestCinemaClass (info.date_from_restaurant,info.date_to_restaurant)
        var guestReciept = new guestRecieptClass();
    
    // console.log(guestRoom)
   
    var sqlGuest = `INSERT INTO guest (first_name,last_name,date_of_birth,gender,country,city,prefered_language,phone_number,email,document_for_indefication,number_of_document_for_indefication,username,password) 
    VALUES("${newguest.first_name}","${newguest.last_name}","${newguest.date_of_birth}","${newguest.gender}","${newguest.country}","${newguest.city}","${newguest.prefered_language}","${newguest.phone_number}","${newguest.email}","${newguest.document_for_indefication}","${newguest.number_of_document_for_indefication}","${newguest.username}","${newguest.password}")`
    
    
 var total_price_for_room = Math.ceil((new Date(info.check_out_date) - new Date(info.check_in_date) )/(3600*24*1000)*guestBooking.price_per_night);
 
var sqlBooking = `INSERT INTO booking (room_number,username,check_in_date,check_out_date,total_price_for_room)
    VALUES (${guestRoom.room_number}, "${newguest.username}", "${guestBooking.check_in_date}","${guestBooking.check_out_date}",${total_price_for_room})`
    
    var sqlRoom = `UPDATE room   
    SET room_status = "Ocupated", username = "${newguest.username}", booking_id = ${guestBooking.bookingid} 
    WHERE room_number = ${guestRoom.room_number}`
    
    var updateRoom = `UPDATE room SET reciept_id = ${guestReciept.recieptid} WHERE room_number = ${guestRoom.room_number}`
    var updateBooking = `UPDATE booking SET reciept_id = ${guestReciept.recieptid} WHERE booking_id = ${guestBooking.bookingid}`
    var updateSauna = `UPDATE sauna SET reciept_id = ${guestReciept.recieptid} WHERE sauna_id = ${guestSauna.saunaid}`
    var updateRestaurant = `UPDATE restaurant SET reciept_id = ${guestReciept.recieptid} WHERE restaurant_id = ${guestRestaurant.restaurantid}`
    var updateCinema = `UPDATE cinema SET reciept_id = ${guestReciept.recieptid} WHERE cinema_id = ${guestCinema.cinemaid}`
    var updateGym = `UPDATE gym SET reciept_id = ${guestReciept.recieptid} WHERE gym_id = ${guestGym.gymid}`
    var updatePool = `UPDATE pool SET reciept_id = ${guestReciept.recieptid} WHERE pool_id = ${guestPool.poolid}`
    

    db.query(sqlGuest, newguest, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added")
    })

    db.query(sqlBooking, guestBooking, function (err, data) {
        if (err) throw err;
        else {                    
            console.log(" new guest is booked")
        }     
    })
   
    db.query(sqlRoom,guestRoom, function(err, data){
        if (err) throw err;
        else console.log("Guest is added to room")
    })
    let total_price_cinema = 0
    if (info.date_from_cinema != "" && info.date_to_cinema != "") {

        total_price_cinema = (new Date(guestCinema.date_to_cinema) - new Date(guestCinema.date_from_cinema) )/(1000*24*3600)*guestCinema.price_per_day_cinema;
        var sqlCinema = `INSERT INTO cinema(booking_id,room_number,username,date_from_cinema,date_to_cinema,price_per_day_cinema,total_price_cinema)
        VALUES(${guestBooking.bookingid}, ${guestRoom.room_number},"${newguest.username}", "${guestCinema.date_from_cinema}", "${guestCinema.date_to_cinema}",${guestCinema.price_per_day_cinema},${total_price_cinema})`
       
        db.query(sqlCinema, guestCinema, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added cinema")
        })
    }
    let total_price_gym = 0
    if (info.date_from_gym != "" && info.date_to_gym != "") {

        total_price_gym = (new Date(guestGym.date_to_gym) - new Date(guestGym.date_from_gym) )/(1000*24*3600)*guestGym.price_per_day_gym;
        var sqlGym = `INSERT INTO gym(booking_id,room_number,username,date_from_gym,date_to_gym,price_per_day_gym,total_price_gym)
        VALUES(${guestBooking.bookingid}, ${guestRoom.room_number},"${newguest.username}", "${guestGym.date_from_gym}", "${guestGym.date_to_gym}",${guestGym.price_per_day_restaurant},${total_price_gym})`
        
    
        db.query(sqlGym, guestGym, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added gym")
        })
    }
    let total_price_pool = 0
    if (info.date_from_pool != "" && info.date_to_pool != "") {
         total_price_pool=(new Date(guestPool.date_to_pool) - new Date(guestPool.date_from_pool) )/(1000*24*3600)*guestPool.price_per_day_pool
 var sqlPool = `INSERT INTO pool(booking_id,room_number,username,date_from_pool,date_to_pool,price_per_day_pool,total_price_pool)
    VALUES(${guestBooking.bookingid}, ${guestRoom.room_number},"${newguest.username}", "${guestPool.date_from_pool}", "${guestPool.date_to_pool}",${guestPool.price_per_day_restaurant},${total_price_pool})`
   
        db.query(sqlPool, guestPool, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added pool")
        })
    }
    let total_price_restaurant = 0
    if (info.date_from_restaurant != "" && info.date_to_restaurant != "") {

        total_price_restaurant =(new Date(info.date_to_restaurant) - new Date(info.date_from_restaurant) )/(1000*24*3600)*guestRestaurant.price_per_day_restaurant
       
        var sqlRestaurant = `INSERT INTO restaurant(booking_id,room_number,username,date_from_restaurant,date_to_restaurant,price_per_day_restaurant,total_price_restaurant)
        VALUES(${guestBooking.bookingid}, ${guestRoom.room_number},"${newguest.username}", "${guestRestaurant.date_from_restaurant}", "${guestRestaurant.date_to_restaurant}",${guestRestaurant.price_per_day_restaurant},${total_price_restaurant})`
       console.log(total_price_restaurant)
        db.query(sqlRestaurant, guestRestaurant, function (err, data) {
            if (err) throw err; 
            else console.log(" new guest added restaurant")
        })
    }
    let total_price_sauna = 0
    if (info.date_from_sauna != "" && info.date_to_sauna != "") {

         total_price_sauna = (new Date(guestSauna.date_to_sauna) - new Date(guestSauna.date_from_sauna) )/(1000*24*3600)*guestSauna.price_per_day_sauna
        var sqlSauna = `INSERT INTO sauna(booking_id,room_number,username,date_from_sauna,date_to_sauna,price_per_day_sauna,total_price_sauna)
        VALUES(${guestBooking.bookingid}, ${guestRoom.room_number},"${newguest.username}", "${guestSauna.date_from_sauna}", "${guestSauna.date_to_sauna}",${guestSauna.price_per_day_sauna},${total_price_sauna})`
    
        
        db.query(sqlSauna, guestSauna, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added sauna")
        })
    }
    
    var total_price_for_booking = total_price_for_room + total_price_cinema + total_price_gym + total_price_pool + total_price_restaurant +total_price_sauna;

    var  sqlReciept = ` INSERT INTO reciept(username,room_number, total_price_for_booking)
    VALUES ("${newguest.username}",${guestRoom.room_number},${total_price_for_booking})`
   
    db.query(sqlReciept, guestReciept, function(err,data){
            if (err) throw err;
            else console.log(`Reciept for ${newguest.first_name} ${newguest.last_name} with username ${newguest.username} is created`);
            
        })
            
    db.query(updateRoom, function(err, data){
        if (err) throw err;
        console.log("Reciept added to room")
    })
    db.query(updateBooking, function(err, data){
            if (err) throw err;
            console.log("Reciept added to booking")
        })
        
            db.query(updateRestaurant, function(err, data){
                    if (err) throw err;
                    console.log("Reciept added to restaurant")
                })
                db.query(updateCinema, function(err, data){
                        if (err) throw err;
                        console.log("Reciept added to cinema")
                    })
                    db.query(updateGym, function(err, data){
                            if (err) throw err;
                            console.log("Reciept added to gym")
                        })
                        db.query(updatePool, function(err, data){
                                if (err) throw err;
                                console.log("Reciept added to pool")
                            })
                        db.query(updateSauna, function(err, data){
                                if (err) throw err;
                                console.log("Reciept added to pool")
                            })
                            
                            if (info.date_from_sauna != "" && info.date_to_sauna != "") {
                            let updateRecieptSauna = `UPDATE reciept SET sauna_id = ${guestSauna.saunaid} WHERE reciept_id = ${guestReciept.recieptid}`
                           db.query(updateRecieptSauna, function(err,data){
                            if (err) throw err;
                            else console.log("Reciept is updated");
                                 })
                        }
                            if (info.date_from_sauna != "" && info.date_to_sauna != "") {
                            let updateRecieptSauna = `UPDATE reciept SET sauna_id = ${guestSauna.saunaid} WHERE reciept_id = ${guestReciept.recieptid}`
                           db.query(updateRecieptSauna, function(err,data){
                            if (err) throw err;
                            else console.log("Reciept is updated for sauna");
                                 })
                        }
                            if (info.date_from_restaurant != "" && info.date_to_restaurant != "") {
                            let updateRecieptRestaurant = `UPDATE reciept SET restaurant_id = ${guestRestaurant.restaurantid} WHERE reciept_id = ${guestReciept.recieptid}`
                           db.query(updateRecieptRestaurant, function(err,data){
                            if (err) throw err;
                            else console.log("Reciept is updated for restaurant");
                                 })
                        }
                            if (info.date_from_pool != "" && info.date_to_pool != "") {
                            let updateRecieptPool = `UPDATE reciept SET pool_id = ${guestPool.poolid} WHERE reciept_id = ${guestReciept.recieptid}`
                           db.query(updateRecieptPool, function(err,data){
                            if (err) throw err;
                            else console.log("Reciept is updated for pool");
                                 })
                        }
                            if (info.date_from_cinema != "" && info.date_to_cinema != "") {
                            let updateRecieptCinema = `UPDATE reciept SET cinema_id = ${guestCinema.cinemaid} WHERE reciept_id = ${guestReciept.recieptid}`
                           db.query(updateRecieptCinema, function(err,data){
                            if (err) throw err;
                            else console.log("Reciept is updated");
                                 })
                        }

                        })
                    
                        app.post("/adminemployee", urlencodedParser, function (req, res) {

    res.render("newemployee", { infoAdmin: req.body })
    const infoAdmin = req.body;
    console.log(infoAdmin)
    var sql = `INSERT INTO employees   SET ?`

    db.query(sql, infoAdmin, function (err, data) {
        if (err) throw err;
        else console.log(" new employee added")
    })

})


var nodemailer = require('nodemailer');
const { generateKeyPairSync } = require("crypto");
const { isBuffer } = require("util");
const { query } = require("express");
const { user, password } = require("./databaseCon.js");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adis@gmail.com',
        pass: 'yourpassword'
    }
});
app.post("/contact", urlencodedParser, function (req, res) {

    res.render("contact", { msg: req.body })
    const msg = req.body;
    console.log(msg)
    var mailOptions = {
        to: 'adis.@gmail.com',
        from: 'email@gmail.com',
        subject: msg.subject,
        text: `Email address: ${msg.email},
         phone number: ${msg.phone_number}, 
        name: ${msg.full_name},
        messege: ${msg.message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})




app.get("/guest/:name", function (req, res) {
    var data = { room_number: 29, typeofroom: "single bed", aditionalServices: ["pool", "restaurant", "gym"] }

    res.render("guest", { person: req.params.name, room_number: data.room_number, typeofroom: data.typeofroom, aditionalServices: data.aditionalServices });

})


app.listen(3000);
console.log("Server listening on port 3000")

