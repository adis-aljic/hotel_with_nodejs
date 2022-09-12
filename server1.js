const express = require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser")
const app = express();
const mysql = require("mysql2")
const con = require("./databaseCon.js");
const { Console, info } = require("console");
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
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { get } = require("http");

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const db = mysql.createConnection(con)
db.connect((err) => {
    if (err) throw err
    else
        console.log("database is connected")
})

const urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(express.static(__dirname));
app.set("view engine", "ejs")

app.use(cookieParser());
app.use(bodyParser.json());      



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
var session;
app.get("/login", function (req, res) {

       // je li treba provjerit ima li ovaj session ikako u bazi ??
//sto se provjerava kad nije ni logovano ?app.use(express.json());

        res.render(`login`)
    });
    
    
    app.get("/listbooked", function (req, res) {

    var sql = `SELECT guest.first_name, guest.last_name, guest.username, guest.password, guest.status_guest,
    booking.check_in_date, booking.check_out_date, reciept.total_price_for_booking
    FROM guest 
    INNER JOIN booking
    ON booking.username = guest.username
    INNER JOIN reciept
    ON reciept.username = guest.username WHERE guest.status_guest = "Active"
   ;`
   db.query(sql, function(err, data){
       if (err) throw err
       else  {
           // console.log(data);
           res.render("listbooked", {data})
       }
   })
   })

app.get("/listallbooked", function (req, res) {
        var sql = `SELECT guest.first_name, guest.last_name, guest.username, guest.password, guest.status_guest,
        booking.check_in_date, booking.check_out_date, reciept.total_price_for_booking
    FROM guest 
    INNER JOIN booking
    ON booking.username = guest.username
    INNER JOIN reciept
    ON reciept.username = guest.username
   ;`
   db.query(sql, function(err, data){
       if (err) throw err
       else  {
           console.log(data);
         res.render("listallbooked", {data})
       }
   })
    
 
})

app.get("/adminguest", function (req, res) {
    var sql = `SELECT room_status, room_number FROM room`
    db.query(sql, function(err,data){
        if (err) throw err
        else{
            var list = {}
            data.forEach(element => {
                if(element.room_status == "Avaiable") {
                    list[`Room ${element.room_number}`] = `Room ${element.room_number}`;
                }            });

            res.render("adminguest", {list} )
            }

        
    
    })
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
    setTimeout(() =>  {

        sql = `UPDATE guest SET isLoged = "Offline" WHERE username = "${req.params["username"]}";`
        db.query(sql, function(err,data){
            if (err) throw err
            else {
                console.log(`User ${req.params["username"]} is offline`);
                // res.redirect("/login")
            }
        })  
        }
    
    
    
    
    , 10000)
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
    // console.log(infoAdmin)
    var sql = `INSERT INTO employees (first_name, last_name, job_title, date_of_birth,country,city,phone_number,email,
        gender, languages, document_for_indefication,number_of_document_for_indefication,username,password ) 
        VALUES("${infoAdmin.first_name}","${infoAdmin.last_name}","${infoAdmin.job_title}","${infoAdmin.date_of_birth}",
        "${infoAdmin.country}","${infoAdmin.city}","${infoAdmin.phone_number}","${infoAdmin.email}","${infoAdmin.gender}",
        "${infoAdmin.languages.join(",")}","${infoAdmin.document_for_indefication}","${infoAdmin.document_for_indefication} ${infoAdmin.number_of_document_for_indefication}",
    "${infoAdmin.username}","${infoAdmin.password}"       )`
    db.query(sql, infoAdmin, function (err, data) {
        if (err) throw err;
        else console.log(" new employee added")
    })
})

// login page for guests

app.post("/login", urlencodedParser, function (req, res) {
    const data = req.body
    
    user_passModul.checkUser(res,req, data.username_guest, data.password_guest)
    

})

