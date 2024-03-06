import asyncHandler from "express-async-handler";
import {
  Asset,
  Equity,
  Expense,
  Liability,
  Revenue,
} from "../TablesData/Accounts.js";
import { db } from "../../../config/db.js";
import { Sequelize } from "sequelize";

const get_all_tables = asyncHandler(async (req, res) => {
  try {
    const tables = [Asset, Equity, Expense, Liability, Revenue];

    const result = await Promise.all(
      tables.map(async (table) => {
        const entries = await table.findAll({
          attributes: ["type", "code"],
        });

        const entriesWithTableContent = await Promise.all(
          entries.map(async (entry) => {
            const tableName = entry.code;
            const tableContent = await db.query(
              `SELECT * FROM "${tableName}";`,
              {
                type: db.QueryTypes.SELECT,
              }
            );

            return {
              type: entry.type,
              code: entry.code,
              content: tableContent,
            };
          })
        );

        const filteredEntries = entriesWithTableContent.filter(
          (entry) => entry.content.length > 0
        );

        return {
          table: table.name,
          entries: filteredEntries,
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const create_t_account = asyncHandler(async (req, res) => {
  try {
    const { account, header } = req.body;

    // Get the largest value from the code column
    const accountModel = getModel(account);
    const maxCode = await accountModel.max("code");

    // Remove whitespace from the header
    const cleanedHeader = header.replace(/\s+/g, "");

    // Check if the header already exists in the database (case-insensitive and whitespace removed)
    const existingAccount = await accountModel.findOne({
      where: {
        type: Sequelize.where(
          Sequelize.fn(
            "lower",
            Sequelize.fn("regexp_replace", Sequelize.col("type"), "\\s+", "")
          ),
          Sequelize.fn("lower", cleanedHeader)
        ),
      },
    });

    if (existingAccount) {
      // Account with the same header already exists
      return res.status(409).json({ error: "Account already exists" });
    }

    // Check if there are similar headers (case-insensitive and whitespace removed)
    const similarAccounts = await accountModel.findAll({
      where: Sequelize.where(
        Sequelize.fn(
          "lower",
          Sequelize.fn("regexp_replace", Sequelize.col("type"), "\\s+", "")
        ),
        "LIKE",
        `%${cleanedHeader.toLowerCase()}%`
      ),
    });

    if (similarAccounts.length > 0) {
      // Similar accounts with minor differences exist
      return res.status(409).json({ error: "Similar accounts already exist" });
    }

    // Increment the code and create a new table using that value
    const newCode = getNextCode(maxCode);
    const newTableName = `${newCode}`;

    await db.query(`
      CREATE TABLE "${newTableName}" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        debit DECIMAL,
        credit DECIMAL,
        createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert a row in the accounts table
    await accountModel.create({
      code: newCode,
      type: header,
    });

    res.json({ message: "Table created and row inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// const create_t_account = asyncHandler(async (req, res) => {
//   try {
//     const { account, header } = req.body;

//     // Get the largest value from the code column
//     const accountModel = getModel(account);
//     const maxCode = await accountModel.max("code");

//     // Increment the code and create a new table using that value
//     const newCode = getNextCode(maxCode);
//     const newTableName = `${newCode}`;

//     await db
//       .query(
//         `
//         CREATE TABLE "${newTableName}" (
//           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//           debit DECIMAL,
//           credit DECIMAL,
//           createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//       `
//       )
//       .then(async () => {
//         // Insert a row in the accounts table
//         await accountModel.create({
//           code: newCode,
//           type: header,
//         });

//         res.json({ message: "Table created and row inserted successfully" });
//       });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Helper function to get the model based on the account name
function getModel(account) {
  switch (account) {
    case "assets":
      return Asset;
    case "liabilities":
      return Liability;
    case "expenses":
      return Expense;
    case "revenues":
      return Revenue;
    case "equities":
      return Equity;
    default:
      throw new Error("Invalid account name");
  }
}

// Helper function to generate the next code value
function getNextCode(currentCode) {
  if (!currentCode) {
    return "1001";
  }

  const numericCode = parseInt(currentCode, 10);
  const nextNumericCode = numericCode + 1;
  return nextNumericCode.toString();
}

export { get_all_tables, create_t_account };
