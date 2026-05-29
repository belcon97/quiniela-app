import { Router } from "express";
import { 
  getPrivateProfile,
  getPublicProfile,
  updateFavoriteTeam,
  markRulesAsRead,} from "../controllers/profileController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", requireAuth, getPrivateProfile);
router.get("/:username", requireAuth, getPublicProfile);
router.put("/favorite-team", requireAuth, updateFavoriteTeam);
router.patch("/rules", requireAuth, markRulesAsRead);

export default router;