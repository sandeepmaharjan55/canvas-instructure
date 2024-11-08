// import npm modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
var bodyParser = require("body-parser");

//import local modules

// define global variables
const app = express();
const PORT = process.env.PORT || 7001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//routes
require("./routes/")(app); //all routes

if (true || process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));
  // const path = require("path");
  app.use("/public", express.static("public"));
}
//booted up the server
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server is up @ ${PORT} port.`);
});
