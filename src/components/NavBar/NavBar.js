import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { navbarItems } from "./consts/navbarItems";
import { navbarStyles } from "./styles";
import { useNavigate } from "react-router";

const NavBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      sx={navbarStyles.drawer}
      anchor="left"
    >
      <img
        src="/nias.png"
        width="50%"
        style={{ alignSelf: "center" }}
        alt="Logo of NIAS"
      />
      <List>
        {navbarItems.map((item, index) => (
          <ListItem
            button
            key={item.id}
            onClick={() => {
              navigate(item.route);
              setOpen(false);
            }}
          >
            <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={navbarStyles.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavBar;
