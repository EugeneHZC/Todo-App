import mongoose, { mongo } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  _id: string;
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

  login(
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
) {
  if (!username || !email || !password) {
    throw Error("Please include all fields.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must include at least 8 characters including an uppercase, a lowercase, a number and a special symbol."
    );
  }

  const userExisted = await this.findOne({ email });
  if (userExisted) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

userSchema.statics.login = async function (
  username: string,
  email: string,
  password: string
) {
  if (!username || !email || !password) {
    throw Error("Please include all fields.");
  }

  const user: UserDocument = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid email.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

const User = mongoose.model<UserDocument, UserModel>("UserModel", userSchema);

export default User;
