import { Box, Button, ButtonGroup, Table, Typography } from '@mui/joy';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import KMCHeader from "../../BIS_CommoCode/KMCHeader";
import { Chart, DoughnutController, Tooltip, ArcElement, Legend } from 'chart.js';
import { format, startOfMonth, subMonths } from 'date-fns';
import LaunchIcon from '@mui/icons-material/Launch';
import StoreQuotationDetails from './StoreQuotationDetails';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const chartDataSetArray = [
    [300, 50, 100, 20, 79],
    [120, 180, 90, 40, 60],
];

const titleArray = ['Total Supplier', 'Store Wise Supplier'];


const KmcSupplierWiseQtn = () => {
    const chartRefs = [useRef(null), useRef(null)];
    const chartInstances = useRef([]);
    const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [newSupplierChartData, setNewSupplierChartData] = useState([]);
    const [newSupplierTotal, setNewSupplierTotal] = useState(0);


    useEffect(() => {
        chartRefs.map((ref, index) => {
            if (chartInstances.current[index]) {
                chartInstances.current[index].destroy();
            }

            const ctx = ref.current.getContext('2d');

            chartInstances.current[index] = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Sales', 'Consumable', 'General', 'Dental', 'Biomedical'],
                    datasets: [{
                        label: 'Supplier Data',
                        data: chartDataSetArray[index],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#667BC6'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    cutout: '80%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 20,
                                font: {
                                    size: 11
                                }
                            }
                        },
                        datalabels: {
                            display: false // 👈 Turn off data labels inside the chart
                        },
                    }
                }
            });
        });
    }, []);

    //for new suppliers
    useEffect(() => {
        handlePeriodChange(1);
        handleNewQuotationPeriodChange(1); // 👈 Load "This Month" data on first render
    }, []);

    const handlePeriodChange = (type) => {
        const today = new Date();
        let newFromDate;

        switch (type) {
            case 1:
                newFromDate = startOfMonth(today);
                break;
            case 2:
                newFromDate = subMonths(today, 6);
                break;
            case 3:
                newFromDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                newFromDate = today;
        }

        const formattedFrom = format(newFromDate, 'yyyy-MM-dd');
        const formattedTo = format(today, 'yyyy-MM-dd');

        setFromDate(formattedFrom);
        setToDate(formattedTo);

        // 🔁 Replace this with your API-based logic
        const mockData = {
            1: [59, 53, 94, 22, 56],     // this month
            2: [25, 18, 20, 12, 30], // last 6 months
            3: [50, 38, 42, 25, 65]  // this year
        };

        const selectedData = mockData[type];
        setNewSupplierChartData(selectedData);
        setNewSupplierTotal(selectedData.reduce((a, b) => a + b, 0));
    };


    const newSupplierRef = useRef(null);
    const newSupplierChartInstance = useRef(null);

    useEffect(() => {
        if (!newSupplierChartData.length) return;

        if (newSupplierChartInstance.current) {
            newSupplierChartInstance.current.destroy();
        }

        const ctx = newSupplierRef.current.getContext('2d');
        newSupplierChartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Sales', 'Consumable', 'General', 'Dental', 'Biomedical'],
                datasets: [{
                    data: newSupplierChartData,
                    // backgroundColor: ['#D50B8B', '#7286D3', '#38CAB3', '#ffc33f', '#B2C9AD'],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#667BC6'],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) =>
                                `${context.label}: ${context.raw}`
                        }
                    },
                    datalabels: {
                        display: false // 👈 Turn off data labels inside the chart
                    },
                }
            }
        });
    }, [newSupplierChartData]);

    const supplierRows = [
        { slno: 1, suppliername: 'Alpha Meds', quantity: 100, rate: 12.5, mrp: 15.0, date: '2025-06-20' },
        { slno: 2, suppliername: 'HealthMart', quantity: 200, rate: 10.0, mrp: 13.5, date: '2025-06-19' },
        { slno: 3, suppliername: 'MediLine', quantity: 150, rate: 8.75, mrp: 12.0, date: '2025-06-18' },
        { slno: 4, suppliername: 'Megha Meds', quantity: 20, rate: 12.5, mrp: 15.0, date: '2025-01-20' },
        { slno: 5, suppliername: 'MedFy', quantity: 350, rate: 10.0, mrp: 13.5, date: '2025-02-19' },
        { slno: 6, suppliername: 'All In', quantity: 190, rate: 8.75, mrp: 12.0, date: '2025-04-18' },
    ];



    // State for new quotation
    const [newQuotationChartData, setNewQuotationChartData] = useState([]);
    const [newQuotationTotal, setNewQuotationTotal] = useState(0);

    const newQuotationRef = useRef(null);
    const newQuotationChartInstance = useRef(null);

    // Handle date range change
    const handleNewQuotationPeriodChange = (type) => {
        const today = new Date();
        let newFromDate;

        switch (type) {
            case 1:
                newFromDate = startOfMonth(today);
                break;
            case 2:
                newFromDate = subMonths(today, 6);
                break;
            case 3:
                newFromDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                newFromDate = today;
        }

        const formattedFrom = format(newFromDate, 'yyyy-MM-dd');
        const formattedTo = format(today, 'yyyy-MM-dd');

        setFromDate(formattedFrom);
        setToDate(formattedTo);

        // 🔁 Mock data — replace with API later
        const mockData = {
            1: [256, 9654, 3145, 2356, 85],     // This month
            2: [41256, 425, 1478, 36544, 1256], // Last 6 months
            3: [7523, 95412, 7412, 9632, 69874]  // This year
        };

        const selectedData = mockData[type];
        setNewQuotationChartData(selectedData);
        setNewQuotationTotal(selectedData.reduce((a, b) => a + b, 0));
    };

    // Initialize and update chart
    useEffect(() => {
        if (!newQuotationChartData.length) return;

        if (newQuotationChartInstance.current) {
            newQuotationChartInstance.current.destroy();
        }

        const ctx = newQuotationRef.current.getContext('2d');
        newQuotationChartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Sales', 'Consumable', 'General', 'Dental', 'Biomedical'],
                datasets: [{
                    data: newQuotationChartData,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#667BC6'],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.raw}`
                        }
                    },
                    datalabels: {
                        display: false
                    }
                }
            }
        });
    }, [newQuotationChartData]);

    const [open, SetOpen] = useState(false)

    const ViewSuplierDetails = useCallback(() => {
        SetOpen(true)
    }, [])



    return (
        <Box sx={{ p: 2, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
            <KMCHeader />
            {open === true ? <StoreQuotationDetails /> : null}
            <Box>
                <Box sx={{ fontSize: 18, fontWeight: 600, color: "#4158A6", mb: 2 }}>
                    Supplier Wise Quotation Overview
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                    {/* Chart Cards */}
                    {chartRefs.map((ref, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 360,
                                borderRadius: 4,
                                p: 2,
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                border: "1px solid #dbe2ea",
                                borderRadius: 15
                            }}
                        >
                            {/* Title + Count */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#2a4365" }}>
                                    {titleArray[index]}
                                </Typography>
                                <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#553c9a" }}>
                                    {chartDataSetArray[index].reduce((a, b) => a + b, 0)}
                                </Typography>
                            </Box>

                            {/* Doughnut Chart */}
                            <Box sx={{ mx: "auto", width: 200, height: 170, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <canvas ref={ref} />
                            </Box>
                        </Box>
                    ))}

                    {/* New Supplier Card */}
                    <Box
                        sx={{
                            width: 360,
                            borderRadius: 4,
                            p: 2,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: "1px solid #dbe2ea",
                            borderRadius: 15
                        }}
                    >
                        {/* Title + Total */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#2a4365" }}>
                                New Suppliers
                            </Typography>
                            <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#553c9a" }}>
                                {newSupplierTotal}
                            </Typography>
                        </Box>

                        {/* Date Range Selector */}
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                            <ButtonGroup variant="outlined" sx={{ borderRadius: 5 }}>
                                {["This Month", "Last 6 months", "This Year"].map((label, index) => (
                                    <Button
                                        key={label}
                                        size="sm"
                                        onClick={() => handlePeriodChange(index + 1)}
                                        sx={{
                                            fontSize: 11,
                                            textTransform: "none",
                                            px: 1.5,
                                            color: "#2a5265",
                                            borderColor: "#cbd5e0",
                                            "&:hover": {
                                                backgroundColor: "#edf2f7",
                                                color: "#d53f8c",
                                            },
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                        {/* New Supplier Doughnut */}
                        <Box sx={{ mx: "auto", width: 200, height: 170, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <canvas ref={newSupplierRef} />
                        </Box>
                    </Box>














                    {/* New Supplier Card */}
                    {/* New Quotation Card */}
                    <Box
                        sx={{
                            width: 360,
                            borderRadius: 4,
                            p: 2,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            border: "1px solid #dbe2ea",
                            borderRadius: 15
                        }}
                    >
                        {/* Title + Total */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#2a4365" }}>
                                New Quotation
                            </Typography>
                            <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#553c9a" }}>
                                {newQuotationTotal}
                            </Typography>
                        </Box>

                        {/* Date Range Selector */}
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                            <ButtonGroup variant="outlined" sx={{ borderRadius: 5 }}>
                                {["This Month", "Last 6 months", "This Year"].map((label, index) => (
                                    <Button
                                        key={label}
                                        size="sm"
                                        onClick={() => handleNewQuotationPeriodChange(index + 1)}
                                        sx={{
                                            fontSize: 11,
                                            textTransform: "none",
                                            px: 1.5,
                                            color: "#2a5265",
                                            borderColor: "#cbd5e0",
                                            "&:hover": {
                                                backgroundColor: "#edf2f7",
                                                color: "#d53f8c",
                                            },
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                        {/* Doughnut Chart */}
                        <Box
                            sx={{
                                mx: "auto",
                                width: 200,
                                height: 170,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <canvas ref={newQuotationRef} />
                        </Box>
                    </Box>











                </Box>
                {/* store wide quotation count */}
                <Box sx={{ display: "flex", mt: 2, gap: 1, flexWrap: "wrap" }}>
                    <Box sx={{
                        flex: 1,
                        width: 360,
                        borderRadius: 4,
                        p: 2,
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "1px solid #dbe2ea",
                        // borderRadius: 15
                    }}>


                        <Box sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            {/* <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#2a4365" }}>
                                Store Wise Most Quotation Supplier(Items wise)
                            </Typography> */}
                            <Box>
                                <Table borderAxis="both">
                                    <caption>  Store Wise Most Quotation Supplier(Items wise)</caption>
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th> Name</th>
                                            <th>Quantity</th>
                                            <th>Rate (₹)</th>
                                            <th>MRP (₹)</th>
                                            <th>Date</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supplierRows.map((row) => (
                                            <tr key={row.slno}>
                                                <td>{row.slno}</td>
                                                <td>{row.suppliername}</td>
                                                <td>{row.quantity}</td>
                                                <td>{row.rate}</td>
                                                <td>{row.mrp}</td>
                                                <td>{row.date}</td>
                                                <td style={{ textAlign: "center" }}><LaunchIcon onClick={(row) => { ViewSuplierDetails(row) }} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th scope="row">Totals</th>
                                            <td>-</td>
                                            <td>{supplierRows.reduce((acc, r) => acc + r.quantity, 0)}</td>
                                            <td colSpan={4}>—</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Box>
                        </Box>
                    </Box>


                    <Box sx={{
                        flex: 1,
                        width: 360,
                        borderRadius: 4,
                        p: 2,
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        border: "1px solid #dbe2ea",
                        // borderRadius: 15
                    }}>


                        <Box sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            {/* <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#2a4365", textAlign: "center" }}>
                                Store Wise Most Margin Supplier(Margin wise)
                            </Typography> */}
                            <Box>
                                <Table borderAxis="both">
                                    <caption>  Store Wise Most Quotation Supplier(Margin wise)</caption>
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th> Name</th>
                                            <th>Quantity</th>
                                            <th>Rate (₹)</th>
                                            <th>MRP (₹)</th>
                                            <th>Date</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supplierRows.map((row) => (
                                            <tr key={row.slno}>
                                                <td>{row.slno}</td>
                                                <td>{row.suppliername}</td>
                                                <td>{row.quantity}</td>
                                                <td>{row.rate}</td>
                                                <td>{row.mrp}</td>
                                                <td>{row.date}</td>
                                                <td style={{ textAlign: "center" }}><LaunchIcon onClick={(row) => { ViewSuplierDetails(row) }} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th scope="row">Totals</th>
                                            <td>-</td>
                                            <td>{supplierRows.reduce((acc, r) => acc + r.quantity, 0)}</td>
                                            <td colSpan={4}>—</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};

export default memo(KmcSupplierWiseQtn);




