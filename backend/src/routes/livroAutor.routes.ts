import { Router } from "express";
import {
  getAllBookAuthors,
  getBookAuthorById,
  createBookAuthor,
  updateBookAuthor,
  deleteBookAuthor,
} from "../controllers/livroAutor.controller";

const router = Router();

router.get("/", getAllBookAuthors);
router.get("/:id_livro/:id_autor", getBookAuthorById);
router.post("/", createBookAuthor);
router.put("/:id_livro/:id_autor", updateBookAuthor);
router.delete("/:id_livro/:id_autor", deleteBookAuthor);

export default router;
