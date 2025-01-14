import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../api/v1/User/User.js";

const isAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.id);

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized , token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.account_type === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { isAuth, admin };
