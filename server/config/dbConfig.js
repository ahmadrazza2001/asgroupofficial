const mongoose = require("mongoose");
const { mongo_url } = require("./keys");
mongoose.connect(mongo_url);
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

connection.on("error", (err) => {
  console.log("Mongo DB Connection Failed", err);
});

module.exports = connection;
