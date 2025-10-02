import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllExemplars = async (req: Request, res: Response) => {
  try {
    const exemplars = await prisma.exemplar.findMany({
      include: {
        livro: true,
        usuario: true,
      },
    });
    res.json(exemplars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching exemplars" });
  }
};

export const getExemplarById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exemplar = await prisma.exemplar.findUnique({
      where: { id_exemplar: Number(id) },
      include: {
        livro: true,
        usuario: true,
      },
    });
    if (!exemplar) return res.status(404).json({ error: "Exemplar not found" });
    res.json(exemplar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching exemplar" });
  }
};

export const createExemplar = async (req: Request, res: Response) => {
  const { id_livro, id_usuario, estado_conservacao, status } = req.body;
  try {
    const exemplar = await prisma.exemplar.create({
      data: { id_livro, id_usuario, estado_conservacao, status },
    });
    res.status(201).json(exemplar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating exemplar" });
  }
};

export const updateExemplar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_livro, id_usuario, estado_conservacao, status } = req.body;
  try {
    const exemplar = await prisma.exemplar.update({
      where: { id_exemplar: Number(id) },
      data: { id_livro, id_usuario, estado_conservacao, status },
    });
    res.json(exemplar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating exemplar" });
  }
};

export const deleteExemplar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.exemplar.delete({ where: { id_exemplar: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting exemplar" });
  }
};
