const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adis@gmail.com',
    pass: 'yourpassword',
  },
});

app.post('/contact', urlencodedParser, function (req, res) {
  res.render('contact', { msg: req.body });
  const msg = req.body;
  console.log(msg);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
