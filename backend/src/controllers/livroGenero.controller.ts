import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllBookGenres = async (req: Request, res: Response) => {
  try {
    const bookGenres = await prisma.livroGenero.findMany({
      include: {
        livro: true,
        genero: true,
      },
    });
    res.json(bookGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book genres" });
  }
};

export const getBookGenreById = async (req: Request, res: Response) => {
  const { id_livro, id_genero } = req.params;
  try {
    const bookGenre = await prisma.livroGenero.findUnique({
      where: {
        id_livro_id_genero: {
          id_livro: Number(id_livro),
          id_genero: Number(id_genero),
        },
      },
      include: {
        livro: true,
        genero: true,
      },
    });
    if (!bookGenre) return res.status(404).json({ error: "Book genre not found" });
    res.json(bookGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book genre" });
  }
};

export const createBookGenre = async (req: Request, res: Response) => {
  const { id_livro, id_genero } = req.body;
  try {
    const newBookGenre = await prisma.livroGenero.create({
      data: {
        id_livro,
        id_genero,
      },
    });
    res.status(201).json(newBookGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating book genre" });
  }
};

export const updateBookGenre = async (req: Request, res: Response) => {
  const { id_livro_param, id_genero_param } = req.params;
  const { id_livro, id_genero } = req.body;
  try {
    const updatedBookGenre = await prisma.livroGenero.update({
      where: {
        id_livro_id_genero: {
          id_livro: Number(id_livro_param),
          id_genero: Number(id_genero_param),
        },
      },
      data: {
        id_livro,
        id_genero,
      },
    });
    res.json(updatedBookGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating book genre" });
  }
};

export const deleteBookGenre = async (req: Request, res: Response) => {
  const { id_livro, id_genero } = req.params;
  try {
    await prisma.livroGenero.delete({
      where: {
        id_livro_id_genero: {
          id_livro: Number(id_livro),
          id_genero: Number(id_genero),
        },
      },
    });
    res.json({ message: "Book genre deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting book genre" });
  }
};