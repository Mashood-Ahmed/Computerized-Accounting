import express from "express";
import { create_t_account, get_all_tables } from "./controller.js";

const router = express.Router();

router.get("/alltables", get_all_tables);
router.post("/", create_t_account);

export default router;
