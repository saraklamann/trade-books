import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllTrades = async (req: Request, res: Response) => {
  try {
    const trades = await prisma.troca.findMany({
      include: { exemplares: true, avaliacoes: true, solicitante: true }
    });
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching trades" });
  }
};

export const getTradeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const trade = await prisma.troca.findUnique({
      where: { id_troca: Number(id) },
      include: { exemplares: true, avaliacoes: true, solicitante: true }
    });
    if (!trade) return res.status(404).json({ error: "Trade not found" });
    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching trade" });
  }
};

export const createTrade = async (req: Request, res: Response) => {
  const { id_solicitante, status_troca } = req.body;
  try {
    const trade = await prisma.troca.create({
      data: { id_solicitante, status_troca }
    });
    res.status(201).json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating trade" });
  }
};

export const updateTrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status_troca, data_confirmacao } = req.body;
  try {
    const trade = await prisma.troca.update({
      where: { id_troca: Number(id) },
      data: { status_troca, data_confirmacao }
    });
    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating trade" });
  }
};

export const deleteTrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.troca.delete({ where: { id_troca: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting trade" });
  }
};
