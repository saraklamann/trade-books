import { Router } from "express";
import {
  getAllTrades,
  getTradeById,
  createTrade,
  updateTrade,
  deleteTrade
} from "../controllers/troca.controller";

const router = Router();

router.get("/trades/", getAllTrades);
router.get("/trades/:id", getTradeById);
router.post("/trades/", createTrade);
router.put("/trades/:id", updateTrade);
router.delete("/trades/:id", deleteTrade);

export default router;
