
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



class guestCinemaClass {
    date_to_cinema;
    date_from_cinema;
    constructor(date_to_cinema,date_from_cinema){
        this.date_from_cinema= date_from_cinema,
        this.date_to_cinema=  date_to_cinema,
        this.price_per_day_cinema = 10
        
    }
}





const addCinemaToGuest = (guestCinema, date_from_cinema, date_to_cinema, price_per_day_cinema, room_number, username,) => {

    var total_price_cinema = (new Date(date_to_cinema) - new Date(date_from_cinema)) / (1000 * 24 * 3600) * price_per_day_cinema
    var sqlCinema = `INSERT INTO cinema (room_number,username,date_from_cinema,date_to_cinema,price_per_day_cinema,total_price_cinema)
        VALUES( ${room_number},"${username}", "${date_from_cinema}", "${date_to_cinema}",${price_per_day_cinema},${total_price_cinema});`


    db.query(sqlCinema, guestCinema, function (err, data) {
        if (err) throw err;
    })
}

module.exports = {
    guestCinemaClass,
    addCinemaToGuest
}