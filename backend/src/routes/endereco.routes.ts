import { Router } from "express";
import { createAddress, deleteAddress, getAddressById, getAllAddresses, updateAddress } from "../controllers/endereco.controller";

const router = Router();

router.post("/addresses", createAddress);
router.get("/addresses", getAllAddresses);
router.get("/addresses/:id", getAddressById);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);

export default router;
