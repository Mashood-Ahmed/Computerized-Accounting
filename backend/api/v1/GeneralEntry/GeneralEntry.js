import { Sequelize, DataTypes } from "sequelize";
import { db } from "../../../config/db.js";

const GeneralEntry = db.define("general_entry", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  account: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  header: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  debit: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  credit: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export { GeneralEntry };
