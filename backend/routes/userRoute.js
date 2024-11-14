import express from "express";
import { loginUser ,signInUser } from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";

const userRouter = express.Router();

userRouter.post("/signin" ,wrapAsync(signInUser));
userRouter.post ("/login" ,wrapAsync(loginUser));

export default userRouter;