import jwt from "jsonwebtoken";

// Genera un token
export const generateToken = (payload: { id: string; role: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};