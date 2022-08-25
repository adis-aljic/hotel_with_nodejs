const express = require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser")
const app = express();
const mysql = require("mysql2")
const con = require("./databaseCon.js");
const { Console } = require("console");


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
    var newguest = {
        first_name: info.first_name,
        last_name : info.last_name,
        date_of_birth : info.date_of_birth,
        country : info.country,
        city : info.city,
        phone_number : info.phone_number,
        email: info.email,
        gender: info.gender,
        prefered_language: info.prefered_language,
        username: info.username,
        password : info.password,
        document_for_indefication: info.document_for_indefication,
        number_of_document_for_indefication: info.number_of_document_for_indefication
    }
    var guestRoom = {
        room_number: info.room_number,
        room_status : "Ocupated"
    }
    var guestBooking = {
        check_in_date: info.check_in_date,
        check_out_date : info.check_out_date
    } 
    var guestSauna = {
        date_from_sauna: info.date_from_sauna,
        date_to_sauna : info.date_to_sauna
    } 
    var guestRestaurant = {
        date_from_restaurant: info.date_from_restaurant,
        date_to_restaurant : info.date_to_restaurant
    } 
    var guestPool = {
        date_from_pool: info.date_from_pool,
        date_to_pool : info.date_to_pool
    } 
    var guestGym = {
        date_from_gym: info.date_from_gym,
        date_to_gym : info.date_to_gym
    } 
    var guestCinema = {
        date_from_cinema: info.date_from_cinema,
        date_to_cinema : info.date_to_cinema
    } 


    var sqlGuest = `INSERT INTO guest   SET ?`
    var sqlRoom = `INSERT INTO room   SET ?`
    var sqlBooking = `INSERT INTO booking   SET ?`
    var sqlRestaurant = `INSERT INTO restaurant   SET ?`
    var sqlPool = `INSERT INTO pool   SET ?`
    var sqlGym = `INSERT INTO gym   SET ?`
    var sqlCinema = `INSERT INTO cinema   SET ?`
    var sqlSauna = `INSERT INTO sauna   SET ?`
    var price_per_night = `UPDATE booking SET total_price_for_room = datediff(${guestBooking.check_out_date}, ${guestBooking.check_in_date}) * (SELECT price_per_night FROM room WHERE guest_room = ${guestRoom.room_number})
     WHERE booking_id = LAST_INSERT_ID();`
    db.query(sqlGuest, newguest, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added")
    })
    db.query(sqlRoom, guestRoom, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added into room " + guestRoom.room_number)
    })
    db.query(price_per_night, guestBooking, guestRoom, function (err, data) {
        if (err) throw err;
        else console.log(" booking is updated for prie")
    })
    db.query(sqlBooking, guestBooking, function (err, data) {
        if (err) throw err;
        else console.log(" new guest is booked")
    })
    db.query(sqlCinema, guestCinema, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added sauna")
    })
    db.query(sqlGym, guestGym, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added gym")
    })
    db.query(sqlPool, guestPool, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added pool")
    })
    db.query(sqlRestaurant, guestRestaurant, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added restaurant")
    })
    db.query(sqlSauna, guestSauna, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added sauna")
    })
})


app.post("/adminemployee", urlencodedParser, function (req, res) {

    res.render("newemployee",{ infoAdmin: req.body })
    const infoAdmin = req.body;
    console.log(infoAdmin)
    var sql = `INSERT INTO employees   SET ?`   

    db.query(sql,infoAdmin ,function(err, data){
    if(err) throw err;
    else console.log(" new employee added")
    })  
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

