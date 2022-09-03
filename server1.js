const express = require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser")
const app = express();
const mysql = require("mysql2")
const con = require("./databaseCon.js");
const { Console } = require("console");
const guestModule = require("./models/guestModel")
const roomModule = require("./models/roomModel")
const bookingModule = require("./models/bookingModel")
const saunaModule = require("./models/saunaModel")
const restaurantModule = require("./models/restaurantModel")
const poolModule = require("./models/poolModel")
const cinemaModule = require("./models/cinemaModel")
const gymModule = require("./models/gymModel")
const recieptModule = require("./models/recieptModel")
const user_passModul = require("./models/user_passModel")
const bcrypt = require ('bcrypt');
var nodemailer = require('nodemailer');


const db = mysql.createConnection(con)
db.connect((err) => {
    if (err) throw err
    else
        console.log("database is connected")
})

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname));
app.set("view engine", "ejs")


// GET REQUESTS

app.get("/", function (req, res) {
    res.render("index")
})
app.get("/contact", function (req, res) {
    res.render("contact")
})
app.get("/adminlogin", function (req, res) {
    res.render("adminlogin")
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
app.get("/adminGuestWrongCheckIn", function (req, res) {
    res.render("adminGuestWrongCheckIn")
})
app.get("/loginWrongPass", function (req, res) {
    res.render("loginWrongPass")
})
app.get("/guest/:username", function (req, res) {

    let recieptSQL = `SELECT booking.room_number, guest.first_name, guest.last_name, guest.password, guest.username, booking.total_price_for_room, sauna.total_price_sauna, restaurant.total_price_restaurant,
            cinema.total_price_cinema,guest.first_name,guest.last_name,booking.check_in_date,booking.check_out_date ,gym.total_price_gym, pool.total_price_pool, reciept.total_price_for_booking, reciept.reciept_status
            FROM booking 
            INNER JOIN sauna ON booking.booking_id = sauna.booking_id
            INNER JOIN restaurant ON booking.booking_id = restaurant.booking_id
            INNER JOIN cinema ON booking.booking_id = cinema.booking_id
            INNER JOIN gym ON booking.booking_id = gym.booking_id
            INNER JOIN pool ON booking.booking_id = pool.booking_id
            INNER JOIN reciept ON booking.booking_id = reciept.booking_id
            INNER JOIN guest ON booking.booking_id = guest.booking_id
            where booking.username = "${req.params["username"]}";
            `
    db.query(recieptSQL, function (err, data1) {
        if (err) throw err
        else {
            let reciept = data1[0]
            res.render("guest", { first_name: reciept.first_name, room_number: reciept.room_number, last_name: reciept.last_name, username: reciept.username, password: reciept.password, check_in_date: reciept.check_in_date.toISOString().slice(0, 10), check_out_date: reciept.check_out_date.toISOString().slice(0, 10), total_price_for_room: reciept.total_price_for_room, total_price_sauna: reciept.total_price_sauna, total_price_restaurant: reciept.total_price_restaurant, total_price_cinema: reciept.total_price_cinema, total_price_gym: reciept.total_price_gym, total_price_pool: reciept.total_price_pool, total_price_for_booking: reciept.total_price_for_booking, reciept_status: reciept.reciept_status });
        }
    })
})

// POST REQUESTS

// adding new guest
app.post("/adminguest", urlencodedParser, function (req, res) {
    res.render("newguest", { info: req.body })
    const info = req.body;
    if (info.check_in_date < info.check_out_date) {
        // const salt = 10;
        // const password = info.password;
        // bcrypt.hash(password, salt, function(err, hash) {
            // console.log(hash);
            var newguest = new guestModule.newguestClass(info.first_name, info.last_name, info.date_of_birth, info.country, info.city, info.phone_number, info.email, info.gender, info.prefered_language, info.username, info.password, info.document_for_indefication, info.number_of_document_for_indefication)
            guestModule.addGuestSQL(newguest, newguest.first_name, newguest.last_name, newguest.date_of_birth, newguest.gender, newguest.country, newguest.city, newguest.prefered_language, newguest.phone_number, newguest.email, newguest.document_for_indefication, newguest.document_for_indefication + " "+ newguest.number_of_document_for_indefication , newguest.username, newguest.password)

        // adding guest into avaiable room
        var guestRoom = new roomModule.guestRoomClass(info.room_number)
        roomModule.addGuestToRoom(guestRoom.room_number, guestRoom.room_status, guestRoom, newguest.username)

        // creating booking for guest
        var guestBooking = new bookingModule.guestBookingClass(info.check_in_date, info.check_out_date, info.price_per_night)
        bookingModule.createBooking(guestBooking, guestBooking.check_in_date, guestBooking.check_out_date, guestBooking.price_per_night, guestRoom.room_number, newguest.username)

        // creating sauna for guest
        if (info.date_to_sauna != "" && info.date_from_sauna != "" && info.date_to_sauna > info.date_from_sauna) {
            var guestSauna = new saunaModule.guestSaunaClass(info.date_from_sauna, info.date_to_sauna)
            saunaModule.addSaunaToGuest(guestSauna, guestSauna.date_from_sauna, guestSauna.date_to_sauna, guestSauna.price_per_day_sauna, guestRoom.room_number, newguest.username)
        }
        else {
            console.log("Date is wrong or sauna is empty ");
            var guestSauna = new saunaModule.guestSaunaClass(new Date().toJSON().slice(0, 10), new Date().toJSON().slice(0, 10))
            saunaModule.addSaunaToGuest(guestSauna, guestSauna.date_from_sauna, guestSauna.date_to_sauna, guestSauna.price_per_day_sauna, guestRoom.room_number, newguest.username)
        }

        // creating restaurant for guest
        if (info.date_to_restaurant != "" && info.date_from_restaurant != "" && info.date_to_restaurant > info.date_from_restaurant) {
            var guestRestaurant = new restaurantModule.guestRestaurantClass(info.date_from_restaurant, info.date_to_restaurant)
            restaurantModule.addRestaurantToGuest(guestRestaurant, guestRestaurant.date_from_restaurant, guestRestaurant.date_to_restaurant, guestRestaurant.price_per_day_restaurant, guestRoom.room_number, newguest.username)
        }
        else {
            console.log("Date is wrong or restaurant is empty ");
            var guestRestaurant = new restaurantModule.guestRestaurantClass(new Date().toJSON().slice(0, 10), new Date().toJSON().slice(0, 10))
            restaurantModule.addRestaurantToGuest(guestRestaurant, guestRestaurant.date_from_restaurant, guestRestaurant.date_to_restaurant, guestRestaurant.price_per_day_restaurant, guestRoom.room_number, newguest.username)
        }

        // // creating pool for guest

        if (info.date_to_pool != "" && info.date_from_pool != "" && info.date_to_pool > info.date_from_pool) {
            var guestPool = new poolModule.guestPoolClass(info.date_from_pool, info.date_to_pool)
            poolModule.addPoolToGuest(guestPool, guestPool.date_from_pool, guestPool.date_to_pool, guestPool.price_per_day_pool, guestRoom.room_number, newguest.username)
        }
        else {
            console.log("Date is wrong or pool is empty ");
            var guestPool = new poolModule.guestPoolClass(new Date().toJSON().slice(0, 10), new Date().toJSON().slice(0, 10))
            poolModule.addPoolToGuest(guestPool, guestPool.date_from_pool, guestPool.date_to_pool, guestPool.price_per_day_pool, guestRoom.room_number, newguest.username)
        }

        // creating cinema for guest

        if (info.date_to_cinema != "" && info.date_from_cinema != "" && info.date_to_cinema > info.date_from_cinema) {
            var guestCinema = new cinemaModule.guestCinemaClass(info.date_from_cinema, info.date_to_cinema)
            cinemaModule.addCinemaToGuest(guestCinema, guestCinema.date_from_cinema, guestCinema.date_to_cinema, guestCinema.price_per_day_cinema, guestRoom.room_number, newguest.username)
        }
        else {
            console.log("Date is wrong or cinema is empty ");
            var guestCinema = new cinemaModule.guestCinemaClass(new Date().toJSON().slice(0, 10), new Date().toJSON().slice(0, 10))
            cinemaModule.addCinemaToGuest(guestCinema, guestCinema.date_from_cinema, guestCinema.date_to_cinema, guestCinema.price_per_day_cinema, guestRoom.room_number, newguest.username)
        }

        // creating gym for guest
        if (info.date_to_gym != "" && info.date_from_gym != "" && info.date_to_gym > info.date_from_gym) {
            var guestGym = new gymModule.guestGymClass(info.date_from_gym, info.date_to_gym)
            gymModule.addGymToGuest(guestGym, guestGym.date_from_gym, guestGym.date_to_gym, guestGym.price_per_day_gym, guestRoom.room_number, newguest.username)
        }
        else {
            console.log("Date is wrong or gym is empty ");
            var guestGym = new gymModule.guestGymClass(new Date().toJSON().slice(0, 10), new Date().toJSON().slice(0, 10))
            gymModule.addGymToGuest(guestGym, guestGym.date_from_gym, guestGym.date_to_gym, guestGym.price_per_day_gym, guestRoom.room_number, newguest.username)
        }


        // add reciept
        // var guestReciept = new recieptModule.guestRecieptClass()
        recieptModule.addRecieptToGuest(guestRoom.room_number, newguest.username)

        // updating fk

        recieptModule.addForgeingKeysReciept(newguest.username)
        bookingModule.addForgeingKeysBooking(newguest.username)

        if (info.date_to_gym != "" && info.date_from_gym != "" && info.date_to_gym > info.date_from_gym) {
            recieptModule.addGymFKtoReciept(newguest.username)
        }

        if (info.date_from_cinema != "" && info.date_from_cinema != "" && info.date_to_cinema > info.date_from_cinema) {
            recieptModule.addCinemaFKtoReciept(newguest.username)
        }

        if (info.date_to_pool != "" && info.date_from_pool != "" && info.date_to_pool > info.date_from_pool) {
            recieptModule.addPoolFKtoReciept(newguest.username)
        }

        if (info.date_to_restaurant != "" && info.date_from_restaurant != "" && info.date_to_restaurant > info.date_from_restaurant) {
            recieptModule.addRestaurantFKtoReciept(newguest.username)
        }

        if (info.date_to_sauna != "" && info.date_from_sauna != "" && info.date_to_sauna > info.date_from_sauna) {
            recieptModule.addSaunaFKtoReciept(newguest.username)
        }
        recieptModule.addTotalPriceForBooking(newguest.username)

    }
    else {
        // ne ulazi na pravu stranicu ???
        console.log("Check in date is after check out date");
        res.redirect("adminGuestWrongCheckIn")
    }
})


// adding new employee
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

// login page for guests
// problem with hashing

app.post("/login", urlencodedParser, function (req, res) {
    const data = req.body
    // var username = data.username;
    // var password = data.password;
    // console.log(data);
    // console.log(password + "555555555") ;
    // user_passModul.checkEmployee(res,data.username_employees,data.password_employees)
    // if(user_passModul.checkEmployee(res,username,password)){
    //    console.log(`Welcome employee ${username}`)
    // }
    // $2b$10$qx8tELxbzIyJISl2pkzs8ew2Btk2bw4j64TwUyyfvAEgLkWA6RoM.

    // const salt = 10;
    // bcrypt.hash(data.password_guest, salt, function(err, hash) {
        // console.log(hash);
    user_passModul.checkUser(res, data.username_guest, data.password_guest)
    
// })
    //  else    if(user_passModul.checkUser(res,username,password)){
    // console.log(`Welcome ${username}`)    
    // } 
    // else return res.redirect("/")
})

// login for admin page
app.post("/adminlogin", urlencodedParser, function (req, res) {
    const data = req.body
    user_passModul.checkEmployee(res, data.username_employees, data.password_employees)
  
})

// finding booking using username
app.post("/findbooking", urlencodedParser, function (req, res) {
    const booking = req.body;
    console.log(req.body);
    db.query(`SELECT guest.first_name, guest.last_name, guest.username, guest.password, booking.room_number, 
            booking.check_in_date, booking.booking_id ,booking.check_out_date,booking.total_price_for_room,sauna.total_price_sauna,gym.total_price_gym,
            restaurant.total_price_restaurant, cinema.total_price_cinema,pool.total_price_pool,reciept.total_price_for_booking
             FROM booking 
             INNER JOIN guest ON guest.username = booking.username
             INNER JOIN sauna ON sauna.username = booking.username
             INNER JOIN restaurant ON restaurant.username = booking.username
             INNER JOIN cinema ON cinema.username = booking.username
             INNER JOIN gym ON gym.username = booking.username
             INNER JOIN pool ON pool.username = booking.username
             INNER JOIN reciept ON reciept.username = booking.username
             WHERE booking.username = "${booking.search}";`
             , function (err, data) {
        if (err) throw err
        else {
            const book = data[0]
            console.log(book);
            res.render(`findbooked`, {
                totalprice: book.total_price_for_booking,
                username: book.username,
                check_in_date: book.check_in_date.toISOString().slice(0, 10),
                check_out_date: book.check_out_date.toISOString().slice(0, 10),
                booking_id: book.booking_id,
                total_price_cinema: book.total_price_cinema,
                total_price_gym: book.total_price_gym,
                total_price_pool: book.total_price_pool,
                total_price_restaurant: book.total_price_restaurant,
                total_price_sauna: book.total_price_sauna,
                room_number: book.room_number,
                first_name: book.first_name,
                last_name: book.last_name
            })
        }
    })
})

// check-out or changing additional services for guest by admin 

app.post("/findbooked", urlencodedParser, function (req, res) {
    console.log(req.body);
    const username = req.body.checkout;
    const early_checkout = req.body.check_out_date;
    const early_checkout_sauna = req.body.check_out_date_sauna;
    const early_checkout_gym = req.body.check_out_date_gym;
    const early_checkout_cinema = req.body.check_out_date_cinema;
    const early_checkout_restaurant = req.body.check_out_date_restaurant;
    const early_checkout_pool = req.body.check_out_date_pool;

    if (early_checkout != "") {

        let sql1 = `UPDATE booking SET check_out_date ="${early_checkout}" WHERE username = "${username}";
                UPDATE guest SET status_guest ="Inactive" WHERE username = "${username}";
                UPDATE room SET room_status = "Avaiable", booking_id = NULL, username = NULL, reciept_id = NULL WHERE username = "${username}";
    
       `
       db.query(sql1, function (err, data) {
        if (err) throw err
        else {
            db.query(`UPDATE reciept SET reciept_status = "paid" WHERE username = "${username}";
                    UPDATE booking SET check_out_date = "${new Date().toISOString().slice(0, 10)}"`, function (err, data) {
                console.log(`Guest with username ${username} are checkout`)
                res.render("./findbooking")
            })
        }
    })
    }
    let sql1 = ``;
    if (early_checkout_cinema != "") {
         sql1 += `UPDATE cinema SET date_to_cinema ="${early_checkout_cinema}"
                , total_price_cinema = datediff("${early_checkout_cinema}",date_from_cinema)*price_per_day_cinema
                WHERE username = "${username}";
                `      
    }
    if (early_checkout_gym != "") {
        sql1 += `UPDATE gym SET date_to_gym ="${early_checkout_gym}"
                , total_price_gym = datediff("${early_checkout_gym}",date_from_gym)*price_per_day_gym
                WHERE username = "${username}";
                `
    }
    if (early_checkout_pool != "") {
        sql1 += `UPDATE pool SET date_to_pool ="${early_checkout_pool}" 
                , total_price_pool = datediff("${early_checkout_pool}",date_from_pool)*price_per_day_pool
                WHERE username = "${username}";
                `
    }
    if (early_checkout_restaurant != "") {
        sql1 += `UPDATE restaurant SET date_to_restaurant ="${early_checkout_restaurant}"
                , total_price_restaurant = datediff("${early_checkout_restaurant}",date_from_restaurant)*price_per_day_restaurant
                WHERE username = "${username}";
     `
    }
    if (early_checkout_sauna != "") {
        sql1 += `UPDATE sauna SET date_to_sauna ="${early_checkout_sauna}" 
                , total_price_sauna = datediff("${early_checkout_sauna}",date_from_sauna)*price_per_day_sauna
                WHERE username = "${username}";
                `
    }
    if (early_checkout_sauna != "" || early_checkout_pool != "" || early_checkout_gym != "" || early_checkout_cinema != "" || early_checkout_restaurant != "") {
        db.query(sql1, function (err, data) {
            if (err) throw err
            else {
                console.log(`Guest with username ${username} has changed aditional services`)
                res.render("./findbooking")
            }
        })
    }
})


// sending email from contact page 
// test?

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




app.listen(3000);
console.log("Server listening on port 3000")

