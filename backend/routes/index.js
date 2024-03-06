import express from "express";

import { login, signup } from "../api/v1/auth/controller.js";
import userRoutes from "../api/v1/User/routes.js";
import tableRoutes from "../api/v1/TablesData/routes.js";
import tAccountRoutes from "../api/v1/TAccount/routes.js";
import statementRoutes from "../api/v1/Statements/routes.js";
import generalEntryRoutes from "../api/v1/GeneralEntry/routes.js";

const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.post("/login", login);
router.post("/register", signup);

router.use("/user", userRoutes);
router.use("/entry", generalEntryRoutes);
router.use("/table/", tableRoutes);
router.use("/taccount/", tAccountRoutes);
router.use("/statement/", statementRoutes);

export default router;
