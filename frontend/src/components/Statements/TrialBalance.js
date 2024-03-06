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

const TrialBalance = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  var [net_debit, setNetDebit] = useState(0);
  var [net_credit, setNetCredit] = useState(0);

  useEffect(() => {
    const url =
      "http://localhost:5000/api/statement/trial_balance/2023-01-01/2023-12-31";

    const fetchData = async () => {
      const trial_balance_data = await axios.get(url);
      setData(trial_balance_data.data.slice(0, -1));
      const size = trial_balance_data.data.length - 1;
      setNetDebit(trial_balance_data.data[size].total_debit);
      setNetCredit(trial_balance_data.data[size].total_credit);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" align="center" sx={{ mb: 1 }}>
              Company ABC
            </Typography>
            <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
              Trial Balance
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mb: 1 }}>
              For The Year Ending December 31, 2023
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#FFD495" }}>
                    <TableCell>
                      <b>Account</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Debit</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Credit</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.account}</TableCell>
                      <TableCell align="right">
                        <strong>
                          {item.type === "debit" ? item.amount : ""}
                        </strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>
                          {item.type === "credit" ? item.amount : ""}
                        </strong>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      <strong>Rs. {net_debit}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Rs. {net_credit}</strong>
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

export default TrialBalance;
