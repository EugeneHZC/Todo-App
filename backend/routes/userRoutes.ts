import express from "express";
import { signUpUser, loginUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.post("/sign-up", signUpUser);

export default userRouter;
