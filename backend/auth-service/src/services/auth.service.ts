import { createUser, getUserByEmail } from "../db/user";

export const createUserInDB = async (username: string, email: string, password: string) => {
  return createUser(username, email, password);
};

export const findUserByEmail = async (email: string) => {
  return getUserByEmail(email);
};
