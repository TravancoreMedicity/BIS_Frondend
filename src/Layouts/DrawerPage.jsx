import React, { useState, useCallback, useMemo, memo } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Toolbar,
    Typography
} from "@mui/material";
import { Settings, NavArrowRight, PharmacyCrossCircle } from "iconoir-react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';

const DrawerPage = ({ drawerWidth, handleDrawerClose }) => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();

    const handleListItemClick = useCallback((_, index, route, section) => {
        setSelectedSection(section);
        setSelectedIndex(index);
        navigate(route);
    }, [navigate]);

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
                {menuItems.map((item, index) => {
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



// import React, { useState, useCallback, useMemo, memo } from "react";
// import {
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     Toolbar,
//     Typography
// } from "@mui/material";
// import {
//     Settings,
//     NavArrowRight,
//     PharmacyCrossCircle
// } from "iconoir-react";
// import { useNavigate } from "react-router-dom";
// // import ArticleIcon from '@mui/icons-material/Article';
// // import VaccinesIcon from '@mui/icons-material/Vaccines';
// // import EngineeringIcon from '@mui/icons-material/Engineering';
// // import WorkspacesIcon from '@mui/icons-material/Workspaces';
// // import BiotechIcon from '@mui/icons-material/Biotech';
// // import ApartmentIcon from '@mui/icons-material/Apartment';
// import ReceiptIcon from '@mui/icons-material/Receipt';

// const DrawerPage = ({ drawerWidth, handleDrawerClose }) => {

//     // Global selection state
//     const [selectedSection, setSelectedSection] = useState(null);
//     const [selectedIndex, setSelectedIndex] = useState(null);

//     const navigate = useNavigate();

//     const handleListItemClick = useCallback((_, index, route, section) => {
//         setSelectedSection(section);
//         setSelectedIndex(index);
//         navigate(route);
//     }, [navigate]);

//     // const TMCH = useMemo(() => [
//     //     { slno: 1, menu: "TMC Dashboard", text: "/Home/Dashboard", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//     //     { slno: 2, menu: "TMC Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} className="hoverClass" /> },
//     //     { slno: 3, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> }
//     // ], []);

//     // const KMCH = useMemo(() => [
//     //     { slno: 4, menu: "KMC Dashboard", text: "/Home/KMCDashboard", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//     //     { slno: 5, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> }
//     // ], []);

//     // const Quotation = useMemo(() => [
//     //     { slno: 6, menu: "Quotation", text: "/Home/QuotationMainPage", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> }
//     // ], []);

//     // const Quotation_statistics = useMemo(() => [
//     //     { slno: 7, menu: "Quotation Statistics", text: "/Home/QtnStatistics", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 8, menu: "Consumable Inventory", text: "/Home/QtnActiveitems", icon: <VaccinesIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 9, menu: "Projects Inventory", text: "/Home/QtnTotal", icon: <EngineeringIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 10, menu: "General Inventory", text: "/Home/Qtnfinalized", icon: <WorkspacesIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 11, menu: "Biomedical Inventory", text: "/Home/QtnTotal", icon: <BiotechIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 12, menu: "Dental Inventory", text: "/Home/Qtnfinalized", icon: <ApartmentIcon height={20} width={20} className="hoverClass" /> }
//     // ], []);

//     // const TMCH = useMemo(() => [
//     //     { slno: 1, menu: "TMC Dashboard", text: "/Home/Dashboard", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//     //     { slno: 3, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//     //     { slno: 13, menu: "TMC Quotation", text: "/Home/TmcQuotationMian", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 14, menu: "Tmc Qtn Statics ", text: "/Home/Tmc_Quotation_Statics", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 2, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} className="hoverClass" /> },
//     //     { slno: 4, menu: "KMC Dashboard", text: "/Home/KMCDashboard", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//     //     { slno: 5, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//     //     { slno: 6, menu: "KMC Quotation", text: "/Home/QuotationMainPage", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },
//     //     { slno: 7, menu: " KMC Qtn Statistics", text: "/Home/QtnStatistics", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },
//     // ], []);



//     const TMC = useMemo(() => [
//         { slno: 1, menu: "Dashboard", text: "/Home/Dashboard", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//         { slno: 14, menu: "Quotation Statistics ", text: "/Home/Tmc_Quotation_Statics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//     ], []);

//     const KMC = useMemo(() => [
//         { slno: 4, menu: "Dashboard", text: "/Home/KMCDashboard", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//         { slno: 7, menu: " QuotationStatistics", text: "/Home/QtnStatistics", icon: <ReceiptIcon height={20} width={20} className="hoverClass" /> },
//     ], []);

//     const Setting = useMemo(() => [
//         { slno: 2, menu: "Settings", text: "/Home/Settings", icon: <Settings height={20} width={20} className="hoverClass" /> },
//         // { slno: 3, menu: "TMC Data Push", text: "/Home/LoadData", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//         // { slno: 13, menu: "TMC Quotation", text: "/Home/TmcQuotationMian", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },
//         // { slno: 5, menu: "KMC Data Push", text: "/Home/KmchLoadDatas", icon: <PharmacyCrossCircle height={20} width={20} className="hoverClass" /> },
//         // { slno: 6, menu: "KMC Quotation", text: "/Home/QuotationMainPage", icon: <ArticleIcon height={20} width={20} className="hoverClass" /> },

//     ], []);
//     const renderDrawerSection = (sectionTitle, menuItems, sectionKey) => (
//         <div>
//             <Toolbar variant="dense" />
//             <Typography
//                 variant="caption"
//                 sx={{
//                     fontSize: "12px",
//                     fontWeight: 700,
//                     color: "rgba(var(--font-secondary-white))",
//                     ml: 2,
//                     mt: 1,
//                     mb: 0.5,
//                 }}
//             >
//                 {sectionTitle}
//             </Typography>
//             <List>
//                 {menuItems.map((item, index) => {
//                     const isSelected = selectedSection === sectionKey && selectedIndex === index;

//                     return (
//                         <ListItem
//                             sx={{ p: 0, m: 0 }}
//                             key={item.slno}
//                             disablePadding
//                             secondaryAction={
//                                 <NavArrowRight
//                                     height={20}
//                                     width={20}
//                                     className={isSelected ? "bouncing-element" : ""}
//                                     color="rgba(var(--drawer-font-color))"
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
//                                         color: "rgba(var(--font-secondary-white))"
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
//                                         transform: "translateX(0)"
//                                     }}
//                                 >
//                                     {item.menu}
//                                 </Typography>
//                             </ListItemButton>
//                         </ListItem>
//                     );
//                 })}
//             </List>
//         </div>
//     );


//     return (
//         <Box
//             component="nav"
//             sx={{
//                 width: { sm: drawerWidth },
//                 transition: "width 0.5s",
//                 p: 0, m: 0
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
//                         backgroundColor: "rgba(var(--bg-drawer))"
//                     }
//                 }}
//                 onClose={handleDrawerClose}
//             >

//                 <Box>
//                     {renderDrawerSection("Travancore Medical College", TMC, "TMCH")}
//                     {renderDrawerSection("Kerala Medical College", KMC, "KMCH")}
//                     {renderDrawerSection("Settings", Setting, "Settings")}
//                 </Box>
//                 {/* <Box>
//                     {renderDrawerSection("Kerala Medical College", KMC, "KMCH")}
//                 </Box>
//                 <Box>
//                     {renderDrawerSection("Settings", Setting, "Settings")}
//                 </Box> */}
//                 {/* <Box>
//                     {renderDrawerSection("Quotation Statistics", Quotation_statistics, "Quotation_statistics")}
//                 </Box> */}

//             </Drawer>
//         </Box>
//     );
// };

// export default memo(DrawerPage);
