const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con);


function offline (){
    console.log("bb");
    app.get("/login", function(res,req){
    db.query(`UPDATE guest SET isLoged = "Offline" WHERE username = "${req.params.username}"`,function(err,data){
            if (err) throw err
            else {

                 console.log(`User ${req.params.username} is loged out`);
                    console.log("Your session is finished");
                }
            })
        })
}

         