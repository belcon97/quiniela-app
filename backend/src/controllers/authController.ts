import { Request, Response } from "express";
import { registerService, loginService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, username } = req.body;
    const result = await registerService({ name, email, password, username });
    res.status(201).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await loginService({ username, password });
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
