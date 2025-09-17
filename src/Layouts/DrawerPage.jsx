// @ts-nocheck
import React, { memo, useState, useCallback, useMemo, Fragment } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ListSubheader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NavArrowRight } from "iconoir-react";
import { getUserDrawerfun } from "../api/commonAPI";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Settings, PharmacyCrossCircle } from "iconoir-react";
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsightsIcon from '@mui/icons-material/Insights';
import TimelineIcon from '@mui/icons-material/Timeline';


const DrawerWindow = memo(({ drawerWidth, handleDrawerClose }) => {
    const navigation = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = useCallback(
        (event, index, route) => {
            setSelectedIndex(index);
            navigation(route);
        },
        [navigation]
    );

    // --- MENUS ---
    const allMenus = useMemo(
        () => ({
            TMC: [
                { menu_slno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <DashboardIcon /> },
                { menu_slno: 2, menu: "Quotation Statistics", text: "/Home/Tmc_Quotation_Statics", icon: <ReceiptIcon /> },
                { menu_slno: 3, menu: "IP Statistics", text: "/Home/Tmch_Ip_Statistics", icon: <BarChartIcon /> },
                { menu_slno: 4, menu: "OP Statistics", text: "/Home/Tmch_Op_statistics", icon: <TimelineIcon /> },
                { menu_slno: 5, menu: "Patient Statistics", text: "/Home/Tmch_Patient_Statiatics", icon: <BarChartIcon /> },
                { menu_slno: 21, menu: "Inventory Matrix", text: "/Home/TMCH_InventoryMatrix", icon: <AccountTreeIcon /> },
            ],
            KMC: [
                { menu_slno: 8, menu: "Dashboard", text: "/Home/KMCDashboard", icon: <DashboardIcon /> },
                { menu_slno: 9, menu: "Quotation Statistics", text: "/Home/QtnStatistics", icon: <ReceiptIcon /> },
                { menu_slno: 11, menu: "OP Statistics", text: "/Home/Kmch_Op_statistics", icon: <BarChartIcon /> },
                { menu_slno: 10, menu: "IP Statistics", text: "/Home/Kmch_Ip_Statistics", icon: <TimelineIcon /> },
                { menu_slno: 12, menu: "Patient Statistics", text: "/Home/Kmch_Patient_Statiatics", icon: <BarChartIcon /> },
                { menu_slno: 24, menu: "Inventory Matrix", text: "/Home/Inventory_matrix_main", icon: <AccountTreeIcon /> },
                { menu_slno: 23, menu: "OP Billing Statistics", text: "/Home/Kmch_billingInventory_main", icon: <InsightsIcon /> },
            ],
            Settings: [
                { menu_slno: 5, menu: "Settings", text: "/Home/Settings", icon: <Settings /> },
                { menu_slno: 6, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle /> },
                { menu_slno: 7, menu: "TMC Quotation", text: "/Home/TmcQuotationMian", icon: <ReceiptIcon /> },
                { menu_slno: 13, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle /> },
                { menu_slno: 14, menu: "KMC Quotation", text: "/Home/QuotationMainPage", icon: <ReceiptIcon /> },
            ],
        }),
        []
    );

    // get authType from localStorage
    const authType = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType);

    // fetch user allowed menu items
    const { data: allmoduleitem = [] } = useQuery({
        queryKey: ["getallmoduleitem", authType],
        queryFn: () => getUserDrawerfun(authType),
        enabled: !!authType,
        staleTime: Infinity,
    });

    const filteredMenus = useMemo(() => {
        // if (!allmoduleitem?.length) return allMenus;

        // Step 1: collect allowed menu_slno from allmoduleitem
        const allowedSlno = new Set(allmoduleitem.map(item => item.bis_menu_slno));

        // Step 2: loop through allMenus groups and filter
        const result = {};

        Object.entries(allMenus).forEach(([group, menus]) => {
            const filtered = menus.filter(menu => allowedSlno.has(menu.menu_slno));
            if (filtered.length) {
                result[group] = filtered;
            }
        });

        return result;
    }, [allMenus, allmoduleitem]);

    // Drawer UI
    const drawer = (
        <Box>
            <Toolbar variant="dense" />
            <Divider />
            <List>
                {Object.entries(filteredMenus).map(([group, menus]) => (
                    <Fragment key={group}>
                        <ListSubheader
                            component="div"
                            sx={{
                                fontFamily: "var(--font-varient)",
                                fontWeight: 700,
                                fontSize: "15px",
                                bgcolor: "rgba(var(--drawer-bg-color))",
                                color: "rgba(var(--drawer-font-color))",
                            }}
                        >
                            {group}
                        </ListSubheader>
                        {menus?.map((val) => (
                            <ListItem
                                key={val.menu_slno}
                                disablePadding
                                secondaryAction={
                                    <NavArrowRight
                                        height={20}
                                        width={20}
                                        color="rgba(var(--drawer-font-color))"
                                        className={selectedIndex === val.menu_slno ? "bouncing-element" : ""}
                                    />
                                }
                            >
                                <ListItemButton
                                    selected={selectedIndex === val.menu_slno}
                                    onClick={(e) => handleListItemClick(e, val.menu_slno, val.text)}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: "10px",
                                        height: 42,
                                        display: "flex",
                                        alignItems: "center",
                                        transition: "all 0.3s ease",
                                        bgcolor: selectedIndex === val.menu_slno
                                            ? "rgba(var(--drawer-btn-bg-color))"
                                            : "transparent",
                                        "&.Mui-selected": {
                                            color: "rgba(var(--drawer-font-color))",
                                            fontWeight: 700,
                                            ":hover": { bgcolor: "rgba(var(--drawer-btn-bg-color))" },
                                        },
                                        ":hover": {
                                            bgcolor: "rgba(var(--drawer-btn-bg-color), 0.12)",
                                            transform: "translateX(2px)",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                            "& .hoverClass": {
                                                transform: "translateX(4px)",
                                                color: "rgba(var(--drawer-font-color))",
                                            },
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        className="hoverClass"
                                        sx={{
                                            color: selectedIndex === val.menu_slno
                                                ? "rgba(var(--drawer-font-color))"
                                                : "rgba(var(--font-secondary-white))",
                                            transition: "all 0.3s ease",
                                            minWidth: 36,
                                        }}
                                    >
                                        {val.icon}
                                    </ListItemIcon>
                                    <Typography
                                        noWrap
                                        className="hoverClass"
                                        sx={{
                                            // fontFamily: "var(--font-varient)",
                                            fontFamily: "sans-serif",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            // fontWeight: selectedIndex === val.menu_slno ? 700 : 500,
                                            transition: "all 0.3s ease",
                                            color: selectedIndex === val.menu_slno
                                                ? "rgba(var(--drawer-font-color))"
                                                : "rgba(var(--font-secondary-white))",
                                        }}
                                    >
                                        {val.menu}
                                    </Typography>
                                </ListItemButton>

                            </ListItem>
                        ))}
                        <Divider />
                    </Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            // sx={{
            //     width: { sm: drawerWidth },
            //     transition: "width 0.2s", p: 1
            // }}
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.5s",
                p: 0,
                mt: 0,

            }}
            aria-label="menu drawer"
        >
            <Drawer
                variant="permanent"
                sx={{

                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        transition: "width 0.5s",
                        // backgroundColor: "rgba(var(--bg-drawer))",
                        backgroundColor: "#7C51A1"
                    },
                }}
                onClose={handleDrawerClose}
            >
                {drawer}
            </Drawer>
        </Box>
    );
});

