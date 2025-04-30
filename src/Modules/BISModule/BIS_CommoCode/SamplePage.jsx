
// import React, { memo, useMemo, useState } from "react";
// import { Box, Typography } from "@mui/joy";
// import CommonHeader from "../BISModule/BIS_CommoCode/CommonHeader";
// import OverallSalesProgress from "../BISModule/BIS_CommoCode/SalesProgress/OverallSalesProgress";
// // import MainGraph from "../BISModule/BIS_CommoCode/GraphicalOverview/MainGraph";
// // import BiotechIcon from '@mui/icons-material/Biotech';
// // import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';
// // import RadiologyGraphicalRep from "../BISModule/BIS_CommoCode/RadiologyGraphicalRep";
// import { getIpDetails, getOpDetails, getpharmacyDetails, getdischargeDetails, getlabDetails, getradiologyDetails } from "../../api/commonAPI";
// import { useQuery } from '@tanstack/react-query';

const SamplePage = () => {

    // const queryClient = useQueryClient()

    // const [fromDate, setFromDate] = useState(new Date());
    // const [toDate, setToDate] = useState(new Date());

    // const [ipfromDate, setIpFromDate] = useState(new Date());
    // const [iptoDate, setIpToDate] = useState(new Date());

    // const [phfromDate, setPhFromDate] = useState(new Date());
    // const [phtoDate, setPhToDate] = useState(new Date());


    // const [dcfromDate, setdcFromDate] = useState(new Date());
    // const [dctoDate, setdcToDate] = useState(new Date());


    // const [labfromDate, setlabFromDate] = useState(new Date());
    // const [labtoDate, setlabToDate] = useState(new Date());

    // const [radfromDate, setradFromDate] = useState(new Date());
    // const [radtoDate, setradToDate] = useState(new Date());


    // const payloadDatas = useMemo(() => {
    //     return {
    //         fromDate: fromDate,
    //         toDate: toDate
    //     }
    // }, [fromDate, toDate])

    // const ipPayloadDatas = useMemo(() => {
    //     return {
    //         fromDate: ipfromDate,
    //         toDate: iptoDate
    //     }
    // }, [ipfromDate, iptoDate])

    // const phPayloadDatas = useMemo(() => {
    //     return {
    //         fromDate: phfromDate,
    //         toDate: phtoDate
    //     }
    // }, [phfromDate, phtoDate])


    // const dcPayloadDatas = useMemo(() => {
    //     return {
    //         fromDate: dcfromDate,
    //         toDate: dctoDate
    //     }
    // }, [dcfromDate, dctoDate])

    // const labPayloadDatas = useMemo(() => {
    //     return {
    //         fromDate: labfromDate,
    //         toDate: labtoDate
    //     }
    // }, [labfromDate, labtoDate])

    // const radPayloadDatas = useMemo(() => {
    //     return {
    //         fromDate: radfromDate,
    //         toDate: radtoDate
    //     }
    // }, [radfromDate, radtoDate])

    // //usequery
    // //op Details
    // const { data: OpDetails } = useQuery({
    //     queryKey: ['opDataDetails', payloadDatas], // include payload in queryKey to cache per payload
    //     queryFn: () => getOpDetails(payloadDatas),
    //     enabled: !!payloadDatas, // ensures payload exists before running
    // })

    // //inpatient Details
    // const { data: IpDetails } = useQuery({
    //     queryKey: ['ipDataDetails', ipPayloadDatas],
    //     queryFn: () => getIpDetails(ipPayloadDatas),
    //     enabled: !!ipPayloadDatas,
    // })

    // const { data: PharmacyDetails } = useQuery({
    //     queryKey: ['pharmacyDataDetails', phPayloadDatas],
    //     queryFn: () => getpharmacyDetails(phPayloadDatas),
    //     enabled: !!phPayloadDatas,
    // })

    // const { data: DischargeDetails } = useQuery({
    //     queryKey: ['dischargeDataDetails', dcPayloadDatas],
    //     queryFn: () => getdischargeDetails(dcPayloadDatas),
    //     enabled: !!dcPayloadDatas,
    // })

    // const { data: labDetails } = useQuery({
    //     queryKey: ['labDataDetails', labPayloadDatas],
    //     queryFn: () => getlabDetails(labPayloadDatas),
    //     enabled: !!labPayloadDatas,
    // })

    // const { data: radiologyDetails } = useQuery({
    //     queryKey: ['radiologyDataDetails', radPayloadDatas],
    //     queryFn: () => getradiologyDetails(radPayloadDatas),
    //     enabled: !!radPayloadDatas,
    // })
    // console.log("radiologyDetails", radiologyDetails);

    // // op_visit_date
    // const data = {
    //     labels: OpDetails?.map(val => val.op_visit_date) || [],

    //     datasets: OpDetails
    //         ? [
    //             {
    //                 label: 'Total Outpatients',
    //                 data: OpDetails?.map(val => val.op_total_op) || [],
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'New Patients',
    //                 data: OpDetails?.map(val => val.op_new_reg) || [],
    //                 borderColor: 'rgba(44, 80, 103, 0.95)',
    //                 backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Visit',
    //                 data: OpDetails?.map(val => val.op_visit) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //         ]
    //         : [],
    // };


    // const pharmacySales = {
    //     labels: PharmacyDetails?.map(val => val.ph_transaction_date) || [],

    //     datasets: PharmacyDetails
    //         ? [
    //             {
    //                 label: 'Total Bill',
    //                 data: PharmacyDetails?.map(val => val.ph_total_bill_count) || [],
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Return ',
    //                 data: PharmacyDetails?.map(val => val.ph_total_return_count) || [],
    //                 borderColor: 'rgba(44, 80, 103, 0.95)',
    //                 backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Net Amount',
    //                 data: PharmacyDetails?.map(val => val.ph_total_gross) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //         ]
    //         : [], // if no OpDetails, show empty chart
    // };

    // const InpatientData = {
    //     labels: IpDetails?.map(val => val.ip_date) || [],

    //     datasets: IpDetails
    //         ?
    //         [
    //             {
    //                 label: 'Total Admission',
    //                 data: IpDetails?.map(val => val.ip_total_admission) || [],
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Total Discharge',
    //                 data: IpDetails?.map(val => val.ip_total_discharge) || [],
    //                 borderColor: 'rgba(44, 80, 103, 0.95)',
    //                 backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Dama',
    //                 data: IpDetails?.map(val => val.ip_dama) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //         ]
    //         : [], // if no OpDetails, show empty chart
    // };

    // const dischargeDatas = {
    //     labels: DischargeDetails?.map(val => val.dc_date) || [],

    //     datasets: DischargeDetails
    //         ? [
    //             {
    //                 label: 'Total Bill Amount',
    //                 data: DischargeDetails?.map(val => val.dc_total_bill_amount) || [],
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Receipt',
    //                 data: DischargeDetails?.map(val => val.dc_receipt_count) || [],
    //                 borderColor: 'rgba(44, 80, 103, 0.95)',
    //                 backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Advance',
    //                 data: DischargeDetails?.map(val => val.dc_advance_amount) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //         ]
    //         : [], // if no OpDetails, show empty chart
    // };

    // const labDatas = {
    //     labels: labDetails?.map(val => val.lab_date) || [],

    //     datasets: labDetails
    //         ? [
    //             {
    //                 label: 'Total Billing',
    //                 data: labDetails?.map(val => val.lab_total_count) || [],
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Ip Billing',
    //                 data: labDetails?.map(val => val.lab_ip_total_count) || [],
    //                 borderColor: 'rgba(44, 80, 103, 0.95)',
    //                 backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Op Billing',
    //                 data: labDetails?.map(val => val.lab_op_total_count) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Return',
    //                 data: labDetails?.map(val => val.lab_refund_count) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //         ]
    //         : [], // if no OpDetails, show empty chart
    // };
    // const radiologyDatas = {
    //     labels: radiologyDetails?.map(val => val.rad_date) || [],

    //     datasets: radiologyDetails
    //         ? [
    //             {
    //                 label: 'Total Billing',
    //                 data: radiologyDetails?.map(val => val.rad_total_count) || [],
    //                 borderColor: 'rgb(75, 192, 192)',
    //                 backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Ip Billing',
    //                 data: radiologyDetails?.map(val => val.rad_ip_total_count) || [],
    //                 borderColor: 'rgba(44, 80, 103, 0.95)',
    //                 backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Op Billing',
    //                 data: radiologyDetails?.map(val => val.rad_op_total_count) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //             {
    //                 label: 'Return',
    //                 data: radiologyDetails?.map(val => val.rad_refund_count) || [],
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //                 barThickness: 50,
    //             },
    //         ]
    //         : [], // if no OpDetails, show empty chart
    // };
    //lab
    // const laboratoryData = {
    //   labels: ['2025-03-31', '2025-03-02', '2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'],
    //   datasets: [
    //     {
    //       label: 'Total Billing',
    //       data: [4150, 1350, 1426, 1000, 4369, 1358, 125, 258, 4231, 1036],
    //       borderColor: 'rgb(75, 192, 192)',
    //       backgroundColor: 'rgba(96, 94, 163, 0.50)',
    //       barThickness: 50,
    //     },
    //     {
    //       label: 'Ip Billing',
    //       data: [1200, 1300, 1900, 1500, 9000, 1300, 1250, 1259, 742, 3654],
    //       borderColor: 'rgba(44, 80, 103, 0.95)',
    //       backgroundColor: 'rgba(12, 132, 162, 0.50)',
    //       barThickness: 50,
    //     },
    //     {
    //       label: 'Op Billing',
    //       data: [1150, 1190, 1215, 1070, 1900, 1415, 1758, 1023, 1123, 1789],
    //       borderColor: 'rgb(255, 99, 132)',
    //       backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //       barThickness: 50,
    //     },
    //     {
    //       label: 'Return',
    //       data: [1250, 1190, 2515, 4070, 900, 415, 1758, 1023, 123, 789],
    //       borderColor: 'rgb(255, 99, 132)',
    //       backgroundColor: 'rgba(184, 62, 143, 0.48)',
    //       barThickness: 50,
    //     },
    //   ],
    // };
    // const LabSections = [
    //   { slno: 1, label: "Biochemistry", color: 'rgba(54, 162, 235,2)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    //   { slno: 2, label: "Clinical Pathology", color: 'rgba(255, 99, 132,2)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    //   { slno: 3, label: "Haematology", color: 'rgba(80, 43, 7, 0.5)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    //   { slno: 4, label: "Microbiology", color: 'rgba(23, 107, 43, 0.5)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    // ];

    // const radiologySections = [
    //   { slno: 1, label: "MRI", color: 'rgba(144, 53, 135, 0.69)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    //   { slno: 2, label: "CT Scan", color: 'rgba(10, 73, 25, 0.73)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    //   { slno: 3, label: "X-Ray", color: 'rgba(153, 102, 255, 1)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    //   { slno: 4, label: "Ultrasound", color: 'rgba(20, 17, 117, 0.65)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    //   { slno: 5, label: "Mammography", color: 'rgba(103, 11, 19, 0.57)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    // ];


    // const labels = ['2025-03-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07'];

    // const LabSection = [
    //   { slno: 1, label: "Biochemistry", color: 'rgba(54, 162, 235, 0.5)' },
    //   { slno: 2, label: "Clinical Pathology", color: 'rgba(255, 99, 132, 0.5)' },
    //   { slno: 3, label: "Haematology", color: 'rgba(80, 43, 7, 0.5)' },
    //   { slno: 4, label: "Microbiology", color: 'rgba(23, 107, 43, 0.5)' },
    // ];

    // // Dummy data for each section (you would replace this with real values)
    // const labData = {
    //   "Biochemistry": [500, 450, 600, 550, 580, 590, 610],
    //   "Clinical Pathology": [220, 400, 330, 310, 340, 350, 360],
    //   "Haematology": [370, 290, 260, 280, 300, 310, 290],
    //   "Microbiology": [130, 140, 280, 155, 170, 180, 195],
    // };

    // const datasets = LabSection?.map(section => ({
    //   label: section.label,
    //   data: labData[section.label],
    //   borderColor: section.color.replace('0.5', '1'), // Make border more opaque
    //   backgroundColor: section.color,
    //   barThickness: 30,
    // }));

    // const LabData = {
    //   labels: labels,
    //   datasets: datasets
    // };

    // // radiology
    // const radiologySection = [
    //   { slno: 1, label: "MRI", color: 'rgba(144, 53, 135, 0.69)' },
    //   { slno: 2, label: "CT Scan", color: 'rgba(10, 73, 25, 0.73)' },
    //   { slno: 3, label: "X-Ray", color: 'rgba(153, 102, 255, 1)' },
    //   { slno: 4, label: "Ultrasound", color: 'rgba(20, 17, 117, 0.65)' },
    //   { slno: 5, label: "Mammography", color: 'rgba(103, 11, 19, 0.57)' },
    // ];

    // // Dummy data for each section (you would replace this with real values)
    // const radioData = {
    //   "MRI": [100, 450, 600, 120, 580, 590, 610],
    //   "CT Scan": [300, 300, 530, 310, 340, 350, 360],
    //   "X-Ray": [170, 290, 260, 280, 210, 310, 490],
    //   "Ultrasound": [550, 340, 130, 155, 170, 180, 175],
    //   "Mammography": [250, 70, 160, 155, 170, 180, 275],
    // };

    // const Datasss = radiologySection?.map(section => ({
    //   label: section.label,
    //   data: radioData[section.label],
    //   borderColor: section.color.replace('0.5', '1'),
    //   backgroundColor: section.color,
    //   barThickness: 30,
    // }));

    // const RadioData = {
    //   labels: labels,
    //   datasets: Datasss
    // };

    return (
        <Box>
            juijuipu
        </Box>
    )
    //         <Box
    //             sx={{
    //                 width: "100%",
    //                 // bgcolor: "#f5f5f5",
    //                 height: { xl: 900, sm: 1200 },
    //                 overflow: "auto",
    //             }}
    //         >
    //             <CommonHeader />
    //             {/* Row 1 */}
    //             <Box
    //                 sx={{
    //                     display: "flex",
    //                     flexDirection: { xs: "column", md: "row" },
    //                     gap: 2,
    //                     px: 2,
    //                     mt: 1,
    //                     width: "100%"
    //                 }}
    //             >

    //                 <DashboardCard title="Out Patient Count">
    //                     <OverallSalesProgress Graphicaldata={data} Displaystyle={1} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
    //                 </DashboardCard>
    //                 <DashboardCard title="In Patient Count">
    //                     <OverallSalesProgress Graphicaldata={InpatientData} Displaystyle={2}
    //                         fromDate={ipfromDate} setFromDate={setIpFromDate} toDate={iptoDate} setToDate={setIpToDate}
    //                     />
    //                 </DashboardCard>
    //             </Box>

    //             {/* Row 2 */}
    //             <Box
    //                 sx={{
    //                     display: "flex",
    //                     flexDirection: { xs: "column", md: "row" },
    //                     gap: 2,
    //                     px: 2,
    //                     mt: 1,
    //                 }}
    //             >
    //                 <DashboardCard title="Pharmacy Sales">
    //                     <OverallSalesProgress Graphicaldata={pharmacySales} Displaystyle={3} fromDate={phfromDate} setFromDate={setPhFromDate} toDate={phtoDate} setToDate={setPhToDate} />
    //                 </DashboardCard>
    //                 <DashboardCard title="Discharge">
    //                     <OverallSalesProgress Graphicaldata={dischargeDatas} Displaystyle={1} fromDate={dcfromDate} setFromDate={setdcFromDate} toDate={dctoDate} setToDate={setdcToDate} />
    //                 </DashboardCard>
    //             </Box>

    //             {/* Row 3 */}
    //             <Box
    //                 sx={{
    //                     display: "flex",
    //                     flexDirection: { xs: "column", md: "row" },
    //                     gap: 2,
    //                     px: 2,
    //                     mt: 1,
    //                     width: { sm: '100%', xl: "100%" },
    //                 }}
    //             >
    //                 <DashboardCard title="Laborotary">
    //                     {/* <MainGraph Graphicaldata={LabData} chartItems={LabSections} Displaystyle={2} DisplayData={LabData} /> */}
    //                     <OverallSalesProgress Graphicaldata={labDatas} Displaystyle={2} fromDate={labfromDate} setFromDate={setlabFromDate} toDate={labtoDate} setToDate={setlabToDate} />
    //                 </DashboardCard>
    //                 <DashboardCard title="Radiology">
    //                     {/* <RadiologyGraphicalRep Graphicaldata={RadioData} chartItems={radiologySections} Displaystyle={3} DisplayData={RadioData} /> */}
    //                     <OverallSalesProgress Graphicaldata={radiologyDatas} Displaystyle={3} fromDate={radfromDate} setFromDate={setradFromDate} toDate={radtoDate} setToDate={setradToDate} />
    //                 </DashboardCard>
    //             </Box>
    //             {/* <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: { xs: "column", md: "row" },
    //           gap: 2,
    //           px: 2,
    //           mt: 1,
    //           width: { sm: '100%', xl: "100%" },
    //         }}
    //       >
    //         <DashboardCard title="Biochemistry">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={1} DisplayData={LabData} />
    //         </DashboardCard>
    //         <DashboardCard title="Micro-Biology">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={2} DisplayData={RadioData} />
    //         </DashboardCard>
    //       </Box>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: { xs: "column", md: "row" },
    //           gap: 2,
    //           px: 2,
    //           mt: 1,
    //           width: { sm: '100%', xl: "100%" },
    //         }}
    //       >
    //         <DashboardCard title="Haematology">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={3} DisplayData={LabData} />
    //         </DashboardCard>
    //         <DashboardCard title="Clinical Pathology">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={1} DisplayData={RadioData} />
    //         </DashboardCard>
    //       </Box>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: { xs: "column", md: "row" },
    //           gap: 2,
    //           px: 2,
    //           mt: 1,
    //           width: { sm: '100%', xl: "100%" },
    //         }}
    //       >
    //         <DashboardCard title="MRI">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={2} DisplayData={LabData} />
    //         </DashboardCard>
    //         <DashboardCard title="CT-Scan">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={3} DisplayData={RadioData} />
    //         </DashboardCard>
    //       </Box>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: { xs: "column", md: "row" },
    //           gap: 2,
    //           px: 2,
    //           mt: 1,
    //           width: { sm: '100%', xl: "100%" },
    //         }}
    //       >
    //         <DashboardCard title="Ultrasound">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={1} DisplayData={LabData} />
    //         </DashboardCard>
    //         <DashboardCard title="Mammography">
    //           <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={2} DisplayData={RadioData} />
    //         </DashboardCard>
    //       </Box> */}
    //         </Box>
    //     );
    // };

    // // Reusable card component
    // const DashboardCard = ({ title, children }) => (
    //     <Box
    //         sx={{
    //             flex: 1,
    //             border: 1,
    //             borderColor: "#d2d2cf",
    //             width: " 100%",
    //             p: 1,
    //             overflowX: "scroll"
    //         }}
    //     >
    //         <Typography
    //             sx={{
    //                 textAlign: "center",
    //                 fontSize: 20,
    //                 color: 'rgba(var(--font-light))',
    //                 mb: 1,
    //             }}
    //         >
    //             {title}
    //         </Typography>
    //         {children}
    //     </Box>
    // );
}
export default memo(SamplePage);


