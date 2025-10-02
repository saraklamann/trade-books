import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.livro.findMany({
    //   include: {
    //     autores: true,
    //     generos: true,
    //     editoras: true,
    //     exemplares: true,
    //   },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.livro.findUnique({
      where: { id_livro: Number(id) },
    //   include: {
    //     autores: true,
    //     generos: true,
    //     editoras: true,
    //     exemplares: true,
    //   },
    });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error fetching book" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { titulo, isbn, ano_publicacao } = req.body;
    const book = await prisma.livro.create({
      data: { titulo, isbn, ano_publicacao: Number(ano_publicacao) },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error creating book" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, isbn, ano_publicacao } = req.body;

    const book = await prisma.livro.update({
      where: { id_livro: Number(id) },
      data: { titulo, isbn, ano_publicacao: Number(ano_publicacao) },
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Error updating book" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.livro.delete({ where: { id_livro: Number(id) } });
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting book" });
  }
};
