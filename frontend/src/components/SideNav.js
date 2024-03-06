import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

const SideNav = () => {
  const drawerWidth = 240;
  const location = useLocation();

  const pages = [
    { title: "General Entry", path: "/general-entry" },
    { title: "T Accounts", path: "/t-accounts" },
    { title: "Trial Balance", path: "/trial-balance" },
    { title: "Income Statement", path: "/income-statement" },
  ];

  return (
    <div>
      <Toolbar />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {pages.map(({ title, path }) => (
            <ListItem
              key={title}
              disablePadding
              selected={location.pathname === path}
              component={Link}
              to={path}
              button
            >
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default SideNav;