export default memo(DrawerWindow);







// chatgpt 23/08/2025

// import React, { useState, useCallback, useMemo, memo } from "react";
// import {
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     Typography
// } from "@mui/material";
// import { Settings, NavArrowRight, PharmacyCrossCircle } from "iconoir-react";
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import { useNavigate } from "react-router-dom";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { getUserDrawerfun } from "../api/commonAPI";
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// const DrawerPage = ({ drawerWidth, handleDrawerClose }) => {
//     const [selectedSection, setSelectedSection] = useState(null);
//     const [selectedIndex, setSelectedIndex] = useState(null);

//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const handleListItemClick = useCallback((_, index, route, section) => {
//         setSelectedSection(section);
//         setSelectedIndex(index);
//         navigate(route);
//     }, [navigate]);

//     const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType);

//     const { data: userDrawer = [] } = useQuery({
//         queryKey: ['getUserDrawer', loggedUser],
//         queryFn: () => getUserDrawerfun(loggedUser),
//         enabled: !!loggedUser,
//         staleTime: Infinity
//     });

//     console.log("userDrawer", userDrawer);

//     //  1. Master Menu List (define once)
// const allMenus = useMemo(() => ({
//     TMC: [
//         { menu_slno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <DashboardIcon /> },
//         { menu_slno: 2, menu: "Quotation Statistics", text: "/Home/Tmc_Quotation_Statics", icon: <ReceiptIcon /> },
//         { menu_slno: 3, menu: "IP Statistics", text: "/Home/Tmch_Ip_Statistics", icon: <ReceiptIcon /> },
//         { menu_slno: 4, menu: "OP Statistics", text: "/Home/Tmch_Op_statistics", icon: <ReceiptIcon /> },
//         { menu_slno: 5, menu: "Patient Statistics", text: "/Home/Tmch_Patient_Statiatics", icon: <ReceiptIcon /> },
//         { menu_slno: 21, menu: "Inventory Matrix", text: "/Home/TMCH_InventoryMatrix", icon: <ReceiptIcon /> },
//     ],
//     KMC: [
//         { menu_slno: 8, menu: "Dashboard", text: "/Home/KMCDashboard", icon: <DashboardIcon /> },
//         { menu_slno: 9, menu: "Quotation Statistics", text: "/Home/QtnStatistics", icon: <ReceiptIcon /> },
//         { menu_slno: 11, menu: "OP Statistics", text: "/Home/Kmch_Op_statistics", icon: <ReceiptIcon /> },
//         { menu_slno: 10, menu: "IP Statistics", text: "/Home/Kmch_Ip_Statistics", icon: <ReceiptIcon /> },
//         { menu_slno: 12, menu: "Patient Statistics", text: "/Home/Kmch_Patient_Statiatics", icon: <ReceiptIcon /> },
//         { menu_slno: 24, menu: "Inventory Matrix", text: "/Home/Inventory_matrix_main", icon: <ReceiptIcon /> },
//         { menu_slno: 23, menu: "OP Billing Statistics", text: "/Home/Kmch_billingInventory_main", icon: <ReceiptIcon /> },
//     ],
//     Settings: [
//         { menu_slno: 5, menu: "Settings", text: "/Home/Settings", icon: <Settings /> },
//         { menu_slno: 6, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle /> },
//         { menu_slno: 7, menu: "TMC Quotation", text: "/Home/TmcQuotationMian", icon: <ReceiptIcon /> },
//         { menu_slno: 13, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle /> },
//         { menu_slno: 14, menu: "KMC Quotation", text: "/Home/QuotationMainPage", icon: <ReceiptIcon /> },
//     ]
// }), []);

