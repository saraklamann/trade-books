import { Router } from "express";
import { createUser } from "../controllers/usuario.controller";

const router = Router();

router.post("/users", createUser);

export default router;
