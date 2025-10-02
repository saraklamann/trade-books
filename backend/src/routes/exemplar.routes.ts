import { Router } from "express";
import {
  getAllExemplars,
  getExemplarById,
  createExemplar,
  updateExemplar,
  deleteExemplar,
} from "../controllers/exemplar.controller";

const router = Router();

router.get("/exemplars", getAllExemplars);
router.get("/exemplars/:id", getExemplarById);
router.post("/exemplars", createExemplar);
router.put("/exemplars/:id", updateExemplar);
router.delete("/exemplars/:id", deleteExemplar);

export default router;