import prisma from "../lib/prisma";

// Busca un usuario por username
export const findUserByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

// Crea un usuario nuevo
export const createUser = async (data: {
  name: string;
  password: string;
  username: string;
}) => {
  return prisma.user.create({ data });
};
