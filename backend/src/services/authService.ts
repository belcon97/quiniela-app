import bcrypt from "bcrypt";
import { findUserByUsername, createUser } from "../repositories/authRepository";
// Utils
import { generateToken } from "../utils/generateToken";

export const registerService = async (data: {
  name: string;
  password: string;
  username: string;
}) => {
  const { name, password, username } = data;

  // Password minimo 6 caracteres
  if (password.length < 6) {
    throw {
      status: 400,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  // Username unico
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw { status: 400, message: "El usuario ya existe" };
  }

  // Hashear password antes de guardar
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ name, username, password: hashedPassword });

  // Generar token para que el usuario quede logueado automaticamente
  const token = generateToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
    message: `Usuario ${user.username} registrado correctamente!`,
    token,
  };
};

export const loginService = async (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;

  // Verificar que el usuario existe
  const user = await findUserByUsername(username);
  if (!user) {
    throw { status: 400, message: "No existe el usuario" };
  }

  // Verificar que tiene password
  if (!user.password) {
    throw {
      status: 400,
      message: "Este usuario no tiene contraseña configurada",
    };
  }

  // Verificar que el password sea correcto
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 400, message: "Contraseña incorrecta" };
  }

  // Generar token
  const token = generateToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
    message: `Bienvenido ${user.username}!`,
    token,
  };
};
