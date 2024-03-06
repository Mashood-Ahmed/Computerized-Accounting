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

const OwnerEquityStatement = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const url =
      "http://localhost:5000/api/statement/owner_equity/2023-01-01/2023-12-31";

    const fetchData = async () => {
      const sheet_data = await axios.get(url);
      setData(sheet_data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

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
              Owner Equity Statement
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mb: 1 }}>
              For The Year Ending December 31, 2023
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Opening Capital</TableCell>
                    <TableCell align="right">
                      <strong> {data ? data.opening_balance : 0} </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Net Income</TableCell>
                    <TableCell align="right">
                      <strong> {data ? data.revenues : 0} </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Withdrawals</TableCell>
                    <TableCell align="right">
                      <strong> {data ? data.expenses : 0} </strong>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "#FFD495" }}>
                    <TableCell>Total Capital</TableCell>
                    <TableCell align="right">
                      <strong> Rs {data ? data.owner_capital : 0} </strong>
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

export default OwnerEquityStatement;
