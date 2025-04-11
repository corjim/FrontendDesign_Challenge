"use strict";

require("dotenv").config();
require("colors");

const PORT = +process.env.PORT || 5050;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "yodlr_test";
} else {
  DB_URI = "yodlr"
}

//console.log("YODLR_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
//console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".red, DB_URI);
console.log("---");

module.exports = {
  //SECRET_KEY,
  PORT,
  DB_URI,
  BCRYPT_WORK_FACTOR
};
