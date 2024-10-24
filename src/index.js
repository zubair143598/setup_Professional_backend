// require('dotenv').config({path:"./env"})

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path:'.env'
})

connectDB()

















/* basic way to connect
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
    //some time there is no error in the connection with database
    //but some time express app don't want to connect tso we write this
    //listener of express to  for to handle error
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
})();
*/