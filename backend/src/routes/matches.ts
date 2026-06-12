import { Router } from "express";
import {
  getMatches,
  getMatchPredictions,
} from "../controllers/matchController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", requireAuth, getMatches);
router.get("/:id/predictions", requireAuth, getMatchPredictions);

export default router;
