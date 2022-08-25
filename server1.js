const express = require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser")
const app = express();
const mysql = require("mysql2")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const con = require ("./databaseCon.js")
const db = mysql.createConnection(con)

db.connect((err) => {
    if (err) throw err
    else
        console.log("database is connected")
})


app.use(express.static(__dirname));

app.set("view engine", "ejs")
app.get("/", function (req, res) {
    res.render("./index")
})
app.get("/contact", function (req, res) {
    res.render("contact")
})
app.get("/booking", function (req, res) {
    res.render("booking")
})
app.get("/login", function (req, res) {
    res.render("login")
})
app.get("/adminguest", function (req, res) {
    res.render("adminguest")
})
app.get("/adminemployee", function (req, res) {
    res.render("adminemployee")
})
app.post("/adminemployee", urlencodedParser, function (req, res) {
   
    res.render("newemployee", { info: req.body })
    const info = req.body;
            var sql = `INSERT INTO employees   SET ?`   

    db.query(sql,info ,function(err, data){
    if(err) throw err;
    else console.log(" one employee added")
})  
})
app.post("/adminguest", urlencodedParser, function (req, res) {
   
    res.render("newguest", { infoGuest: req.body })
    const infoGuest = req.body;
    console.log(infoGuest)
            // var sql = `INSERT INTO employees   SET ?`   

    // db.query(sql,info ,function(err, data){
    // if(err) throw err;
    // else console.log(" one employee added")
// })  
})
app.get("/findbooking", function (req, res) {
    res.render("findbooking")
})
// app.get("/guest", function(req,res){
//     res.render("guest")
// })
app.get("/guest/:name", function (req, res) {
    var data = { room_number: 29, typeofroom: "single bed", aditionalServices: ["pool", "restaurant", "gym"] }

    res.render("guest", { person: req.params.name, room_number: data.room_number, typeofroom: data.typeofroom, aditionalServices: data.aditionalServices });

})


app.listen(3000);
console.log("Server listening on port 3000")