//     //  2. Filter menus by API response (userDrawer)
//     const filterMenus = (menus, userDrawer) => {
//         if (!userDrawer) return [];
//         return menus.filter(item =>
//             userDrawer.some(u => u.menu_slno === item.menu_slno)
//         );
//     };

//     const TMCFiltered = filterMenus(allMenus.TMC, userDrawer);
//     const KMCFiltered = filterMenus(allMenus.KMC, userDrawer);
//     const SettingFiltered = filterMenus(allMenus.Settings, userDrawer);

//     //  3. Render Drawer Section
//     const renderDrawerSection = (sectionTitle, menuItems, sectionKey) => {
//         if (!menuItems.length) return null; // hide empty sections

//         return (
//             <Box sx={{ mt: 1 }}>
//                 <Typography
//                     variant="caption"
//                     sx={{
//                         fontSize: "12px",
//                         fontWeight: 700,
//                         color: "rgba(var(--bg-offwhite))",
//                         ml: 2,
//                         mb: 0,
//                     }}
//                 >
//                     {sectionTitle}
//                 </Typography>
//                 <List sx={{ p: 0, m: 0 }}>
//                     {menuItems.map((item, index) => {
//                         const isSelected = selectedSection === sectionKey && selectedIndex === index;

//                         return (
//                             <ListItem
//                                 sx={{ p: 0, mt: 0.4 }}
//                                 key={item.menu_slno}
//                                 disablePadding
//                                 secondaryAction={
//                                     <NavArrowRight
//                                         height={20}
//                                         width={20}
//                                         className={isSelected ? "bouncing-element" : ""}
//                                         color="rgba(var(--bg-offwhite))"
//                                     />
//                                 }
//                             >
//                                 <ListItemButton
//                                     selected={isSelected}
//                                     onClick={(e) => handleListItemClick(e, index, item.text, sectionKey)}
//                                     sx={{
//                                         display: "flex",
//                                         height: 35,
//                                         px: 0,
//                                         borderRadius: 0,
//                                         alignItems: "center",
//                                         transition: "transform 0.3s ease, color 0.3s ease",
//                                         '&.Mui-selected': {
//                                             bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                             ':hover': {
//                                                 bgcolor: "rgba(var(--drawer-btn-bg-color))"
//                                             }
//                                         },
//                                         ":hover": {
//                                             bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                             "& .hoverClass": {
//                                                 transform: "translateX(2px)",
//                                                 color: "rgba(var(--drawer-font-color))"
//                                             }
//                                         }
//                                     }}
//                                 >
//                                     <ListItemIcon
//                                         className="hoverClass"
//                                         sx={{
//                                             justifyContent: "center",
//                                             transition: "transform 0.3s ease",
//                                             transform: "translateX(0)",
//                                             color: "rgba(var(--bg-offwhite))"
//                                         }}
//                                     >
//                                         {item.icon}
//                                     </ListItemIcon>
//                                     <Typography
//                                         noWrap
//                                         className="hoverClass text-fontsecondarywhite"
//                                         sx={{
//                                             fontFamily: "var(--font-varient)",
//                                             fontSize: "14px",
//                                             fontWeight: 600,
//                                             transition: "transform 0.3s ease",
//                                             transform: "translateX(0)",
//                                             color: "rgba(var(--bg-offwhite))"
//                                         }}
//                                     >
//                                         {item.menu}
//                                     </Typography>
//                                 </ListItemButton>
//                             </ListItem>
//                         );
//                     })}
//                 </List>
//             </Box>
//         );
//     };

