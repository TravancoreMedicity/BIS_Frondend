import React, { memo, useMemo, useState } from "react";
import { Box, Typography } from "@mui/joy";
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, startOfMonth } from "date-fns";
import { getOpDetails } from "../../../../api/commonAPI";
import Tmch_OP_IP_Statistics from "./Tmc_OP_IP_Statistics";
import Tmch_OP_IP_Deptwise from "./Tmc_OP_IP_Deptwise";
import Tmch_Dr_Wise_IP_OP from "./Tmc_Dr_Wise_IP_OP";
import Tmch_IP_OP_LabStatistics from "./Tmc_IP_OP_LabStatistics";
import Tmch_IP_OP_ReadioStastistics from "./Tmc_IP_OP_ReadioStastistics";
import CommonHeader from "../../BIS_CommoCode/CommonHeader"
import Pharmacy_Statistics from "./Pharmacy_Statistics";
import IP_occupanncy from "./IP_occupanncy";
import GeneralBilling from "./GeneralBilling";

const Tmch_Patient_Statiatics = () => {

    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dr_fromDate, setdr_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dr_toDate, setdr_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_all_fromDate, setdept_all_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_all_toDate, setdept_all_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_fromDate, setdept_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_toDate, setdept_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));

    const payloadDatas = useMemo(() => {
        return {
            fromDate: fromDate,
            toDate: toDate
        }
    }, [fromDate, toDate])

    //usequery
    const { data: OpDetails } = useQuery({
        queryKey: ['opDataDetails', payloadDatas], // include payload in queryKey to cache per payload
        queryFn: () => getOpDetails(payloadDatas),
        enabled: !!payloadDatas, // ensures payload exists before running
    })


    // op_visit_date
    const data = {
        labels: OpDetails?.map(val => val.tmc_op_visit_date) || [],

        datasets: OpDetails
            ? [
                {
                    label: 'Total Outpatients',
                    data: OpDetails?.map(val => val.tmc_op_total_op) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'New Patients',
                    data: OpDetails?.map(val => val.tmc_op_new_reg) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Visit',
                    data: OpDetails?.map(val => val.tmc_op_visit) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [],
    };


    return (
        <Box
            sx={{
                width: "100%",
                height: { xl: 900, sm: 1200 },
                overflow: "auto",
            }}
        >
            <CommonHeader />

            {/* Row 1 */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: "100%"
                }}
            >
                <DashboardCard title="OP/IP Count">
                    <Tmch_OP_IP_Statistics Displaystyle={1} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
                </DashboardCard>
            </Box>

            {/* Row 2 */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                }}
            >
                <DashboardCard title="OP/IP Department Wise">
                    <Tmch_OP_IP_Deptwise fromDate={dept_fromDate} setFromDate={setdept_FromDate} toDate={dept_toDate} setToDate={setdept_ToDate} />
                </DashboardCard>
            </Box>

            {/* Row 3 */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: { sm: '100%', xl: "100%" },
                }}
            >
                <DashboardCard title="Doctor Wise Total OP/IP Count">
                    <Tmch_Dr_Wise_IP_OP Displaystyle={1} fromDate={dr_fromDate} setFromDate={setdr_FromDate} toDate={dr_toDate} setToDate={setdr_ToDate} />
                </DashboardCard>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: { sm: '100%', xl: "100%" },
                }}
            >
                <DashboardCard title="Laboratory Test Statistics">
                    <Tmch_IP_OP_LabStatistics Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
                </DashboardCard>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: { sm: '100%', xl: "100%" },
                }}
            >
                <DashboardCard title="Radiology Test Statistics">
                    <Tmch_IP_OP_ReadioStastistics Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
                </DashboardCard>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: { sm: '100%', xl: "100%" },
                }}
            >
                <DashboardCard title="Pharmacy Statistics">
                    <Pharmacy_Statistics Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
                </DashboardCard>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: { sm: '100%', xl: "100%" },
                }}
            >
                <DashboardCard title="IP Occupancy">
                    <IP_occupanncy Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
                </DashboardCard>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    px: 2,
                    mt: 1,
                    width: { sm: '100%', xl: "100%" },
                }}
            >
                <DashboardCard title="General Billing">
                    <GeneralBilling Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
                </DashboardCard>
            </Box>
        </Box>
    );
};

// Reusable card component
const DashboardCard = ({ title, children }) => (
    <Box
        sx={{
            flex: 1,
            border: 1,
            borderColor: "#d2d2cf",
            width: " 100%",
            p: 1,
            overflowX: "scroll"
        }}
    >
        <Typography
            sx={{
                textAlign: "center",
                fontSize: 20,
                color: 'rgba(var(--font-light))',
                mb: 1,
            }}
        >
            {title}
        </Typography>
        {children}
    </Box>
);

export default memo(Tmch_Patient_Statiatics);



