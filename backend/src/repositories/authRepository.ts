import prisma from "../lib/prisma";

export const findUserByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  username: string;
}) => {
  return prisma.user.create({ data });
};
