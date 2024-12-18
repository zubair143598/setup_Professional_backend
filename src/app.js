import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//we use (use) key word with app like app.use when we are working on middleware or configuration setting like cors(). Middleware is used for to check where the user is capable to access like(when we use instagram so its first check we r logged in or not)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// now the data is coming from many place, due to which some time app crash due to too much request so we use
app.use(express.json({ limit: "16kb" }));
// when we search something then in url we see some special characters like (%20, _,-,+) so to tell the express that data will come also like this, for this we use
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// sometimes we store public files like PDF file images every one can access
app.use(express.static("public"))

// we use cookies for to access the user browser cookies and set his cookies means(to perform crud operation on his cookies)
app.use(cookieParser())

// import routes
import userRouter from "./routes/user.routes.js"

//routes declaration 
// we were using before app.get.... because we were writing routes and controller in same file but now we are exporting from other files so we ues app.use 
// so new to bring router we have to do through middleware

// it will work like http://localhost:8000/users/register 
//the /register after the users/ comes from user.routes
//we can write like this w app.use("/users",uerRouter) */
//this is the most standardized  method also to tell api and its version

app.use("/api/v1/users",userRouter)
// it will work like http://localhost:8000/api/v1/users/register 


export { app };
