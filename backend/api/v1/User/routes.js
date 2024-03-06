import express from "express";
import { isAuth, admin } from "../../../middlewares/authMiddlewares.js";
import {
  getUsersByApp,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./controller.js";

const router = express.Router();

router.get("/app", getUsersByApp);
router.get("/:id", getUserById);
router.put("/:id", isAuth, updateUserById);
router.delete("/:id", isAuth, admin, deleteUserById);

export default router;
