const dotenv = require("dotenv").config().parsed;
const mongoose = require("mongoose");

// MongoDB connection

const ConnectDB = () => {
  mongoose
    .connect(dotenv.MONGO_URL, {
      dbName: "AuthUser",
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) =>
      console.error("MongoDB Connection failed:", error.message)
    );

};
ConnectDB(); 


module.exports =ConnectDB      