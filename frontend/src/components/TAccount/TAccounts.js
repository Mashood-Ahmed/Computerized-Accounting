import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Grid,
  Divider,
  Collapse,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

import "react-icons/fa";

import TAccountTable from "./TTable";
import TAccountModal from "./TAccountModal";

import { FaChevronDown } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

const AccountCategory = ({ category, tables }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  const renderTables = (tables) => {
    if (tables.length === 0) {
      return (
        <Typography variant="body1" sx={{ padding: "1rem", height: "auto" }}>
          No Entries Found
        </Typography>
      );
    } else {
      return (
        <Grid container spacing={2} sx={{ padding: "1rem", height: "auto" }}>
          {tables.map((table, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              {table}
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <>
      <Toolbar
        onClick={toggleCollapse}
        style={{ cursor: "pointer", backgroundColor: "#FFD495" }}
      >
        <IconButton sx={{ color: "#FF7B54" }}>
          <FaChevronDown />
        </IconButton>
        <Typography variant="h6">{category}</Typography>
      </Toolbar>
      <Divider />
      <Collapse in={expanded}>{renderTables(tables)}</Collapse>
    </>
  );
};

const TAccounts = () => {
  const [data, setData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/taccount/alltables";
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const formatData = data.map(({ table, entries }) => ({
        category: table,
        tables: entries.map((entry) => (
          <TAccountTable key={entry.code} table={entry} />
        )),
      }));

      setDataArray(formatData);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <TAccountModal />
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12}>
              {dataArray.map(({ category, tables }) => {
                if (category === "assets") {
                  return (
                    <AccountCategory
                      key={category}
                      category={"Assets"}
                      tables={tables}
                    />
                  );
                }
                if (category === "liabilities") {
                  return (
                    <AccountCategory
                      key={category}
                      category={"Liabilites"}
                      tables={tables}
                    />
                  );
                }
                if (category === "equity") {
                  return (
                    <AccountCategory
                      key={category}
                      category={"Equity"}
                      tables={tables}
                    />
                  );
                }
                if (category === "expenses") {
                  return (
                    <AccountCategory
                      key={category}
                      category={"Expenses"}
                      tables={tables}
                    />
                  );
                }
                if (category === "revenues") {
                  return (
                    <AccountCategory
                      key={category}
                      category={"Revenues"}
                      tables={tables}
                    />
                  );
                }
                return null;
              })}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default TAccounts;
