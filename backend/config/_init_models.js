import { db } from "./db.js";
import { User } from "../api/v1/User/User.js";

//all models

const initModels = async () => {
  await User.sync({ alter: true });
  await db.sync({ alter: true });
};

export default initModels;
