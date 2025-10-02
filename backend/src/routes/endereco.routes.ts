import { Router } from "express";
import { createAddress, getAddressById, getAllAddresses } from "../controllers/endereco.controller";

const router = Router();

router.post("/addresses", createAddress);
router.get("/addresses", getAllAddresses);
router.get("/addresses/:id", getAddressById);

export default router;
