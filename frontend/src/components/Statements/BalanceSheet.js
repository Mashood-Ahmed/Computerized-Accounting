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

const BalanceSheet = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  var assets, liabilites, equities;

  useEffect(() => {
    const url =
      "http://localhost:5000/api/statement/balance_sheet/2023-01-01/2023-12-31";

    const fetchData = async () => {
      const sheet_data = await axios.get(url);
      setData(sheet_data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  assets = data ? data.assets : null;
  liabilites = data ? data.liabilities : null;
  equities = data ? data.equity : null;

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
              Balance Sheet
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mb: 1 }}>
              For The Year Ending December 31, 2023
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Assets
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  {assets ? (
                    assets.accounts.map((entry) => (
                      <TableRow>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell align="right">
                          Rs {Math.abs(entry.balance)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography varient="h6" p={2}>
                      No Assets Recorded
                    </Typography>
                  )}
                  <TableRow>
                    <TableCell>Total Assets</TableCell>
                    <TableCell align="right">
                      <strong>Rs {assets ? assets.total : 0}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Liabilites
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  {liabilites ? (
                    liabilites.accounts.map((entry) => (
                      <TableRow>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell align="right">
                          Rs {Math.abs(entry.balance)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography varient="h6" p={2}>
                      No Liabilites Recorded
                    </Typography>
                  )}
                  <TableRow>
                    <TableCell>Total Liabilties</TableCell>
                    <TableCell align="right">
                      <strong>Rs {liabilites ? liabilites.total : 0}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Equity
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table>
                <TableBody>
                  {equities ? (
                    equities.accounts.map((entry) => (
                      <TableRow>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell align="right">
                          Rs {Math.abs(entry.balance)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Typography varient="h6" p={2}>
                      No Equity Recorded
                    </Typography>
                  )}
                  <TableRow>
                    <TableCell>Total Equity</TableCell>
                    <TableCell align="right">
                      <strong>Rs {equities ? equities.total : 0}</strong>
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
                      <strong>Net Liabilities and Equity</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        Rs{" "}
                        {liabilites && equities
                          ? liabilites.total + equities.total
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

export default BalanceSheet;
