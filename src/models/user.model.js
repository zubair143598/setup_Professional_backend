import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//in .env access token will not store in data base but the refresh token will save in database

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
// we don't use arrow function here because arrow function does'nt have context we use normal function here, because we have to access the above models values because we have to manipulate values, so it is important we have access of the values. and we will use async because it is time taking process
// "next" is the flag name like (res, req, error). It is middleware so next flag should be there. When the work is done in the we have to call the flag(next) the work is done now pass forward
userSchema.pre("save", async function (next) {
  // we used the condition that the password is only change through bcrypt if password is change other wise no need to encrypt again again(like some time use change avatar etc then we have to prevent that password don't change again )

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//if we show the password to use to check it is correct or for any reason we will show his password like 1234 and in the database it is save in encrypted form
// mongoose give use methods to use, like this in mongoose we can also make custom methods
// we can add methods like userSchema.method.methodName if the method name is there we will use other wise it will directly add to methods as a custom method
userSchema.methods.isPasswordCorrect = async function (password) {
  //the bcrypt can hash(encrypt) our password it can also check our password
  // this.password is encrypted password and other is user enter password the string
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      //this method have access of over database so data will come from database
      _id: this.id,
      email: this.email,
      userName: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      //this method have access of over database so data will come from database
      _id: this.id,
      email: this.email,
      userName: this.username,
      fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
