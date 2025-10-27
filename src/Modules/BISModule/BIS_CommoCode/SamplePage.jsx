
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

// const SamplePage = () => {

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

// return (
//     <Box>
//         juijuipu
//     </Box>
// )
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
// }
// export default memo(SamplePage);




// @ts-nocheck
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { Box, Grid, Typography } from '@mui/joy'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { succesNofity, errorNofity, sanitizeInput, warningNofity } from '../Constant/Constant';
import { axiosApi } from '../Axios/Axios';
import CopyRight from '../Components/CopyRight';
import { Skeleton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
const LoginlogoHeader = lazy(() => import("../../BISModule/BIS_CommoCode/LoginlogoHeader"))

const SamplePage = () => {
    const isSmallHeight = useMediaQuery('(max-height: 700px)');
    const navigate = useNavigate();

    // const userDetl = localStorage.getItem('app_auth');

    const [userInput, setUserInput] = useState({
        empid: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        empidError: '',
        passwordError: ''
    });
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        const sanitizedValue = sanitizeInput(value);
        handleError(name, sanitizedValue);
        setUserInput((prev) => {
            return { ...prev, [name]: sanitizedValue }
        })
    }, []);

    const handleError = (name, value) => {
        if (name === "empid") {
            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    empidError: "The field is empty"
                }))
            } else {
                setErrors((prev) => ({
                    ...prev,
                    empidError: ""
                }))
            }
        }
        if (name === "password") {
            if (value === "") {
                setErrors((prev) => ({
                    ...prev,
                    passwordError: "The password field is empty"
                }))
            } else {
                setErrors((prev) => ({
                    ...prev,
                    passwordError: ""
                }))
            }
        }
    };

    const postData = useMemo(() => {
        return {
            userName: userInput?.empid,
            passWord: userInput?.password,
            method: 1
        }
    }, [userInput])

    const handleloginform = useCallback(async () => {
        try {
            if (userInput?.empid === null || userInput?.empid === undefined || userInput?.empid === "") {
                setErrors((prev) => ({
                    ...prev,
                    empidError: "Employee Id Field is required"
                }))
            }

            if (userInput?.password === null || userInput?.password === undefined || userInput?.password === "") {
                setErrors((prev) => ({
                    ...prev,
                    passwordError: "Password Field is required"
                }));
                return;
            }

            const result = await axiosApi.post("/user/checkUserCres", postData, { withCredentials: true })
            const { message, success, userInfo } = result?.data;
            if (success === 0) {
                errorNofity(message); // database error
            } else if (success === 1) {
                warningNofity(message); // incorrected credientials
            } else if (success === 2) {
                succesNofity(message); // credential verified
                const { empdtl_slno, login_method_allowed, em_id } = JSON.parse(userInfo);
                const authData = {
                    authNo: btoa(empdtl_slno),//btoa() encodes a string into Base64 format.
                    authType: btoa(login_method_allowed),
                    authId: btoa(em_id),
                };
                localStorage.setItem("app_auth", JSON.stringify(authData));
                setTimeout(() => {
                    navigate("/Home/Dashboard", { replace: true });
                }, 2000);
            } else {
                errorNofity(message);
            }
        } catch (error) {
            warningNofity(error)
        }
    }, [postData, userInput, navigate]);


    // if (userDetl && location.pathname === '/') {
    //   return <Navigate to="/qrscan" replace />;
    // };

    return (
        <Grid
            container
            alignItems="stretch"
            justifyContent="center"
            sx={{
                width: '100vw',
                height: '100vh',
            }}>
            <Grid>
                <Box sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    paddingTop: { xs: isSmallHeight ? 10 : 0 },
                    alignItems: 'center',
                    justifyContent: { xs: isSmallHeight ? "none" : 'center', sm: 'center', md: 'center', lg: 'center' },
                    width: '100vw',
                }}>
                    <Suspense fallback={
                        <Skeleton
                            variant="circular"
                            width={80}
                            height={80}
                            sx={{
                                background: 'linear-gradient(45deg,rgba(123, 31, 162, 0.59),rgba(194, 24, 92, 0.6),rgba(25, 118, 210, 0.62))'
                            }}
                        />
                    }>
                        <LoginlogoHeader />
                    </Suspense>
                    <Box
                        sx={{
                            borderRadius: 2,
                            boxShadow: { xs: 0, sm: 3, lg: 3, xl: 3 },
                            width: { lg: '450px', md: '450px', sm: '450px', xs: '90%' },
                            height: '320px',
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Typography sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: 'rgb(32, 33, 32)',
                            fontSize: { xs: 12, sm: 16 },
                            fontWeight: { xs: 100, sm: 400 },
                        }}>Welcome Back, Please Log In!</Typography>
                        <TextField
                            sx={{
                                width: { xs: '100%', sm: '90%' },
                                marginTop: { xs: 3, sm: 2 }, height: 30, marginBottom: errors?.empidError ? 5 : 2,
                                fontFamily: "var(--font-varient)",
                            }}
                            id="outlined-emloyee-input"
                            label="Enter username"
                            type="text"
                            size='small'
                            name='empid'
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={!!errors?.empidError}
                            helperText={errors?.empidError}
                            value={userInput?.empid}
                        />
                        <TextField
                            sx={{
                                width: { xs: '100%', sm: '90%' }, marginTop: { xs: 3, sm: 2 }, height: 30,
                                marginBottom: errors?.passwordError ? 5 : 2,
                                fontFamily: "var(--font-varient)",
                            }}
                            id="outlined-password-input"
                            label="Enter Password"
                            type="password"
                            size='small'
                            name='password'
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={!!errors?.passwordError}
                            helperText={errors?.passwordError}
                            value={userInput?.password}
                        />
                        <Button sx={{
                            marginTop: { xs: 4, sm: 2 },
                            width: { xs: '99%', sm: '90%' },
                            height: { lg: 40, sm: 40, xs: 40 },
                            fontWeight: { xs: 200, sm: 400 },
                            borderRadius: { xs: 10, sm: 3 }
                        }}
                            variant="contained"
                            onClick={handleloginform}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleloginform()
                                }
                            }}
                        >LogIn Here</Button>
                        <Typography
                            sx={{
                                display: { xs: 'block', sm: 'block' },
                                marginTop: 1,
                                color: 'rgb(53, 54, 53)',
                                fontSize: { xs: 10, sm: 13 },
                                fontWeight: { xs: 100, sm: 400 }
                            }}
                        >I acknowledge the rules and agree to comply.</Typography>
                        <Link
                            variant="contained"
                            sx={{
                                // marginTop: { sm: 1 },
                                cursor: 'pointer',
                                fontSize: { xs: 11, sm: 14, lg: 13 },
                                fontWeight: { xs: 200, sm: 400 },
                                color: 'rgb(53, 54, 53)',
                            }}
                        >Forget Password?</Link>
                    </Box>
                </Box>
                <CopyRight />
            </Grid>
        </Grid>
    );
};
export default memo(SamplePage);


