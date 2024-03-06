import asyncHandler from "express-async-handler";
import { GeneralEntry } from "../GeneralEntry/GeneralEntry.js";
import { db } from "../../../config/db.js";

const get_all_accounts = async (account_type, start_date, end_date) => {
  const query = `SELECT * FROM ${account_type} ;`;
  const accounts = await db.query(query);

  const all_accounts = [];
  if (accounts) {
    for (const unit of accounts[0]) {
      var debits = 0,
        credits = 0;
      const account_result = await db.query(
        `SELECT * FROM "${unit.code}" WHERE "createdat" > '${start_date}T00:00:00.000Z' AND "createdat" < '${end_date}T00:00:00.000Z';`
      );
      if (account_result[0].length > 0) {
        account_result[0].forEach((entry) => {
          debits += parseInt(entry.debit);
          credits += parseInt(entry.credit);
        });
        all_accounts.push({
          account: unit.type,
          amount: Math.abs(debits - credits),
        });
      }
    }
  }

  return all_accounts;
};

const get_total_accounts_amount = (accounts) => {
  var total_amount = 0;

  accounts.forEach((account) => {
    total_amount += account.amount;
  });

  return total_amount;
};

const generate_income_statement = asyncHandler(async (req, res) => {
  const { start_date, end_date } = req.params;

  try {
    const all_revenues = await get_all_accounts(
      "revenues",
      start_date,
      end_date
    );

    const total_revenue = get_total_accounts_amount(all_revenues);

    const all_expenses = await get_all_accounts(
      "expenses",
      start_date,
      end_date
    );

    const total_expense = get_total_accounts_amount(all_expenses);

    res.json({
      revenue: all_revenues,
      total_revenue: total_revenue,
      expense: all_expenses,
      total_expense,
    });
  } catch (err) {
    res.send(err);
  }
});

const generate_trial_balance = asyncHandler(async (req, res) => {
  try {
    const accountBalances = {};

    const entries = await GeneralEntry.findAll();

    // Calculate account balances
    entries.forEach((entry) => {
      const { header, debit, credit } = entry;

      // Determine the amount to add or subtract based on the debit or credit
      const amount = parseInt(debit) || -parseInt(credit);

      // Add or subtract the amount from the account balance
      if (accountBalances[header]) {
        accountBalances[header] += amount;
      } else {
        accountBalances[header] = amount;
      }
    });

    const trialBalance = [];

    let totalDebit = 0;
    let totalCredit = 0;

    // Format the account balances and calculate totals
    for (const account in accountBalances) {
      const balance = accountBalances[account];
      const amount = Math.abs(balance);
      const type = balance >= 0 ? "debit" : "credit";

      trialBalance.push({ account, amount, type });

      if (type === "debit") {
        totalDebit += amount;
      } else {
        totalCredit += amount;
      }
    }

    // Add the total debit and credit objects
    trialBalance.push({
      total_debit: totalDebit,
      total_credit: totalCredit,
    });

    res.json(trialBalance);
  } catch (err) {
    res.send(err);
  }
});

const generate_balance_sheet = asyncHandler(async (req, res) => {
  try {
    const entries = await GeneralEntry.findAll();

    const trialBalance = {};

    // Calculate trial balance from general entries
    for (const entry of entries) {
      const { header, debit, credit } = entry;

      if (debit !== null) {
        if (!trialBalance.hasOwnProperty(header)) {
          trialBalance[header] = 0;
        }
        trialBalance[header] += parseInt(debit);
      }

      if (credit !== null) {
        if (!trialBalance.hasOwnProperty(header)) {
          trialBalance[header] = 0;
        }
        trialBalance[header] -= parseInt(credit);
      }
    }

    // Prepare the trial balance response
    const trialBalanceResponse = Object.entries(trialBalance).map(
      ([account, balance]) => ({
        account,
        balance,
        type: balance >= 0 ? "debit" : "credit",
      })
    );

    // Calculate the total debit and credit
    const totalDebit = trialBalanceResponse
      .filter((entry) => entry.type === "debit")
      .reduce((total, entry) => total + entry.balance, 0);
    const totalCredit = trialBalanceResponse
      .filter((entry) => entry.type === "credit")
      .reduce((total, entry) => total + Math.abs(entry.balance), 0);

    // Prepare the balance sheet response
    const balanceSheet = {
      assets: { total: 0, accounts: [] },
      liabilities: { total: 0, accounts: [] },
      equity: { total: 0, accounts: [] },
    };

    // Categorize the trial balance accounts into assets, liabilities, and equity
    trialBalanceResponse.forEach((entry) => {
      const { account, balance, type } = entry;

      if (type === "debit") {
        balanceSheet.assets.accounts.push({ account, balance });
        balanceSheet.assets.total += balance;
      } else {
        balanceSheet.liabilities.accounts.push({ account, balance });
        balanceSheet.liabilities.total += Math.abs(balance);
      }
    });

    // Add the equity section to the balance sheet
    balanceSheet.equity.total = totalCredit - totalDebit;

    res.json(balanceSheet);
  } catch (err) {
    res.send(err);
  }
});

const generate_equity_statement = asyncHandler(async (req, res) => {
  try {
    const entries = await GeneralEntry.findAll();

    // Add opening balance
    const openingBalance = { account: "Owner's Equity", balance: 0 };

    let totalRevenues = 0;
    let totalExpenses = 0;

    for (const entry of entries) {
      const { account, debit, credit } = entry;

      if (account === "revenues") {
        totalRevenues += parseInt(credit);
      } else if (account === "expenses") {
        totalExpenses += parseInt(debit);
      }
    }

    // Calculate total owner's capital
    const totalOwnerCapital = totalRevenues - totalExpenses;

    // Prepare the response object
    const response = {
      opening_balance: openingBalance.balance,
      revenues: totalRevenues,
      expenses: totalExpenses,
      owner_capital: totalOwnerCapital,
    };

    res.json(response);
  } catch (err) {
    res.send(err);
  }
});

export {
  generate_income_statement,
  generate_trial_balance,
  generate_balance_sheet,
  generate_equity_statement,
};
