import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllPublishers = async (req: Request, res: Response) => {
  try {
    const publishers = await prisma.editora.findMany();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching publishers" });
  }
};

export const getPublisherById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const publisher = await prisma.editora.findUnique({
      where: { id_editora: Number(id) },
    });
    if (!publisher) return res.status(404).json({ error: "Publisher not found" });
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Error fetching publisher" });
  }
};

export const createPublisher = async (req: Request, res: Response) => {
  const { nome_editora } = req.body;
  try {
    const publisher = await prisma.editora.create({ data: { nome_editora } });
    res.status(201).json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Error creating publisher" });
  }
};

export const updatePublisher = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome_editora } = req.body;
  try {
    const publisher = await prisma.editora.update({
      where: { id_editora: Number(id) },
      data: { nome_editora },
    });
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ error: "Error updating publisher" });
  }
};

export const deletePublisher = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.editora.delete({ where: { id_editora: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting publisher" });
  }
};
