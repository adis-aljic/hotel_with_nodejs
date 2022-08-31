
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



class guestRecieptClass {
reciept_status;
    constructor(){
        this.reciept_status= "active"
    }
}

const addRecieptToGuest =  (room_number, username) => {

    var sqlReciept = `INSERT INTO reciept (room_number,username)
        VALUES( ${room_number},"${username}");`


    db.query(sqlReciept, function (err, data) {
        if (err) throw err;
    })
}

const addForgeingKeysReciept = (username)=> {
    var lastID =`SELECT reciept_id FROM  reciept ORDER BY reciept_id DESC LIMIT 1;`
    db.query(lastID,function(err,data){
        if (err) throw err
        else {
    
            var FK_reciept = [
            `UPDATE room
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE booking
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE sauna
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE restaurant
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE cinema
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE gym
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE pool
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`,
            `UPDATE guest
            SET reciept_id = ${data[0].reciept_id}
            WHERE username = "${username}";`]  
            FK_reciept.forEach(sqlQuery => {
                
                
                db.query(sqlQuery,function(err, data){
                    if (err) throw err
                    else console.log(`Reciept_id is updated in all tables`);
                })
            });

        }
    })

    
    
    
}

const addSaunaFKtoReciept = (username)=> {
    var lastIDSauna =`SELECT sauna_id FROM  sauna ORDER BY sauna_id DESC LIMIT 1;`

    db.query(lastIDSauna,function(err,data){
        if (err) throw err
        else {
    
            var FK_reciept_sauna = 
            `UPDATE reciept
            SET sauna_id = ${data[0].sauna_id}
            WHERE username = "${username}";`
                           db.query(FK_reciept_sauna,function(err, data){
                    if (err) throw err
                    else console.log(`Sauna_id is updated in  reciept table`);
                })
        }
    })
}
const addRestaurantFKtoReciept = (username)=> {
    var lastIDRestaurant =`SELECT restaurant_id FROM  restaurant ORDER BY restaurant_id DESC LIMIT 1;`

    db.query(lastIDRestaurant,function(err,data){
        if (err) throw err
        else {
    console.log(data[0]);
            var FK_reciept_restaurant = 
            `UPDATE reciept
            SET restaurant_id = ${data[0].restaurant_id}
            WHERE username = "${username}";`
                           db.query(FK_reciept_restaurant,function(err, data){
                    if (err) throw err
                    else console.log(`restaurant_id is updated in  reciept table`);
                })
        }
    })
}
const addGymFKtoReciept = (username)=> {
    var lastIDGym =`SELECT gym_id FROM  gym ORDER BY gym_id DESC LIMIT 1;`

    db.query(lastIDGym,function(err,data){
        if (err) throw err
        else {
    
            var FK_reciept_gym = 
            `UPDATE reciept
            SET gym_id = ${data[0].gym_id}
            WHERE username = "${username}";`
                           db.query(FK_reciept_gym,function(err, data){
                    if (err) throw err
                    else console.log(`gym_id is updated in all reciept table`);
                })
        }
    })
}
const addPoolFKtoReciept = (username)=> {
    var lastIDPool =`SELECT pool_id FROM  pool ORDER BY pool_id DESC LIMIT 1;`

    db.query(lastIDPool,function(err,data){
        if (err) throw err
        else {
    
            var FK_reciept_pool = 
            `UPDATE reciept
            SET pool_id = ${data[0].pool_id}
            WHERE username = "${username}";`
                           db.query(FK_reciept_pool,function(err, data){
                    if (err) throw err
                    else console.log(`pool_id is updated in  reciept table`);
                })
        }
    })
}
const addCinemaFKtoReciept = (username)=> {
    var lastIDCinema =`SELECT cinema_id FROM  cinema ORDER BY cinema_id DESC LIMIT 1;`

    db.query(lastIDCinema,function(err,data){
        if (err) throw err
        else {
    
            var FK_reciept_cinema = 
            `UPDATE reciept
            SET cinema_id = ${data[0].cinema_id}
            WHERE username = "${username}";`
                           db.query(FK_reciept_cinema,function(err, data){
                    if (err) throw err
                    else console.log(`cinema_id is updated in  reciept table`);
                })
        }
    })
}
const addTotalPriceForBooking = (username)=> {
    var sql = `SELECT (sauna.total_price_sauna +  gym.total_price_gym +restaurant.total_price_restaurant  + cinema.total_price_cinema +pool.total_price_pool + booking.total_price_for_room) AS total_price 
    FROM booking
    INNER JOIN sauna ON booking.username = sauna.username
    INNER JOIN cinema ON booking.username = cinema.username
    INNER JOIN restaurant ON booking.username = restaurant.username
    INNER JOIN gym ON booking.username = gym.username
    INNER JOIN pool ON booking.username = pool.username
    WHERE booking.username = "${username}"
    ;`
    db.query(sql, function(err,data){
        if(err) throw err
        else {
            db.query(`UPDATE reciept SET total_price_for_booking = ${data[0].total_price} WHERE username = "${username}"`)
        }
    })
}

module.exports = {
    guestRecieptClass,
    addRecieptToGuest,
    addForgeingKeysReciept,
    addSaunaFKtoReciept,
    addCinemaFKtoReciept,
    addGymFKtoReciept,
    addPoolFKtoReciept,
    addRestaurantFKtoReciept,
    addTotalPriceForBooking
}
