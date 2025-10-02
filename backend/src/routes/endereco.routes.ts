import { Router } from "express";
import { createAddress, getAllAddresses } from "../controllers/endereco.controller";

const router = Router();

router.post("/addresses", createAddress);
router.get("/addresses", getAllAddresses);

export default router;
