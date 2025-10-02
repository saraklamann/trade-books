import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.autor.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching authors" });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const author = await prisma.autor.findUnique({
      where: { id_autor: Number(id) },
    });
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Error fetching author" });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  const { nome_autor } = req.body;
  try {
    const author = await prisma.autor.create({ data: { nome_autor } });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: "Error creating author" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome_autor } = req.body;
  try {
    const author = await prisma.autor.update({
      where: { id_autor: Number(id) },
      data: { nome_autor },
    });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Error updating author" });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.autor.delete({ where: { id_autor: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting author" });
  }
};
