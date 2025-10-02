import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllBookAuthors = async (req: Request, res: Response) => {
  try {
    const bookAuthors = await prisma.livroAutor.findMany({
      include: {
        livro: true,
        autor: true,
      },
    });
    res.json(bookAuthors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book authors" });
  }
};

export const getBookAuthorById = async (req: Request, res: Response) => {
  const { id_livro, id_autor } = req.params;
  try {
    const bookAuthor = await prisma.livroAutor.findUnique({
      where: {
        id_livro_id_autor: {
          id_livro: Number(id_livro),
          id_autor: Number(id_autor),
        },
      },
      include: {
        livro: true,
        autor: true,
      },
    });
    if (!bookAuthor) return res.status(404).json({ error: "BookAuthor not found" });
    res.json(bookAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching book author" });
  }
};

export const createBookAuthor = async (req: Request, res: Response) => {
  const { id_livro, id_autor } = req.body;
  try {
    const bookAuthor = await prisma.livroAutor.create({
      data: {
        id_livro,
        id_autor,
      },
    });
    res.status(201).json(bookAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating book author" });
  }
};

export const updateBookAuthor = async (req: Request, res: Response) => {
  const { id_livro, id_autor } = req.params;
  const { newIdLivro, newIdAutor } = req.body;
  try {
    const updated = await prisma.livroAutor.update({
      where: {
        id_livro_id_autor: {
          id_livro: Number(id_livro),
          id_autor: Number(id_autor),
        },
      },
      data: {
        id_livro: newIdLivro,
        id_autor: newIdAutor,
      },
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating book author" });
  }
};

export const deleteBookAuthor = async (req: Request, res: Response) => {
  const { id_livro, id_autor } = req.params;
  try {
    await prisma.livroAutor.delete({
      where: {
        id_livro_id_autor: {
          id_livro: Number(id_livro),
          id_autor: Number(id_autor),
        },
      },
    });
    res.json({ message: "BookAuthor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting book author" });
  }
};
