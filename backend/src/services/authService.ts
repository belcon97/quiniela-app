import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByUsername,
  findUserByEmail,
  createUser,
} from "../repositories/authRepository";

export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
  username: string;
}) => {
  const { name, email, password, username } = data;

  // Validaciones
  if (!name || !email || !password || !username) {
    throw { status: 400, message: "Todos los campos son obligatorios" };
  }
  if (password.length < 6) {
    throw {
      status: 400,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw { status: 400, message: "El email no es válido" };
  }

  // Verificar que no exista
  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    throw { status: 400, message: "El usuario ya existe" };
  }

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw { status: 400, message: "El email ya existe" };
  }

  // Encriptar y crear
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    username,
  });

  // Generar token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );

  return {
    message: `Usuario ${user.username} registrado correctamente!`,
    token,
  };
};

export const loginService = async (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;

  // Validaciones
  if (!username || !password) {
    throw { status: 400, message: "Todos los campos son obligatorios" };
  }

  // Buscar usuario
  const user = await findUserByUsername(username);
  if (!user) {
    throw { status: 400, message: "No existe el usuario" };
  }

  // Verificar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 400, message: "Contraseña incorrecta" };
  }

  // Generar token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    message: `Bienvenido ${user.username}!`,
    token,
  };
};
