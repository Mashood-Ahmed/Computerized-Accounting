import asyncHandler from "express-async-handler";
import pino from "pino";

import {
  get_all_users,
  get_user,
  update_user,
  delete_user,
} from "./services.js";

const logger = pino();

const getUsersByApp = asyncHandler(async (req, res) => {
  await get_all_users()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

const getUserById = asyncHandler(async (req, res) => {
  const user_id = req.params.id;

  await get_user(user_id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

const updateUserById = asyncHandler(async (req, res) => {
  const user_id = req.params.id;
  const data = req.body;

  await update_user(user_id, data)
    .then((updatedUser) => {
      if (updatedUser[0] === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(updatedUser[1]);
        logger.info("User updated: " + updatedUser[1].id);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user_id = req.params.id;

  await delete_user(user_id)
    .then((deletedUser) => {
      if (deletedUser === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
        logger.info("User updated: " + deletedUser[1].id);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

export { getUsersByApp, getUserById, updateUserById, deleteUserById };
