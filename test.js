
// const mysql = require("mysql2");
// const { database } = require("./databaseCon");
// const con = require("./databaseCon");
databaseCon.con()
const db = mysql.createConnection(con)

window.singlebed =  function (){

    console.log("aaaaaaaaaa");
    var sql = `SELECT room_status FROM room`
db.query(sql, function(err,data){
    if (err) throw err
    else{
        const array =  [
        `<label for="type_of_room"> <input class="radio" type="radio" id="room_number" name="room_number" value="101">Room101</label>`,
        `<label for="type_of_room"> <input type="radio" id="room_number" value="102" name="room_number">Room 102</label>`
    ]
        let code = "";
        for (let i = 0; i < array.length; i++) {
            
            console.log(data[i]);
            if (data[i].room_status == "Avaiable") {
                
             code  += array[i] 
            }
        }
        // document.getElementById("101").innerHTML = code;
        // var theDiv = document.getElementById("101");
        //    var content = document.createTextNode(code);
        //      theDiv.appendChild(content);
    }

})


}
singlebed()