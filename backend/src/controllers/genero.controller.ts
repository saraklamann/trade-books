import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await prisma.genero.findMany();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "Error fetching genres" });
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const genre = await prisma.genero.findUnique({
      where: { id_genero: Number(id) },
    });
    if (!genre) return res.status(404).json({ error: "Genre not found" });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: "Error fetching genre" });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  const { nome_genero } = req.body;
  try {
    const genre = await prisma.genero.create({ data: { nome_genero } });
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Error creating genre" });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome_genero } = req.body;
  try {
    const genre = await prisma.genero.update({
      where: { id_genero: Number(id) },
      data: { nome_genero },
    });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: "Error updating genre" });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.genero.delete({ where: { id_genero: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting genre" });
  }
};
