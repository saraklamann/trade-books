import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome_completo, email, senha } = req.body;

    if (!nome_completo || !email || !senha) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await prisma.usuario.create({
      data: {
        nome_completo,
        email,
        senha,
      },
    });

    return res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
