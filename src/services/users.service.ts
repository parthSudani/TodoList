import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

interface AuthPayload {
  username: string;
  password: string;
  email: string;

}

export const registerUser = async ({ username, password , email}: AuthPayload) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword,email });
  await user.save();

  return {
    success: true,
    message: "User registered successfully",
    user: { id: user._id, username: user.username ,email:email},
  };
};

export const loginUser = async ({ username, password }: AuthPayload) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  return {
    success: true,
    message: "User logged in successfully",
    token,
  };
};
