
const express = require("express");
const { appendFile } = require("fs");
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con);
const app = express();

const checkUser = (res, app, username, password) => {
    const sqlGuest = `SELECT username, password,status_guest, isLoged FROM guest;`
    db.query(sqlGuest, function (err, data) {
        if (err) throw err
        else {

            for (let i = 0; i < data.length; i++) {
                const user_pass = data[i];
                if (username == user_pass.username && password == user_pass.password && user_pass.status_guest == "Active") {
                    console.log(user_pass);
                    db.query(`UPDATE guest SET isLoged = "Online" WHERE username = "${user_pass.username}"`, function (err, data) {
                        if (err) throw err
                        else console.log(`User ${user_pass.username} is loged`);
                        // window.location = `/guest/${username}`
                        // 
                    })
                    res.redirect(`/guest/${username}`)

                }
                else {
                  app.get("/login",function(res,req){
                    })
                }

            }
        }
    })
}
const checkEmployee = (res, username, password) => {
    const sqlEmployees = `SELECT username, password FROM employees;`
    db.query(sqlEmployees, function (err, data) {
        if (err) throw err
        else {
            console.log("data");
            for (let i = 0; i < data.length; i++) {
                const user_pass = data[i];
                if (username == user_pass.username && password == user_pass.password) {

                    res.redirect(`./adminGuest`)

                }

            }
        }
    })
}




function offline() {
    console.log("bb");
    // app.get("/login", function (res, req) {
        // console.log(`User ${req.params.username} is loged out`);
        db.query(`UPDATE guest SET isLoged = "Offline" WHERE username = "${req.params.username}"`, function (err, data) {
            if (err) throw err
            else {

                // console.log(`User ${req.params.username} is loged out`);
                console.log("Your session is finished");
            }
        })
    // })
}

// console.log(checkUser(78945,92855))
module.exports = {
    checkUser,
    checkEmployee,
    offline
}