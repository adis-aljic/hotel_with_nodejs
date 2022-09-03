
const express = require("express");
const { appendFile } = require("fs");
const mysql = require("mysql2");
const { addListener } = require("process");
const con = require("../databaseCon");
const db = mysql.createConnection(con);
const app = express();
// const bcrypt = require("bcrypt")

const checkUser = (res, username, password,) => {
    const sqlQ = `SELECT username, password,status_guest, isLoged FROM guest;
    `

    db.query(sqlQ, function (err, data) {
        if (err) throw err
        else {
            
     
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]);
                const user_pass = data[i];
                // const user_passEmp = data[1][i];
                // const salt = 10;
              
                // console.log("user_pass");
                // console.log(user_pass.username);
                // console.log("username i pass");
                // console.log(username + " i  " + password);
                if (username == user_pass.username && password == user_pass.password && user_pass.status_guest == "Active") {
                    setOnline(username);
                        console.log(`User ${user_pass.username} is loged`);
                             res.redirect(`/guest/${username}`)
         
                } 
            
                // else if(username_emp == user_passEmp.username && password_emp == user_passEmp.password){
                //         console.log(`Welcome employee ${username_emp}`);
                //         res.redirect(`/adminGuest`)
                // }
                // else if(i == data.length-1) {
               
                  else  {console.log("wrong pass");
                return      res.redirect("/loginWrongPass")
       
                }
            
            }
        }
    })
}
const checkEmployee = (res, username, password) => {
    const sqlQ = `SELECT username, password  FROM employees;
    `

    db.query(sqlQ, function (err, data) {
        if (err) throw err
        else {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].username + "  username");
                console.log(data[i].password + "  password");
                const user_pass = data[i];
               
                if (username == user_pass.username && password == user_pass.password ) {
                    setOnline(username);
                        console.log(`User ${user_pass.username} is loged`);
                             res.redirect(`/adminguest`)
         
                } 
            
                  else{

                      console.log("wrong pass employee");
                      return      res.redirect("/loginWrongPass")
                    }  
       
                // }
            
            }
        }
    })
}
// const checkEmployee = (res, username, password) => {
//     const sqlEmployees = `SELECT username, password FROM employees;`
//     db.query(sqlEmployees, function (err, data) {
//         if (err) throw err
//         else {
//             console.log("data");
//             for (let i = 0; i < data.length; i++) {
//                 const user_pass = data[i];
//                 if (username == user_pass.username && password == user_pass.password) {

//                     res.redirect(`./adminGuest`)

//                 }

//             }
//         }
//     })
// }

function setOnline(username) {
    let sql = `UPDATE guest SET isLoged = "Online" WHERE username = "${username}"`
    db.query(sql, function(err,data){
        if (err) throw err
        else console.log(` User ${username} is logged`);
    })  
}

function setOffline(username) {
    let sql = `UPDATE guest SET isLoged = "Offline" WHERE username = "${username}"`
    db.query(sql, function(err,data){
        if (err) throw err
        else console.log(` User ${username} is logged`);
    })  // kak pokupit username
}
function offline() {
    console.log("bb");
    app.get("/login", function (res, req) {
        console.log(`User ${req.params.username} is loged out`);
        db.query(`UPDATE guest SET isLoged = "Offline" WHERE username = "${req.params.username}"`, function (err, data) {
            if (err) throw err
            else {

                console.log(`User ${req.params.username} is loged out`);
                console.log("Your session is finished");
            }
        })
    })
}

// console.log(checkUser(78945,92855))
module.exports = {
    checkUser,
    checkEmployee,
    offline
}