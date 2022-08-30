
const { appendFile } = require("fs");
const mysql = require("mysql2")
const con = require("../databaseCon");
const express = require("express")
const db = mysql.createConnection(con);
const app = express()
const checkUser = (username, password) => {
   
}


module.exports = checkUser;