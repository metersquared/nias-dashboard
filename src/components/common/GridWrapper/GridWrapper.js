import React from "react";
import Grid from "@mui/material/Grid";
import { gridWrapperStyles } from "./styles";

const GridWrapper = ({ children }) => {
  return (
    <Grid container sx={gridWrapperStyles}>
      {children}
    </Grid>
  );
};

export default GridWrapper;
