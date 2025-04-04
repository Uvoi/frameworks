import { Request, Response } from "express";
import { createUserInDB, findUserByEmail } from "../services/auth.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body; 

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await createUserInDB(username, email, hashed);
    // res.status(200).json({ user });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.json({ token });


  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      // P2002 — уникальный конфликт
      return res.status(409).json({ message: "Пользователь с таким email уже существует" });
    }

    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
