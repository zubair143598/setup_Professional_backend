import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.route("/register").post(registerUser)
// if someone request on /register link than registerUser is executed but we use middleware to say jaty howe moj sa mel k jana before execution so we use middleware

router.route("/register").post(
  upload.fields([
    {
      // we give here name avatar so we have to give the same name in both frontend and backend filed name
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
