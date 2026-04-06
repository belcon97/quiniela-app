import { Router } from "express";
import {
  createMatch,
  getMatches,
  updateMatch,
} from "../controllers/matchController";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, isAdmin, createMatch);
router.get("/", getMatches);
router.patch("/:id", authMiddleware, isAdmin, updateMatch);

export default router;