//     return (
//         <Box
//             component="nav"
//             sx={{
//                 width: { sm: drawerWidth },
//                 transition: "width 0.5s",
//                 p: 0,
//                 mt: 0
//             }}
//             aria-label="drawer navigation"
//         >
//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     "& .MuiDrawer-paper": {
//                         boxSizing: "border-box",
//                         width: drawerWidth,
//                         transition: "width 0.5s",
//                         backgroundColor: "rgba(var(--drawer_bg_clr))"
//                     }
//                 }}
//                 onClose={handleDrawerClose}
//             >
//                 <Box sx={{ mt: 7 }}>
//                     {renderDrawerSection("Travancore Medical College", TMCFiltered, "TMCH")}
//                     {renderDrawerSection("Kerala Medical College", KMCFiltered, "KMCH")}
//                     {renderDrawerSection("Settings", SettingFiltered, "Settings")}
//                 </Box>
//             </Drawer>
//         </Box>
//     );
// };

// export default memo(DrawerPage);



//old*********************************************************************
// import React, { useState, useCallback, useMemo, memo } from "react";
// import {
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     Typography
// } from "@mui/material";
// import { Settings, NavArrowRight, PharmacyCrossCircle } from "iconoir-react";
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import { useNavigate } from "react-router-dom";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { getUserDrawerfun } from "../api/commonAPI";
// import { useQuery, useQueryClient } from '@tanstack/react-query';