// import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
// import React, { memo, useCallback, useState, useEffect } from 'react';
// import {
//     addDays,
//     eachDayOfInterval,
//     eachMonthOfInterval,
//     endOfMonth,
//     format,
//     isValid,
//     isWithinInterval,
//     startOfMonth,
//     startOfWeek,
//     subMonths,
//     subWeeks
// } from "date-fns";
// import { Bar, Line, PolarArea } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     RadialLinearScale,
//     ArcElement
// } from 'chart.js';
// import GraphicalRep from './GraphicalRep';
// import CommonDateComp from './CommonDateRange/CommonDateComp';
// // import SelectGraphicalView from '../SelectGraphicalView';
// // import GraphicalRep from '../GraphicalRep';

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     RadialLinearScale,
//     ArcElement
// );

// const ensureNumber = (num) => {
//     if (!Number(num)) {
//         return 0
//     }

//     if (isNaN(Number(num))) {
//         return 0
//     }

//     return Number(num)
// }

// const OverallSalesProgress = ({ Graphicaldata, Displaystyle, fromDate, setFromDate, toDate, setToDate }) => {


//     const StyleMode = ensureNumber(Displaystyle)
//     // parseInt(Displaystyle);

//     const [dayCount, setDayCount] = useState(2);
//     // const [fromDate, setFromDate] = useState('');
//     // const [toDate, setToDate] = useState('');
//     const [chartData, setChartData] = useState(Graphicaldata);
//     const [Chartlayout, seChartlayout] = useState(StyleMode);

//     const Todays = format(new Date(), 'yyyy-MM-dd');
//     const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
//     const startOfLastWeek = subWeeks(startOfThisWeek, 1);
//     const endOfLastWeek = addDays(startOfLastWeek, 6);



//     const filterDataByDateRange = useCallback((labels, data, dateRange) => {
//         if (dateRange.isRange) {
//             const { rangeStart, rangeEnd } = dateRange;

//             // Monthly ranges (Last 6 Months or This Year)
//             if (dayCount === 4 || dayCount === 5) {
//                 const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
//                 const monthLabels = months.map(month => format(month, 'MMM yyyy'));

//                 const monthlySums = data?.datasets?.map(dataset => {
//                     return months.map(month => {
//                         const monthStart = startOfMonth(month);
//                         const monthEnd = endOfMonth(month);

//                         return labels.reduce((sum, label, index) => {
//                             const labelDate = new Date(label);
//                             if (isWithinInterval(labelDate, { start: monthStart, end: monthEnd })) {
//                                 return sum + (dataset.data[index] || 0);
//                             }
//                             return sum;
//                         }, 0);
//                     });
//                 });

//                 return {
//                     labels: monthLabels,
//                     datasets: data.datasets.map((dataset, i) => ({
//                         ...dataset,
//                         data: monthlySums[i]
//                     }))
//                 };
//             }

//             // Daily data within other ranges
//             const filteredIndices = labels?.map((label, index) => {
//                 const labelDate = new Date(label);
//                 return (labelDate >= rangeStart && labelDate <= rangeEnd) ? index : null;
//             }).filter(index => index !== null);

//             return {
//                 labels: filteredIndices.map(index => {
//                     const date = new Date(labels[index]);
//                     return format(date, 'dd EEE');
//                 }),
//                 datasets: data.datasets.map(dataset => ({
//                     ...dataset,
//                     data: filteredIndices.map(index => dataset.data[index])
//                 }))
//             };
//         }

//         // Exact date match (Today, Last Week, This Month)
//         const filteredIndices = labels?.map((label, index) =>
//             dateRange.includes(label) ? index : null
//         ).filter(index => index !== null);

//         const filteredLabels = filteredIndices.map(index => {
//             const date = new Date(labels[index]);
//             return format(date, 'dd EEE');
//         });

//         return {
//             labels: filteredLabels,
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 data: filteredIndices.map(index => dataset.data[index])
//             }))
//         };
//     }, [dayCount]);