// login for admin page
app.post("/adminlogin", urlencodedParser, function (req, res) {
    const data = req.body
    session=req.session;
   session.username = data.username_employees
   session.password = data.password_employees
    console.log(session);
    user_passModul.checkEmployee(res, data.username_employees, data.password_employees)
  
})

// finding booking using username or document id
app.post("/findbooking", urlencodedParser, function (req, res) {
    const booking = req.body;
    console.log(req.body);
    
    if(booking.find == "username" ) {
       var input = booking.search;
       var parametar = "username";}
    else if(booking.find =="social_security" ){

       var input = "Social security Number " + booking.search;
        var parametar = "number_of_document_for_indefication";
    } 
    else if(booking.find =="passport" ){
        var input ="Passport number " + booking.search;
        var parametar = "number_of_document_for_indefication";

    } 
    else if(booking.find =="card_id" ){
        var input ="ID Card Number " + booking.search;
        var parametar = "number_of_document_for_indefication";

    } 
        
    
    const findbooking = (parametar,input) =>{
        if(parametar == "username") {

            return `SELECT guest.first_name, guest.document_for_indefication,guest.number_of_document_for_indefication, guest.last_name, guest.username, guest.password, booking.room_number, 
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
            WHERE guest.${parametar} = "${input}";`
        }
        else if (parametar == "number_of_document_for_indefication"){
            return `SELECT guest.first_name, guest.document_for_indefication,guest.number_of_document_for_indefication, guest.last_name, guest.username, guest.password, booking.room_number, 
            booking.check_in_date, booking.booking_id ,booking.check_out_date,booking.total_price_for_room,sauna.total_price_sauna,gym.total_price_gym,
            restaurant.total_price_restaurant, cinema.total_price_cinema,pool.total_price_pool,reciept.total_price_for_booking
            FROM guest 
            INNER JOIN booking ON booking.username = guest.username
            INNER JOIN sauna ON sauna.username = guest.username
            INNER JOIN restaurant ON restaurant.username = guest.username
            INNER JOIN cinema ON cinema.username = guest.username
            INNER JOIN gym ON gym.username = guest.username
            INNER JOIN pool ON pool.username = guest.username
            INNER JOIN reciept ON reciept.username = guest.username
            WHERE guest.${parametar} = "${input}";`
        }
    }
    db.query(findbooking(parametar,input), function (err, data) {
        if (err) console.log("error");
        // kada se pogresi unos pada server
        else {
            
            const book = data[0]
            // console.log(book);
            res.render(`findbooked`, {
                totalprice: book.total_price_for_booking,
                username: book.username,
                password: book.password,
                document_for_indefication: book.document_for_indefication,
                number_of_document_for_indefication: book.number_of_document_for_indefication.slice(book.number_of_document_for_indefication.lastIndexOf(" ")),
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
    // console.log(req.body);
    const username = req.body.username;
    const new_checkout = req.body.new_check_out_date;
    const early_checkout = req.body.check_out_date;
    const early_checkout_sauna = req.body.check_out_date_sauna;
    const early_checkout_gym = req.body.check_out_date_gym;
    const early_checkout_cinema = req.body.check_out_date_cinema;
    const early_checkout_restaurant = req.body.check_out_date_restaurant;
    const early_checkout_pool = req.body.check_out_date_pool;

    if (new_checkout != "") {

        let sql1 = `UPDATE booking SET check_out_date ="${new_checkout}" WHERE username = "${username}";
    
       `
       db.query(sql1, function (err, data) {
        if (err) throw err
        else 
            
                res.render("./findbooking")
            })
        
    
    }

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

app.post(`/guest/:username`, function(req,res){
   
    sql = `UPDATE guest SET isLoged = "Offline" WHERE username = "${req.params["username"]}";`
    db.query(sql, function(err,data){
        if (err) throw err
        else {
            res.redirect("/login")
            console.log(`User ${req.params["username"]} is offline`);
        }
    })


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

