import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/users.service";

const handleRequest = async (
  req: Request,
  res: Response,
  serviceMethod: (data: any) => Promise<any>,
  successMessage: string
) => {
  try {
    const data = await serviceMethod(req.body);
    res.status(200).json({
      success: true,
      message: successMessage,
      data,
    });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const register = (req: Request, res: Response) =>
  handleRequest(req, res, registerUser, "User registered successfully");

export const login = (req: Request, res: Response) =>
  handleRequest(req, res, loginUser, "User logged in successfully");
