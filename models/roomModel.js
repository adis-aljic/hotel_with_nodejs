const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



class guestRoomClass {
    room_number;
    room_status;
    constructor(room_number) {
        this.room_number = room_number,
            this.room_status = "Ocupated"
    }
}



const addGuestToRoom = (room_number,room_status, guestRoom, username) => {
    var sqlRoom = `UPDATE room   
            SET room_status = "${room_status}", username = "${username}"
            WHERE room_number = ${room_number};`
    db.query(sqlRoom, guestRoom, function (err, data) {
        if (err) throw err;
        else {
            console.log("Guest is added to room  " + room_number)
        }
    })
}



const returnRoomStatus = (room_number) => {
    db.query(`SELECT room_status FROM room WHERE room_number = ${room_number} ;`, function (err, data) {
        if (err) throw err;
        else {
            return data[0].room_status
        }
    })
}



module.exports = {
    guestRoomClass,
    addGuestToRoom,
    returnRoomStatus
}