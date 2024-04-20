import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";

function createToken(_id: string) {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3d" });
}

async function signUpUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const user = await User.signUp(username, email, password);

    const token = createToken(user._id);

    res.json({ username, email, token });
  } catch (error) {
    res.status(400).json({
      message: "Failed to sign up user.",
      content: (error as Error).message,
    });
  }
}

async function loginUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const user = await User.login(username, email, password);

    const token = createToken(user._id);

    res.json({ username, email, token });
  } catch (error) {
    res.status(400).json({
      message: "Failed to login user.",
      content: (error as Error).message,
    });
  }
}

export { signUpUser, loginUser };
