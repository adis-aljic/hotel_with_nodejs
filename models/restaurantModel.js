const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)




class guestRestaurantClass {
    date_to_restaurant;
    date_from_restaurant;
    constructor(date_from_restaurant, date_to_restaurant) {
        this.date_from_restaurant = date_from_restaurant,
            this.date_to_restaurant = date_to_restaurant,
            this.price_per_day_restaurant = 20
    }
}




const addRestaurantToGuest = (guestRestaurant, date_from_restaurant, date_to_restaurant, price_per_day_restaurant, room_number, username,) => {
    var total_price_restaurant = (new Date(date_to_restaurant) - new Date(date_from_restaurant)) / (1000 * 24 * 3600) * price_per_day_restaurant
    var sqlRestaurant = `INSERT INTO restaurant(room_number,username,date_from_restaurant,date_to_restaurant,price_per_day_restaurant,total_price_restaurant)
        VALUES( ${room_number},"${username}", "${date_from_restaurant}", "${date_to_restaurant}",${price_per_day_restaurant},${total_price_restaurant}); `
    db.query(sqlRestaurant, guestRestaurant, function (err, data) {
        if (err) throw err;
    })
}


module.exports = {
    guestRestaurantClass,
    addRestaurantToGuest
}