// @ts-nocheck
import React, { memo } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ListSubheader } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { NavArrowRight } from 'iconoir-react'
import { useCallback } from "react";
import { useMemo } from "react";
import {
    HomeAltSlimHoriz,
    ShieldUpload,
    PageSearch,
    Settings,
    DocMagnifyingGlass
} from 'iconoir-react'

const DrawerWindow = memo(({ drawerWidth, handleDrawerClose }) => {

    const navigation = useNavigate()

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = useCallback((event, index, route) => {
        setSelectedIndex(index);
        navigation(route);
    }, []);

    const drawerMenu = useMemo(() => {
        return [
            { menu: "Inventory", text: "/Home/Purchase", icon: <HomeAltSlimHoriz height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { menu: "File Upload", text: "/Home/FileUpload", icon: <ShieldUpload height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { menu: "File Search", text: "/Home/FileSearch", icon: <DocMagnifyingGlass height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { menu: "Advance Search", text: "/Home/AdvancedSearch", icon: <PageSearch height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
            { menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        ]
    }, [])

    const drawer = useMemo(() => (
        <div>
            <Toolbar variant="dense" />
            <Divider />
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{
                            fontFamily: "var(--font-varient)",
                            fontWeight: 600,
                            bgcolor: "rgba(var(--drawer-bg-color))",
                            color: "rgba(var(--drawer-font-color))",
                        }}
                    >
                        Menu Selections
                    </ListSubheader>
                }
            >
                {drawerMenu?.map((val, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "flex", }}
                        secondaryAction={
                            <NavArrowRight height={20} width={20} color="rgba(var(--drawer-font-color))" className={selectedIndex === index ? "bouncing-element" : ''} />
                        }
                    >
                        <ListItemButton
                            selected={selectedIndex === index ? true : false}
                            onClick={(e) => handleListItemClick(e, index, val.text)}
                            sx={{
                                display: "flex",
                                mx: 0,
                                px: 0,
                                borderRadius: 0,
                                my: 0.1,
                                height: 35,
                                alignItems: "center",
                                transition: "transform 0.3s ease, color 0.3s ease",
                                transform: "translateX(0)",
                                '&.Mui-selected': {
                                    bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    ':hover': {
                                        bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    }
                                },
                                ":hover": {
                                    bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                    "& .hoverClass": {
                                        transform: "translateX(2px)",
                                        color: "rgba(var(--drawer-font-color))",
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                className="hoverClass"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    color: "rgba(var(--font-secondary-white))",
                                    transition: "transform 0.3s ease",
                                    transform: "translateX(0)",
                                }}
                            >
                                {val.icon}
                            </ListItemIcon>
                            <Typography
                                noWrap
                                className="hoverClass text-fontsecondarywhite "
                                sx={{
                                    display: "flex",
                                    fontFamily: "var(--font-varient)",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    transition: "transform 0.3s ease",
                                    transform: "translateX(0)",
                                }}
                            >
                                {val.menu}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    ), [selectedIndex, handleListItemClick])

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.5s",
                // flexShrink: { sm: 0 }
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        transition: "width 0.5s",
                        backgroundColor: "rgba(var(--bg-drawer))",
                        // backgroundColor: "rgba(var(--color-blue))",
                    },
                }}
                onClose={handleDrawerClose}
            // open={mobileOpen}
            >
                {drawer}
            </Drawer>
        </Box>
    )
})

export default DrawerWindow