// const DrawerPage = ({ drawerWidth, handleDrawerClose }) => {
//     const [selectedSection, setSelectedSection] = useState(null);
//     const [selectedIndex, setSelectedIndex] = useState(null);

//     const navigate = useNavigate();
//     const queryClient = useQueryClient()

//     const handleListItemClick = useCallback((_, index, route, section) => {
//         setSelectedSection(section);
//         setSelectedIndex(index);
//         navigate(route);
//     }, [navigate]);

//     const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType)

//     const { data: userDrawer } = useQuery({
//         queryKey: ['getUserDrawer', loggedUser],
//         queryFn: () => getUserDrawerfun(loggedUser),
//         enabled: !!loggedUser,
//         staleTime: Infinity
//     })

//     // menu_slno
//     console.log("userDrawer", userDrawer);

//     // Drawer section items
//     const TMC = useMemo(() => [
//         {
//             menu_slno: 1,
//             menu: "Dashboard",
//             text: "/Home/Dashboard",
//             icon: <DashboardIcon height={20} width={20} className="hoverClass" />
//         },
//         {
//             menu_slno: 2,
//             menu: "Quotation Statistics",
//             text: "/Home/Tmc_Quotation_Statics",
//             icon: <ReceiptIcon height={20} width={20} className="hoverClass" />
//         },
//         { menu_slno: 3, menu: "IP Statistics", text: "/Home/Tmch_Ip_Statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 4, menu: "OP Statistics", text: "/Home/Tmch_Op_statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 5, menu: "Patient Statistics", text: "/Home/Tmch_Patient_Statiatics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 21, menu: "Inventory Matrix", text: "/Home/TMCH_InventoryMatrix", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//     ], []);

//     const KMC = useMemo(() => [
//         {
//             menu_slno: 8,
//             menu: "Dashboard",
//             text: "/Home/KMCDashboard",
//             icon: <DashboardIcon height={20} width={20} className="hoverClass" />
//         },
//         {
//             menu_slno: 9,
//             menu: "Quotation Statistics",
//             text: "/Home/QtnStatistics",
//             icon: <ReceiptIcon height={20} width={19} className="hoverClass" />
//         },
//         { menu_slno: 11, menu: "OP Statistics", text: "/Home/Kmch_Op_statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 10, menu: "IP Statistics", text: "/Home/Kmch_Ip_Statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 12, menu: "Patient Statistics", text: "/Home/Kmch_Patient_Statiatics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 24, menu: "Inventory Matrix", text: "/Home/Inventory_matrix_main", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 23, menu: "OP Billing Statistics", text: "/Home/Kmch_billingInventory_main", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },

//     ], []);
//     const Setting = useMemo(() => [
//         {
//             menu_slno: 5,
//             menu: "Settings",
//             text: "/Home/Settings",
//             icon: <Settings height={20} width={20} className="hoverClass" />
//         },
//         { menu_slno: 6, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 7, menu: "TMC Quotation", text: "/Home/TmcQuotationMian", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 13, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//         { menu_slno: 14, menu: "KMC Quotation", text: "/Home/QuotationMainPage", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },

//     ], []);

