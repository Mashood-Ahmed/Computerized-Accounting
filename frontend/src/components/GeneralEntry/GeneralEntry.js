import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GeneralEntryModal from "./GeneralEntryModal";

export default function GeneralEntry() {
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/entry/entries";
      try {
        const response = await axios.get(url);
        setEntries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [newEntry]);

  const getDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDateTime = dateTime.toLocaleString(undefined, options);

    return formattedDateTime;
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <GeneralEntryModal addEntry={setNewEntry} />
          <TableContainer sx={{ mt: 3 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#FFD495" }}>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Account
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Debit
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Credit
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.length > 0 ? (
                  entries.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.header}
                      </TableCell>
                      <TableCell align="right">
                        {row.debit == 0 ? "" : row.debit}
                      </TableCell>
                      <TableCell align="right">
                        {row.credit == 0 ? "" : row.credit}
                      </TableCell>

                      <TableCell align="right">
                        {getDateTime(row.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No Entries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
