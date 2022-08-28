const mysql = require("mysql2")
const con = require("../databaseCon");
const db = mysql.createConnection(con)



    class newguestClass {
        first_name;
        last_name;
        date_of_birth;
        country;
        city;
        phone_number;
        email;
        gender;
        prefered_language;
        username;
        password;
        document_for_indefication;
        number_of_document_for_indefication;
        constructor(first_name,last_name,date_of_birth,country,city,phone_number,email,gender,prefered_languages,username,password,document_for_indefication,number_of_document_for_indefication){
        this.first_name = first_name,
        this.last_name= last_name,
        this.date_of_birth= date_of_birth,
        this.country= country,
        this.city= city,
        this.phone_number= phone_number,
        this.email= email,
        this.gender= gender,
        this.prefered_language= prefered_languages,
        this.username= username,
        this.password= password,
        this.document_for_indefication= document_for_indefication,
        this.number_of_document_for_indefication= number_of_document_for_indefication
    }
}

const addGuestSQL= (newguest,first_name,last_name,date_of_birth,gender,country,city,prefered_language,phone_number,email,document_for_indefication,number_of_document_for_indefication,username,password)=>{

    var sqlGuest = `INSERT INTO guest (first_name,last_name,date_of_birth,gender,country,city,prefered_language,phone_number,email,document_for_indefication,number_of_document_for_indefication,username,password) 
    VALUES("${first_name}","${last_name}","${date_of_birth}","${gender}","${country}","${city}","${prefered_language}","${phone_number}","${email}","${document_for_indefication}","${number_of_document_for_indefication}","${username}","${password}")`
    
    db.query(sqlGuest, newguest, function (err, data) {
        if (err) throw err;
        else console.log(" new guest added")
      })
      
  }

module.exports = {
    newguestClass,
    addGuestSQL   
} 
    