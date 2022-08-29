const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)


class guestBookingClass {
    check_in_date;
    check_out_date;
    price_per_night;
    constructor(check_in_date,check_out_date,price_per_night){
        this.check_in_date= check_in_date,
        this.check_out_date= check_out_date,
        this.price_per_night = price_per_night
    }
}

const createBooking = (guestBooking, check_in_date,check_out_date,price_per_night,room_number,username,total_price_for_room)=> {
    var total_price_for_room = (new Date(check_out_date) - new Date(check_in_date) )/(3600*24*1000)*price_per_night;
    var sqlBooking = `INSERT INTO booking (room_number,username,check_in_date,check_out_date,total_price_for_room)
    VALUES (${room_number}, "${username}", "${check_in_date}","${check_out_date}",${total_price_for_room});`
        db.query(sqlBooking, guestBooking, function (err, data) {
            if (err) throw err;
            else {                    
                console.log(" new guest is booked")
                 
            }     
        })


}

module.exports = {
    guestBookingClass,
    createBooking,
}