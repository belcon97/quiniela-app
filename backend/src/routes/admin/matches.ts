import { Router } from "express";
import {
  createMatch,
  getMatches,
  updateMatch,
  updateMatchScore,
  deleteMatch,
} from "../../controllers/admin/matchController";

const router = Router();

router.post("/", createMatch);
router.get("/", getMatches);
router.put("/:id", updateMatch);
router.patch("/:id/score", updateMatchScore);
router.delete("/:id", deleteMatch);

export default router;