//     const handlePeriodChange = useCallback((period) => {
//         setDayCount(period);
//         const now = new Date();

//         // const getOrdinalSuffix = (day) => {
//         //     if (day > 3 && day < 21) return 'th';
//         //     switch (day % 10) {
//         //         case 1: return 'st';
//         //         case 2: return 'nd';
//         //         case 3: return 'rd';
//         //         default: return 'th';
//         //     }
//         // };
//         const periodHandlers = {
//             // 1: () => {
//             //     setFromDate(format(now, 'yyyy-MM-dd'));
//             //     setToDate(format(now, 'yyyy-MM-dd'));
//             //     return [Todays]; // Today
//             // },
//             2: () => {
//                 setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
//                 setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
//                 return eachDayOfInterval({
//                     start: startOfLastWeek,
//                     end: endOfLastWeek
//                 }).map(date => format(date, 'yyyy-MM-dd')); // Last Week
//             },
//             // 3: () => {
//             //     setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
//             //     setToDate(format(now, 'yyyy-MM-dd'));
//             //     return eachDayOfInterval({
//             //         start: startOfMonth(now),
//             //         end: now
//             //     }).map(date => format(date, 'yyyy-MM-dd')); // This Month
//             // },
//             3: () => {
//                 setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
//                 setToDate(format(now, 'yyyy-MM-dd'));
//                 return eachDayOfInterval({
//                     start: startOfMonth(now),
//                     end: now
//                 }).map(date => format(date, 'yyyy-MM-dd')); // This Month
//             },
//             // 3: () => {
//             //     const start = startOfMonth(now);
//             //     const end = now;

//             //     setFromDate(format(start, 'yyyy-MM-dd'));
//             //     setToDate(format(end, 'yyyy-MM-dd'));

//             //     return eachDayOfInterval({ start, end }).map(date =>
//             //         `${String(date.getDate()).padStart(2, '0')} ${format(date, 'EEE')}`
//             //     );
//             // },
//             // 3: () => {
//             //     const start = startOfMonth(now); // Get the first day of the current month
//             //     const end = now;                 // Get today's date

//             //     // Set the selected date range for outside use (e.g., filters)
//             //     setFromDate(format(start, 'yyyy-MM-dd'));
//             //     setToDate(format(end, 'yyyy-MM-dd'));

//             //     // Generate each day in the interval and return as 'DD DDD' (e.g., '01 Mon')
//             //     return eachDayOfInterval({ start, end }).map(date => {
//             //         const day = date.getDate();
//             //         const dayName = format(date, 'EEE'); // Get short weekday name: Mon, Tue, etc.
//             //         const formatted = `${String(day).padStart(2, '0')} ${dayName}`;
//             //         console.log(formatted); // Optional: For debugging
//             //         return formatted;
//             //     });
//             // }
//             // ,
//             4: () => {
//                 const sixMonthsAgo = subMonths(now, 5);
//                 const startDate = startOfMonth(sixMonthsAgo);
//                 setFromDate(format(startDate, 'yyyy-MM-dd'));
//                 setToDate(format(now, 'yyyy-MM-dd'));
//                 return {
//                     rangeStart: startDate,
//                     rangeEnd: now,
//                     isRange: true
//                 }; // Last 6 Months
//             },
//             5: () => {
//                 const yearStart = new Date(now.getFullYear(), 0, 1);
//                 setFromDate(format(yearStart, 'yyyy-MM-dd'));
//                 setToDate(format(now, 'yyyy-MM-dd'));
//                 return {
//                     rangeStart: yearStart,
//                     rangeEnd: now,
//                     isRange: true
//                 }; // This Year
//             }
//         };

//         const dateRange = periodHandlers[period]?.() || [];
//         const filteredData = filterDataByDateRange(
//             Graphicaldata.labels,
//             Graphicaldata,
//             dateRange
//         );
//         setChartData(filteredData);
//     }, [Todays, startOfLastWeek, endOfLastWeek, Graphicaldata, filterDataByDateRange, setFromDate, setToDate]);

//     useEffect(() => {

//         // isValid(new Date(fromDate))

//         if (fromDate && toDate) {
//             const startDate = new Date(fromDate);
//             const endDate = new Date(toDate);
//             const customDateRange = {
//                 rangeStart: startDate,
//                 rangeEnd: endDate,
//                 isRange: true
//             };

//             const filteredData = filterDataByDateRange(
//                 Graphicaldata.labels,
//                 Graphicaldata,
//                 customDateRange
//             );
//             setChartData(filteredData);
//         }


//     }, [fromDate, toDate, Graphicaldata, filterDataByDateRange]);

//     // ... (keep all the chart options and transform functions the same)
//     const polarOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             datalabels: {
//                 display: true,
//                 color: 'rgba(var(--font-light))',
//             },
//             tooltip: {
//                 enabled: true,
//             },
//             title: {
//                 display: false,
//                 text: 'Patient Details',
//             },
//         },
//         scales: {
//             r: {
//                 angleLines: {
//                     display: true,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//                 grid: {
//                     display: true,
//                 },
//                 suggestedMin: 0,
//             },
//         },
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     boxWidth: 15,
//                     color: 'rgb(var(--color-white))',
//                     font: {
//                         size: 12, // Added consistent font size for legend
//                     },
//                     padding: 20, // Added padding for better spacing
//                     usePointStyle: true, // Optional: for circular color indicators
//                 },
//             },
//             tooltip: {
//                 enabled: true,
//                 backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                 titleColor: '#fff',
//                 bodyColor: '#fff',
//                 borderColor: 'rgba(255, 255, 255, 0.1)',
//                 borderWidth: 1,
//                 padding: 12,
//                 callbacks: {
//                     label: (context) => {
//                         return `${context.dataset.label}: ${context.raw}`;
//                     }
//                 }
//             },
//             datalabels: {
//                 // anchor: 'end', // You can also try 'center', 'start'
//                 align: 'top', // Try 'start', 'end', or 'center'
//                 color: 'rgba(var(--font-light))',
//                 font: {
//                     size: 10,
//                     family: "'Roboto', sans-serif"
//                 },
//                 rotation: -90, // 🔄 This rotates the label
//                 formatter: (value) => {
//                     return value; // Customize label display if needed
//                 }
//             }
//         },
//         scales: {
//             x: {
//                 barThickness: 50,

