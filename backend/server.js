import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import passportConfig from "./config/passport.js";

import { db } from "./config/db.js";

import routes from "./routes/index.js";
import initModels from "./config/_init_models.js";

// Load config
dotenv.config();

// Passport config`
passportConfig(passport);

try {
  db.authenticate();
  console.log("Postgres connected successfully");
} catch (error) {
  console.error("Error", error);
}

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//Session

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

//initialize or alter database

app.get("/db/force", async (req, res) => {
  await initModels()
    .then(() => {
      res.json("Database Setup Completed");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${process.env.PORT}`));
