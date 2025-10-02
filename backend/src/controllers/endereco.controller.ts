import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createAddress = async (req: Request, res: Response) => {
  try {
    const { id_usuario, estado, cidade, bairro, rua, numero, complemento, cep } = req.body;

    const address = await prisma.endereco.create({
      data: {
        id_usuario,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
        cep,
      },
    });

    return res.status(201).json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating address" });
  }
};
