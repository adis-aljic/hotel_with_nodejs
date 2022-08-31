const user_passModul = require("../models/user_passModel")


function login(){
    var uname = document.getElementById("email").innerHTML;
    var pwd = document.getElementById("pwd1").innerHTML;
    console.log(uname,pwd);
    console.log("/guest" + uname);
    // window.location = "/guest" + uname;
  if(checkUser(uname,pwd))
{
        console.log("aaaaaa");
    }

  
        else{
            alert("Wrong username or password")
        }
}

function clearFunc() {
    document.getElementById("email").value = "";
    document.getElementById("pwd1").value = "";
}	    