//     const renderDrawerSection = (sectionTitle, menuItems, sectionKey) => (
//         <Box sx={{ mt: 1 }} >
//             <Typography
//                 variant="caption"
//                 sx={{
//                     fontSize: "12px",
//                     fontWeight: 700,
//                     color: "rgba(var(--bg-offwhite))",
//                     ml: 2,
//                     mt: 0,
//                     mb: 0,
//                 }}
//             >
//                 {sectionTitle}
//             </Typography>
//             <List sx={{ p: 0, m: 0 }}>
//                 {menuItems?.map((item, index) => {
//                     const isSelected = selectedSection === sectionKey && selectedIndex === index;

//                     return (
//                         <ListItem
//                             sx={{ p: 0, mt: 0.4 }}
//                             key={item.slno}
//                             disablePadding
//                             secondaryAction={
//                                 <NavArrowRight
//                                     height={20}
//                                     width={20}
//                                     className={isSelected ? "bouncing-element" : ""}
//                                     color="rgba(var(--bg-offwhite))"
//                                 />
//                             }
//                         >
//                             <ListItemButton
//                                 selected={isSelected}
//                                 onClick={(e) => handleListItemClick(e, index, item.text, sectionKey)}
//                                 sx={{
//                                     display: "flex",
//                                     height: 35,
//                                     px: 0,
//                                     mx: 0,
//                                     my: 0.1,
//                                     borderRadius: 0,
//                                     alignItems: "center",
//                                     transition: "transform 0.3s ease, color 0.3s ease",
//                                     '&.Mui-selected': {
//                                         bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                         ':hover': {
//                                             bgcolor: "rgba(var(--drawer-btn-bg-color))"
//                                         }
//                                     },
//                                     ":hover": {
//                                         bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                         "& .hoverClass": {
//                                             transform: "translateX(2px)",
//                                             color: "rgba(var(--drawer-font-color))"
//                                         }
//                                     }
//                                 }}
//                             >
//                                 <ListItemIcon
//                                     className="hoverClass"
//                                     sx={{
//                                         justifyContent: "center",
//                                         transition: "transform 0.3s ease",
//                                         transform: "translateX(0)",
//                                         color: "rgba(var(--bg-offwhite))"
//                                     }}
//                                 >
//                                     {item.icon}
//                                 </ListItemIcon>
//                                 <Typography
//                                     noWrap
//                                     className="hoverClass text-fontsecondarywhite"
//                                     sx={{
//                                         fontFamily: "var(--font-varient)",
//                                         fontSize: "14px",
//                                         fontWeight: 600,
//                                         transition: "transform 0.3s ease",
//                                         transform: "translateX(0)",
//                                         color: "rgba(var(--bg-offwhite))"
//                                     }}
//                                 >
//                                     {item.menu}
//                                 </Typography>
//                             </ListItemButton>
//                         </ListItem>
//                     );
//                 })}
//             </List>
//         </Box >
//     );

//     return (
//         <Box
//             component="nav"
//             sx={{
//                 width: { sm: drawerWidth },
//                 transition: "width 0.5s",
//                 p: 0,
//                 mt: 0
//             }}
//             aria-label="drawer navigation"
//         >
//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     "& .MuiDrawer-paper": {
//                         boxSizing: "border-box",
//                         width: drawerWidth,
//                         transition: "width 0.5s",
//                         backgroundColor: "rgba(var(--drawer_bg_clr))"
//                     }
//                 }}
//                 onClose={handleDrawerClose}
//             >
//                 <Box sx={{ mt: 7 }}>
//                     {renderDrawerSection("Travancore Medical College", TMC, "TMCH")}
//                     {renderDrawerSection("Kerala Medical College", KMC, "KMCH")}
//                     {renderDrawerSection("Settings", Setting, "Settings")}
//                 </Box>
//             </Drawer>
//         </Box>
//     );
// };

// export default memo(DrawerPage);






//********************************************************************************************** */





















