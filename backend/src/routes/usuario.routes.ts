import { Router } from "express";
import { createUser, getUserById, getUsers, updateUser } from "../controllers/usuario.controller";

const router = Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);

export default router;
