import express from "express";

import { get_all_account_and_headers } from "./controller.js";

const router = express.Router();

router.get("/tables", get_all_account_and_headers);

export default router;
