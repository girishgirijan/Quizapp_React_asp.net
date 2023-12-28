import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom"
import useStateContext from "../hooks/useStateContex";

function Layout() {
    const {resetContext} = useStateContext()
    const navigate = useNavigate();
    const logout = () => {
        resetContext();
        navigate("/");
    }
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: 640, m: "auto" }}>
          <Typography variant="h4" align="center" sx={{flexGrow:1}}>
            Quiz App
          </Typography>
          <Button onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Layout;