//                 grid: {
//                     display: false,
//                     drawBorder: true,
//                     borderColor: 'rgba(var(--font-light), 0.2)',
//                 },
//                 ticks: {

//                     color: 'rgba(var(--font-light))',
//                     autoSkip: false,
//                     font: {
//                         size: 10,
//                         family: "'Roboto', sans-serif", // Specify font family
//                     },
//                     align: 'center',
//                     padding: 5, // Added padding for better tick spacing
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     color: 'rgba(var(--font-light))',

//                     font: {
//                         size: 10,
//                         family: "'Roboto', sans-serif", // Consistent font family
//                     },
//                     padding: 5,
//                     callback: (value) => {
//                         // console.log("valueeee", value);

//                         // Optional: Format tick values if needed
//                         return value;
//                     }
//                 },

//             },
//         },
//         interaction: {
//             intersect: false,
//             mode: 'index',
//         },
//         animation: {
//             duration: 1000, // Smooth animations
//         },
//         elements: {
//             bar: {
//                 borderRadius: 1,
//                 borderSkipped: false,
//                 // You can also control appearance here
//                 backgroundColor: (ctx) => {
//                     // Example of varying color based on value
//                     return ctx.raw > 50 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)';
//                 },
//                 borderWidth: (ctx) => {
//                     // Example of varying border width
//                     return ctx.raw > 50 ? 2 : 1;
//                 }
//             }
//         }
//     };

//     // Line chart options
//     const lineOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 grid: {
//                     display: false
//                 },
//                 ticks: {
//                     autoSkip: false,
//                 }
//             },
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     display: true
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     boxWidth: 12
//                 }
//             },
//         }
//     };
//     // Transform Graphicaldata for line chart
//     const transformToLineChartData = (data) => {
//         return {
//             labels: data.labels,
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 borderColor: dataset.borderColor,
//                 backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'), // Make more transparent for line
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: false,
//                 pointRadius: 4,
//                 pointBackgroundColor: dataset.borderColor,

//             }))
//         };
//     };

//     // const col = [
//     //     'rgba(255, 99, 132, 0.5)',
//     //     'rgba(54, 162, 235, 0.5)',
//     //     'rgba(255, 206, 86, 0.5)',
//     //     'rgba(75, 192, 192, 0.5)',
//     //     'rgba(153, 102, 255, 0.5)',
//     //     'rgba(255, 159, 64, 0.5)',
//     // ]
//     // Transform data for polar area chart
//     const transformToPolarData = (data) => {

//         const labels = data.datasets?.map((val) => val.label);
//         const summedData = data.datasets?.map((dataset) =>
//             dataset.data.reduce((sum, val) => sum + val, 0)
//         );
//         return {
//             labels,
//             datasets: [
//                 {
//                     data: summedData,
//                     backgroundColor: ['rgba(255, 99, 132, 0.5)',
//                         'rgba(54, 162, 235, 0.5)',
//                         'rgba(255, 206, 86, 0.5)',
//                         'rgba(75, 192, 192, 0.5)',
//                         'rgba(153, 102, 255, 0.5)',
//                         'rgba(255, 159, 64, 0.5)',],
//                     borderWidth: 1,
//                 },
//             ],
//         };
//     };

//     console.log("chartData", chartData);

//     return (
//         <Box sx={{
//             width: { xs: '100%', sm: '100%', md: 700, lg: "100%" },
//             overflow: "auto"
//         }}>
//             {/* Date Range Selector */}
//             {/* <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
//                 <ButtonGroup aria-label="date range selector" sx={{
//                     '--ButtonGroup-radius': '30px', display: "flex",
//                     flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
//                 }}>
//                     {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (

//                         <Button key={label} onClick={() => handlePeriodChange(index + 2)}>

//                             {index === 4 ? (
//                                 <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                     <Input
//                                         type="date"
//                                         value={fromDate}
//                                         onChange={(e) => setFromDate(e.target.value)}
//                                         size='xs'
//                                         sx={{ p: 0.5, color: 'grey', }}
//                                     />
//                                     <Input
//                                         type="date"
//                                         value={toDate}
//                                         onChange={(e) => setToDate(e.target.value)}
//                                         size='xs'
//                                         sx={{
//                                             p: 0.5,
//                                             // backgroundColor: "rgba(175, 193, 210, 0.35)",
//                                             color: 'grey',
//                                         }}
//                                         slotProps={{ input: { min: fromDate } }}
//                                     />
//                                 </Box>
//                             ) : (
//                                 <Typography sx={{
//                                     fontSize: 11,
//                                     color: "rgba(var(--input-font-color))",
//                                     '&:hover': {
//                                         color: 'rgba(var(--font-black))',
//                                         backgroundColor: 'transparent',
//                                     }
//                                 }}>{label}</Typography>
//                             )}
//                         </Button>
//                     ))}
//                 </ButtonGroup>
//             </Box> */}

