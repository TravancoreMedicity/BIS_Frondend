import React, { memo, useMemo, useState } from "react";
import { Box, Typography } from "@mui/joy";
import { useQuery } from '@tanstack/react-query';
import { addDays, format, startOfWeek, subWeeks } from "date-fns";
import KMCHeader from "../BIS_CommoCode/KMCHeader";
import { getgraphicalViewRights, getKmcdischargeDetails, getKmcIpDetails, getKmclabDetails, getkmcOpDetails, getKmcpharmacyDetails, getKmcradiologyDetails } from "../../../api/commonAPI";
import { barOptions, lineOptions } from "../BIS_CommoCode/CommonDateRange/ChartCommonFuns/ChartCommonFun";
import OverallSalesProgress from "../BIS_CommoCode/OverallSalesProgress";
const KmcDashboard = () => {

    const authNo = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo);

    // fetch user allowed menu items
    const { data: graphicalViewRights = [] } = useQuery({
        queryKey: ["graphicalViewRight", authNo],
        queryFn: () => getgraphicalViewRights(authNo),
        enabled: !!authNo,
        staleTime: Infinity,
    });


    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const [fromDate, setFromDate] = useState(format(new Date(startOfLastWeek), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(endOfLastWeek), "yyyy-MM-dd"));

    const [ipfromDate, setIpFromDate] = useState(format(new Date(startOfLastWeek), "yyyy-MM-dd"));
    const [iptoDate, setIpToDate] = useState(format(new Date(endOfLastWeek), "yyyy-MM-dd"));

    const [phfromDate, setPhFromDate] = useState(format(new Date(startOfLastWeek), "yyyy-MM-dd"));
    const [phtoDate, setPhToDate] = useState(format(new Date(endOfLastWeek), "yyyy-MM-dd"));


    const [dcfromDate, setdcFromDate] = useState(format(new Date(startOfLastWeek), "yyyy-MM-dd"));
    const [dctoDate, setdcToDate] = useState(format(new Date(endOfLastWeek), "yyyy-MM-dd"));


    const [labfromDate, setlabFromDate] = useState(format(new Date(startOfLastWeek), "yyyy-MM-dd"));
    const [labtoDate, setlabToDate] = useState(format(new Date(endOfLastWeek), "yyyy-MM-dd"));

    const [radfromDate, setradFromDate] = useState(format(new Date(startOfLastWeek), "yyyy-MM-dd"));
    const [radtoDate, setradToDate] = useState(format(new Date(endOfLastWeek), "yyyy-MM-dd"));


    const payloadDatas = useMemo(() => {
        return {
            fromDate: fromDate,
            toDate: toDate
        }
    }, [fromDate, toDate])

    const ipPayloadDatas = useMemo(() => {
        return {
            fromDate: ipfromDate,
            toDate: iptoDate
        }
    }, [ipfromDate, iptoDate])

    const phPayloadDatas = useMemo(() => {
        return {
            fromDate: phfromDate,
            toDate: phtoDate
        }
    }, [phfromDate, phtoDate])


    const dcPayloadDatas = useMemo(() => {
        return {
            fromDate: dcfromDate,
            toDate: dctoDate
        }
    }, [dcfromDate, dctoDate])

    const labPayloadDatas = useMemo(() => {
        return {
            fromDate: labfromDate,
            toDate: labtoDate
        }
    }, [labfromDate, labtoDate])

    const radPayloadDatas = useMemo(() => {
        return {
            fromDate: radfromDate,
            toDate: radtoDate
        }
    }, [radfromDate, radtoDate])

    //usequery
    const { data: OpDetails } = useQuery({
        queryKey: ['opDataDetails', payloadDatas], // include payload in queryKey to cache per payload
        queryFn: () => getkmcOpDetails(payloadDatas),
        enabled: !!payloadDatas, // ensures payload exists before running
    })

    //inpatient Details
    const { data: IpDetails } = useQuery({
        queryKey: ['ipDataDetails', ipPayloadDatas],
        queryFn: () => getKmcIpDetails(ipPayloadDatas),
        enabled: !!ipPayloadDatas,
    })

    const { data: PharmacyDetails } = useQuery({
        queryKey: ['pharmacyDataDetails', phPayloadDatas],
        queryFn: () => getKmcpharmacyDetails(phPayloadDatas),
        enabled: !!phPayloadDatas,
    })

    const { data: DischargeDetails } = useQuery({
        queryKey: ['dischargeDataDetails', dcPayloadDatas],
        queryFn: () => getKmcdischargeDetails(dcPayloadDatas),
        enabled: !!dcPayloadDatas,
    })

    const { data: labDetails } = useQuery({
        queryKey: ['labDataDetails', labPayloadDatas],
        queryFn: () => getKmclabDetails(labPayloadDatas),
        enabled: !!labPayloadDatas,
    })

    const { data: radiologyDetails } = useQuery({
        queryKey: ['radiologyDataDetails', radPayloadDatas],
        queryFn: () => getKmcradiologyDetails(radPayloadDatas),
        enabled: !!radPayloadDatas,
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
    const InpatientData = {
        labels: IpDetails?.map(val => val.kmc_ip_date) || [],

        datasets: IpDetails
            ?
            [
                {
                    label: 'Total Admission',
                    data: IpDetails?.map(val => val.kmc_ip_total_admission) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Total Discharge',
                    data: IpDetails?.map(val => val.kmc_ip_total_discharge) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Dama',
                    data: IpDetails?.map(val => val.kmc_ip_dama) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [], // if no OpDetails, show empty chart
    };

    const pharmacySales = {
        labels: PharmacyDetails?.map(val => val.kmc_ph_transaction_date) || [],

        datasets: PharmacyDetails
            ? [
                {
                    label: 'Total Bill',
                    data: PharmacyDetails?.map(val => val.kmc_ph_total_bill_count) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Return ',
                    data: PharmacyDetails?.map(val => val.kmc_ph_total_return_count) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Net Amount',
                    data: PharmacyDetails?.map(val => val.kmc_ph_total_gross) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [], // if no OpDetails, show empty chart
    };

    const dischargeDatas = {
        labels: DischargeDetails?.map(val => val.kmc_dc_date) || [],

        datasets: DischargeDetails
            ? [
                {
                    label: 'Total Bill Amount',
                    data: DischargeDetails?.map(val => val.kmc_dc_total_bill_amount) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Receipt',
                    data: DischargeDetails?.map(val => val.kmc_dc_receipt_count) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Advance',
                    data: DischargeDetails?.map(val => val.kmc_dc_advance_amount) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [], // if no OpDetails, show empty chart
    };

    const labDatas = {
        labels: labDetails?.map(val => val.kmc_lab_date) || [],

        datasets: labDetails
            ? [
                {
                    label: 'Total Billing',
                    data: labDetails?.map(val => val.kmc_lab_total_count) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Ip Billing',
                    data: labDetails?.map(val => val.kmc_lab_ip_total_count) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Op Billing',
                    data: labDetails?.map(val => val.kmc_lab_op_total_count) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
                {
                    label: 'Return',
                    data: labDetails?.map(val => val.kmc_lab_refund_count) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [], // if no OpDetails, show empty chart
    };
    const radiologyDatas = {
        labels: radiologyDetails?.map(val => val.kmc_rad_date) || [],

        datasets: radiologyDetails
            ? [
                {
                    label: 'Total Billing',
                    data: radiologyDetails?.map(val => val.kmc_rad_total_count) || [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(96, 94, 163, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Ip Billing',
                    data: radiologyDetails?.map(val => val.kmc_rad_ip_total_count) || [],
                    borderColor: 'rgba(44, 80, 103, 0.95)',
                    backgroundColor: 'rgba(12, 132, 162, 0.50)',
                    barThickness: 50,
                },
                {
                    label: 'Op Billing',
                    data: radiologyDetails?.map(val => val.kmc_rad_op_total_count) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
                {
                    label: 'Return',
                    data: radiologyDetails?.map(val => val.kmc_rad_refund_count) || [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(184, 62, 143, 0.48)',
                    barThickness: 50,
                },
            ]
            : [],
    };
    //graph component arr
    const dashboardCards = [
        {
            title: "Out Patient Count",
            Graphicaldata: data,
            Displaystyle: 1,
            fromDate,
            setFromDate,
            toDate,
            setToDate,
            view_sub_menu_slno: 7
        },
        {
            title: "In Patient Count",
            Graphicaldata: InpatientData,
            Displaystyle: 2,
            fromDate: ipfromDate,
            setFromDate: setIpFromDate,
            toDate: iptoDate,
            setToDate: setIpToDate,
            view_sub_menu_slno: 8
        },
        {
            title: "Pharmacy Sales",
            Graphicaldata: pharmacySales,
            Displaystyle: 3,
            fromDate: phfromDate,
            setFromDate: setPhFromDate,
            toDate: phtoDate,
            setToDate: setPhToDate,
            view_sub_menu_slno: 9
        },
        {
            title: "Discharge",
            Graphicaldata: dischargeDatas,
            Displaystyle: 1,
            fromDate: dcfromDate,
            setFromDate: setdcFromDate,
            toDate: dctoDate,
            setToDate: setdcToDate,
            view_sub_menu_slno: 10
        },
        {
            title: "Laborotary",
            Graphicaldata: labDatas,
            Displaystyle: 2,
            fromDate: labfromDate,
            setFromDate: setlabFromDate,
            toDate: labtoDate,
            setToDate: setlabToDate,
            view_sub_menu_slno: 11
        },
        {
            title: "Radiology",
            Graphicaldata: radiologyDatas,
            Displaystyle: 3,
            fromDate: radfromDate,
            setFromDate: setradFromDate,
            toDate: radtoDate,
            setToDate: setradToDate,
            view_sub_menu_slno: 12
        },
    ];

    const allowedSubMenus = graphicalViewRights.map((item) => item.view_sub_menu_slno);

    // ✅ Filter dashboardCards based on allowed submenus
    const filteredCards = dashboardCards.filter((card) =>
        allowedSubMenus.includes(card.view_sub_menu_slno)
    );

    return (
        // <Box
        //     sx={{
        //         flex: 1,
        //         width: "100%",
        //         height: { xl: 900, sm: 1200 },
        //         overflow: "auto",
        //     }}
        // >
        //     <KMCHeader />

        //     <Box
        //         sx={{
        //             display: "grid",
        //             gap: 2,
        //             px: 2,
        //             mt: 1,
        //             gridTemplateColumns: {
        //                 xs: "repeat(2, 1fr)",
        //                 sm: "repeat(2, 1fr)",
        //                 md: "repeat(2, 1fr)",
        //             },
        //         }}
        //     >
        //         {filteredCards.map((card, idx) => (
        //             <DashboardCard
        //                 key={idx}
        //                 title={`${card.title}`} // 👈 show submenu ID too if you want
        //             >
        //                 <OverallSalesProgress
        //                     Graphicaldata={card.Graphicaldata}
        //                     Displaystyle={card.Displaystyle}
        //                     fromDate={card.fromDate}
        //                     setFromDate={card.setFromDate}
        //                     toDate={card.toDate}
        //                     setToDate={card.setToDate}
        //                 />
        //             </DashboardCard>
        //         ))}
        //     </Box>
        // </Box>

        <Box
            sx={{
                flex: 1,
                width: "100%",
                height: { xl: 900, sm: 1200 },
                overflow: "auto",
            }}
        >
            <KMCHeader />

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    px: 2,
                    mt: 1,
                    flexWrap: "wrap", // ✅ allow wrapping
                }}
            >
                {filteredCards?.map((card, idx) => (
                    <DashboardCard
                        key={idx}
                        title={`${card.title}`}
                    >
                        <OverallSalesProgress
                            Graphicaldata={card.Graphicaldata}
                            Displaystyle={card.Displaystyle}
                            fromDate={card.fromDate}
                            setFromDate={card.setFromDate}
                            toDate={card.toDate}
                            setToDate={card.setToDate}
                            barOptions={barOptions}
                            lineOptions={lineOptions}
                        />
                    </DashboardCard>
                ))}
            </Box>
        </Box>
    );
};

// Reusable card component
const DashboardCard = ({ title, children }) => (
    <Box
        sx={{
            flex: "1 1 calc(50% - 16px)", // take ~50% width with gap
            minWidth: "300px",             //don’t shrink below
            border: 1,
            borderColor: "#d2d2cf",
            p: 1,
            overflowX: "auto",
        }}
    >
        <Typography
            sx={{
                textAlign: "center",
                fontSize: 20,
                color: "rgba(var(--font-light))",
                mb: 1,
            }}
        >
            {title}
        </Typography>
        {children}
    </Box>
);

export default memo(KmcDashboard);
