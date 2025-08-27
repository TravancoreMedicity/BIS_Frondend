import React, { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoootLayouts from "./routes/RoootLayouts";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Colors from "./Pages/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomBackDropWithOutState from "./Components/CustomBackDropWithOutState";
import "./App.css";
import { AuthProvider } from "./Context/AuthProvider";
import ErrorElement from "./Pages/ErrorElement";
import ModuleGroupMaster from "./Modules/Settings/ModuleGroupMaster/ModuleGroupMaster.jsx";
import TmchGraphicalView from "./Modules/BISModule/TMCH/TmchGraphicalView.jsx";
import KmchGraphicalView from "./Modules/BISModule/KMCH/KmchGraphicalView.jsx";
import { ToastContainer } from "react-toastify";
import KmcDashboard from "./Modules/BISModule/KMCH/KmcDashboard.jsx";
import KMCSettings from "./Modules/BISModule/KMCH/KMCSettings.jsx";
import KmchLoadDatas from "./Modules/BISModule/KMCH/KmchLoadDatas.jsx";

// Main Modules
const Dashboard = lazy(() => import("./Modules/Dashboard/Dashboard.jsx"));

const Settings = lazy(() => import("./Modules/Settings/Settings.jsx"));

// Sub Modules
const UserManagement = lazy(() => import("./Modules/Settings/UserManagement/UserCreation.jsx"))

const UserTypeMaster = lazy(() => import("./Modules/Settings/UserTypeMaster/UserTypeMaster.jsx"))

// const UserGroupRights = lazy(() => import("./Modules/Settings/UserGroupRights/UserGroupRights.jsx"))
const ModuleNameMaster = lazy(() => import("./Modules/Settings/ModuleNameMaster/ModuleNameMaster.jsx"))
const MenuNameMaster = lazy(() => import("./Modules/Settings/MenuNameMaster/MenuNameMaster.jsx"))
const UserGroupRights = lazy(() => import("./Modules/Settings/UserGroupRights/UserGroupRights.jsx"))
const LoadData = lazy(() => import("./Modules/BISModule/BIS_CommoCode/DataPush.jsx"))
const Quotation = lazy(() => import("./Modules/BISModule/BIS_Quotation/QuotationMainPage.jsx"))
const QtnActiveitems = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Qtn_Active_items.jsx"))
const QtnlinkedItems = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Qtn_linkedItems.jsx"))
const QtnTotal = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Qtn_Total.jsx"))
const Qtnfinalized = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Qrn_Finalized.jsx"))
const QtnFinaliselinkedItems = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Qtn_Finalise_linked_Items.jsx"))
const NewItems = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/New_Items.jsx"))
const QtnStatistics = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Qtn_Statistics.jsx"))
const StoreMaster = lazy(() => import("./Modules/Settings/StoreMaster.jsx"))
const MedStore = lazy(() => import("./Modules/Settings/MedStore.jsx"))
const MedDescription = lazy(() => import("./Modules/Settings/MedDescription.jsx"))
const TmcStoreMaster = lazy(() => import("./Modules/Settings/TmcStoreMaster.jsx"))
const TmcQuotationMian = lazy(() => import("./Modules/BISModule/BIS_Quotation/TmcQuotationMian.jsx"))
const Tmc_Quotation_Statics = lazy(() => import("./Modules/BISModule/BIS_Quotation/OuotationSatistics/Tmc_Quotation_Statics.jsx"))
const KmcSupplierWiseQtn = lazy(() => import("./Modules/BISModule/BIS_Quotation/SupplierWiseQtn/KmcSupplierWiseQtn.jsx"))
const Kmch_Op_statistics = lazy(() => import("./Modules/BISModule/KMCH/KMCHOPStatistics/Kmch_Op_statistics.jsx"))
const Kmc_dept_detailPage = lazy(() => import("./Modules/BISModule/KMCH/KMCHOPStatistics/DepartmentDetails/Kmc_dept_detailPage.jsx"))
const Kmch_Ip_Statistics = lazy(() => import("./Modules/BISModule/KMCH/KMCHIPStatistics/Kmch_Ip_Statistics.jsx"))
const ViewAllMonthsInYear = lazy(() => import("./Modules/BISModule/KMCH/KMCHIPStatistics/ViewAllMonthsInYear.jsx"))
const Kmch_Patient_Statiatics = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/Kmch_Patient_Statiatics.jsx"))
const IP_OP_DeptDetails = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/IP_OP_DeptDetails.jsx"))
const Tmch_Ip_Statistics = lazy(() => import("./Modules/BISModule/TMCH/TMCHIPStatistics/Tmch_Ip_Statistics.jsx"))
const Tmch_Op_statistics = lazy(() => import("./Modules/BISModule/TMCH/TMCHOPStatistics/Tmch_Op_statistics.jsx"))
const Tmch_Patient_Statiatics = lazy(() => import("./Modules/BISModule/TMCH/TMCHPatientStatistics/Tmch_Patient_Statiatics.jsx"))
const GeneralBillingSectn = lazy(() => import("./Modules/BISModule/KMCH/GeneralBillingSectn.jsx"))
const Inventory_matrix_main = lazy(() => import("./Modules/BISModule/KMCH/KMCH_InventoryMatrix/Inventory_matrix_main.jsx"))
const TMCH_InventoryMatrix = lazy(() => import("./Modules/BISModule/TMCH/TMCH_InventoryMatrix/TMCH_InventoryMatrix.jsx"))
const Kmch_billingInventory_main = lazy(() => import("./Modules/BISModule/KMCH/KMCHBillingStatistics/Kmch_billingInventory_main.jsx"))
// const Kmc_dr_details = lazy(() => import("./Modules/BISModule/KMCH/KMCHOPStatistics/DepartmentDetails/Kmc_dept_detailPage.jsx"))
const GraphicalViewMaster = lazy(() => import("./Modules/Settings/GraphicalViewMaster.jsx"))

const OP_IP_Statistics = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/OP_IP_Statistics.jsx"))
const DeptWise_OP_IP = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/DeptWise_OP_IP.jsx"))
const Dr_Wise_IP_OP = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/Dr_Wise_IP_OP.jsx"))
const IP_OP_LabStatistics = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/IP_OP_LabStatistics.jsx"))
const IP_OP_ReadioStastistics = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/IP_OP_ReadioStastistics.jsx"))
const Pharmacy_Statistics = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/Pharmacy_Statistics.jsx"))
const IP_occupanncy = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/IP_occupanncy.jsx"))
const GeneralBilling = lazy(() => import("./Modules/BISModule/KMCH/KMCHPatientStatistics/GeneralBilling.jsx"))
const SubMenuMaster = lazy(() => import("./Modules/Settings/SubMenuMaster/SubMenuMaster.jsx"))


// OP_IP_Statistics, DeptWise_OP_IP, Dr_Wise_IP_OP, IP_OP_LabStatistics, IP_OP_ReadioStastistics, Pharmacy_Statistics, IP_occupanncy, GeneralBilling



const routes = createBrowserRouter([
  {
    path: "/",
    element: <RoootLayouts />,
    children: [],
    errorElement: <ErrorElement />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Home",
        element: <Home />,
        children: [
          {
            path: "Dashboard", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Dashboard />
              </Suspense>, errorElement: <ErrorElement />
          },

          {
            path: "TmchGraphicalView", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <TmchGraphicalView />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "KmchGraphicalView", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <KmchGraphicalView />
              </Suspense>, errorElement: <ErrorElement />
          },

          {
            path: "FileUpload", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                {/* <FileUpload /> */}
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Settings", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Settings />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "FileSearch", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                {/* <FileApprovals /> */}
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "LoadData", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <LoadData />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "KMCDashboard", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <KmcDashboard />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "KMCSettings", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <KMCSettings />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "KmchLoadDatas", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <KmchLoadDatas />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "QuotationMainPage", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Quotation />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "QtnActiveitems", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < QtnActiveitems />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "QtnlinkedItems", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < QtnlinkedItems />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "QtnTotal", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < QtnTotal />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Qtnfinalized", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Qtnfinalized />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "QtnFinaliselinkedItems", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < QtnFinaliselinkedItems />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "NewItems", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < NewItems />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "QtnStatistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < QtnStatistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "TmcQuotationMian", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < TmcQuotationMian />
              </Suspense>, errorElement: <ErrorElement />
          },

          {
            path: "Tmc_Quotation_Statics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Tmc_Quotation_Statics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "KmcSupplierWiseQtn", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < KmcSupplierWiseQtn />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Kmch_Op_statistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Kmch_Op_statistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Kmc_dept_detailPage/:deptId/:deptName", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Kmc_dept_detailPage />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Kmch_Ip_Statistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Kmch_Ip_Statistics />
              </Suspense>, errorElement: <ErrorElement />
          },

          {
            path: "ViewAllMonthsInYear/:year", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < ViewAllMonthsInYear />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Kmch_Patient_Statiatics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Kmch_Patient_Statiatics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "IP_OP_DeptDetails/:deptName/:deptId", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < IP_OP_DeptDetails />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Tmch_Ip_Statistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Tmch_Ip_Statistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Tmch_Op_statistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Tmch_Op_statistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Tmch_Patient_Statiatics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Tmch_Patient_Statiatics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {

            path: "GeneralBillingSectn/:date/:date", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < GeneralBillingSectn />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Inventory_matrix_main", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Inventory_matrix_main />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "TMCH_InventoryMatrix", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < TMCH_InventoryMatrix />
              </Suspense>, errorElement: <ErrorElement />
          },

          {
            path: "Kmch_billingInventory_main", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Kmch_billingInventory_main />
              </Suspense>, errorElement: <ErrorElement />
          },


          // {
          //   path: "Kmc_dr_details/:drslno/:dr_name", element:
          //     <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
          //       < Kmc_dr_details />
          //     </Suspense>, errorElement: <ErrorElement />
          // },

          {
            path: "OP_IP_Statistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < OP_IP_Statistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "DeptWise_OP_IP", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < DeptWise_OP_IP />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Dr_Wise_IP_OP", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Dr_Wise_IP_OP />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "IP_OP_LabStatistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < IP_OP_LabStatistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "IP_OP_ReadioStastistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < IP_OP_ReadioStastistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Pharmacy_Statistics", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < Pharmacy_Statistics />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "IP_occupanncy", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < IP_occupanncy />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "GeneralBilling", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                < GeneralBilling />
              </Suspense>, errorElement: <ErrorElement />
          },


          // OP_IP_Statistics, DeptWise_OP_IP, Dr_Wise_IP_OP, IP_OP_LabStatistics, IP_OP_ReadioStastistics, Pharmacy_Statistics, IP_occupanncy, GeneralBilling



          { path: "UserManagement", element: <UserManagement />, errorElement: <ErrorElement /> },
          { path: "UserTypeMaster", element: <UserTypeMaster />, errorElement: <ErrorElement /> },
          { path: "ModuleNameMaster", element: <ModuleNameMaster />, errorElement: <ErrorElement /> },
          { path: "MenuNameMaster", element: <MenuNameMaster />, errorElement: <ErrorElement /> },
          { path: "ModuleGroupMaster", element: <ModuleGroupMaster />, errorElement: <ErrorElement /> },
          { path: "UserGroupRights", element: <UserGroupRights />, errorElement: <ErrorElement /> },
          { path: "StoreMaster", element: <StoreMaster />, errorElement: <ErrorElement /> },
          { path: "MedStore", element: <MedStore />, errorElement: <ErrorElement /> },
          { path: "MedDescription", element: <MedDescription />, errorElement: <ErrorElement /> },
          { path: "TmcStoreMaster", element: <TmcStoreMaster />, errorElement: <ErrorElement /> },
          { path: "GraphicalViewMaster", element: <GraphicalViewMaster />, errorElement: <ErrorElement /> },
          { path: "SubMenuMaster", element: <SubMenuMaster />, errorElement: <ErrorElement /> },
        ],
      },
      { path: "/Color", element: <Colors /> },
    ],
    errorElement: <ErrorElement />,
  },
]);

const queryClient = new QueryClient();

function App() {

  useEffect(() => {

    // socket.on("connect", () => {
    //   console.log("Connected");
    // });

    // socket.on("multiple-login", (message) => {
    //   console.log(message);
    //   localStorage.removeItem("app_auth");
    //   toast.error(
    //     <div className='flex h-20 flex-col' >{message}</div>, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // Redirect to login page
    //   setTimeout(() => {
    //     // warningNofity(message);
    //     window.location.href = "/";
    //   }, 3000); // Wait 3 seconds before redirecting
    // });

  }, [])

  useLayoutEffect(() => {
    document.body.classList.add("light");
  }, []);
  {/* <CustomBackDropWithOutState message={"Loading..."} /> */ }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
          <RouterProvider router={routes} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
