import { Router } from "express";
import { getMatches } from "../controllers/matchController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", requireAuth, getMatches);

export default router;