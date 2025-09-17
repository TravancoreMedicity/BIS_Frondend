import React, { memo, useMemo, useState } from "react";
import { Box, Typography } from "@mui/joy";
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, startOfMonth } from "date-fns";
import KMCHeader from "../../BIS_CommoCode/KMCHeader"
import { getkmcOpDetails } from "../../../../api/commonAPI"
import Kmc_OPYearWise from "./Kmc_OPYearWise";
import Kmc_OpDeptWise from "./Kmc_OpDeptWise";
import Kmc_DrWise from "./Kmc_DrWise";
import Kmc_AllOpDeptWise from "./Kmc_AllOpDeptWise";
import OverallSalesProgress from "../../BIS_CommoCode/OverallSalesProgress";
import { barOptions, lineOptions } from "../../BIS_CommoCode/CommonDateRange/ChartCommonFuns/ChartCommonFun";

const Kmch_Op_statistics = () => {

    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dr_fromDate, setdr_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dr_toDate, setdr_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_all_fromDate, setdept_all_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_all_toDate, setdept_all_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_fromDate, setdept_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_toDate, setdept_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));

    // const payloadDatas = useMemo(() => {
    //     return {
    //         fromDate: fromDate,
    //         toDate: toDate
    //     }
    // }, [fromDate, toDate])
    const payloadDatas = useMemo(() => {
        try {
            // Check if fromDate and toDate are valid date objects or valid date strings
            const from = new Date(fromDate);
            const to = new Date(toDate);

            // Check if dates are valid
            if (isNaN(from.getTime()) || isNaN(to.getTime())) {
                throw new Error("Invalid date format");
            }

            return {
                fromDate: from,
                toDate: to
            };
        } catch (error) {
            console.error("Error creating payloadDatas:", error.message);
            return null;
        }
    }, [fromDate, toDate]);

    //usequery
    const { data: OpDetails } = useQuery({
        queryKey: ['opDataDetails', payloadDatas], // include payload in queryKey to cache per payload
        queryFn: () => getkmcOpDetails(payloadDatas),
        enabled: !!payloadDatas, // ensures payload exists before running
    })


    // op_visit_date
    const data = {
        labels: OpDetails?.map(val => val.kmc_op_visit_date) || [],

        datasets: OpDetails
            ? [
                {
                    label: 'Total Outpatients',
                    data: OpDetails?.map(val => val.kmc_op_total_op) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'New Patients',
                    data: OpDetails?.map(val => val.kmc_op_new_reg) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Visit',
                    data: OpDetails?.map(val => val.kmc_op_visit) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [],
    };

    //Doctorwise OP Count

    return (
        <Box
            sx={{
                width: "100%",
                height: { xl: 900, sm: 1200 },
                overflow: "auto",
            }}
        >
            <KMCHeader />
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
                <DashboardCard title="Out Patient Count">
                    <OverallSalesProgress Graphicaldata={data} Displaystyle={1} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} barOptions={barOptions}
                        lineOptions={lineOptions} />
                </DashboardCard>
                <DashboardCard title="Out Patient Count (Year Wise)">
                    <Kmc_OPYearWise />
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
                <DashboardCard title="Out Patient Department Wise">
                    <Kmc_OpDeptWise fromDate={dept_fromDate} setFromDate={setdept_FromDate} toDate={dept_toDate} setToDate={setdept_ToDate} />
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
                <DashboardCard title="Doctor Wise Total OP Count">
                    <Kmc_DrWise Displaystyle={1} fromDate={dr_fromDate} setFromDate={setdr_FromDate} toDate={dr_toDate} setToDate={setdr_ToDate} />
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
                <DashboardCard title="Out Patient Department Wise (Largest to Smallest)">
                    <Kmc_AllOpDeptWise Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
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

export default memo(Kmch_Op_statistics);




