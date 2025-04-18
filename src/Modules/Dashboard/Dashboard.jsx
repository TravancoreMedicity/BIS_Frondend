// // @ts-nocheck

// @ts-nocheck
import React, { memo } from "react";
import { Box, Typography } from "@mui/joy";
import { ToastContainer } from "react-toastify";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CommonHeader from "../BISModule/BIS_CommoCode/CommonHeader";
import OverallSalesProgress from "../BISModule/BIS_CommoCode/SalesProgress/OverallSalesProgress";
import LastThreeYearsComparisons from "../BISModule/BIS_CommoCode/LastThreeYearsComparison";
import MainGraph from "../BISModule/BIS_CommoCode/GraphicalOverview/MainGraph";
import MonitorIcon from '@mui/icons-material/Monitor';
import BiotechIcon from '@mui/icons-material/Biotech';
import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';

const Dashboard = () => {
  const data = {
    labels: ['2025-04-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'],
    datasets: [
      {
        label: 'Total Patients',
        data: [4150, 1350, 14256, 10000, 4369, 13568, 125, 2568, 4231, 10236],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(96, 94, 163, 0.50)',
        barThickness: 50,
      },
      {
        label: 'New Registration',
        data: [12000, 13500, 11000, 14500, 9000, 13000, 12500, 12589, 742, 3654],
        borderColor: 'rgba(44, 80, 103, 0.95)',
        backgroundColor: 'rgba(12, 132, 162, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Revisit',
        data: [1250, 1190, 2515, 4070, 900, 415, 1758, 1023, 123, 789],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(184, 62, 143, 0.48)',
        barThickness: 50,
      },
    ],
  };
  //Pharmacy sales
  const pharmacySales = {
    labels: ['2025-03-31', '2025-03-02', '2025-03-03', '2025-03-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'],
    datasets: [
      {
        label: 'Total Sales',
        data: [2356, 4523, 7561, 1236, 4521, 6523, 752, 3698, 1564, 1756],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(96, 94, 163, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Return',
        data: [4123, 2563, 2985, 3165, 4216, 1415, 4123, 2846, 1256, 2586],
        borderColor: 'rgba(44, 80, 103, 0.95)',
        backgroundColor: 'rgba(12, 132, 162, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Net Amount',
        data: [4123, 2563, 2985, 3165, 4216, 1415, 4123, 2846, 1256, 2586],
        data: [2689, 4256, 2568, 1756, 3568, 8456, 1236, 2569, 4523, 3265],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(184, 62, 143, 0.48)',
        barThickness: 50,
      },

    ],
  };
  //Inpatient
  const InpatientData = {
    labels: ['2025-03-31', '2025-03-02', '2025-03-03', '2025-03-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'],
    datasets: [
      {
        label: 'Total Admission',
        data: [1235, 2356, 7561, 1236, 4521, 6523, 752, 3698, 2356, 1756],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(96, 94, 163, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Discharge',
        data: [2356, 4256, 5623, 1756, 3568, 8456, 2356, 1568, 4523, 1236],
        borderColor: 'rgba(44, 80, 103, 0.95)',
        backgroundColor: 'rgba(12, 132, 162, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Inpatient',
        data: [4325, 2563, 2985, 4236, 4216, 1415, 4123, 2846, 4232, 2586],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(184, 62, 143, 0.48)',
        barThickness: 50,
      },

    ],
  };
  //discharge
  const dischargeDatas = {
    labels: ['2025-03-31', '2025-03-02', '2025-03-03', '2025-03-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'],
    datasets: [
      {
        label: 'Total Bill Amount',
        data: [2356, 4523, 7561, 1236, 4521, 6523, 752, 3698, 1564, 1756],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(96, 94, 163, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Receipt',
        data: [2689, 4256, 2568, 1756, 3568, 8456, 1236, 2569, 4523, 3265],
        borderColor: 'rgba(44, 80, 103, 0.95)',
        backgroundColor: 'rgba(12, 132, 162, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Advance',
        data: [4123, 2563, 2985, 3165, 4216, 1415, 4123, 2846, 1256, 2586],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(184, 62, 143, 0.48)',
        barThickness: 50,
      },

    ],
  };
  //lab
  const laboratoryData = {
    labels: ['2025-03-31', '2025-03-02', '2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10'],
    datasets: [
      {
        label: 'Total Billing',
        data: [4150, 1350, 1426, 1000, 4369, 1358, 125, 258, 4231, 1036],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(96, 94, 163, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Ip Billing',
        data: [1200, 1300, 1900, 1500, 9000, 1300, 1250, 1259, 742, 3654],
        borderColor: 'rgba(44, 80, 103, 0.95)',
        backgroundColor: 'rgba(12, 132, 162, 0.50)',
        barThickness: 50,
      },
      {
        label: 'Op Billing',
        data: [1150, 1190, 1215, 1070, 1900, 1415, 1758, 1023, 1123, 1789],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(184, 62, 143, 0.48)',
        barThickness: 50,
      },
      {
        label: 'Return',
        data: [1250, 1190, 2515, 4070, 900, 415, 1758, 1023, 123, 789],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(184, 62, 143, 0.48)',
        barThickness: 50,
      },
    ],
  };
  const LabSections = [
    { slno: 1, label: "Biochemistry", color: 'rgba(54, 162, 235,2)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    { slno: 2, label: "Clinical Pathology", color: 'rgba(255, 99, 132,2)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    { slno: 3, label: "Haematology", color: 'rgba(80, 43, 7, 0.5)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
    { slno: 4, label: "Microbiology", color: 'rgba(23, 107, 43, 0.5)', icon: <BiotechIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mt: 0.5 }} /> },
  ];

  const radiologySections = [
    { slno: 1, label: "MRI", color: 'rgba(144, 53, 135, 0.69)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    { slno: 2, label: "CT Scan", color: 'rgba(10, 73, 25, 0.73)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    { slno: 3, label: "X-Ray", color: 'rgba(153, 102, 255, 1)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    { slno: 4, label: "Ultrasound", color: 'rgba(20, 17, 117, 0.65)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
    { slno: 5, label: "Mammography", color: 'rgba(103, 11, 19, 0.57)', icon: <Wifi1BarIcon sx={{ color: 'rgb(52, 144, 194)', fontWeight: "bold", mb: 1 }} /> },
  ];


  const labels = ['2025-03-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06', '2025-04-07'];

  const LabSection = [
    { slno: 1, label: "Biochemistry", color: 'rgba(54, 162, 235, 0.5)' },
    { slno: 2, label: "Clinical Pathology", color: 'rgba(255, 99, 132, 0.5)' },
    { slno: 3, label: "Haematology", color: 'rgba(80, 43, 7, 0.5)' },
    { slno: 4, label: "Microbiology", color: 'rgba(23, 107, 43, 0.5)' },
  ];

  // Dummy data for each section (you would replace this with real values)
  const labData = {
    "Biochemistry": [500, 450, 600, 550, 580, 590, 610],
    "Clinical Pathology": [220, 400, 330, 310, 340, 350, 360],
    "Haematology": [370, 290, 260, 280, 300, 310, 290],
    "Microbiology": [130, 140, 280, 155, 170, 180, 195],
  };

  const datasets = LabSection?.map(section => ({
    label: section.label,
    data: labData[section.label],
    borderColor: section.color.replace('0.5', '1'), // Make border more opaque
    backgroundColor: section.color,
    barThickness: 30,
  }));

  const LabData = {
    labels: labels,
    datasets: datasets
  };

  // radiology
  const radiologySection = [
    { slno: 1, label: "MRI", color: 'rgba(144, 53, 135, 0.69)' },
    { slno: 2, label: "CT Scan", color: 'rgba(10, 73, 25, 0.73)' },
    { slno: 3, label: "X-Ray", color: 'rgba(153, 102, 255, 1)' },
    { slno: 4, label: "Ultrasound", color: 'rgba(20, 17, 117, 0.65)' },
    { slno: 5, label: "Mammography", color: 'rgba(103, 11, 19, 0.57)' },
  ];

  // Dummy data for each section (you would replace this with real values)
  const radioData = {
    "MRI": [100, 450, 600, 120, 580, 590, 610],
    "CT Scan": [300, 300, 530, 310, 340, 350, 360],
    "X-Ray": [170, 290, 260, 280, 210, 310, 490],
    "Ultrasound": [550, 340, 130, 155, 170, 180, 175],
    "Mammography": [250, 70, 160, 155, 170, 180, 275],
  };

  const Datasss = radiologySection?.map(section => ({
    label: section.label,
    data: radioData[section.label],
    borderColor: section.color.replace('0.5', '1'),
    backgroundColor: section.color,
    barThickness: 30,
  }));

  const RadioData = {
    labels: labels,
    datasets: Datasss
  };

  return (
    <Box
      sx={{
        width: "100%",
        // bgcolor: "#f5f5f5",
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
        <DashboardCard title="Out Patient Count">
          <OverallSalesProgress Graphicaldata={data} Displaystyle={1} />
        </DashboardCard>
        <DashboardCard title="In Patient Count">
          <OverallSalesProgress Graphicaldata={InpatientData} Displaystyle={2} />
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
        <DashboardCard title="Pharmacy Sales">
          <OverallSalesProgress Graphicaldata={pharmacySales} Displaystyle={3} />
        </DashboardCard>
        <DashboardCard title="Discharge">
          <OverallSalesProgress Graphicaldata={dischargeDatas} Displaystyle={1} />
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
        <DashboardCard title="Laborotary">
          <MainGraph Graphicaldata={LabData} chartItems={LabSections} Displaystyle={2} DisplayData={LabData} />
        </DashboardCard>
        <DashboardCard title="Radiology">
          <MainGraph Graphicaldata={RadioData} chartItems={radiologySections} Displaystyle={3} DisplayData={RadioData} />
        </DashboardCard>
      </Box>
      {/* lab section */}
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
        <DashboardCard title="Biochemistry">
          <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={1} DisplayData={LabData} />
        </DashboardCard>
        <DashboardCard title="Micro-Biology">
          <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={2} DisplayData={RadioData} />
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
        <DashboardCard title="Haematology">
          <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={3} DisplayData={LabData} />
        </DashboardCard>
        <DashboardCard title="Clinical Pathology">
          <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={1} DisplayData={RadioData} />
        </DashboardCard>
      </Box>
      {/* Radiology */}
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
        <DashboardCard title="MRI">
          <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={2} DisplayData={LabData} />
        </DashboardCard>
        <DashboardCard title="CT-Scan">
          <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={3} DisplayData={RadioData} />
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
        <DashboardCard title="Ultrasound">
          <MainGraph Graphicaldata={laboratoryData} chartItems={LabSections} Displaystyle={1} DisplayData={LabData} />
        </DashboardCard>
        <DashboardCard title="Mammography">
          <MainGraph Graphicaldata={laboratoryData} chartItems={radiologySections} Displaystyle={2} DisplayData={RadioData} />
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

export default memo(Dashboard);

