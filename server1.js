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
    // console.log(info)
// console.log(roomModule.returnRoomStatus(parseInt(info.room_number)) )
// if (roomModule.returnRoomStatus(parseInt(info.room_number)) == "Avaiable") {
            // adding guest 
    var newguest = new guestModule.newguestClass(info.first_name,info.last_name,info.date_of_birth,info.country,info.city,info.phone_number,info.email,info.gender,info.prefered_language,info.username,info.password,info.document_for_indefication,info.number_of_document_for_indefication)       
    guestModule.addGuestSQL(newguest,newguest.first_name,newguest.last_name,newguest.date_of_birth,newguest.gender,newguest.country,newguest.city,newguest.prefered_language,newguest.phone_number,newguest.email,newguest.document_for_indefication,newguest.number_of_document_for_indefication,newguest.username, newguest.password)

            // adding guest into avaiable room
    var guestRoom = new roomModule.guestRoomClass(info.room_number)
   roomModule.addGuestToRoom(guestRoom.room_number,guestRoom.room_status,guestRoom,newguest.username)
   
                // creating booking for guest
   var guestBooking = new bookingModule.guestBookingClass( info.check_in_date,info.check_out_date,info.price_per_night)
    bookingModule.createBooking(guestBooking,guestBooking.check_in_date,guestBooking.check_out_date,guestBooking.price_per_night,guestRoom.room_number,newguest.username)    

    if(info.date_to_sauna != "" && info.date_from_sauna != "") {

        // creating sauna for guest
        var guestSauna = new saunaModule.guestSaunaClass(info.date_from_sauna,info.date_to_sauna)
        saunaModule.addSaunaToGuest(guestSauna, guestSauna.date_from_sauna,guestSauna.date_to_sauna,guestSauna.price_per_day_sauna,guestRoom.room_number,newguest.username)
    }
    else {
        var guestSauna = new saunaModule.guestSaunaClass(new Date().toJSON().slice(0,10),new Date().toJSON().slice(0,10))
        saunaModule.addSaunaToGuest(guestSauna, guestSauna.date_from_sauna,guestSauna.date_to_sauna,guestSauna.price_per_day_sauna,guestRoom.room_number,newguest.username)


    }
    // creating restaurant for guest
    if(info.date_to_restaurant != "" && info.date_from_restaurant != "") {
        var guestRestaurant = new restaurantModule.guestRestaurantClass(info.date_from_restaurant,info.date_to_restaurant)
        restaurantModule.addRestaurantToGuest(guestRestaurant, guestRestaurant.date_from_restaurant,guestRestaurant.date_to_restaurant,guestRestaurant.price_per_day_restaurant,guestRoom.room_number,newguest.username)
    }
    else {
        
        
                var guestRestaurant = new restaurantModule.guestRestaurantClass(new Date().toJSON().slice(0,10),new Date().toJSON().slice(0,10))
                restaurantModule.addRestaurantToGuest(guestRestaurant, guestRestaurant.date_from_restaurant,guestRestaurant.date_to_restaurant,guestRestaurant.price_per_day_restaurant,guestRoom.room_number,newguest.username)
}    
    // // creating pool for guest
    
    if(info.date_to_pool != "" && info.date_from_pool != "") {

        var guestPool = new poolModule.guestPoolClass(info.date_from_pool,info.date_to_pool)
        poolModule.addPoolToGuest(guestPool, guestPool.date_from_pool,guestPool.date_to_pool,guestPool.price_per_day_pool,guestRoom.room_number,newguest.username)
    }
    else {
      var guestPool = new poolModule.guestPoolClass(new Date().toJSON().slice(0,10),new Date().toJSON().slice(0,10))
      poolModule.addPoolToGuest(guestPool, guestPool.date_from_pool,guestPool.date_to_pool,guestPool.price_per_day_pool,guestRoom.room_number,newguest.username)

  }  
    // creating cinema for guest
    
    if(info.date_to_cinema != "" && info.date_from_cinema != "") {
        var guestCinema = new cinemaModule.guestCinemaClass(info.date_from_cinema,info.date_to_cinema)
        cinemaModule.addCinemaToGuest(guestCinema, guestCinema.date_from_cinema,guestCinema.date_to_cinema,guestCinema.price_per_day_cinema,guestRoom.room_number,newguest.username)
    }
    else {
        
                var guestCinema = new cinemaModule.guestCinemaClass(new Date().toJSON().slice(0,10),new Date().toJSON().slice(0,10))
                cinemaModule.addCinemaToGuest(guestCinema, guestCinema.date_from_cinema,guestCinema.date_to_cinema,guestCinema.price_per_day_cinema,guestRoom.room_number,newguest.username)

    }
    
    // creating gym for guest
    
    if(info.date_to_gym != "" && info.date_from_gym != "") {

        var guestGym = new gymModule.guestGymClass(info.date_from_gym,info.date_to_gym)
        gymModule.addGymToGuest(guestGym, guestGym.date_from_gym,guestGym.date_to_gym,guestGym.price_per_day_gym,guestRoom.room_number,newguest.username)
    }
    else{
        
        var guestGym = new gymModule.guestGymClass(new Date().toJSON().slice(0,10),new Date().toJSON().slice(0,10))
        gymModule.addGymToGuest(guestGym, guestGym.date_from_gym,guestGym.date_to_gym,guestGym.price_per_day_gym,guestRoom.room_number,newguest.username)
    }
    // add reciept
    // var guestReciept = new recieptModule.guestRecieptClass()
    recieptModule.addRecieptToGuest(guestRoom.room_number,newguest.username)
   
        // updating fk

    recieptModule.addForgeingKeysReciept(newguest.username)
    bookingModule.addForgeingKeysBooking(newguest.username)
   
    if(info.date_to_gym != "" && info.date_from_gym != "") {
        recieptModule.addGymFKtoReciept(newguest.username)
    }
   
    if(info.date_from_cinema != "" && info.date_from_cinema != "") {
        recieptModule.addCinemaFKtoReciept(newguest.username)
    }

    if(info.date_to_pool != "" && info.date_from_pool != "") {
        recieptModule.addPoolFKtoReciept(newguest.username)
    }
    
    if(info.date_to_restaurant != "" && info.date_from_restaurant != "") {
        recieptModule.addRestaurantFKtoReciept(newguest.username)
    }
  
    if(info.date_to_sauna != "" && info.date_from_sauna != "") {
        recieptModule.addSaunaFKtoReciept(newguest.username)
    }
   
    recieptModule.addTotalPriceForBooking(newguest.username)
                            
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
            db.query(recieptSQL,function(err,data1){
                console.log("aaaaaaa");
                if (err) throw err
                else {
                    console.log(data1[0])
                    let reciept = data1[0]
                    res.render("guest", {first_name: reciept.first_name, room_number:reciept.room_number, last_name: reciept.last_name, username:reciept.username,password:reciept.password,check_in_date:reciept.check_in_date,check_out_date:reciept.check_out_date,total_price_for_room: reciept.total_price_for_room,total_price_sauna : reciept.total_price_sauna ,total_price_restaurant: reciept.total_price_restaurant, total_price_cinema: reciept.total_price_cinema, total_price_gym: reciept.total_price_gym, total_price_pool:reciept.total_price_pool,total_price_for_booking :reciept.total_price_for_booking,reciept_status:reciept.reciept_status  });
                    
                }
            })
            
        })
        // resredirect(`http://localhost:3000/guest/${username}`)

        app.post("/login", urlencodedParser, function (req, res) {
            const data = req.body
            var username = data.username;
            var password = data.password;
            console.log(username);
            console.log(password);
           if(user_passModul.checkUser(res,username,password)){
                console.log(`Welcome ${username}`)
                app.get(`/guest/${username}`, function(res,req){
                    // res.redirect (`/guest/${username}`)
                })
            } 
           else if(user_passModul.checkEmployee(res,username,password)){
                console.log(`Welcome employee ${username}`)
                app.get(`/adminGuest`, function(res,req){
                    // res.redirect (`./adminGuest`)
                })
            }
        
                else{
                    console.log("Wrong password or username")
                }
           
        })
        
        app.post("/findbooking", urlencodedParser, function(req,res){
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
             WHERE booking.username = "${booking.search}"
            ;`,function(err,data){
                if (err) throw err
                else {
                    const book = data[0]
                    console.log(booking);
                    res.render(`findbooked` , {
                        totalprice:book.total_price_for_booking,
                        username : book.username,
                        check_in_date : book.check_in_date,
                        check_out_date : book.check_out_date,
                        booking_id : book.booking_id,
                        total_price_cinema : book.total_price_cinema,
                        total_price_gym : book.total_price_gym,
                        total_price_pool : book.total_price_pool,
                        total_price_restaurant : book.total_price_restaurant,
                        total_price_sauna : book.total_price_sauna,
                        room_number : book.room_number,
                        first_name : book.first_name,
                        last_name : book.last_name
                    })
                }
            })
        })
        
        app.post("/findbooked",urlencodedParser ,function(req,res){
            const checkout = req.body.checkout;
            var sql1 = `UPDATE guest SET status_guest ="Inactive" WHERE username = "${checkout}";
             UPDATE room SET room_status = "Avaiable", username = NULL, reciept_id = NULL WHERE username = "${checkout}";`
            var sql3 = `UPDATE reciept SET reciept_status = "paid" WHERE username = "${checkout};`
            db.query(sql1,sql3, function(err,data){
                if (err) throw err
                else {

                    console.log(`Guest with username ${checkout} is checkout`)
                    res.render("./findbooking")
                }
            })
        })  

        var nodemailer = require('nodemailer');
        const { generateKeyPairSync } = require("crypto");
        const { isBuffer } = require("util");
        const { query } = require("express");
        const { user, password } = require("./databaseCon.js");
        const { nextTick } = require("process");
        const { addAbortSignal } = require("stream");
        
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

