
const { appendFile } = require("fs");
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con);


const checkUser = (username, password) => {
    const sql = `SELECT username, password FROM guest;`
    db.query(sql, function(err,data){
     if (err) throw err
     else {
       
        for (let i = 0; i < data.length; i++) {
            const user_pass = data[i];
        console.log(user_pass);
                if(username == user_pass.username && password == user_pass.password) {
                    return true
                }
                else return false
        }
    }
    })
}



module.exports = {checkUser}