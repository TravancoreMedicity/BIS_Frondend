import React, { memo, useMemo, useState } from "react";
import { Box, Typography } from "@mui/joy";
import CommonHeader from "../BISModule/BIS_CommoCode/CommonHeader";
import OverallSalesProgress from "../BISModule/BIS_CommoCode/SalesProgress/OverallSalesProgress";
import { getIpDetails, getOpDetails, getpharmacyDetails, getdischargeDetails, getlabDetails, getradiologyDetails } from "../../api/commonAPI";
import { useQuery } from '@tanstack/react-query';
import { format } from "date-fns";

const Dashboard = () => {

  const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [ipfromDate, setIpFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [iptoDate, setIpToDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [phfromDate, setPhFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [phtoDate, setPhToDate] = useState(format(new Date(), "yyyy-MM-dd"));


  const [dcfromDate, setdcFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dctoDate, setdcToDate] = useState(format(new Date(), "yyyy-MM-dd"));


  const [labfromDate, setlabFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [labtoDate, setlabToDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [radfromDate, setradFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [radtoDate, setradToDate] = useState(format(new Date(), "yyyy-MM-dd"));


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
    queryFn: () => getOpDetails(payloadDatas),
    enabled: !!payloadDatas, // ensures payload exists before running
  })

  //inpatient Details
  const { data: IpDetails } = useQuery({
    queryKey: ['ipDataDetails', ipPayloadDatas],
    queryFn: () => getIpDetails(ipPayloadDatas),
    enabled: !!ipPayloadDatas,
  })

  const { data: PharmacyDetails } = useQuery({
    queryKey: ['pharmacyDataDetails', phPayloadDatas],
    queryFn: () => getpharmacyDetails(phPayloadDatas),
    enabled: !!phPayloadDatas,
  })

  const { data: DischargeDetails } = useQuery({
    queryKey: ['dischargeDataDetails', dcPayloadDatas],
    queryFn: () => getdischargeDetails(dcPayloadDatas),
    enabled: !!dcPayloadDatas,
  })

  const { data: labDetails } = useQuery({
    queryKey: ['labDataDetails', labPayloadDatas],
    queryFn: () => getlabDetails(labPayloadDatas),
    enabled: !!labPayloadDatas,
  })

  const { data: radiologyDetails } = useQuery({
    queryKey: ['radiologyDataDetails', radPayloadDatas],
    queryFn: () => getradiologyDetails(radPayloadDatas),
    enabled: !!radPayloadDatas,
  })
  // op_visit_date
  const data = {
    labels: OpDetails?.map(val => val.op_visit_date) || [],

    datasets: OpDetails
      ? [
        {
          label: 'Total Outpatients',
          data: OpDetails?.map(val => val.op_total_op) || [],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(96, 94, 163, 0.50)',
          barThickness: 50,
        },
        {
          label: 'New Patients',
          data: OpDetails?.map(val => val.op_new_reg) || [],
          borderColor: 'rgba(44, 80, 103, 0.95)',
          backgroundColor: 'rgba(12, 132, 162, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Visit',
          data: OpDetails?.map(val => val.op_visit) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
      ]
      : [],
  };
  const InpatientData = {
    labels: IpDetails?.map(val => val.ip_date) || [],

    datasets: IpDetails
      ?
      [
        {
          label: 'Total Admission',
          data: IpDetails?.map(val => val.ip_total_admission) || [],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(96, 94, 163, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Total Discharge',
          data: IpDetails?.map(val => val.ip_total_discharge) || [],
          borderColor: 'rgba(44, 80, 103, 0.95)',
          backgroundColor: 'rgba(12, 132, 162, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Dama',
          data: IpDetails?.map(val => val.ip_dama) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
      ]
      : [], // if no OpDetails, show empty chart
  };

  const pharmacySales = {
    labels: PharmacyDetails?.map(val => val.ph_transaction_date) || [],

    datasets: PharmacyDetails
      ? [
        {
          label: 'Total Bill',
          data: PharmacyDetails?.map(val => val.ph_total_bill_count) || [],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(96, 94, 163, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Return ',
          data: PharmacyDetails?.map(val => val.ph_total_return_count) || [],
          borderColor: 'rgba(44, 80, 103, 0.95)',
          backgroundColor: 'rgba(12, 132, 162, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Net Amount',
          data: PharmacyDetails?.map(val => val.ph_total_gross) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
      ]
      : [], // if no OpDetails, show empty chart
  };

  const dischargeDatas = {
    labels: DischargeDetails?.map(val => val.dc_date) || [],

    datasets: DischargeDetails
      ? [
        {
          label: 'Total Bill Amount',
          data: DischargeDetails?.map(val => val.dc_total_bill_amount) || [],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(96, 94, 163, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Receipt',
          data: DischargeDetails?.map(val => val.dc_receipt_count) || [],
          borderColor: 'rgba(44, 80, 103, 0.95)',
          backgroundColor: 'rgba(12, 132, 162, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Advance',
          data: DischargeDetails?.map(val => val.dc_advance_amount) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
      ]
      : [], // if no OpDetails, show empty chart
  };

  const labDatas = {
    labels: labDetails?.map(val => val.lab_date) || [],

    datasets: labDetails
      ? [
        {
          label: 'Total Billing',
          data: labDetails?.map(val => val.lab_total_count) || [],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(96, 94, 163, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Ip Billing',
          data: labDetails?.map(val => val.lab_ip_total_count) || [],
          borderColor: 'rgba(44, 80, 103, 0.95)',
          backgroundColor: 'rgba(12, 132, 162, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Op Billing',
          data: labDetails?.map(val => val.lab_op_total_count) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
        {
          label: 'Return',
          data: labDetails?.map(val => val.lab_refund_count) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
      ]
      : [], // if no OpDetails, show empty chart
  };
  const radiologyDatas = {
    labels: radiologyDetails?.map(val => val.rad_date) || [],

    datasets: radiologyDetails
      ? [
        {
          label: 'Total Billing',
          data: radiologyDetails?.map(val => val.rad_total_count) || [],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(96, 94, 163, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Ip Billing',
          data: radiologyDetails?.map(val => val.rad_ip_total_count) || [],
          borderColor: 'rgba(44, 80, 103, 0.95)',
          backgroundColor: 'rgba(12, 132, 162, 0.50)',
          barThickness: 50,
        },
        {
          label: 'Op Billing',
          data: radiologyDetails?.map(val => val.rad_op_total_count) || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(184, 62, 143, 0.48)',
          barThickness: 50,
        },
        {
          label: 'Return',
          data: radiologyDetails?.map(val => val.rad_refund_count) || [],
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
        <DashboardCard title="Out Patient Count">
          <OverallSalesProgress Graphicaldata={data} Displaystyle={1} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
        </DashboardCard>
        <DashboardCard title="In Patient Count">
          <OverallSalesProgress Graphicaldata={InpatientData} Displaystyle={2}
            fromDate={ipfromDate} setFromDate={setIpFromDate} toDate={iptoDate} setToDate={setIpToDate}
          />
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
          <OverallSalesProgress Graphicaldata={pharmacySales} Displaystyle={3} fromDate={phfromDate} setFromDate={setPhFromDate} toDate={phtoDate} setToDate={setPhToDate} />
        </DashboardCard>
        <DashboardCard title="Discharge">
          <OverallSalesProgress Graphicaldata={dischargeDatas} Displaystyle={1} fromDate={dcfromDate} setFromDate={setdcFromDate} toDate={dctoDate} setToDate={setdcToDate} />
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
          <OverallSalesProgress Graphicaldata={labDatas} Displaystyle={2} fromDate={labfromDate} setFromDate={setlabFromDate} toDate={labtoDate} setToDate={setlabToDate} />
        </DashboardCard>
        <DashboardCard title="Radiology">
          <OverallSalesProgress Graphicaldata={radiologyDatas} Displaystyle={3} fromDate={radfromDate} setFromDate={setradFromDate} toDate={radtoDate} setToDate={setradToDate} />
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

