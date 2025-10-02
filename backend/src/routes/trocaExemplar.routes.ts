import { Router } from "express";
import {
  createTradeItem,
  getAllTradeItems,
  getTradeItemById,
  updateTradeItem,
  deleteTradeItem,
} from "../controllers/trocaExemplar.controller";

const router = Router();

router.post("/", createTradeItem);
router.get("/", getAllTradeItems);
router.get("/:id_troca/:id_exemplar", getTradeItemById);
router.put("/:id_troca/:id_exemplar", updateTradeItem);
router.delete("/:id_troca/:id_exemplar", deleteTradeItem);

export default router;
