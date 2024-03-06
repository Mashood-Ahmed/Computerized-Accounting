import React, { useState } from "react";
import {
  TextField,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Button } from "../../assets/Button";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const TAccountForm = ({ closeModal }) => {
  const [journalEntry, setJournalEntry] = useState({
    title: "",
    account: "",
  });

  const accountOptions = [
    { value: "revenue", label: "Revenue" },
    { value: "expense", label: "Expense" },
    { value: "assets", label: "Asset" },
    { value: "liabilities", label: "Liability" },
    { value: "equities", label: "Equity" },
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
      account: journalEntry.account,
      header: journalEntry.title,
    };

    const url = "http://localhost:5000/api/taccount/";

    try {
      const response = await axios.post(url, body);
      toast.success(response.data.message);
      closeModal();
      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Paper
        elevation={3}
        style={{ padding: "20px", backgroundColor: "#FFFBAC" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={journalEntry.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Account</InputLabel>
                <Select
                  name="account"
                  value={journalEntry.account}
                  onChange={handleChange}
                >
                  {accountOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" style={{ float: "right" }}>
                Add Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default TAccountForm;
