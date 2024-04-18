import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { NextFunction, Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET!) as {
      _id: string;
    };

    const user = await User.findById(_id);

    if (!user) {
      throw Error("User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    res.json({ message: "Request not authorized.", content: error });
  }
}

export default requireAuth;
