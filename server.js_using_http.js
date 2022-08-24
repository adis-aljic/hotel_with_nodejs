var fs = require("fs")
var http = require("http")
const { addListener } = require("process")
const { json } = require("body-parser")


var server = http.createServer(function(req,res){
    console.log("request was made: " + req.url);
    // res.writeHead(200, {"Content-type": "text/html"})
    // var myReadStream = fs.createReadStream(__dirname + "/html/index.html", "utf8")
    // const app = express();
    // app.use(express.static(__dirname));

// myReadStream.pipe(res)

        if(req.url === "/home") {
          res.writeHead(200, {"Content-type": "text/html"});
         fs.createReadStream(__dirname + "/html/index.html", "utf8").pipe(res);
            
        }
        else if (req.url === "/contact"){
        res.writeHead(200, {"Content-type": "text/html"});
        fs.createReadStream(__dirname + "/html/contact.html", "utf8").pipe(res);
    }
    else if (req.url === "/api/users") {
        var users = [{name:"adis",age : 20}, {name:"jane",age:30}]
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(users))
    }
    else {
        res.writeHead(404, {"Content-type": "application/json"});
        res.end("page not found")
    }
})
// var server = http.createServer(function(req,res){
//     console.log("request was made:" + req.url)
//     res.writeHead(200, {"Content-type": "application/json"})
//     var myObj = {
//         name : "adis",
//         job: "employee",
//         age : 22
//     }
//     res.end(JSON.stringify(myObj))

// })

server.listen(3000, "127.0.0.1");
console.log("server listen at port 3000");


