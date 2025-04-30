import React, { useState, useCallback, useMemo, memo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ListSubheader } from "@mui/material";
import { Settings, NavArrowRight, PharmacyCrossCircle, PharmacyCrossTag } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const DrawerPage = ({ drawerWidth, handleDrawerClose }) => {
    // State for TMCH and KMCH selections
    const [selectedIndexTMCH, setSelectedIndexTMCH] = useState(null);
    const [selectedIndexKMCH, setSelectedIndexKMCH] = useState(null);
    const navigate = useNavigate();  // Initialize navigate

    const handleListItemClick = useCallback((event, index, route, section) => {
        // Update the selected index based on the section clicked
        if (section === "TMCH") {
            setSelectedIndexTMCH(index);  // Only update TMCH selection
        } else if (section === "KMCH") {
            setSelectedIndexKMCH(index);  // Only update KMCH selection
        }
        navigate(route);  // Use navigate to route to the new page
    }, [navigate]);

    const TMCH = useMemo(() => [
        { slno: 4, menu: "Dashboard", text: "/Home/Dashboard", icon: <PharmacyCrossCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        // { slno: 1, menu: "Pharmacy sales", text: "/Home/TmchGraphicalView", icon: <PharmacyCrossCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        // { slno: 2, menu: "Pharmacy Purchase", text: "/Home/Settings", icon: <PharmacyCrossTag height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        { slno: 3, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        { slno: 5, menu: "Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> }
    ], []);

    const KMCH = useMemo(() => [
        { slno: 4, menu: "Dashboard", text: "/Home/Dashboard", icon: <PharmacyCrossCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        { slno: 3, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
        { slno: 5, menu: "Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> }
    ], []);

    const renderDrawerSection = (sectionTitle, menuItems, section) => (
        <div>
            <Toolbar variant="dense" />
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
                        {sectionTitle}
                    </ListSubheader>
                }
            >
                {menuItems?.map((val, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: "flex" }}
                        secondaryAction={
                            <NavArrowRight height={20} width={20} color="rgba(var(--drawer-font-color))" className={section === "TMCH" && selectedIndexTMCH === index ? "bouncing-element" : (section === "KMCH" && selectedIndexKMCH === index ? "bouncing-element" : '')} />
                        }
                    >
                        <ListItemButton
                            selected={section === "TMCH" ? selectedIndexTMCH === index : section === "KMCH" ? selectedIndexKMCH === index : false}
                            onClick={(e) => handleListItemClick(e, index, val.text, section)}
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
                                className="hoverClass text-fontsecondarywhite"
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
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.5s",
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
                    },
                }}
                onClose={handleDrawerClose}
            >
                {renderDrawerSection('Travancore Medical College', TMCH, "TMCH")}
                {renderDrawerSection('Kerala Medical College', KMCH, "KMCH")}
            </Drawer>
        </Box>
    );
}

export default memo(DrawerPage);
