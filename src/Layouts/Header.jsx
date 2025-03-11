// @ts-nocheck
import React, { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ScreenCheck from "../Components/ScreenCheck";
import { Switch, switchClasses } from "@mui/joy";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutMoidal from "./LogoutMoidal";
import IdleTimer from "./IdleTimer";

const Header = ({ handleDrawerToggle, drawerWidth, dark, handleChangeDarkMode }) => {
    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: "rgba(var(--bg-nav))",
            }}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Box >
                <Toolbar variant="dense" className="flex flex-row justify-between">
                    <Box className="flex flex-row items-center">
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { sm: "flex" },
                                color: "rgba(var(--color-white))",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className="text-navheadercolor"
                        >
                            Travancore Medicity
                        </Typography>
                        <ScreenCheck />
                    </Box>
                    <Box className="flex flex-row items-center gap-3">
                        <IdleTimer />
                        <Switch
                            checked={dark}
                            // onChange={() => setDark(!dark)}
                            onChange={handleChangeDarkMode}
                            slotProps={{
                                track: {
                                    children: (
                                        <>
                                            <BedtimeOutlinedIcon
                                                sx={{ ml: "8px" }}
                                                fontSize="small"
                                            />
                                            <WbSunnyOutlinedIcon
                                                sx={{ mr: "7px" }}
                                                fontSize="small"
                                            />
                                        </>
                                    ),
                                },
                            }}
                            sx={{
                                border: '0.005rem solid rgba(var(--border-primary))',
                                borderRadius: '16px',
                                "--Switch-thumbSize": "27px",
                                "--Switch-trackWidth": "64px",
                                "--Switch-trackHeight": "31px",
                                "--Switch-thumbWidth": "32px",
                                "--Switch-thumbBackground": "rgb(216,75,154)",
                                "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                                "&:hover": {
                                    "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                                },
                                [`&.${switchClasses.checked}`]: {
                                    "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                                    "--Switch-thumbBackground": "rgb(216,75,154)",
                                    "&:hover": {
                                        "--Switch-trackBackground": "rgba(15,18,20,0.5)",
                                    },
                                },
                            }}
                        />
                        <LogoutMoidal />
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default memo(Header)