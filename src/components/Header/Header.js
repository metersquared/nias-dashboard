import React from "react";
import NotificationBell from "../common/NotificationBell/NotificationBell";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

const Header = ({ title, setOpen }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const headerStyles = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#960013",
      padding: "20px",
    },
    topRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: isMobile ? "0px" : "20px",
      "*": {
        marginRight: "5px",
      },
    },
    topRowLeft: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "start",
    },
    topRowRight: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "end",
    },
    middleRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: isMobile ? "0px" : "20px",
    },
    Icon: {
      color: "#FFFFFF",
    },
  };

  return (
    <Box sx={headerStyles.wrapper}>
      <Box sx={headerStyles.topRow}>
        <Box sx={headerStyles.topRowLeft}>
          <IconButton
            sx={headerStyles.Icon}
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={headerStyles.topRowRight}>
          <NotificationBell iconColor="secondary" />
          <Avatar src="https://avatars.githubusercontent.com/u/32344938?v=4" />
        </Box>
      </Box>
      <Box sx={headerStyles.middleRow}>
        <Typography variant={isMobile ? "h5" : "h1"} color="white">
          {title}
        </Typography>
        <Box>
          <Tooltip title="Help">
            <IconButton sx={headerStyles.Icon}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
