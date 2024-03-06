import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TAccountTable = ({ table }) => {
  const { type, content } = table;

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={2}
              style={{
                fontWeight: "bold",
                backgroundColor: "#FFD56F",
                color: "#fff",
              }}
            >
              {type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="center"
              style={{ fontWeight: "bold", backgroundColor: "#FFFBAC" }}
            >
              Debit
            </TableCell>
            <TableCell
              align="center"
              style={{ fontWeight: "bold", backgroundColor: "#FFFBAC" }}
            >
              Credit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((entry, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {entry.debit == 0 ? "" : entry.debit}
              </TableCell>
              <TableCell align="center">
                {entry.credit == 0 ? "" : entry.credit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TAccountTable;
