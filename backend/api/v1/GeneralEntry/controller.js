import asyncHandler from "express-async-handler";
import { GeneralEntry } from "./GeneralEntry.js";
import { db } from "../../../config/db.js";
import { QueryTypes } from "sequelize";

const get_all_general_entries = asyncHandler(async (req, res) => {
  await GeneralEntry.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((enteries) => {
      res.json(enteries);
    })
    .catch((err) => {
      res.send(err);
    });
});

const add_general_entry = asyncHandler(async (req, res) => {
  const {
    debit_account,
    debit_header_code,
    debit_header,
    debit_amount,
    credit_account,
    credit_header_code,
    credit_header,
    credit_amount,
  } = req.body;

  const account_type_entry = await db.query(
    `INSERT INTO "${debit_header_code}" (debit, credit) VALUES (${debit_amount}, 0);
    INSERT INTO "${credit_header_code}" (debit, credit) VALUES (0, ${credit_amount});`,
    {
      type: db.QueryTypes.INSERT,
    }
  );

  if (account_type_entry) {
    try {
      const d_entry = await GeneralEntry.create({
        account: debit_account,
        header: debit_header,
        debit: debit_amount,
        credit: 0,
      });

      const c_entry = await GeneralEntry.create({
        account: credit_account,
        header: credit_header,
        debit: 0,
        credit: credit_amount,
      });

      res.json({
        debit_entru: d_entry,
        credit_entry: c_entry,
      });
    } catch (error) {
      console.error("Error creating GeneralEntry:", error);
      res.status(500).json({ error: "Failed to create GeneralEntry" });
    }
  } else {
    res.send(`Error inserting row inside ${account_type}`);
  }
});

export { get_all_general_entries, add_general_entry };
