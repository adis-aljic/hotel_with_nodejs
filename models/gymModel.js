
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



class guestGymClass {
    date_to_gym;
    date_from_gym
    constructor(date_to_gym,date_from_gym){
        this.date_to_gym=  date_to_gym,
        this.date_from_gym= date_from_gym,
        this.price_per_day_gym = 10       
    }
}





const addGymToGuest = (guestGym, date_from_gym  , date_to_gym, price_per_day_gym, room_number, username,) => {

    var total_price_gym = (new Date(date_to_gym) - new Date(date_from_gym)) / (1000 * 24 * 3600) * price_per_day_gym
    var sqlGym = `INSERT INTO gym (room_number,username,date_from_gym,date_to_gym,price_per_day_gym,total_price_gym)
        VALUES( ${room_number},"${username}", "${date_from_gym}", "${date_to_gym}",${price_per_day_gym},${total_price_gym});`


    db.query(sqlGym, guestGym, function (err, data) {
        if (err) throw err;
    })
}

module.exports = {
    guestGymClass,
    addGymToGuest
}