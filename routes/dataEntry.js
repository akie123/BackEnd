const express = require("express");
const router = express.Router();
const fs = require("fs");
const { parse } = require("csv-parse");
require('../controllers/user')
const Stock = require("../models/stock");



fs.createReadStream("./data/TATASTEEL.NS.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    const Date = row[0];
    const Open = row[1];
    const High = row[2];
    const Low  = row[3];
    const Close = row[4];
    const Adj_Close = row[5];
    const Volume = row[6];
    const Key = "tatasteel";
    

try{
    const stock = Stock.create({
       Date,
       Open,
       High,
       Low,
       Close,
       Adj_Close,
       Volume,
       Key
    })
    console.log("Data Entered Successfully (:");
   }
   catch(e){
      console.log("Error While ENtering Data");
      console.log(e);
    //   res.status(400).send(e.message);
   }

  })






// router.route('/register').post(registerUser)
// router.route('/login').post(loginUser)

module.exports = router;