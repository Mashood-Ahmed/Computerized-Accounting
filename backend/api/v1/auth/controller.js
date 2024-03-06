import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import pino from "pino";

const logger = pino();

import { registerUser, loginUser } from "./services.js";

const signup = asyncHandler(async (req, res) => {
  const { body } = req;
  if (
    !(
      body.email &&
      body.password &&
      body.phone_number &&
      body.full_name &&
      body.gender &&
      body.dob &&
      body.account_type
    )
  ) {
    return res.status(400).send("All inputs are required");
  }

  try {
    var hashed_password = await bcrypt.hash(body.password, 10);
  } catch (e) {
    return res.status(500).send(e.message);
  }

  await registerUser(
    body.full_name,
    body.email,
    body.phone_number,
    hashed_password,
    body.gender,
    body.dob,
    body.account_type
  )
    .then((user) => {
      logger.info("User " + user.id + " Created");
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error Creating User", error: error });
    });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);
  const user = await loginUser(email, password);
  if (user) {
    logger.info("User " + user.id + " Logged In");
    res.json(user);
  } else {
    res.send("Error while logging in user");
  }
});

export { login, signup };
