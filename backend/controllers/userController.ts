import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function createToken(userId: string) {
  return jwt.sign({ _id: userId }, process.env.SECRET!, { expiresIn: "3d" });
}

async function signUpUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    // const user = await User.signUp(username, email, password)
  } catch (error) {
    res.json({ message: "Failed to sign up user.", content: error });
  }
}

async function loginUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
}
