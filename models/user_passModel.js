
const { appendFile } = require("fs");
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con);


const checkUser = (res,username, password) => {
    const sqlGuest = `SELECT username, password,status_guest FROM guest;`
    db.query(sqlGuest, function(err,data){
     if (err) throw err
     else {
       
        for (let i = 0; i < data.length; i++) {
            const user_pass = data[i];
                if(username == user_pass.username && password == user_pass.password && user_pass.status_guest == "Active") {
                   
                    // window.location = `/guest/${username}`
                    res.redirect (`/guest/${username}`)

                }
                else {
                    console.log("Wrong username or password");
                    res.redirect("/login")
                }
        }
    }
    })
}
const checkEmployee = (res,username, password) => {
    const sqlEmployees = `SELECT username, password,first_name,last_name,job_title FROM employees;`
    db.query(sqlEmployees, function(err,data){
     if (err) throw err
     else {
       console.log(data);
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            const user_pass = data[i];
            if(username == user_pass.username && password == user_pass.password) {

                    res.render (`./adminGuest`, {username: user_pass.username, first_name:user_pass.first_name, last_name :user_pass.last_name , job_title:user_pass.job_title})

                }
        }
    }
    })
}


// console.log(checkUser(78945,92855))
module.exports = {
    checkUser,
checkEmployee
}