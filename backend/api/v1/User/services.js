import asyncHandler from "express-async-handler";
import { User } from "./User.js";

const get_all_users = async () => {
  const users = await User.findAll();
  return users;
};

const get_user = async (user_id) => {
  const users = await User.findByPk(user_id);
  return users;
};

const update_user = async (user_id, data) => {
  const updatedUser = await User.update(data, {
    where: { id: user_id },
    returning: true,
    plain: true,
  });

  return updatedUser;
};

const delete_user = async (user_id, data) => {
  const deleteUser = await User.destroy({
    where: { id: user_id },
  });
  return deleteUser;
};

export { get_all_users, get_user, update_user, delete_user };
