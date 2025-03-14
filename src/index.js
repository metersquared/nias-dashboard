import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";
import TrainingSessions from "./pages/TrainingSessions/TrainingSessions";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="authentication" element={<Authentication />} />
          <Route path="home" element={<Home />} />
          <Route path="training-sessions" element={<TrainingSessions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
