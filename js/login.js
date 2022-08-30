function login() {
const user_passModels = require("../models/user_passModel")


    var uname = document.getElementById("email").value;
    var pwd = document.getElementById("pwd1").value;
  if(user_passModels.checkUser(uname,pwd))
{
        window.location = "/guest";
    }

  
        else{
            alert("admin-employee page(admin,123456),  guest page (guest,123456)")
        }
}

function clearFunc() {
    document.getElementById("email").value = "";
    document.getElementById("pwd1").value = "";
}	