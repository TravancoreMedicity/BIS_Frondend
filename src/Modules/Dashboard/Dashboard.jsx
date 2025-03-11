// @ts-nocheck
import { Box } from "@mui/joy";
import React, { memo } from "react";
import { ToastContainer } from "react-toastify";



const Dashboard = () => {

  return (
    <Box className="flex flex-col  rounded-xl p-2 pb-2 overflow-scroll w-full bg-bgcommon h-screen ">
      <ToastContainer />
      <Box></Box>
    </Box>
  );
};

export default memo(Dashboard);
