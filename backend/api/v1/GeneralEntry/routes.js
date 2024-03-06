import express from "express";
import { get_all_general_entries, add_general_entry } from "./controller.js";

const router = express.Router();

router.get("/entries", get_all_general_entries);
router.post("/", add_general_entry);

export default router;
