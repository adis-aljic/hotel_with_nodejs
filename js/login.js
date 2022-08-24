function login() {
    var uname = document.getElementById("email").value;
    var pwd = document.getElementById("pwd1").value;
  
    if (uname == "admin"  && pwd == "123456" ) {
        window.location = "/adminguest";
    }
    else if (uname == "guest" && pwd == "123456" ) {
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