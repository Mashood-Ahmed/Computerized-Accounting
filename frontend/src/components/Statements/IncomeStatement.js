import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const IncomeStatement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  var revenues, expenses;

  useEffect(() => {
    const url =
      "http://localhost:5000/api/statement/income/2023-01-01/2023-12-31";

    const fetchData = async () => {
      const income_data = await axios.get(url);
      setData(income_data);
      setLoading(false);
    };

    fetchData();
  }, []);

  revenues = data.data ? data.data.revenue : null;
  expenses = data.data ? data.data.expense : null;

  return (
    <>
      {loading ? (
        "Loading...."
      ) : (
        <div>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 1 }}>
              Company ABC
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
              Income Statement
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mb: 1 }}>
              For The Year Ending December 31, 2023
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Revenue
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  {revenues ? (
                    revenues.map((entry) => (
                      <TableRow>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell align="right">Rs {entry.amount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography varient="h6">No Revenues Recorded</Typography>
                  )}
                  <TableRow>
                    <TableCell>Total Revenue</TableCell>
                    <TableCell align="right">
                      <strong>
                        Rs {data.data ? data.data.total_revenue : 0}
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Expenses
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  {expenses ? (
                    expenses.map((entry) => (
                      <TableRow>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell align="right">Rs {entry.amount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography varient="h6">No Expenses Recorded</Typography>
                  )}
                  <TableRow>
                    <TableCell>Total Expense</TableCell>
                    <TableCell align="right">
                      <strong>
                        Rs {data.data ? data.data.total_expense : 0}
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Net Income</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        Rs{" "}
                        {data.data
                          ? data.data.total_revenue - data.data.total_expense
                          : 0}
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )}
    </>
  );
};

export default IncomeStatement;
