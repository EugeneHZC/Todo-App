import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  signUp(
    username: string,
    email: string,
    password: string
  ): Promise<UserDocument>;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (
  username: string,
  email: string,
  password: string
) {};
