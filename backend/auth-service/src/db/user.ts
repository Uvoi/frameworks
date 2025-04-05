import { prisma } from "../../../database/prisma/client";

export const createUser = async (username: string, email: string, password: string) => {
  return prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
