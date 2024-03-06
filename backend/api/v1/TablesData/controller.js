import asyncHandler from "express-async-handler";
import { Asset, Equity, Expense, Liability, Revenue } from "./Accounts.js";
import { Sequelize } from "sequelize";

const get_all_account_and_headers = asyncHandler(async (req, res) => {
  try {
    const tables = [Asset, Equity, Expense, Liability, Revenue];

    const result = tables.map(async (table) => {
      const entries = await table.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["code", "DESC"]],
      });
      return { table: table.name, entries };
    });

    const data = await Promise.all(result);
    const formattedResponse = data.map((account) => ({
      account: account.table,
      headers: account.entries.map((entry) => entry.toJSON()),
    }));

    res.json(formattedResponse); // Send formattedResponse instead of data
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { get_all_account_and_headers };
