import { Router } from "express";
import {
  getUsers,
  deleteUser,
} from "../../controllers/admin/userController";

const router = Router();


router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;