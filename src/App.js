import React, { useState, useEffect } from "react";
import { Grid } from "@mui/system";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import { useLocation } from "react-router";

function App() {
  const [title, setTitle] = useState(null);
  const [navbarOpen, setNavbarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    setTitle(parsedTitle);
  }, [location]);
  return (
    <Grid container>
      <NavBar open={navbarOpen} setOpen={setNavbarOpen} />
      <Header title={title} setOpen={setNavbarOpen} />
      <Outlet />
    </Grid>
  );
}

export default App;
