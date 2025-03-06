import { Request, Response } from "express";
import {
  createTodo,
  getTodosByDate,
  updateTodo,
  deleteTodo,
  markCompleted,
  unmarkCompleted,
  sendReminder
} from "../services/todo.service";

interface AuthRequest extends Request {
  userId?: string;
}

const handleRequest = async (
  req: AuthRequest,
  res: Response,
  serviceMethod: (...args: any[]) => Promise<any>,
  successMessage: string,
  ...params: any[]
) => {
  try {
    const data = await serviceMethod(...params);
    res.status(200).json({ success: true, message: successMessage, data });
  } catch (error: any) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

export const create = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    createTodo,
    "Todo created successfully",
    req.userId!,
    req.body
  );

export const getByDate = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    getTodosByDate,
    "Fetched todos by date successfully",
    req.userId!,
    req.params.date
  );

export const update = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    updateTodo,
    "Todo updated successfully",
    req.params.id,
    req.body
  );

export const remove = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    deleteTodo,
    "Todo deleted successfully",
    req.params.id
  );

export const complete = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    markCompleted,
    "Todo marked as completed",
    req.params.id
  );

export const uncomplete = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    unmarkCompleted,
    "Todo marked as incomplete",
    req.params.id
  );


export const setReminder = (req: AuthRequest, res: Response) =>
  handleRequest(
    req,
    res,
    sendReminder,
    "Reminder sent successfully",
    req.params.id
  );
