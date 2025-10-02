import { Router } from "express";
import {
  getAllBookGenres,
  getBookGenreById,
  createBookGenre,
  updateBookGenre,
  deleteBookGenre,
} from "../controllers/livroGenero.controller";

const router = Router();

router.get("/", getAllBookGenres);
router.get("/:id_livro/:id_genero", getBookGenreById);
router.post("/", createBookGenre);
router.put("/:id_livro_param/:id_genero_param", updateBookGenre);
router.delete("/:id_livro/:id_genero", deleteBookGenre);

export default router;
