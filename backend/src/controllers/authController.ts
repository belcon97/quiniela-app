import { Request, Response } from "express";
import { registerService, loginService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    // Validar que lleguen todos los campos
    const { name, password, username } = req.body;
    if (!name || !password || !username) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const result = await registerService({ name, password, username });
    res.status(201).json(result);
  } catch (error: any) {
    // Sino es un error inesperado (500)
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validar quelleguen todos los campos
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const result = await loginService({ username, password });
    res.status(200).json(result);
  } catch (error: any) {
    // Sino es un error inesperado (500)
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};
