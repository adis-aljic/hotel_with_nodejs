
const { appendFile } = require("fs");
const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con);


const checkUser = (res, username, password) => {
    const sqlGuest = `SELECT username, password,status_guest, isLoged FROM guest;`
    db.query(sqlGuest, function (err, data) {
        if (err) throw err
        else {

            for (let i = 0; i < data.length; i++) {
                const user_pass = data[i];
                if (username == user_pass.username && password == user_pass.password && user_pass.status_guest == "Active") {
console.log(user_pass);
db.query(`UPDATE guest SET isLoged = "Online" WHERE username = "${user_pass.username}"`,function(err,data){
        if (err) throw err
        else console.log(`User ${user_pass.username} is loged`);
        // window.location = `/guest/${username}`
        // 
    })
    return res.redirect(`/guest/${username}`)

                }
                else {
                    console.log("Wrong username or password");
                  return res.redirect("/login")
                }
            }
        }
    })
}
const checkEmployee = (res, username, password) => {
    const sqlEmployees = `SELECT username, password,first_name,last_name,job_title FROM employees;`
    db.query(sqlEmployees, function (err, data) {
        if (err) throw err
        else {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const user_pass = data[i];
                if (username == user_pass.username && password == user_pass.password) {

                    res.render(`./adminGuest`, { username: user_pass.username, first_name: user_pass.first_name, last_name: user_pass.last_name, job_title: user_pass.job_title })

                }
            }
        }
    })
}

    function offline (){
        db.query(`UPDATE guest SET isLoged = "Offline" WHERE username = "${user_pass.username}"`,function(err,data){
                if (err) throw err
                else {

                    console.log(`User ${user_pass.username} is loged`);
                    app.get("/login", function(res,req){
                        console.log("Your session is finished");
                    })
                }
            })
    }
                
    
    

// console.log(checkUser(78945,92855))
module.exports = {
    checkUser,
    checkEmployee,
    offline
}