
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



class guestRecieptClass {
reciept_status;
    constructor(){
        this.reciept_status= "active"
    }
}



module.exports = guestRecieptClass
    
