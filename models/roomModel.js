const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)

class guestRoomClass {
    room_number;
        room_status;
        constructor(room_number){
            this.room_number = room_number,
            this.room_status = "Ocupated"
        }
    }

        const returnRoomStatus = (room_number) =>{
            const sqlQuery = `SELECT room_status FROM room WHERE room_number = ${room_number}`
            db.query(sqlQuery, function(err,data){
                if (err) throw err;
                else return console.log(data[0].room_status)
            })
        }
     
        const addGuestToRoom = (room_number,guestRoom,username) =>{
          
            var sqlRoom = ` UPDATE room   
            SET room_status = "Ocupated", username = "${username}"
            WHERE room_number = ${room_number};`
            console.log(returnRoomStatus(room_number))
           db.query(sqlRoom,guestRoom, function(err, data){
               if (err) throw err;
               else console.log("Guest is added to room")
            })
        
    }

    module.exports = {
        guestRoomClass,
        addGuestToRoom,
        returnRoomStatus
    }