import { Router } from "express";
import {
  getAllBookPublishers,
  getBookPublisherById,
  createBookPublisher,
  updateBookPublisher,
  deleteBookPublisher,
} from "../controllers/livroEditora.controller";

const router = Router();

router.get("/", getAllBookPublishers);
router.get("/:id", getBookPublisherById);
router.post("/", createBookPublisher);
router.put("/:id_livro_param/:id_editora_param", updateBookPublisher);
router.delete("/:id_livro/:id_editora", deleteBookPublisher);

export default router;