// require('dotenv').config({path:"./env"})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path:'./.env'
})


//we use async await for connection and async technically return promise, 
// so we can use .then and .catch because it is a promises 
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000  , ()=>{
    console.log(`server is running on port: ${process.env.PORT}`);
    
  })
})
.catch((error)=>{
  console.log("MongoDb connection failed!!!", error );
  
})

















/* basic way to connect
import express from "express";

const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
    //some time there is no error in the connection with database
    //but some time express app don't want to connect so we write this
    //listener of express to handle error
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