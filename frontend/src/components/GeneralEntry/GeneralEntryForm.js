import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  TextField,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { Button } from "../../assets/Button";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneralEntryForm = ({ closeModal, entryAdded }) => {
  const [headerOptions, setHeaderOptions] = useState([]);
  const [journalEntry, setJournalEntry] = useState({
    d_account: "",
    d_header: "",
    d_code: "",
    d_amount: "",
    c_account: "",
    c_header: "",
    c_code: "",
    c_amount: "",
  });

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/table/tables";
      try {
        const response = await axios.get(url);
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const options = accounts.map(({ account, headers }) => ({
      account: account,
      tables: headers.map((header) => ({
        value: header.type,
        code: header.code,
        label: header.type,
      })),
    }));

    setHeaderOptions(options);
  }, [accounts]);

  const debitOptions = [
    { value: "expenses", label: "Expense" },
    { value: "assets", label: "Assets" },
    { value: "liabilities", label: "Liabilities" },
    { value: "equity", label: "Equity" },
  ];

  const creditOptions = [
    { value: "revenues", label: "Revenue" },
    { value: "assets", label: "Assets" },
    { value: "liabilities", label: "Liabilities" },
    { value: "equity", label: "Equity" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournalEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      debit_account: journalEntry.d_account,
      debit_header_code: journalEntry.d_code,
      debit_header: journalEntry.d_header,
      debit_amount: journalEntry.d_amount,
      credit_account: journalEntry.c_account,
      credit_header_code: journalEntry.c_code,
      credit_header: journalEntry.c_header,
      credit_amount: journalEntry.c_amount,
    };

    const url = "http://localhost:5000/api/entry/";

    try {
      const response = await axios.post(url, body);
      toast.success("Entry added successfully.");
      entryAdded(response);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }

    console.log(body);

    closeModal();
  };

  const isHeaderDisabled = !journalEntry.d_account;

  return (
    <>
      <ToastContainer />
      <Paper
        elevation={3}
        style={{ padding: "20px", backgroundColor: "#FFFBAC" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Typography variant="h6" mt={3} p={1}>
              Debit
            </Typography>
            <Grid container spacing={1} p={1}>
              <Grid item xs={4}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Account</InputLabel>
                  <Select
                    name={"d_account"}
                    value={journalEntry.d_account}
                    onChange={handleChange}
                    required
                  >
                    {debitOptions.map((option) => (
                      <MenuItem key={option.code} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Header</InputLabel>
                  <Select
                    name="d_header"
                    value={journalEntry.d_header}
                    onChange={(e) => {
                      const selectedOption = headerOptions
                        .find(
                          (option) => option.account === journalEntry.d_account
                        )
                        ?.tables.find(
                          (option) => option.value === e.target.value
                        );
                      setJournalEntry((prevEntry) => ({
                        ...prevEntry,
                        d_header: e.target.value,
                        d_code: selectedOption.code,
                      }));
                    }}
                    required
                    disabled={isHeaderDisabled}
                  >
                    {headerOptions ? (
                      headerOptions
                        .find(
                          (option) => option.account === journalEntry.d_account
                        )
                        ?.tables.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            dataCode={option.code}
                          >
                            {option.label}
                          </MenuItem>
                        ))
                    ) : (
                      <MenuItem disabled>No Accounts</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="d_amount"
                  label="Amuont"
                  fullWidth
                  required
                  value={journalEntry.d_amount}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" mt={3} p={1}>
              Credit
            </Typography>
            <Grid container spacing={1} p={1}>
              <Grid item xs={4}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Account</InputLabel>
                  <Select
                    name={"c_account"}
                    value={journalEntry.c_account}
                    onChange={handleChange}
                    required
                  >
                    {creditOptions.map((option) => (
                      <MenuItem key={option.code} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Header</InputLabel>
                  <Select
                    name="c_header"
                    value={journalEntry.c_header}
                    onChange={(e) => {
                      const selectedOption = headerOptions
                        .find(
                          (option) => option.account === journalEntry.c_account
                        )
                        ?.tables.find(
                          (option) => option.value === e.target.value
                        );
                      setJournalEntry((prevEntry) => ({
                        ...prevEntry,
                        c_header: e.target.value,
                        c_code: selectedOption.code,
                      }));
                    }}
                    required
                    disabled={isHeaderDisabled}
                  >
                    {headerOptions ? (
                      headerOptions
                        .find(
                          (option) => option.account === journalEntry.c_account
                        )
                        ?.tables.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            dataCode={option.code}
                          >
                            {option.label}
                          </MenuItem>
                        ))
                    ) : (
                      <MenuItem disabled>No Accounts</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="c_amount"
                  label="Amuont"
                  fullWidth
                  required
                  value={journalEntry.c_amount}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" style={{ float: "right" }}>
                Add Entry
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default GeneralEntryForm;
