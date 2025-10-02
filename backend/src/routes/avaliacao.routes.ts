import { Router } from "express";
import {
  getAllEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
} from "../controllers/avaliacao.controller";

const router = Router();

router.get("/evaluations/", getAllEvaluations);
router.get("/evaluations/:id", getEvaluationById);
router.post("/evaluations/", createEvaluation);
router.put("/evaluations/:id", updateEvaluation);
router.delete("/evaluations/:id", deleteEvaluation);

export default router;
