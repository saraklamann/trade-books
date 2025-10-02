import { Router } from "express";
import { createAddress, getAddressById, getAllAddresses, updateAddress } from "../controllers/endereco.controller";

const router = Router();

router.post("/addresses", createAddress);
router.get("/addresses", getAllAddresses);
router.get("/addresses/:id", getAddressById);
router.put("/addresses/:id", updateAddress);

export default router;
