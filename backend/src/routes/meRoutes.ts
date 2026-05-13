import Router from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { meGet } from "../controller/meController";
const router = Router();

router.get("/me", verifyToken, meGet);

export default router;
