var express = require("express");
const { dirname } = require("path");
var bodyParser = require("body-parser")
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname));

app.set("view engine", "ejs")
app.get("/", function(req,res){
    res.render("./index" )
})
app.get("/contact", function(req,res){
    res.render("contact")
})
app.get("/booking", function(req,res){
    res.render("booking")
})
app.get("/login", function(req,res){
    res.render("login")
})
app.get("/adminguest", function(req,res){
    res.render("adminguest")
})
app.get("/adminemployee", function(req,res){
    res.render("adminemployee")
})
app.post("/adminemployee", urlencodedParser, function(req,res){
    console.log(req.body)
    res.render("newemployee", {info: req.body})
})
app.get("/findbooking", function(req,res){
    res.render("findbooking")
})
// app.get("/guest", function(req,res){
//     res.render("guest")
// })
app.get("/guest/:name", function(req,res){
var data = {room_number:29 , typeofroom: "single bed", aditionalServices: ["pool","restaurant","gym"]}
    
res.render("guest",{person: req.params.name, room_number : data.room_number, typeofroom:data.typeofroom , aditionalServices : data.aditionalServices});

})


app.listen(3000);
