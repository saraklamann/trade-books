import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getAllEvaluations = async (req: Request, res: Response) => {
  try {
    const evaluations = await prisma.avaliacao.findMany();
    res.json(evaluations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching evaluations" });
  }
};

export const getEvaluationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const evaluation = await prisma.avaliacao.findUnique({
      where: { id_avaliacao: Number(id) },
    });
    if (!evaluation) {
      return res.status(404).json({ error: "Evaluation not found" });
    }
    res.json(evaluation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching evaluation" });
  }
};

export const createEvaluation = async (req: Request, res: Response) => {
  const { id_troca, id_usuario, nota, comentario } = req.body;
  try {
    const evaluation = await prisma.avaliacao.create({
      data: {
        id_troca,
        id_usuario,
        nota,
        comentario,
      },
    });
    res.status(201).json(evaluation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating evaluation" });
  }
};

export const updateEvaluation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nota, comentario } = req.body;
  try {
    const evaluation = await prisma.avaliacao.update({
      where: { id_avaliacao: Number(id) },
      data: { nota, comentario },
    });
    res.json(evaluation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating evaluation" });
  }
};

export const deleteEvaluation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.avaliacao.delete({
      where: { id_avaliacao: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting evaluation" });
  }
};
