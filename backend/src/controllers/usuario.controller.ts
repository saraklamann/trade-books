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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.usuario.findMany({
      orderBy: { id_usuario: "asc" },
    });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome_completo, email, senha } = req.body;

    const user = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: {
        nome_completo,
        email,
        senha,
      },
    });

    return res.json(user);
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: { id_usuario: Number(id) },
    });

    return res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(500).json({ error: "Error deleting user" });
  }
};