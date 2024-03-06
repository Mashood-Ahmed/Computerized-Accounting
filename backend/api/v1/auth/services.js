import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";
import generateToken from "../../../utils/generateToken.js";

import { Op } from "sequelize";

import { User } from "../User/User.js";

const registerUser = asyncHandler(
  async (
    full_name,
    email,
    phone_number,
    password,
    gender,
    DOB,
    account_type
  ) => {
    const userExist = await User.findOne({
      where: { [Op.or]: [{ email }, { phone_number }] },
    });
    if (!userExist) {
      const user = await User.create({
        full_name,
        email,
        phone_number,
        password,
        gender,
        DOB,
        account_type,
      });

      return user;
    } else {
      const res = {
        message: "Account with email or phone number already exist",
      };
      return res;
    }
  }
);

const loginUser = asyncHandler(async (email, password) => {
  const user = await User.findOne({ where: { email } });
  //console.log(user);

  if (user) {
    const validatePassword = await bcrypt.compare(password, user.password);
    if (validatePassword) {
      const userInfo = {
        id: user.id,
        full_name: user.name,
        email: user.email,
        password: user.password,
        phone_number: user.phone_number,
        dob: user.DOB,
        gender: user.gender,
        account_type: user.account_type,
        token: generateToken(user.id),
      };
      return userInfo;
    } else {
      return { message: "Invalid password" };
    }
  } else {
    return { message: "Invalid email" };
  }
});

export { registerUser, loginUser };
