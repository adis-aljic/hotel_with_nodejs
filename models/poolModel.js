const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



class guestPoolClass {
    date_to_pool;
    date_from_pool
    constructor(date_from_pool,date_to_pool){
        this.date_from_pool= date_from_pool,
        this.date_to_pool=  date_to_pool,
        this.price_per_day_pool = 10
    }
}



const addPoolToGuest = (guestPool, date_from_pool, date_to_pool, price_per_day_pool, room_number, username,) => {

    var total_price_pool = (new Date(date_to_pool) - new Date(date_from_pool)) / (1000 * 24 * 3600) * price_per_day_pool
    var sqlPool = `INSERT INTO pool (room_number,username,date_from_pool,date_to_pool,price_per_day_pool,total_price_pool)
        VALUES( ${room_number},"${username}", "${date_from_pool}", "${date_to_pool}",${price_per_day_pool},${total_price_pool});`

    db.query(sqlPool, guestPool, function (err, data) {
        if (err) throw err;
    })
}


module.exports = {
    guestPoolClass,
    addPoolToGuest
}