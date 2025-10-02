import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await prisma.usuario.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await prisma.usuario.create({
      data: {
        nome_completo: nome,
        email,
        senha: hashedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};