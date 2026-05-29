import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Verificar el token y el Rol
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Usuario no autorizado",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; role: string };
    
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
};

// Verifica si el usuario es admin
const checkAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

export const requireAdmin = [requireAuth, checkAdminRole];