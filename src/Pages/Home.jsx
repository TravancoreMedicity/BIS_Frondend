// @ts-nocheck
import React, { memo, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useNavigate, } from "react-router-dom";
import { useState } from "react";
import "./Style.css";
import Header from "../Layouts/Header";
import DrawerWindow from "../Layouts/DrawerWindow";
import { useCallback } from "react";

function Home() {

  const [drawerWidth, setDrawerWidth] = useState(240);
  const [dark, setDark] = useState(false);
  // const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = useCallback(() => {
    setIsClosing(true);
    setMobileOpen(false);
  }, []);

  const handleChangeDarkMode = useCallback(() => {
    setDark(!dark);
    if (dark === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [dark]);

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };

  const handleDrawerToggle = useCallback(() => {
    setDrawerWidth(drawerWidth === 0 ? 240 : 0);
    setMobileOpen(drawerWidth === 0 ? true : false);
    if (!isClosing) {
    }
  }, [drawerWidth]);

  return (
    <Box sx={{ display: "flex", width: "100%", overscrollBehavior: "none" }}>
      <CssBaseline />

      {/* TOP APPLICATION BAR START HERE  */}
      <Header
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        dark={dark}
        handleChangeDarkMode={handleChangeDarkMode}
      />
      {/* TOP APPLICATION BAR END HERE  */}


      {/* NAVIGATION BAR LEFT SIDE */}
      <DrawerWindow
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
      />

      {/* MAIN CONTENT START  */}
      <Box
        component="main"
        className="bg-bgcommon"
        sx={{
          flexGrow: 1,
          p: "0.15rem",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
          overscrollBehavior: "none",
        }}
      >
        <Toolbar variant="dense" />
        <Outlet />
      </Box>
      {/* MAIN CONTENT END  */}
    </Box>
  );
}

export default memo(Home);