//             <CommonDateComp onPeriodChange={handlePeriodChange} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate}
//                 Graphicaldata={Graphicaldata} dayCount={dayCount} setDayCount={setDayCount} chartData={chartData} setChartData={setChartData} />

//             {/* <CommonDateComp
//                 fromDate={fromDate}
//                 toDate={toDate}
//                 setFromDate={setFromDate}
//                 setToDate={setToDate}
//                 handlePeriodChange={handlePeriodChange}
//             /> */}

//             <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
//                 <Box sx={{ mt: 2, }}>
//                     {/* <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} /> */}
//                     <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
//                 </Box>
//             </Box>

//             {/* Chart Display */}
//             <Box sx={{
//                 mt: 2,
//                 width: '100%',
//                 height: 350,
//             }}>
//                 {parseInt(Chartlayout) === 1 ? (
//                     <Box sx={{
//                         width: "100%",
//                         height: "100%",
//                         overflow: "auto",
//                         '&::-webkit-scrollbar': {
//                             height: 5
//                         },
//                         gap: 2,
//                         cursor: "pointer",
//                         color: 'rgba(var(--font-light))',
//                     }}>
//                         <Bar
//                             data={{
//                                 labels: chartData.labels,
//                                 datasets: chartData.datasets.map((dataset, index) => ({
//                                     label: dataset.label,
//                                     data: dataset.data,
//                                     backgroundColor: [
//                                         'rgba(96, 94, 163, 0.50)',
//                                         'rgba(12, 132, 162, 0.50)',
//                                         'rgba(184, 62, 143, 0.48)'
//                                     ][index % 3], // Cycle through colors if more than 3 datasets
//                                     borderColor: [
//                                         'rgba(96, 94, 163, 1)',
//                                         'rgba(12, 132, 162, 1)',
//                                         'rgba(184, 62, 143, 1)'
//                                     ][index % 3],
//                                     borderWidth: 1,

//                                     barPercentage: 0.9, // Equivalent to barPercentage in MUI
//                                     categoryPercentage: 0.8, // Equivalent to categoryPercentage in MUI
//                                 }))
//                             }}
//                             options={options}

//                             height={350}
//                         />
//                     </Box>

//                 ) : parseInt(Chartlayout) === 2 ? (
//                     <Box sx={{
//                         width: "100%",
//                         height: "100%",
//                         overflowX: "auto",
//                         overflowY: "hidden",
//                         minWidth: `${Math.max(
//                             chartData?.labels?.length * 60,
//                             800
//                         )}px`,
//                         '&::-webkit-scrollbar': {
//                             height: '6px',
//                         }
//                     }}>
//                         <Line
//                             data={transformToLineChartData(chartData)}
//                             options={{
//                                 ...lineOptions,
//                                 maintainAspectRatio: false
//                             }}
//                             height={350}
//                         />
//                     </Box>
//                 ) : parseInt(Chartlayout) === 3 ? (
//                     <Box sx={{
//                         width: "100%",
//                         height: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center"
//                     }}>
//                         <PolarArea
//                             data={transformToPolarData(chartData)}
//                             options={polarOptions}
//                             height={300}
//                             width={300}
//                         />
//                     </Box>
//                 ) : null}
//             </Box>
//         </Box>
//     );
// };

// export default memo(OverallSalesProgress);














//Try 1
// const getActionApiFunc = async (apiStringName,) => {
//   try {
//     const response = await axiosApi.get(`${apiStringName}`, {
//       timeout: 10000
//     })

//     const { success, data } = response.data;
//     if (success !== 1) {
//       console.log('Error fetching Api Data getDocTypeMasterList fun()', response.data)
//       return []
//     }

//     if (!Array.isArray(data)) {
//       console.log('Invalid Data Format || Not an array of data', response.data)
//       return []
//     }
//   } catch (error) {
//     console.log('Error fetching Api Data getDocTypeMasterList fun()', error)
//     return []
//   }
//   return data;
// }
// export const getDocTypeMasterList = getActionApiFunc('/documentTypeMaster/getDocTypeMaster');


// Jomol 28-08-2025

// const getActionApiFunc = async (apiStringName) => {
//   try {
//     const response = await axiosApi.get(`${apiStringName}`, {
//       timeout: 10000
//     });

//     const { success, data } = response.data;

//     if (success !== 1) {
//       console.error(
//         "Error fetching API Data getActionApiFunc()",
//         response.data
//       );
//       return [];
//     }

//     if (!Array.isArray(data)) {
//       console.error(
//         "Invalid Data Format || Not an array of data",
//         response.data
//       );
//       return [];
//     }

//     return data; // ✅ return inside the try after validation
//   } catch (error) {
//     console.error("Error fetching API Data getActionApiFunc()", error);
//     return [];
//   }
// };





//Try 2
// export const getDocTypeMasterList = async () => {
//   try {
//     const response = await axiosApi.get("/documentTypeMaster/getDocTypeMaster", {
//       timeout: 10000
//     })

//     const { success, data } = response.data;
//     if (success !== 1) {
//       console.log('Error fetching Api Data getDocTypeMasterList fun()', response.data)
//       return []
//     }

