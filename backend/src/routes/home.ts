import { Router } from "express";
import { getHome } from "../controllers/homeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getHome);

export default router;
