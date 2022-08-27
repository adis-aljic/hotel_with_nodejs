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
        static id=1;
        guestid;
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
       this.guestid = ++newguestClass.id,
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
    var newguest = new newguestClass(info.first_name,info.last_name,info.date_of_birth,info.country,info.city,info.phone_number,info.email,info.gender,info.prefered_languages,info.username,info.password,info.document_for_indefication,info.number_of_document_for_indefication)
    // console.log(newguest);
    class guestRoomClass {
        room_number;
        room_status;
        constructor(room_number){
            this.room_number = room_number,
            this.room_status = "Ocupated"
        }
    }
    var guestRoom = new guestRoomClass(info.room_number)
    class guestBookingClass {
    static id = 1
        check_in_date;
        check_out_date;
        price_per_night;
    
        constructor(check_in_date,check_out_date){
            this.bookingid = ++guestBookingClass.id,
            this.check_in_date= check_in_date,
            this.check_out_date= check_out_date,
            this.price_per_night =( new Date (check_out_date) - new Date (check_in_date) )/(1000*3600*24)
        }


    }
    var guestBooking = new guestBookingClass(info.check_in_date,info.check_out_date,info.price_per_night)
    
    class guestSaunaClass {
        static id = 1;
        date_to_sauna;
        date_from_sauna;
        constructor(date_from_sauna,date_to_sauna){
            this.saunaid = ++guestSaunaClass.id,
            this.date_from_sauna= date_from_sauna,
            this.date_to_sauna=  date_to_sauna,
            this.price_per_day_sauna = 20
        }
    }
    var guestSauna = new guestSaunaClass(info.date_from_sauna,info.date_to_sauna)
    class guestRestaurantClass {
        static id = 1;
        date_to_restaurant;
        date_from_restaurant;
        constructor(date_from_restaurant,date_to_restaurant){
            this.restaurantid = ++guestRestaurantClass.id,
            this.date_from_restaurant= date_from_restaurant,
            this.date_to_restaurant=  date_to_restaurant,
            this.price_per_day_restaurant = 20

        }
    }
    var guestRestaurant= new guestRestaurantClass(info.date_from_restaurant,info.date_to_restaurant)
    class guestPoolClass {
        static id = 1;
        date_to_pool;
        date_from_pool
        constructor(date_to_pool,date_from_pool){
            this.poolid = ++guestPoolClass.id,
            this.date_from_pool= date_from_pool,
            this.date_to_pool=  date_to_pool,
            this.price_per_day_pool = 10

        }
    }
    var guestPool= new guestPoolClass (info.date_from_restaurant,info.date_to_restaurant)
   

    class guestGymClass {
        static id = 1;
        date_to_gym;
        date_from_gym
        constructor(date_to_gym,date_from_gym){
            this.gymid = ++guestGymClass.id,
            this.date_from_gym= date_from_gym,
            this.date_to_gym=  date_to_gym,
            this.price_per_day_gym = 10

        }
    }
    var guestGym= new guestGymClass (info.date_from_restaurant,info.date_to_restaurant)
   
    class guestCinemaClass {
        static id = 1;
        date_to_cinema;
        date_from_cinema
        constructor(date_to_cinema,date_from_cinema){
            this. cinemaid = ++guestCinemaClass.id,
            this.date_from_cinema= date_from_cinema,
            this.date_to_cinema=  date_to_cinema,
            this.price_per_day_sauna = 10

        }
    }
    var guestCinema= new guestCinemaClass (info.date_from_restaurant,info.date_to_restaurant)
   
    console.log(newguest)
    // console.log(guestRoom)
    var sqlGuest = `INSERT INTO guest (first_name,last_name,date_of_birth,gender,country,city,prefered_language,phone_number,email,document_for_indefication,number_of_document_for_indefication,username,password) 
    VALUES("${newguest.first_name}","${newguest.last_name}","${newguest.date_of_birth}","${newguest.gender}","${newguest.country}","${newguest.city}","${newguest.prefered_language}","${newguest.phone_number}","${newguest.email}","${newguest.document_for_indefication}","${newguest.number_of_document_for_indefication}","${newguest.username}","${newguest.password}")`
    var sqlRoom = `UPDATE room   
    SET room_status = "Ocupated", guest_id = ${newguest.guestid}, booking_id = ${guestBooking.bookingid} 
    WHERE room_number = ${guestRoom.room_number}`
    var sqlBooking = `INSERT INTO booking (room_number,guest_id,check_in_date,check_out_date,total_price_for_room)
    VALUES (${guestRoom.room_number}, ${newguest.guestid}, "${guestBooking.check_in_date}","${guestBooking.check_out_date}",${(new Date (newguest.check_out_date) - new Date (newguest.check_in_date) )/(1000*3600*24)*guestBooking.price_per_night})`
    
    var sqlRestaurant = `INSERT INTO restaurant(booking_id,room_number,guest_id,date_from_restaurant,date_to_restaurant,price_per_day_restaurant,total_price_restaurant)
    VALUES(guestBooking.bookingid, guestRoom.room_number,newguest.guestid, "${guestRestaurant.date_from_restaurant}", "${guestRestaurant.date_to_restaurant}",${guestRestaurant.price_per_day_restaurant},${(new Date (guestRestaurant.date_to_restaurant) - new Date (guestRestaurant.date_from_restaurant) )*guestRestaurant.price_per_day_restaurant})`
   
    var sqlPool = `INSERT INTO pool(booking_id,room_number,guest_id,date_from_pool,date_to_pool,price_per_day_pool,total_price_pool)
    VALUES(guestBooking.bookingid, guestRoom.room_number,newguest.guestid, "${guestPool.date_from_pool}", "${guestPool.date_to_pool}",${guestPool.price_per_day_restaurant},${(new Date (guestPool.date_to_pool) - new Date (guestPool.date_from_pool) )*guestRestaurant.price_per_day_pool})`
   
   
    var sqlGym = `INSERT INTO gym(booking_id,room_number,guest_id,date_from_gym,date_to_gym,price_per_day_gym,total_price_gym)
    VALUES(guestBooking.bookingid, guestRoom.room_number,newguest.guestid, "${guestGym.date_from_gym}", "${guestGym.date_to_gym}",${guestGym.price_per_day_restaurant},${(new Date (guestGym.date_to_gym) - new Date (guestGym.date_from_gym) )*guestGym.price_per_day_gym})`
    
    var sqlCinema = `INSERT INTO cinema(booking_id,room_number,guest_id,date_from_cinema,date_to_cinema,price_per_day_cinema,total_price_cinema)
    VALUES(guestBooking.bookingid, guestRoom.room_number,newguest.guestid, "${guestCinema.date_from_cinema}", "${guestCinema.date_to_cinema}",${guestCinema.price_per_day_restaurant},${(new Date (guestCinema.date_to_cinema) - new Date (guestCinema.date_from_cinema) )*guestCinema.price_per_day_cinema})`
   
    var sqlSauna = `INSERT INTO sauna(booking_id,room_number,guest_id,date_from_sauna,date_to_sauna,price_per_day_sauna,total_price_sauna)
    VALUES(guestBooking.bookingid, guestRoom.room_number,newguest.guestid, "${guestSauna.date_from_sauna}", "${guestSauna.date_to_sauna}",${guestSauna.price_per_day_restaurant},${(new Date (guestSauna.date_to_sauna) - new Date (guestSauna.date_from_sauna) )*guestSauna.price_per_day_sauna})`




    db.query(sqlGuest, newguest, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added")
    })
    
    // var price = `UPDATE booking 
    // SET total_price_for_room 
    // = datediff(${guestBooking.check_out_date}, ${guestBooking.check_in_date}) * ${guestBooking.price_per_night}),
    // room_number = ${guestRoom.room_number}
    // WHERE booking_id = ${guestBooking.insertedID};`

    // db.query(sqlBooking,guestBooking,price_per_night, function(err, results, fileds){
        //     if(err) throw err;
        //     else console.log("booking added" + ":" + results)
    // })

    db.query(sqlBooking, guestBooking, function (err, data) {
        if (err) throw err;
        else {
            // var findLastGuestID = `SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1 ;`
            // db.query(findLastGuestID, function (err, results) {
                // if (err) throw err
                // else {

                    // console.log(results)
                    // const updateBookingGuest = `UPDATE booking SET guest_id = ${results[0].guest_id} ;`
                    
                    // db.query(updateBookingGuest, function (err, data) {
                        //     if (err) throw err
                        //     else console.log("updated booking with guest_id");
                        
                        // })
                        // }
                        // })
                        
                        console.log(" new guest is booked")
                    }
                })
                db.query(sqlRoom, guestRoom, function (err, data) {
                    if (err) throw err;
                    else console.log(" new guest added into room " + guestRoom.room_number)
                })
                // db.query(price, guestBooking, function (err, data) {
    //     if (err) throw err;
    // else console.log(" booking is updated for price")
    // })
    if (guestCinema.date_from_cinema != "" && guestCinema.date_to_cinema != "") {

        db.query(sqlCinema, guestCinema, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added cinema")
        })
    }
    if (guestGym.date_from_gym != "" && guestGym.date_to_gym != "") {

        db.query(sqlGym, guestGym, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added gym")
        })
    }
    if (guestPool.date_from_pool != "" && guestPool.date_to_pool != "") {

        db.query(sqlPool, guestPool, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added pool")
        })
    }
    if (guestRestaurant.date_from_restaurant != "" && guestRestaurant.date_to_restaurant != "") {

        db.query(sqlRestaurant, guestRestaurant, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added restaurant")
        })
    }
    if (guestSauna.date_from_sauna != "" && guestSauna.date_to_sauna != "") {

        db.query(sqlSauna, guestSauna, function (err, data) {
            if (err) throw err;
            else console.log(" new guest added sauna")
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



// app.get("/adminguestroom", function (req, res){
//     res.render("adminguestroom")
// })

// app.post("/adminguestroom", urlencodedParser, function (req, res) {
//     res.render("adminguestroom", { infoRoom: req.body })
//     const infoRoom = req.body
//     console.log(infoRoom)
//     var sql = `UPDATE room SET room_status = "${infoRoom.room_status}"  WHERE room_number = ${infoRoom.room_number};`;  

//     db.query(sql,infoRoom ,function(err, data){
//     if(err) throw err;
//     else console.log(" one room added")
//     })  
// })
// app.get("/adminguestbooking", function (req, res) {
//     res.render("adminguestbooking")
// })
// app.post("/adminguestbooking", urlencodedParser, function (req, res) {
//     res.render("adminguestbooking", { infoBooking: req.body })
//     const infoBooking = req.body
//     console.log(infoBooking)
//     var sql = `INSERT INTO booking   SET ?`   

//     db.query(sql,infoBooking ,function(err, data){
//     if(err) throw err;
//     else console.log(" one booking added")
//     })  
// })

// app.get("/adminguestaditionalservices", function (req, res) {
//     res.render("adminguestaditionalservices")
// })

app.get("/guest/:name", function (req, res) {
    var data = { room_number: 29, typeofroom: "single bed", aditionalServices: ["pool", "restaurant", "gym"] }

    res.render("guest", { person: req.params.name, room_number: data.room_number, typeofroom: data.typeofroom, aditionalServices: data.aditionalServices });

})


app.listen(3000);
console.log("Server listening on port 3000")