//     if (!Array.isArray(data)) {
//       console.log('Invalid Data Format || Not an array of data', response.data)
//       return []
//     }
//   } catch (error) {
//     console.log('Error fetching Api Data getDocTypeMasterList fun()', error)
//     return []
//   }
//   return data;
// };







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//try 3- Orginal copy
// export const getDocTypeMasterList = async () => {
//   return await axiosApi
//     .get("/documentTypeMaster/getDocTypeMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data;
//       }
//     });
// };

// export const getSubTypeMasterList = async () => {
//   return await axiosApi
//     .get("/subTypeMaster/getAllSubTypeMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data;
//       }
//     });
// };

// export const getCategoryMasterList = async () => {
//   return await axiosApi
//     .get("/documentCategory/getAllDocCategory")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data;
//       }
//     });
// };

// export const getSubCategoryList = async () => {
//   return await axiosApi
//     .get("/docSubCategoryName/getAllDocSubCategory")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data;
//       }
//     });
// };


// export const getGroupList = async () => {
//   return await axiosApi.get("/docGroupMaster/getAllDocGroup").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getIntitutionTypeList = async () => {
//   return await axiosApi
//     .get("/instituteType/getAllInstituteType")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data;
//       }
//     });
// };

// export const getInstitutionList = async () => {
//   return await axiosApi
//     .get("/institutionMaster/getAllInstitutionMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data;
//       }
//     });
// };

// export const getCourseTypeList = async () => {
//   return await axiosApi.get("/courseType/getAllCourseType").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getCourseList = async () => {
//   return await axiosApi.get("/courseMaster/getAllCourseMaster").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };


// export const getDocTypeCount = async () => {
//   return await axiosApi.get(`/docMaster/getDocTypeCount`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getDocAll = async () => {
//   return await axiosApi.get(`/docMaster/getDocSecureOnly`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };


// export const getnonSecureDoconly = async () => {
//   return await axiosApi.get(`/docMaster/getDocNonSecure`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getLocationMaster = async () => {
//   return await axiosApi.get("/locationMaster/selectLocationMaster").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };


// export const getRackMasterList = async () => {
//   return await axiosApi.get("/rackMaster/selectRackMaster").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getCustodianDepartmentMaster = async () => {
//   return await axiosApi.get("/custodianDepartment/selectCusDepartmentList").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getCustodianMasterList = async () => {
//   return await axiosApi.get("/custodianMaster/selectCustodianMasterList").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// // Jomol George 17/3/2025 02:52 pm
// export const getAllSuperUsers = async () => {
//   return await axiosApi.get(`/user/getSuperUsers`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getAllUsers = async () => {
//   return await axiosApi.get(`/user/getAllUser`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };


// export const getAllModules = async () => {
//   return await axiosApi.get(`/ModuleNameMaster/selectAllModules`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data
//     }
//   });
// };
// export const getModuleMast = async () => {
//   return await axiosApi.get(`/ModuleGroupMaster/getdatas`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };
// export const getuserType = async () => {
//   return await axiosApi.get(`/UserTypeMaster/getdatas`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };
// export const getMenuNames = async () => {
//   return await axiosApi.get(`/MenuNameMaster/getdatas`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getUsergrpRights = async () => {
//   return await axiosApi.get(`/UserGroupRightMaster/getUsergrpRights`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data

//     }
//   });
// };

// export const getSubMenuNames = async () => {
//   return await axiosApi.get(`/bisSubMenuMaster/getdatas`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };


// **********************************success===2******************************************************************

// export const getOpPatientDetails = async () => {
//   return await axiosApi.get("/bisDataPush/getOpDatas").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ? data : [];
//     }
//   });
// };

// //for get kmc datas
// export const getkmcOpPatientDetails = async () => {
//   return await axiosApi.get("/bisKmcDataPush/getOpDatas").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ? data : [];
//     }
//   });
// };

// //api for get linked quotation items
// export const getKMCLinkedItems = async () => {
//   return await axiosApi.get("/bisQuotation/getKMCLinkedItems").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const getTmcLinkedItems = async () => {
//   return await axiosApi.get("/bisQuotation/getTMCLinkedItems").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const getKMCFinalizedQtn = async () => {
//   return await axiosApi.get("/bisQuotation/KMCFinalizedQtn").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const getTmcFinalizedQtn = async () => {
//   return await axiosApi.get("/bisQuotation/TMCFinalizedQtn").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };
// //to get Store Master Data
// export const GetstoreMaster = async () => {
//   return await axiosApi.get("/bisQuotation/getKmcStoreData").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const GetTmcStoreMaster = async () => {
//   return await axiosApi.get("/bisQuotation/getTmcStoreData").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const getSelectCategoryNameList = async () => {
//   return await axiosApi
//     .get("/documentCategory/selectCategoryMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.cat_slno,
//             label: item.category_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };


// export const getSelectInstitutionTypeList = async () => {
//   return await axiosApi
//     .get("/instituteType/getInstitutionTypeSelect")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.institute_type_slno,
//             label: item.institute_type_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };


// export const getSelectCourseTypeList = async () => {
//   return await axiosApi.get("/courseType/getCourseTypeSelect").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data?.map((item) => {
//         return {
//           value: item.course_type_slno,
//           label: item.course_type_name.toUpperCase(),
//         };
//       });
//     }
//   });
// };


// export const getSelectDocTypeMasterList = async () => {
//   return await axiosApi
//     .get("/documentTypeMaster/selectDocTypeMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.doc_type_slno,
//             label: item.doc_type_master_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };


