import { Router } from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genero.controller";

const router = Router();

router.get("/genres/", getAllGenres);
router.get("/genres/:id", getGenreById);
router.post("/genres/", createGenre);
router.put("/genres/:id", updateGenre);
router.delete("/genres/:id", deleteGenre);

export default router;
