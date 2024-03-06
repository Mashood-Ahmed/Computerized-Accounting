import React, { useState } from "react";
import IncomeStatement from "./IncomeStatement";
import TrialBalance from "./TrialBalance";
import OwnersEquityStatement from "./OwnerEquityStatement";
import BalanceSheet from "./BalanceSheet";
import { Button } from "../../assets/Button.js";

const Statements = () => {
  const [activeStatement, setActiveStatement] = useState(null);

  const data = [
    { category: "Assets", name: "Cash", amount: 10000 },
    { category: "Assets", name: "Accounts Receivable", amount: 5000 },
    { category: "Liabilities", name: "Accounts Payable", amount: 2000 },
    { category: "Equity", name: "Owner's Capital", amount: 15000 },
    { category: "Expenses", name: "Rent", amount: 1000 },
    { category: "Expenses", name: "Utilities", amount: 500 },
    { category: "Revenues", name: "Sales", amount: 5000 },
  ];

  // Function to calculate total amount for a given category
  const calculateTotal = (category) => {
    const categoryData = data.filter((item) => item.category === category);
    const total = categoryData.reduce((sum, item) => sum + item.amount, 0);
    return total;
  };

  // Calculate totals
  const revenuesTotal = calculateTotal("Revenues");
  const expensesTotal = calculateTotal("Expenses");
  const netIncome = revenuesTotal - expensesTotal;
  const assetsTotal = calculateTotal("Assets");
  const liabilitiesTotal = calculateTotal("Liabilities");
  const equityTotal = calculateTotal("Equity");

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Button
        variant="outlined"
        style={{ marginRight: "1rem" }}
        onClick={() => setActiveStatement(<IncomeStatement />)}
      >
        Income Statement
      </Button>
      <Button
        variant="outlined"
        style={{ marginRight: "1rem" }}
        onClick={() => setActiveStatement(<TrialBalance data={data} />)}
      >
        Trial Balance
      </Button>
      <Button
        variant="outlined"
        style={{ marginRight: "1rem" }}
        onClick={() =>
          setActiveStatement(
            <OwnersEquityStatement capitalTotal={equityTotal} />
          )
        }
      >
        Owner's Equity Statement
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          setActiveStatement(
            <BalanceSheet
              assetsTotal={assetsTotal}
              liabilitiesTotal={liabilitiesTotal}
              equityTotal={equityTotal}
            />
          )
        }
      >
        Balance Sheet
      </Button>
      <br />

      {activeStatement}
    </div>
  );
};

export default Statements;
