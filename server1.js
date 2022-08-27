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
    console.log(info)
    var newguest = {
        first_name: info.first_name,
        last_name: info.last_name,
        date_of_birth: info.date_of_birth,
        country: info.country,
        city: info.city,
        phone_number: info.phone_number,
        email: info.email,
        gender: info.gender,
        prefered_language: info.prefered_language,
        username: info.username,
        password: info.password,
        document_for_indefication: info.document_for_indefication,
        number_of_document_for_indefication: info.number_of_document_for_indefication
    }
    var guestRoom = {
        room_number: info.room_number,
        room_status: "Ocupated",
    }
    var guestBooking = {
        check_in_date: info.check_in_date,
        check_out_date: info.check_out_date,
        // price_per_night : info.price_per_night
        // insertedID : insertedID


    }
    var guestSauna = {
        date_from_sauna: info.date_from_sauna,
        date_to_sauna: info.date_to_sauna
    }
    var guestRestaurant = {
        date_from_restaurant: info.date_from_restaurant,
        date_to_restaurant: info.date_to_restaurant
    }
    var guestPool = {
        date_from_pool: info.date_from_pool,
        date_to_pool: info.date_to_pool
    }
    var guestGym = {
        date_from_gym: info.date_from_gym,
        date_to_gym: info.date_to_gym
    }
    var guestCinema = {
        date_from_cinema: info.date_from_cinema,
        date_to_cinema: info.date_to_cinema
    }

    console.log(guestBooking)
    console.log(guestRoom)
    var sqlGuest = `INSERT INTO guest   SET ?`
    var sqlRoom = `UPDATE room   
    SET room_status = "Ocupated" 
    WHERE room_number = ${guestRoom.room_number}`
    var sqlBooking = `INSERT INTO booking   SET ?`
    var sqlRestaurant = `INSERT INTO restaurant   SET ?`
    var sqlPool = `INSERT INTO pool   SET ?`
    var sqlGym = `INSERT INTO gym   SET ?`
    var sqlCinema = `INSERT INTO cinema   SET ?`
    var sqlSauna = `INSERT INTO sauna   SET ?`


    db.query(sqlGuest, newguest, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added")
    })
    db.query(sqlRoom, guestRoom, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added into room " + guestRoom.room_number)
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
            var findLastGuestID = `SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1 ;`
            db.query(findLastGuestID, function (err, results) {
                if (err) throw err
                else {

                    // console.log(results)
                    const updateBookingGuest = `UPDATE booking SET guest_id = ${results[0].guest_id} ;`

                    db.query(updateBookingGuest, function (err, data) {
                        if (err) throw err
                        else console.log("updated booking with guest_id");

                    })
                }
            })

            console.log(" new guest is booked")
        }
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

