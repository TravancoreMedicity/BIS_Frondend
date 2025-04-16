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
          { path: "UserManagement", element: <UserManagement />, errorElement: <ErrorElement /> },
          { path: "UserTypeMaster", element: <UserTypeMaster />, errorElement: <ErrorElement /> },
          { path: "ModuleNameMaster", element: <ModuleNameMaster />, errorElement: <ErrorElement /> },
          { path: "MenuNameMaster", element: <MenuNameMaster />, errorElement: <ErrorElement /> },
          { path: "ModuleGroupMaster", element: <ModuleGroupMaster />, errorElement: <ErrorElement /> },
          { path: "UserGroupRights", element: <UserGroupRights />, errorElement: <ErrorElement /> },

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
