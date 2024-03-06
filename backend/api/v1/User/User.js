import { Sequelize, DataTypes } from "sequelize";
import { db } from "../../../config/db.js";

const User = db.define("users", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: "email",
  },
  phone_number: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("M", "F"),
    allowNull: false,
  },
  DOB: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  account_type: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
});

//await User.sync({ alter: true });
//await db.sync({ alter: true });

export { User };
