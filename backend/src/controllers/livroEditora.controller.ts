import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllBookPublishers = async (req: Request, res: Response) => {
  try {
    const bookPublishers = await prisma.livroEditora.findMany({
      include: {
        livro: true,
        editora: true,
      },
    });
    res.json(bookPublishers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book publishers" });
  }
};

export const getBookPublisherById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const bookPublisher = await prisma.livroEditora.findUnique({
      where: { id_livro_id_editora: { id_livro: id, id_editora: id } },
      include: { livro: true, editora: true },
    });
    if (!bookPublisher) return res.status(404).json({ error: "Not found" });
    res.json(bookPublisher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book publisher" });
  }
};

export const createBookPublisher = async (req: Request, res: Response) => {
  const { id_livro, id_editora } = req.body;
  try {
    const newBookPublisher = await prisma.livroEditora.create({
      data: { id_livro, id_editora },
    });
    res.status(201).json(newBookPublisher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating book publisher" });
  }
};

export const updateBookPublisher = async (req: Request, res: Response) => {
  const { id_livro, id_editora } = req.body;
  const { id_livro_param, id_editora_param } = req.params;

  try {
    const updated = await prisma.livroEditora.update({
      where: { id_livro_id_editora: { id_livro: Number(id_livro_param), id_editora: Number(id_editora_param) } },
      data: { id_livro, id_editora },
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating book publisher" });
  }
};

export const deleteBookPublisher = async (req: Request, res: Response) => {
  const { id_livro, id_editora } = req.params;
  try {
    await prisma.livroEditora.delete({
      where: { id_livro_id_editora: { id_livro: Number(id_livro), id_editora: Number(id_editora) } },
    });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting book publisher" });
  }
};