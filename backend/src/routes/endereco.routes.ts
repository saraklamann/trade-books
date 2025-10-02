import { Router } from "express";
import { createAddress } from "../controllers/endereco.controller";

const router = Router();

router.post("/addresses", createAddress);

export default router;
