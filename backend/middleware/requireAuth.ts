import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import { NextFunction, Request, Response } from "express";

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ message: "Authorization token required." });
  }
}
