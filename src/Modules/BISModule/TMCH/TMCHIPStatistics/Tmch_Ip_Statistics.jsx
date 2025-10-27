import React, { memo, useMemo, useState } from "react";
import { Box, Typography } from "@mui/joy";
import { useQuery } from '@tanstack/react-query';
import { endOfMonth, format, startOfMonth } from "date-fns";
import { getIpDetails } from "../../../../api/commonAPI"
import Tmc_IPYearWise from "./Tmc_IPYearWise";
import Tmc_IpDeptWise from "./Tmc_IpDeptWise";
import Tmc_IpDrWise from "./Tmc_IpDrWise";
import Tmc_AllIpDeptWise from "./Tmc_AllIpDeptWise";
import OverallSalesProgress from "../../BIS_CommoCode/OverallSalesProgress";
import { barOptions, lineOptions } from "../../BIS_CommoCode/CommonDateRange/ChartCommonFuns/ChartCommonFun";
import CommonHeader from "../../BIS_CommoCode/CommonHeader";

const Tmch_Ip_Statistics = () => {

    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dr_fromDate, setdr_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dr_toDate, setdr_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_all_fromDate, setdept_all_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_all_toDate, setdept_all_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_fromDate, setdept_FromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
    const [dept_toDate, setdept_ToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));

    const payloadDatas = useMemo(() => {
        try {
            const from = new Date(fromDate);
            const to = new Date(toDate);

            const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());

            return {
                fromDate: isValidDate(from) ? fromDate : null,
                toDate: isValidDate(to) ? toDate : null,
            };
        } catch (error) {
            console.error("Error validating payload dates:", error);
            return { fromDate: null, toDate: null }; // fallback
        }
    }, [fromDate, toDate]);

    //usequery
    const { data: IpDetails } = useQuery({
        queryKey: ['ipDataDetails', payloadDatas], // include payload in queryKey to cache per payload
        queryFn: () => getIpDetails(payloadDatas),
        enabled: !!payloadDatas, // ensures payload exists before running
    })

    const data = {
        labels: IpDetails?.map(val => val.tmc_ip_date) || [],
        datasets: IpDetails
            ? [
                {
                    label: 'Total Admission',
                    data: IpDetails?.map(val => val.tmc_ip_total_admission) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Total Discharge',
                    data: IpDetails?.map(val => val.tmc_ip_total_discharge) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Dama',
                    data: IpDetails?.map(val => val.tmc_ip_dama) || [],
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
                <DashboardCard title="Inpatient Count">
                    <OverallSalesProgress Graphicaldata={data} Displaystyle={1} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} barOptions={barOptions}
                        lineOptions={lineOptions} />
                </DashboardCard>
                <DashboardCard title="Inpatient Count (Year Wise)">
                    <Tmc_IPYearWise />
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
                <DashboardCard title="Inpatient Department Wise">
                    <Tmc_IpDeptWise fromDate={dept_fromDate} setFromDate={setdept_FromDate} toDate={dept_toDate} setToDate={setdept_ToDate} />
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
                <DashboardCard title="Doctor Wise Total Inpatient Count">
                    <Tmc_IpDrWise Displaystyle={1} fromDate={dr_fromDate} setFromDate={setdr_FromDate} toDate={dr_toDate} setToDate={setdr_ToDate} />
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
                <DashboardCard title="Inpatient Department Wise (Largest to Smallest)">
                    <Tmc_AllIpDeptWise Displaystyle={1} fromDate={dept_all_fromDate} setFromDate={setdept_all_FromDate} toDate={dept_all_toDate} setToDate={setdept_all_ToDate} />
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

export default memo(Tmch_Ip_Statistics);