// export const getSelectSubTypeMasterList = async () => {
//   return await axiosApi
//     .get("/subTypeMaster/selectSubTypeMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.sub_type_slno,
//             label: item.doc_sub_type_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };


// export const getSelectInstitutionMasterList = async () => {
//   return await axiosApi
//     .get("/institutionMaster/selectInstituteMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.institution_slno,
//             label: item.institution_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };

// export const getSelectCourseMasterList = async () => {
//   return await axiosApi
//     .get("/courseMaster/getSelectCourseMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.course_slno,
//             label: item.course_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };


// export const getSeelctSubCategoryList = async () => {
//   return await axiosApi
//     .get("/docSubCategoryName/getSubCategoryList")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.subcat_slno,
//             label: item.subcat_name.toUpperCase(),
//             catSlno: item.cat_slno,
//           };
//         });
//       }
//     });
// };

// export const getSelectGroupList = async () => {
//   return await axiosApi
//     .get("/docGroupMaster/getSelectGroupList")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.group_slno,
//             label: item.group_name.toUpperCase(),
//           };
//         });
//       }
//     });
// };


// export const getDocumentList = async () => {
//   return await axiosApi.get("/docMaster/getDocMaster").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data?.map((item) => {
//         return {
//           id: item.doc_slno,
//           docDate: format(new Date(item.doc_date), "dd-MM-yyyy HH:mm:ss"),
//           docVersion: format(
//             new Date(item.doc_ver_date),
//             "dd-MM-yyyy HH:mm:ss"
//           ),
//           ...item,
//         };
//       });
//     }
//   });
// };


// export const getLocationMasterList = async () => {
//   return await axiosApi.get("/locationMaster/getSelectLocationMasterList")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.loc_slno,
//             label: item.loc_name.toUpperCase()
//           };
//         });
//       }
//     });
// };


// export const getSelectCustodianDepartmentList = async () => {
//   return await axiosApi.get("/custodianDepartment/selectCusDepartment")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.cust_dept_slno,
//             label: item.cust_dept_name.toUpperCase()
//           };
//         });
//       }
//     });
// };


// export const getRackMasterData = async () => {
//   return await axiosApi.get("/rackMaster/selectCmpRackMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.rac_slno,
//             label: item.rack.toUpperCase()
//           };
//         });
//       }
//     });
// };




// export const getSelectCustodianDepartmentData = async () => {
//   return await axiosApi.get("/custodianMaster/selectCustodianMaster")
//     .then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data?.map((item) => {
//           return {
//             value: item.cust_slno,
//             label: item.cust_name.toUpperCase()
//           };
//         });
//       }
//     });
// };


// export const userTypes = async () => {
//   return await axiosApi.get(`/UserTypeMaster/getdatas`).then((res) => {
//     const { success, data } = res.data;

//     if (success === 1 && Array.isArray(data)) {
//       return data.map(item => ({
//         value: item.user_type_slno,
//         label: item.user_type
//       }));
//     }
//   });
// };



// export const getDocNumber = async () => {
//   return await axiosApi.get("/selectComponets/getDocNumber").then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data[0]?.number;
//     }
//   });
// };


// export const getDocInforByID = async (id) => {
//   return await axiosApi.get(`/docMaster/getDocMasterById/${id}`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data[0];
//     }
//   });
// };


// export const getDocumentDetl = async (id) => {
//   return await axiosApi.get(`/docMaster/getDocDetl/${id}`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data;
//     }
//   });
// };

// export const getDocMasterLikeName = async (name) => {
//   if (name !== '' || name !== undefined || name !== null) {
//     return await axiosApi.get(`/docMaster/getDocMasterLikeName/${name}`).then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data
//       } else {
//         return []
//       }
//     });
//   } else {
//     return []
//   }
// };


// export const getDocMasterLikeNameNonSecureOnly = async (name) => {
//   if (name !== '' || name !== undefined || name !== null) {
//     return await axiosApi.get(`/docMaster/getDocMasterLikeNameNonSecureOnly/${name}`).then((res) => {
//       const { success, data } = res.data;
//       if (success === 1) {
//         return data
//       } else {
//         return []
//       }
//     })
//   } else {
//     return []
//   }
// };


// export const getUserModules = async (module_name) => {
//   return await axiosApi.get(`/UserGroupRightMaster/ModulewiseMenus/${module_name}`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ? data : [];
//     }
//   });
// };


// export const SubCategoryById = async (catSlno) => {
//   return await axiosApi.get(`/docSubCategoryName/getSubCategoryById/${catSlno}`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data
//     }
//   });
// };

// export const getUserDrawerfun = async loggedUser => {
//   return axiosApi.get(`/tmReport/getUserDrawer/${loggedUser}`).then(res => {
//     const { success, data } = res.data
//     if (success === 1) {
//       return data
//     }
//   })
// }

// export const getOpDetails = async (payloadDatas) => {
//   return await axiosApi.post("/bisOpModule/opDetails", payloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };
// export const getIpDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisIpModule/ipDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getpharmacyDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisPharmacy/pharmacyDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getdischargeDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisDischarge/dischargeDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getlabDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/labDetails/getlabDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getradiologyDetails = async (PayloadDatas) => {
//   const res = await axiosApi.post("/radiologyDetails/getDetails", PayloadDatas);
//   const { success, data } = res.data;
//   if (success === 1) {
//     return data ?? [];
//   } else {
//     return [];
//   }
// };


