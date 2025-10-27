import React, { memo, useState } from "react";
import { Box, Typography } from "@mui/joy";
import { endOfMonth, format, startOfMonth } from "date-fns";
import KMCHeader from "../../BIS_CommoCode/KMCHeader";
import ChartRepresentation from "./ChartRepresentation";

// Generate default data
const generateGraphicalData = () => {
    const data = Array.from({ length: 50 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
            visit_date: date.toISOString().split("T")[0],
            total_op: Math.floor(Math.random() * 100) + 50,
            total_ip: Math.floor(Math.random() * 30) + 10,
            total_return: Math.floor(Math.random() * 20) + 5,
            op_visit: Math.floor(Math.random() * 100) + 60,
        };
    }).sort((a, b) => new Date(a.visit_date) - new Date(b.visit_date));

    return {
        labels: data?.map((d) => d.visit_date),
        datasets: [
            {
                label: "OP Visit",
                data: data?.map((d) => d.op_visit),
                backgroundColor: "rgba(58, 109, 161, 0.5)",
                stack: "opvisit",
            },
            {
                label: "Billing OP",
                data: data?.map((d) => d.total_op),
                backgroundColor: "rgba(74, 62, 131, 0.5)",
                stack: "billing",
            },
            {
                label: "Billing IP",
                data: data?.map((d) => d.total_ip),
                backgroundColor: "rgba(157, 85, 101, 0.5)",
                stack: "billing",
            },
            {
                label: "Return",
                data: data?.map((d) => d.total_return),
                backgroundColor: "rgba(52, 41, 17, 0.5)",
                stack: "returns",
            },
        ],
    };
};

const defaultGraphicalData = generateGraphicalData();



const generatewithoutOpData = () => {
    const data = Array.from({ length: 50 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
            visit_date: date.toISOString().split("T")[0],
            total_op: Math.floor(Math.random() * 100) + 50,
            total_ip: Math.floor(Math.random() * 30) + 10,
            total_return: Math.floor(Math.random() * 20) + 5,
            op_visit: Math.floor(Math.random() * 100) + 60,
        };
    }).sort((a, b) => new Date(a.visit_date) - new Date(b.visit_date));

    return {
        labels: data?.map((d) => d.visit_date),
        datasets: [
            {
                label: "Billing OP",
                data: data?.map((d) => d.total_op),
                backgroundColor: "rgba(49, 8, 80, 0.36)",
                stack: "billing",
            },
            {
                label: "Billing IP",
                data: data?.map((d) => d.total_ip),
                backgroundColor: "rgba(14, 54, 119, 0.5)",
                stack: "billing",
            },
            {
                label: "Return",
                data: data?.map((d) => d.total_return),
                backgroundColor: "rgba(63, 57, 59, 0.5)",
                stack: "returns",
            },
        ],
    };
};

const withoutOp = generatewithoutOpData();

const billingConfigs = [
    { key: "Blood Center", display: 1, data: withoutOp },
    { key: "Cardiology", display: 2, data: defaultGraphicalData },
    { key: "Casuality", display: 3, data: defaultGraphicalData },
    { key: "CDC OP", display: 1, data: defaultGraphicalData },
    { key: "CTVS", display: 2, data: defaultGraphicalData },
    { key: "Dental OP", display: 3, data: defaultGraphicalData },
    { key: "Dermatology", display: 1, data: defaultGraphicalData },
    { key: "Endocrinology", display: 2, data: defaultGraphicalData },
    { key: "ENT", display: 1, data: defaultGraphicalData },

    { key: "Gastro Med OPD", display: 3, data: defaultGraphicalData },
    { key: "GAstro Surg OPD", display: 2, data: defaultGraphicalData },
    { key: "General Billing", display: 3, data: withoutOp },
    { key: "Kiosk ", display: 1, data: withoutOp },
    { key: "Lab", display: 2, data: withoutOp },
    { key: "MRI", display: 3, data: withoutOp },
    { key: "Nephro", display: 1, data: defaultGraphicalData },
    { key: "Neuro Medicine", display: 2, data: defaultGraphicalData },
    { key: "OBG", display: 1, data: defaultGraphicalData },

    { key: "Oncology", display: 3, data: defaultGraphicalData },
    { key: "Ortho OP", display: 2, data: defaultGraphicalData },
    { key: "Peadiatrics", display: 3, data: defaultGraphicalData },
    { key: "Pain Clinic ", display: 1, data: defaultGraphicalData },
    { key: "Physical Medicine ", display: 2, data: defaultGraphicalData },
    { key: "Physiotherapic", display: 3, data: defaultGraphicalData },
    { key: "Plastic Surgery", display: 1, data: defaultGraphicalData },

    { key: "Prioratory", display: 3, data: defaultGraphicalData },
    { key: "Phychatry", display: 2, data: defaultGraphicalData },
    { key: "Pulmo", display: 3, data: defaultGraphicalData },
    { key: "Radiology", display: 1, data: withoutOp },
    { key: "Rhematology ", display: 2, data: defaultGraphicalData },
    { key: "Surgery OP", display: 3, data: defaultGraphicalData },
    { key: "TDC Billing", display: 1, data: defaultGraphicalData },
    { key: "Urology ", display: 2, data: defaultGraphicalData },
];

const Kmch_billingInventory_main = () => {
    const initialDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const endDate = format(endOfMonth(new Date()), "yyyy-MM-dd");

    const [billingDates, setBillingDates] = useState(
        billingConfigs.reduce((acc, { key }) => {
            acc[key] = { from: initialDate, to: endDate };
            return acc;
        }, {})
    );

    const handleDateChange = (key, field, value) => {
        setBillingDates((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value,
            },
        }));
    };

    return (
        <Box sx={{ width: "100%", height: { xl: 900, sm: 1200 }, overflow: "auto" }}>

            <Box sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "#F0F6F5",
                display: "flex",
                justifyContent: "space-between",
                p: 0.5,
                borderBottom: 1,
                borderColor: 'rgba(163, 170, 177, 0.5)',
            }}>
                <Box sx={{ p: 0.5, fontSize: 18, mt: 0.5, color: 'rgb(var(--header-Font-Color))', fontStyle: "--font-varient" }}>OPD Procedure Billing</Box>
                <KMCHeader />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    px: 2,
                    mt: 1,
                }}>
                {billingConfigs?.map(({ key, display, data }) => (
                    <DashboardCard key={key} title={`${key} Billing`}>
                        <ChartRepresentation
                            Displaystyle={display}
                            fromDate={billingDates[key]?.from}
                            toDate={billingDates[key]?.to}
                            setFromDate={(val) => handleDateChange(key, "from", val)}
                            setToDate={(val) => handleDateChange(key, "to", val)}
                            Graphicaldata={data ?? defaultGraphicalData}
                        />
                    </DashboardCard>
                ))}
            </Box>
        </Box>
    );
};

const DashboardCard = ({ title, children }) => (
    <Box
        sx={{
            flex: "1 1 48%",
            border: 1,
            borderColor: "#d2d2cf",
            p: 1,
            minWidth: "300px",
            overflowX: "scroll",
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

export default memo(Kmch_billingInventory_main);
