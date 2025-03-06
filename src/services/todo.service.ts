import Todo from "../models/Todo";
import User from "../models/User";
import { sendReminderEmail } from "../utils/emailService";
interface TodoPayload {
  title: string;
  description?: string;
  dueDate?: Date;
}

const findUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User does not exist");
  return user;
};

export const createTodo = async (userId: string, payload: TodoPayload) => {
  await findUserById(userId);
  const newTodo = new Todo({ userId, ...payload });
  return await newTodo.save();
};

export const getTodosByDate = async (userId: string, date: string) => {
  const start = new Date(date);
  const end = new Date(start.getTime() + 86400000);

  const todos = await Todo.find({ userId, dueDate: { $gte: start, $lt: end } });
  if (!todos.length) throw new Error("No todos found for the given date");
  return todos;
};

export const updateTodo = async (id: string, updates: Partial<TodoPayload>) => {
  const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true });
  if (!updatedTodo) throw new Error("Todo not found");
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) throw new Error("Todo not found or already deleted");
  return deletedTodo;
};

export const markCompleted = async (id: string) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { completed: true },
    { new: true }
  );
  if (!updatedTodo) throw new Error("Todo not found");
  return updatedTodo;
};

export const unmarkCompleted = async (id: string) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { completed: false },
    { new: true }
  );
  if (!updatedTodo) throw new Error("Todo not found");
  return updatedTodo;
};

export const sendReminder = async (todoId: string) => {
  const todo = await Todo.findById(todoId);
  if (!todo) throw new Error("Todo not found");

  const user = await User.findById(todo.userId);
  if (!user || !user.email) throw new Error("User email not found");

  await sendReminderEmail(user.email, "Todo Reminder", `Reminder: "${todo.title}" is due on ${todo.dueDate}`);
  return { message: "Reminder email sent successfully!" };
};
