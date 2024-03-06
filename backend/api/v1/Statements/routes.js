import express from "express";
import { isAuth, admin } from "../../../middlewares/authMiddlewares.js";
import {
  generate_balance_sheet,
  generate_income_statement,
  generate_trial_balance,
  generate_equity_statement,
} from "./controller.js";

const router = express.Router();

router.get("/income/:start_date/:end_date", generate_income_statement);
router.get("/trial_balance/:start_date/:end_date", generate_trial_balance);
router.get("/balance_sheet/:start_date/:end_date", generate_balance_sheet);
router.get("/owner_equity/:start_date/:end_date", generate_equity_statement);

export default router;
