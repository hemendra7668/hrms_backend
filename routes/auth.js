import express from "express";
import { login, verify } from "../controller/authcontrol.js";
import Authmiddleware from '../middleware/authmiddleware.js';
import userRegister from "../userseed.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", userRegister);
router.get("/verify", Authmiddleware, verify);

export default router;
