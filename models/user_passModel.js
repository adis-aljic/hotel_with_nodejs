const express = require("express");
const { appendFile } = require("fs");
const mysql = require("mysql2");
const { addListener, off } = require("process");
const con = require("../databaseCon");
const db = mysql.createConnection(con);
const app = express();
// const bcrypt = require("bcrypt")



const checkUser = (session,res,req, username, password,) => {
    const sqlQ = `SELECT username, password,status_guest, isLoged FROM guest;`
    db.query(sqlQ, function (err, data) {
        if (err) throw err
        else {  
            // console.log(username,password);
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]);
                const user_pass = data[i];
         
                if (username == user_pass.username && password == user_pass.password && user_pass.status_guest == "Active") {
                    setOnline(username);
                    // session=req.session;
                    // session.username = req.params
                    // if(session.username){
                
                        // db.query(`INSERT INTO sessions(session_username, id) VALUES ("${session.username.username}","${req.session.id}") ;`,function(err,data){
                        //     if (err) throw err
                        //     else console.log(data);
                        // })
                        
                        console.log(`User ${user_pass.username} is loged`);
                        return    res.redirect(`/guest/${username}`)
                    // }
                } 
   
                    
                }
                console.log("wrong pass");
                res.redirect("/loginWrongPass")
            }
    })
}



const checkEmployee = (res, username, password) => {
    const sqlQ = `SELECT username, password  FROM employees;`
    db.query(sqlQ, function (err, data) {
        if (err) throw err
        else {
            for (let i = 0; i < data.length; i++) {
                const user_pass = data[i];
                if (username == user_pass.username && password == user_pass.password ) {
                    setOnline(username);
                        console.log(`User ${user_pass.username} is logged`);
                          return   res.redirect(`/adminguest`)
                } 
                  
                
            }
        }
        console.log("wrong pass for employee");
              res.redirect("/loginWrongPass")
    })
}



// Set online status for guest when he log in
function setOnline(username) {
    let sql = `UPDATE guest SET isLoged = "Online" WHERE username = "${username}"`
    db.query(sql, function(err,data){
        if (err) throw err
        else console.log(` User ${username} is logged`);
    })  
}


// function for seting offline status when guest log out
// not working




function offline(username) {
        console.log(`prije queerija`);
       

        db.query(`UPDATE guest SET isLoged = "Offline" WHERE username = "${username}"`, function (err, data) {
            if (err) throw err
            else {
                console.log(`User ${username} is loged out`);
                console.log("Your session is finished");
            }
        })
    
}
// offline()


module.exports = {
    checkUser,
    checkEmployee
}