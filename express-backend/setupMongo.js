const mongoose = require("mongoose");

//REMOVE BEFORE COMMITTING
const uri = "mongodb+srv://<username>:<password>@cluster0.kzdybz2.mongodb.net/?retryWrites=true&w=majority";

function connect() {
  const options = { useNewUrlParser:true };
  mongoose.connect(uri, options).then(
    () => { console.log("Database connection established!"); },
    err => { console.log("Error connecting Database instance due to: ", err); }
  )}
module.exports = connect
