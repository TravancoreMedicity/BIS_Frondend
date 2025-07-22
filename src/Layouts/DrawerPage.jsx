import React, { useState, useCallback, useMemo, memo } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material";
import { Settings, NavArrowRight, PharmacyCrossCircle } from "iconoir-react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
// import { getUserDrawer } from "../api/commonAPI";
// import { useQuery } from "@tanstack/react-query";

const DrawerPage = ({ drawerWidth, handleDrawerClose }) => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();

    const handleListItemClick = useCallback((_, index, route, section) => {
        setSelectedSection(section);
        setSelectedIndex(index);
        navigate(route);
    }, [navigate]);

    // const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType)

    // console.log(loggedUser);

    // const { data: userDrawer = [] } = useQuery({
    //     queryKey: ['getUserDrawer', loggedUser],
    //     queryFn: () => getUserDrawer(loggedUser),
    //     enabled: !!loggedUser,
    //     staleTime: Infinity
    // });

    // Drawer section items
    const TMC = useMemo(() => [
        {
            slno: 1,
            menu: "Dashboard",
            text: "/Home/Dashboard",
            icon: <DashboardIcon height={20} width={20} className="hoverClass" />
        },
        {
            slno: 2,
            menu: "Quotation Statistics",
            text: "/Home/Tmc_Quotation_Statics",
            icon: <ReceiptIcon height={20} width={20} className="hoverClass" />
        },
        { slno: 13, menu: "IP Statistics", text: "/Home/Tmch_Ip_Statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
        { slno: 14, menu: "OP Statistics", text: "/Home/Tmch_Op_statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
        { slno: 15, menu: "Patient Statistics", text: "/Home/Tmch_Patient_Statiatics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },

    ], []);

    const KMC = useMemo(() => [
        {
            slno: 3,
            menu: "Dashboard",
            text: "/Home/KMCDashboard",
            icon: <DashboardIcon height={20} width={20} className="hoverClass" />
        },
        {
            slno: 4,
            menu: "Quotation Statistics",
            text: "/Home/QtnStatistics",
            icon: <ReceiptIcon height={20} width={20} className="hoverClass" />
        },
        { slno: 10, menu: "OP Statistics", text: "/Home/Kmch_Op_statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
        { slno: 11, menu: "IP Statistics", text: "/Home/Kmch_Ip_Statistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
        { slno: 12, menu: "Patient Statistics", text: "/Home/Kmch_Patient_Statiatics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
        { slno: 16, menu: "Inventory Matrix", text: "/Home/Inventory_matrix_main", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },

    ], []);

    const Setting = useMemo(() => [
        {
            slno: 5,
            menu: "Settings",
            text: "/Home/Settings",
            icon: <Settings height={20} width={20} className="hoverClass" />
        },

        { slno: 6, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
        { slno: 7, menu: "TMC Quotation", text: "/Home/TmcQuotationMian", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
        { slno: 8, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
        { slno: 9, menu: "KMC Quotation", text: "/Home/QuotationMainPage", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },

    ], []);

    const renderDrawerSection = (sectionTitle, menuItems, sectionKey) => (
        <Box sx={{ mt: 1 }} >
            {/* <Toolbar variant="dense" /> */}

            <Typography
                variant="caption"
                sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "rgba(var(--font-secondary-white))",
                    ml: 2,
                    mt: 0,
                    mb: 0,
                }}
            >
                {sectionTitle}
            </Typography>
            <List sx={{ p: 0, m: 0 }}>
                {menuItems?.map((item, index) => {
                    const isSelected = selectedSection === sectionKey && selectedIndex === index;

                    return (
                        <ListItem
                            sx={{ p: 0, mt: 0.4 }}
                            key={item.slno}
                            disablePadding
                            secondaryAction={
                                <NavArrowRight
                                    height={20}
                                    width={20}
                                    className={isSelected ? "bouncing-element" : ""}
                                    color="rgba(var(--drawer-font-color))"
                                />
                            }
                        >
                            <ListItemButton
                                selected={isSelected}
                                onClick={(e) => handleListItemClick(e, index, item.text, sectionKey)}
                                sx={{
                                    display: "flex",
                                    height: 35,
                                    px: 0,
                                    mx: 0,
                                    my: 0.1,
                                    borderRadius: 0,
                                    alignItems: "center",
                                    transition: "transform 0.3s ease, color 0.3s ease",
                                    '&.Mui-selected': {
                                        bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                        ':hover': {
                                            bgcolor: "rgba(var(--drawer-btn-bg-color))"
                                        }
                                    },
                                    ":hover": {
                                        bgcolor: "rgba(var(--drawer-btn-bg-color))",
                                        "& .hoverClass": {
                                            transform: "translateX(2px)",
                                            color: "rgba(var(--drawer-font-color))"
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon
                                    className="hoverClass"
                                    sx={{
                                        justifyContent: "center",
                                        transition: "transform 0.3s ease",
                                        transform: "translateX(0)",
                                        color: "rgba(var(--font-secondary-white))"
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <Typography
                                    noWrap
                                    className="hoverClass text-fontsecondarywhite"
                                    sx={{
                                        fontFamily: "var(--font-varient)",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        transition: "transform 0.3s ease",
                                        transform: "translateX(0)"
                                    }}
                                >
                                    {item.menu}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWidth },
                transition: "width 0.5s",
                p: 0,
                mt: 0
            }}
            aria-label="drawer navigation"
        >
            <Drawer
                variant="permanent"
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        transition: "width 0.5s",
                        backgroundColor: "rgba(var(--bg-drawer))"
                    }
                }}
                onClose={handleDrawerClose}
            >
                <Box sx={{ mt: 7 }}>
                    {renderDrawerSection("Travancore Medical College", TMC, "TMCH")}
                    {renderDrawerSection("Kerala Medical College", KMC, "KMCH")}
                    {renderDrawerSection("Settings", Setting, "Settings")}
                </Box>
            </Drawer>
        </Box>
    );
};

export default memo(DrawerPage);






//********************************************************************************************** */



// @ts-nocheck
// import React, { memo, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { ListSubheader } from "@mui/material";
// import { NavArrowRight } from 'iconoir-react'
// import { useCallback } from "react";
// import { useMemo } from "react";
// import {
//     HomeAltSlimHoriz,
//     Settings,
//     MessageText,
//     Computer,
//     TaskList,
//     Microscope,
//     HospitalCircle,
//     BookStack,
//     UserBadgeCheck,
//     MicrophoneSpeaking,
//     PcFirewall
// } from 'iconoir-react'
// import { EmpauthId } from "../Constant/Constant";
// import { getUserModules } from "../Function/CommonFunction";
// import { useQuery } from "@tanstack/react-query";

// const DrawerWindow = memo(({ drawerWidth, handleDrawerClose }) => {

//     const navigation = useNavigate()
//     const [selectedIndex, setSelectedIndex] = useState(null);
//     const [arr, setarr] = useState([])
//     const handleListItemClick = useCallback((event, index, route) => {
//         setSelectedIndex(index);
//         navigation(route);
//     }, [navigation]);


//     const id = EmpauthId();
//     const { data: allmoduleitem = [] } = useQuery({
//         queryKey: ['getallmoduleitem', id],
//         queryFn: () => getUserModules(id),
//         enabled: !!id,
//         staleTime: Infinity
//     });

//     const drawerMenu = useMemo(() => {
//         return [
//             { modslno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <HomeAltSlimHoriz height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 2, menu: "FeedBack Links", text: "/Home/Feedbackdetail", icon: <MessageText height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 3, menu: "FeedBackCollection", text: "/Home/collectiondetail", icon: <BookStack height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 4, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 9, menu: "CheckList", text: "/Home/Maintenace", icon: <TaskList height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 6, menu: "InformationTech", text: "/Home/it", icon: <Computer height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 7, menu: "BioMedical", text: "/Home/biomedical", icon: <Microscope height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 8, menu: "HouseKeeping", text: "/Home/housekeeping", icon: <HospitalCircle height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 5, menu: "PRO CheckList", text: "/Home/prochecklist", icon: <UserBadgeCheck height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 10, menu: "Call Center", text: "/Home/dischargepatient", icon: <MicrophoneSpeaking height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//             { modslno: 11, menu: "PRO Followup", text: "/Home/followupratient", icon: <PcFirewall height={20} width={20} color="rgba(var(--drawer-font-color))" className='hoverClass' /> },
//         ]
//     }, []);


//     useEffect(() => {
//         if (allmoduleitem?.length) {
//             const filteredItems = drawerMenu?.filter((menuItem) =>
//                 allmoduleitem?.some((module) => menuItem?.modslno === module?.fb_module_slno)
//             );
//             setarr(filteredItems);
//         }
//     }, [allmoduleitem, drawerMenu]);



//     const drawer = useMemo(() => (
//         <div>
//             <Toolbar variant="dense" />
//             <Divider />
//             <List
//                 subheader={
//                     <ListSubheader
//                         component="div"
//                         id="nested-list-subheader"
//                         sx={{
//                             fontFamily: "var(--font-varient)",
//                             fontWeight: 600,
//                             bgcolor: "rgba(var(--drawer-bg-color))",
//                             color: "rgba(var(--drawer-font-color))",
//                         }}
//                     >
//                         Menu Selections
//                     </ListSubheader>
//                 }>
//                 {arr?.map((val, index) => (
//                     <ListItem
//                         key={index}
//                         disablePadding
//                         sx={{ display: "flex" }}
//                         secondaryAction={
//                             <NavArrowRight height={20} width={20} color="rgba(var(--drawer-font-color))"
//                                 className={selectedIndex === index ? "bouncing-element" : ''} />
//                         }
//                     >
//                         <ListItemButton
//                             selected={selectedIndex === index ? true : false}
//                             onClick={(e) => handleListItemClick(e, index, val.text)}
//                             sx={{
//                                 display: "flex",
//                                 mx: 0,
//                                 px: 0,
//                                 borderRadius: 0,
//                                 my: 0.1,
//                                 height: 35,
//                                 alignItems: "center",
//                                 transition: "transform 0.3s ease, color 0.3s ease",
//                                 transform: "translateX(0)",
//                                 '&.Mui-selected': {
//                                     bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                     ':hover': {
//                                         bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                     }
//                                 },
//                                 ":hover": {
//                                     bgcolor: "rgba(var(--drawer-btn-bg-color))",
//                                     "& .hoverClass": {
//                                         transform: "translateX(2px)",
//                                         color: "rgba(var(--drawer-font-color))",
//                                     },
//                                 },
//                             }}
//                         >
//                             <ListItemIcon
//                                 className="hoverClass"
//                                 sx={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     color: "rgba(var(--font-secondary-white))",
//                                     transition: "transform 0.3s ease",
//                                     transform: "translateX(0)",
//                                 }}
//                             >
//                                 {val.icon}
//                             </ListItemIcon>
//                             <Typography
//                                 noWrap
//                                 className="hoverClass text-fontsecondarywhite "
//                                 sx={{
//                                     display: "flex",
//                                     fontFamily: "var(--font-varient)",
//                                     fontSize: "14px",
//                                     fontWeight: 600,
//                                     transition: "transform 0.3s ease",
//                                     transform: "translateX(0)",
//                                 }}
//                             >
//                                 {val?.menu}
//                             </Typography>
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//         </div>
//     ), [selectedIndex, handleListItemClick, arr])

//     return (
//         <Box
//             component="nav"
//             sx={{
//                 width: { sm: drawerWidth },
//                 transition: "width 0.2s",
//             }}
//             aria-label="mailbox folders"
//         >
//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     "& .MuiDrawer-paper": {
//                         boxSizing: "border-box",
//                         width: drawerWidth,
//                         transition: "width 0.5s",
//                         backgroundColor: "rgba(var(--bg-drawer))",
//                     },
//                 }}
//                 onClose={handleDrawerClose}>
//                 {drawer}
//             </Drawer>
//         </Box>
//     )
// })

// export default memo(DrawerWindow)