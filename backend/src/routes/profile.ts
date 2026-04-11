import { Router } from "express";
import {
  getPrivateProfile,
  getPublicProfile,
} from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getPrivateProfile);
router.get("/:username", getPublicProfile);

export default router;
