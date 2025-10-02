import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/usuario.controller";

const router = Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

export default router;
