import express from "express";
import { register, login, logout , checkAvailability } from "../controllers/authController.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/check-availability", checkAvailability); 

export default router;