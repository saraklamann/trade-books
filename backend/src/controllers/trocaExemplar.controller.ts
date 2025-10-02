import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createTradeItem = async (req: Request, res: Response) => {
  try {
    const { id_troca, id_exemplar } = req.body;

    const tradeItem = await prisma.trocaExemplar.create({
      data: {
        id_troca,
        id_exemplar,
      },
    });

    res.status(201).json(tradeItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating trade item" });
  }
};

export const getAllTradeItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.trocaExemplar.findMany();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching trade items" });
  }
};

export const getTradeItemById = async (req: Request, res: Response) => {
  const { id_troca, id_exemplar } = req.params;

  try {
    const item = await prisma.trocaExemplar.findUnique({
      where: {
        id_troca_id_exemplar: {
          id_troca: Number(id_troca),
          id_exemplar: Number(id_exemplar),
        },
      },
    });

    if (!item) return res.status(404).json({ error: "Trade item not found" });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching trade item" });
  }
};

export const updateTradeItem = async (req: Request, res: Response) => {
  const { id_troca, id_exemplar } = req.params;
  const { newIdTroca, newIdExemplar } = req.body;

  try {
    const updated = await prisma.trocaExemplar.update({
      where: {
        id_troca_id_exemplar: {
          id_troca: Number(id_troca),
          id_exemplar: Number(id_exemplar),
        },
      },
      data: {
        id_troca: newIdTroca,
        id_exemplar: newIdExemplar,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating trade item" });
  }
};

export const deleteTradeItem = async (req: Request, res: Response) => {
  const { id_troca, id_exemplar } = req.params;

  try {
    await prisma.trocaExemplar.delete({
      where: {
        id_troca_id_exemplar: {
          id_troca: Number(id_troca),
          id_exemplar: Number(id_exemplar),
        },
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting trade item" });
  }
};
