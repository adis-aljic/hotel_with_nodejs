const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)


class guestSaunaClass {
    date_to_sauna;
    date_from_sauna;
    constructor(date_from_sauna, date_to_sauna) {
        this.date_from_sauna = date_from_sauna,
            this.date_to_sauna = date_to_sauna,
            this.price_per_day_sauna = 20
    }
}



const findLastBookingId = () => {
    var lastID = `SELECT booking_id from booking ORDER BY booking_id DESC LIMIT 1;`
    db.query(lastID, function (err, data) {
        if (err) throw err
        else {
            return data[0].booking_id
        }
    })
}



const addSaunaToGuest = (guestSauna, date_from_sauna, date_to_sauna, price_per_day_sauna, room_number, username,) => {
    var total_price_sauna = (new Date(date_to_sauna) - new Date(date_from_sauna)) / (1000 * 24 * 3600) * price_per_day_sauna
    var sqlSauna = `INSERT INTO sauna(room_number,username,date_from_sauna,date_to_sauna,price_per_day_sauna,total_price_sauna)
        VALUES( ${room_number},"${username}", "${date_from_sauna}", "${date_to_sauna}",${price_per_day_sauna},${total_price_sauna}); `
    db.query(sqlSauna, guestSauna, function (err, data) {
        if (err) throw err;
    })
}



module.exports = {
    guestSaunaClass,
    addSaunaToGuest
}