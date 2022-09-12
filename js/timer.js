var countDownDate = new Date(new Date().getTime() + 2.9*60000);

var x = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML =  minutes + "m " + seconds + "s ";

  if (distance < 0) {
      document.getElementById("timer").innerHTML = "Your session will expire in 5 s";
      setTimeout(() => {
        
          window.location.href =  `${window.location.origin}`
          clearInterval(x);
      }, 5000);

  }
}, 1000);