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


const addForgeingKeysBooking = (username)=> {
    var lastID =`SELECT booking_id FROM  booking ORDER BY booking_id DESC LIMIT 1;`
    db.query(lastID,function(err,data){
        if (err) throw err
        else {
    
            var FK_booking = [
            `UPDATE room
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE reciept
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE sauna
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE restaurant
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE cinema
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE gym
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE pool
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`,
            `UPDATE guest
            SET booking_id = ${data[0].booking_id}
            WHERE username = "${username}";`]  
            FK_booking.forEach(sqlQuery => {
                
                db.query(sqlQuery,function(err, data){
                    if (err) throw err
                    else console.log(`booking_id is updated in all tables`);
                })
            });

        }
    })

    
    
    
}
module.exports = {
    guestBookingClass,
    createBooking,
    addForgeingKeysBooking
}