import { Request, Response } from "express";
import {
  getUsersService,
  deleteUserService,
} from "../../services/admin/userService";

// Listar todos los usuarios
export const getUsers = async (res: Response) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const adminId = req.userId as string;

    const result = await deleteUserService(id, adminId);
    res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
  }
};