// export const getkmcOpDetails = async (payloadDatas) => {
//   return await axiosApi.post("/bisKmcOpModule/opDetails", payloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };
// export const getKmcIpDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisKmcIpModule/ipDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getKmcpharmacyDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisKmcPharmacy/pharmacyDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getKmcdischargeDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisKmcDischarge/dischargeDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getKmclabDetails = async (PayloadDatas) => {
//   return await axiosApi.post("/bisKmclabDetails/getlabDetails", PayloadDatas).then((res) => {
//     const { success, data } = res.data;
//     if (success === 1) {
//       return data ?? [];
//     } else {
//       return [];
//     }
//   });
// };

// export const getKmcradiologyDetails = async (PayloadDatas) => {
//   const res = await axiosApi.post("/bisKmcradiologyDetails/getDetails", PayloadDatas);
//   const { success, data } = res.data;
//   if (success === 1) {
//     return data ?? [];
//   } else {
//     return [];
//   }
// };


// export const getOpModuleDetails = async () => {
//   return await axiosApi.get("/bisDataPush/getOpModuleData").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2 && Array.isArray(data)) {
//       return data?.map((item, index) => ({
//         opslno: item?.tmc_op_module_slno ?? index + 1,
//         name: item?.tmc_label_name,
//         date: item?.tmc_last_update_date,
//         status: index === 0 ? 1 : 0,
//       }));
//     }
//     else {
//       return [];
//     }
//   });
// };





// export const getkmcOpModuleDetails = async () => {
//   return await axiosApi.get("/bisKmcDataPush/getOpModuleData").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2 && Array.isArray(data)) {
//       return data?.map((item, index) => ({
//         opslno: item?.kmc_op_module_slno ?? index + 1,
//         name: item?.kmc_label_name,
//         date: item?.kmc_last_update_date,
//         status: index === 0 ? 1 : 0,
//       }));
//     }
//     else {
//       return [];
//     }
//   });
// };




// /////////// IP MODULE
// export const getIpModuleDetails = async () => {
//   return await axiosApi.get("/bisDataPush/getIpModuleData").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2 && Array.isArray(data)) {
//       return data?.map((item, index) => ({
//         opslno: item?.tmc_ip_module_slno ?? index + 1,
//         name: item?.tmc_ip_label_name,
//         date: item?.tmc_ip_last_update_date,
//         status: index === 0 ? 1 : 0,
//       }));
//     }
//     else {
//       return [];
//     }
//   });
// };

// //for KMC
// export const getKmcIpModuleDetails = async () => {
//   return await axiosApi.get("/bisKmcDataPush/getKmcIpModuleData").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2 && Array.isArray(data)) {
//       return data?.map((item, index) => ({
//         opslno: item?.kmc_ip_module_slno ?? index + 1,
//         name: item?.kmc_ip_label_name,
//         date: item?.kmc_ip_last_update_date,
//         status: index === 0 ? 1 : 0,
//       }));
//     }
//     else {
//       return [];
//     }
//   });
// };


// //api for get active items
// export const getActiveItems = async () => {
//   return await axiosellider_kmc.get("/bisQuotationData/getActiveItems").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const getTmcActiveItems = async () => {
//   return await axiosellider_tmc.get("/bisQuotationData/getActiveItems").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };


// //total quotation
// export const getKMCTotalQtn = async () => {
//   return await axiosellider_kmc.get("/bisQuotationData/getTotalQtn").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };

// export const getTmcCTotalQtn = async () => {
//   return await axiosellider_tmc.get("/bisQuotationData/getTotalQtn").then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ?? [];
//     }
//     else {
//       return [];
//     }
//   });
// };


// const getApiCall = async (apiStringName) => {
//   try {
//     const response = await axiosApi.get(apiStringName, {
//       timeout: 10000,
//     });

//     const { success, data } = response.data;

//     if (success !== 2) {
//       console.error("Error fetching API Data:", response.data);
//       return [];
//     }

//     if (!Array.isArray(data)) {
//       console.error("Invalid Data Format || Not an array of data:", response.data);
//       return [];
//     }

//     return data; //  return only inside try if valid
//   } catch (error) {
//     console.error("Error fetching API Data:", error);
//     return [];
//   }
// };

// export const getOpPatientDetails = () => getApiCall("/bisDataPush/getOpDatas");
// export const getkmcOpPatientDetails = () => getApiCall("/bisKmcDataPush/getOpDatas");
// export const getKMCLinkedItems = () => getApiCall("/bisQuotation/getKMCLinkedItems");
// export const getTmcLinkedItems = () => getApiCall("/bisQuotation/getTMCLinkedItems");
// export const getKMCFinalizedQtn = () => getApiCall("/bisQuotation/KMCFinalizedQtn");
// export const getTmcFinalizedQtn = () => getApiCall("/bisQuotation/TMCFinalizedQtn");
// export const GetstoreMaster = () => getApiCall("/bisQuotation/TMCFinalizedQtn");
// export const GetTmcStoreMaster = () => getApiCall("/bisQuotation/getTmcStoreData");




// export const userWiseSettingsRights = async (loggedUser) => {
//   return await axiosApi.get(`/UserGroupRightMaster/userWiseSettingsRights/${loggedUser}`).then((res) => {
//     const { success, data } = res.data;
//     if (success === 2) {
//       return data ? data : [];
//     }
//   });
// };


// export const getgraphicalViewRights = async authNo => {
//   return axiosApi.get(`/bisGraphicalViewMast/fetchGraphicalviewRights/${authNo}`).then(res => {
//     const { success, data } = res.data
//     if (success === 2) {
//       return data
//     }
//   })
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

