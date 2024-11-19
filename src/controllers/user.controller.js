import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

  //steps for registerUser
  //1. get details from user
  //2. validation - not empty
  //3. check if user already exist check through: username, email
  //4. check for images, check for avatar
  //5. upload them to cloudinary, also check that avatar is successfully uploaded
  //6. create user object - create entry in db
  //7. remove password and refresh token field form response
  //8. check for user creation
  //9. return response

const registerUser = asyncHandler(async (req, res) => {
  //  res.status(200).json({
  //   message: "Chai aur code",
  // });

  //1. get details from user
  const { fullName, email, username, password } = req.body;
  console.log("email:", email);

  // we can check like this validation, if we have many field than we will write same like  if condition for other field like username, password etc

  // if(fullName==="")
  // {
  //   throw new ApiError(400, "FullName is required")
  // }

  // another best approach is
  //2. validation - not empty
  if (
    // [].some is the array method like other array method like map etc
    [fullName, email, username, password].some(
      (field) =>
        // the ? is used to check if that is field than trim
        field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //3. check if user already exist check through: username, email
  // User.findOne({email})
  // we can check like this but we have to check  both the  email and username
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist ");
  }

  //4. check for images, check for avatar
  // as like req.body is given by express same like file access is given by middleware
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //5. upload them to cloudinary, also check that avatar is successfully uploaded
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
//6. create user object - create entry in db
const user = await User.create({
  fullName,
  avatar:avatar.url,
  coverImage:coverImage?.url || "",
  email,
  password,
  username:username.toLowerCase()
})

//7. remove password and refresh token field form response
const createdUser = await User.findById(user._id).select(
//by default all fields  selected so we write here which we want don't selected, we write - with each field that don't select this
  "-password -refreshToken"
)
//8. check for user creation
if(!createdUser){
  throw new ApiError(500,"Something went wrong while registering the user")
}

//9. return response

return res.status(201).json(
  new ApiResponse(200, createdUser, user Register successfully)
)

});

export { registerUser };
