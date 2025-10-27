
import { Box, Grid, Typography } from '@mui/joy';
import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import {
    addDays, format, parseISO,
    startOfMonth, startOfWeek, subMonths, subWeeks
} from "date-fns";
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import DateFieldCommonComp from '../../BIS_CommoCode/DateFieldCommonComp';
import { useParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

// Sample data generation
const labDetails = Array.from({ length: 180 }, (_, i) => {
    const today = new Date();
    const pastDate = subMonths(today, 6);
    const randomDate = new Date(pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime()));
    const testdate = randomDate.toISOString().split('T')[0];
    const totalOP = Math.floor(Math.random() * 501) + 100;
    const totalIP = Math.floor(Math.random() * 501) + 100;
    const totalTest = totalOP + totalIP;
    return {
        slno: i + 1,
        totalTest,
        totalOP,
        totalIP,
        testdate
    };
});

const OP_IP_Statistics = () => {

    const { deptName, deptId } = useParams();

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [chartData, setChartData] = useState(null);
    const [currentPeriod, setCurrentPeriod] = useState(2);
    const [Chartlayout, seChartlayout] = useState(1);
    const [polarData, setPolarData] = useState({ labels: [], datasets: [] });

    const today = new Date();
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const formatLabel = (testdate, period) => {
        const date = parseISO(testdate);
        if (period === 2) return format(date, 'dd EEE');
        if (period === 3 || period === 6) return format(date, 'dd/MM/yyyy'); // ← include custom
        return format(date, 'dd/MM');
    };

    const filterAndAggregate = useCallback((rangeStart, rangeEnd, period) => {
        try {
            // Input Validation
            if (!(rangeStart instanceof Date) || isNaN(rangeStart)) {
                throw new Error("Invalid rangeStart date.");
            }
            if (!(rangeEnd instanceof Date) || isNaN(rangeEnd)) {
                throw new Error("Invalid rangeEnd date.");
            }
            if (![2, 3, 4, 5, 6].includes(period)) {
                throw new Error("Invalid period.");
            }
            if (!Array.isArray(labDetails)) {
                throw new Error("labDetails must be an array.");
            }

            //Filter data by date range
            const filtered = labDetails.filter(({ testdate }) => {
                const date = new Date(testdate);
                return date >= rangeStart && date <= rangeEnd;
            });

            let labels = [];
            let totalTestData = [];
            let totalOPData = [];
            let totalIPData = [];

            //Monthly grouping for periods 4 & 5
            if (period === 4 || period === 5) {
                const monthMap = {};

                filtered.forEach(({ testdate, totalTest, totalOP, totalIP }) => {
                    const date = parseISO(testdate);
                    const key = format(date, 'yyyy-MM');

                    if (!monthMap[key]) {
                        monthMap[key] = { totalTest: 0, totalOP: 0, totalIP: 0 };
                    }

                    monthMap[key].totalTest += totalTest ?? 0;
                    monthMap[key].totalOP += totalOP ?? 0;
                    monthMap[key].totalIP += totalIP ?? 0;
                });

                const sortedKeys = Object.keys(monthMap).sort();
                labels = sortedKeys.map(key => {
                    const [year, month] = key.split('-');
                    return format(new Date(year, month - 1), 'MMM yyyy');
                });

                totalTestData = sortedKeys.map(key => monthMap[key].totalTest);
                totalOPData = sortedKeys.map(key => monthMap[key].totalOP);
                totalIPData = sortedKeys.map(key => monthMap[key].totalIP);

            } else {
                //Daily grouping
                const dateMap = {};

                filtered.forEach(({ testdate, totalTest, totalOP, totalIP }) => {
                    if (!dateMap[testdate]) {
                        dateMap[testdate] = { totalTest: 0, totalOP: 0, totalIP: 0 };
                    }

                    dateMap[testdate].totalTest += totalTest ?? 0;
                    dateMap[testdate].totalOP += totalOP ?? 0;
                    dateMap[testdate].totalIP += totalIP ?? 0;
                });

                const sortedDates = Object.keys(dateMap).sort((a, b) => new Date(a) - new Date(b));
                labels = sortedDates.map(date => formatLabel(date, period));
                totalTestData = sortedDates.map(date => dateMap[date].totalTest);
                totalOPData = sortedDates.map(date => dateMap[date].totalOP);
                totalIPData = sortedDates.map(date => dateMap[date].totalIP);
            }

            // Update Polar Chart Data
            setPolarData({
                labels,
                datasets: [
                    {
                        label: 'Total Lab Test',
                        data: totalTestData,
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56',
                            '#4BC0C0', '#9966FF', '#FF9F40'
                        ],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                ]
            });

            return {
                labels,
                datasets: [
                    {
                        label: 'Total Lab Test',
                        data: totalTestData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'OP Test',
                        data: totalOPData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'IP Test',
                        data: totalIPData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            };

        } catch (error) {
            console.error("Error in filterAndAggregate:", error.message);
            return {
                labels: [],
                datasets: []
            };
        }
    }, []);

    const handlePeriodChange = useCallback((period) => {
        try {
            const now = new Date();

            // Validate period input
            if (![2, 3, 4, 5].includes(period)) {
                console.error("Invalid period:", period);
                return;
            }

            const ranges = {
                2: () => [startOfLastWeek, endOfLastWeek],
                3: () => [startOfMonth(now), now],
                4: () => [startOfMonth(subMonths(now, 5)), now],
                5: () => [new Date(now.getFullYear(), 0, 1), now],
            };

            const rangeFunc = ranges[period];
            if (typeof rangeFunc !== 'function') {
                throw new Error("Invalid range function for period: " + period);
            }

            const [start, end] = rangeFunc();

            // Validate dates
            if (!(start instanceof Date) || isNaN(start)) {
                throw new Error("Invalid start date.");
            }
            if (!(end instanceof Date) || isNaN(end)) {
                throw new Error("Invalid end date.");
            }

            setCurrentPeriod(period);
            setFromDate(format(start, 'yyyy-MM-dd'));
            setToDate(format(end, 'yyyy-MM-dd'));

            const chart = filterAndAggregate(start, end, period);

            if (!chart || !Array.isArray(chart.labels) || !Array.isArray(chart.datasets)) {
                throw new Error("Invalid chart data returned.");
            }

            setChartData(chart);

        } catch (error) {
            console.error("handlePeriodChange error:", error.message);
            // Optionally show toast/snackbar here
        }
    }, [filterAndAggregate]);



    useEffect(() => {
        handlePeriodChange(2); // Default
    }, []);

    useEffect(() => {
        if (fromDate && toDate && currentPeriod === 6) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            const chart = filterAndAggregate(start, end, currentPeriod);
            setChartData(chart);
        }
    }, [fromDate, toDate, currentPeriod, filterAndAggregate]);

    const barOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: { size: 12 },
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#333',
                font: { size: 10 },
                formatter: (value) => value,
            },
        },
        scales: {
            x: {
                stacked: false,
                ticks: { autoSkip: false, maxRotation: 45, font: { size: 10 } },
                grid: { display: false }
            },
            y: {
                stacked: false,
                beginAtZero: true,
                ticks: { font: { size: 10 } }
            }
        }
    }), []);

    return (
        <Box>
            <DefaultPageLayout label={deptName}>
                <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
                    <Grid
                        xs={12} sm={12} md={6} lg={3} xl={3}
                        onClick={BackToPreviousPage}
                    >
                    </Grid>
                    <Box sx={{ width: '100%', overflow: 'auto', mt: 2, p: 2 }}>
                        <Typography textAlign="center">{deptName}</Typography>
                        <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
                            <DateFieldCommonComp
                                onPeriodChange={handlePeriodChange}
                                fromDate={fromDate}
                                setFromDate={setFromDate}
                                toDate={toDate}
                                setToDate={setToDate}
                                currentPeriod={currentPeriod}
                                setCurrentPeriod={setCurrentPeriod}
                            />
                        </Box>

                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
                            <Box sx={{ mt: 2, }}>
                                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 2, height: 350 }}>
                            {Chartlayout === 1 && chartData && (
                                <Bar data={chartData} options={barOptions} height={350} />
                            )}

                            {Chartlayout === 2 && chartData && (
                                <Line data={transformToLineChartData(chartData)} options={lineOptions} height={350} />
                            )}

                            {Chartlayout === 3 && (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
                                    <PolarArea data={transformToPolarData(chartData)} height={300} width={300} />
                                </Box>
                            )}
                        </Box>


                    </Box>
                </Grid>
            </DefaultPageLayout>
        </Box >

    );
};

export default memo(OP_IP_Statistics);

// import { Box, Button, ButtonGroup, Grid, Input, Typography } from '@mui/joy';
// import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
// import {
//     addDays,
//     eachDayOfInterval,
//     eachMonthOfInterval,
//     endOfMonth,
//     format,
//     isWithinInterval,
//     startOfMonth,
//     startOfWeek,
//     subMonths,
//     subWeeks
// } from 'date-fns';
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
// import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
// import { useParams } from 'react-router-dom';
// import DefaultPageLayout from '../../../../Components/DefaultPageLayout';

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

// const OP_IP_Statistics = () => {

//     const { deptName, deptId } = useParams();

//     const [fromDate, setFromDate] = useState(format(startOfMonth(new Date()), "yyyy-MM-dd"));
//     const [toDate, setToDate] = useState(format(endOfMonth(new Date()), "yyyy-MM-dd"));

//     const StyleMode = parseInt(1);
//     const [dayCount, setDayCount] = useState(2);
//     const [Chartlayout, seChartlayout] = useState(StyleMode);
//     const [chartData, setChartData] = useState(null);

//     const today = new Date();
//     const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
//     const startOfLastWeek = subWeeks(startOfThisWeek, 1);
//     const endOfLastWeek = addDays(startOfLastWeek, 6);

//     // ✅ Generate random data
//     const data = useMemo(() => {
//         return Array.from({ length: 50 }, (_, i) => {
//             const date = new Date();
//             date.setDate(date.getDate() - i);
//             return {
//                 visit_date: date.toISOString().split('T')[0],
//                 total_op: Math.floor(Math.random() * 100) + 50,
//                 total_ip: Math.floor(Math.random() * 30) + 10
//             };
//         });
//     }, []);

//     const Graphicaldata = useMemo(() => ({
//         labels: data.map(val => val.visit_date),
//         datasets: [
//             {
//                 label: 'Total OP',
//                 data: data.map(val => val.total_op),
//                 borderColor: 'rgba(96, 94, 163, 1)',
//                 backgroundColor: 'rgba(96, 94, 163, 0.5)'
//             },
//             {
//                 label: 'Total IP',
//                 data: data.map(val => val.total_ip),
//                 borderColor: 'rgba(12, 132, 162, 1)',
//                 backgroundColor: 'rgba(12, 132, 162, 0.5)'
//             }
//         ]
//     }), [data]);

//     const filterDataByDateRange = useCallback((labels, datasets, dateRange) => {
//         if (dateRange.isRange) {
//             const { rangeStart, rangeEnd } = dateRange;

//             if (dayCount === 4 || dayCount === 5) {
//                 const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
//                 const monthLabels = months.map(month => format(month, 'MMM yyyy'));

//                 const monthlySums = datasets.map(dataset =>
//                     months.map(month => {
//                         const start = startOfMonth(month);
//                         const end = endOfMonth(month);
//                         return labels.reduce((sum, label, index) => {
//                             const labelDate = new Date(label);
//                             return isWithinInterval(labelDate, { start, end })
//                                 ? sum + (dataset.data[index] || 0)
//                                 : sum;
//                         }, 0);
//                     })
//                 );

//                 return {
//                     labels: monthLabels,
//                     datasets: datasets.map((ds, i) => ({ ...ds, data: monthlySums[i] }))
//                 };
//             }

//             const indices = labels
//                 .map((label, i) => {
//                     const d = new Date(label);
//                     return d >= rangeStart && d <= rangeEnd ? i : null;
//                 })
//                 .filter(i => i !== null);

//             return {
//                 labels: indices.map(i => format(new Date(labels[i]), 'dd EEE')),
//                 datasets: datasets.map(ds => ({ ...ds, data: indices.map(i => ds.data[i]) }))
//             };
//         }

//         const indices = labels
//             .map((label, i) => (dateRange.includes(label) ? i : null))
//             .filter(i => i !== null);

//         return {
//             labels: indices.map(i => format(new Date(labels[i]), 'dd EEE')),
//             datasets: datasets.map(ds => ({ ...ds, data: indices.map(i => ds.data[i]) }))
//         };
//     }, [dayCount]);

//     const handlePeriodChange = useCallback((period) => {
//         setDayCount(period);
//         const now = new Date();

//         const dateRanges = {
//             2: () => {
//                 setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
//                 setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
//                 return eachDayOfInterval({ start: startOfLastWeek, end: endOfLastWeek }).map(d => format(d, 'yyyy-MM-dd'));
//             },
//             3: () => {
//                 const start = startOfMonth(now);
//                 setFromDate(format(start, 'yyyy-MM-dd'));
//                 setToDate(format(now, 'yyyy-MM-dd'));
//                 return eachDayOfInterval({ start, end: now }).map(d => format(d, 'yyyy-MM-dd'));
//             },
//             4: () => {
//                 const start = startOfMonth(subMonths(now, 5));
//                 setFromDate(format(start, 'yyyy-MM-dd'));
//                 setToDate(format(now, 'yyyy-MM-dd'));
//                 return { rangeStart: start, rangeEnd: now, isRange: true };
//             },
//             5: () => {
//                 const yearStart = new Date(now.getFullYear(), 0, 1);
//                 setFromDate(format(yearStart, 'yyyy-MM-dd'));
//                 setToDate(format(now, 'yyyy-MM-dd'));
//                 return { rangeStart: yearStart, rangeEnd: now, isRange: true };
//             }
//         };

//         const selectedRange = dateRanges[period]?.();
//         if (selectedRange) {
//             const filtered = filterDataByDateRange(Graphicaldata.labels, Graphicaldata.datasets, selectedRange);
//             setChartData(prev => JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev);
//         }
//     }, [filterDataByDateRange, Graphicaldata, setFromDate, setToDate, startOfLastWeek, endOfLastWeek]);

//     useEffect(() => {
//         handlePeriodChange(2);
//     }, []);

//     useEffect(() => {
//         if (fromDate && toDate) {
//             const start = new Date(fromDate);
//             const end = new Date(toDate);
//             const customRange = { rangeStart: start, rangeEnd: end, isRange: true };
//             const filtered = filterDataByDateRange(Graphicaldata.labels, Graphicaldata.datasets, customRange);
//             setChartData(prev => JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev);
//         }
//     }, [fromDate, toDate, Graphicaldata, filterDataByDateRange]);

//     const barOptions = useMemo(() => ({
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'top',
//                 labels: {
//                     boxWidth: 15,
//                     color: '#333',
//                     font: { size: 12 },
//                     padding: 20,
//                     usePointStyle: true,
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
//                     label: (context) => `${context.dataset.label}: ${context.raw}`,
//                 },
//             },
//             datalabels: {
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
//             },
//         },
//         scales: {
//             x: {
//                 ticks: { font: { size: 10 } },
//                 grid: { display: false }
//             },
//             y: {
//                 beginAtZero: true,
//                 ticks: { font: { size: 10 } }
//             }
//         }
//     }), []);

//     const lineOptions = {
//         ...barOptions,
//         elements: {
//             line: { tension: 0.4, borderWidth: 2 },
//             point: { radius: 4, backgroundColor: 'rgba(96, 94, 163, 1)' }
//         }
//     };
//     const transformToLineChartData = useCallback((data) => ({
//         labels: data.labels,
//         datasets: data.datasets.map(ds => ({
//             ...ds,
//             borderWidth: 2,
//             tension: 0.4,
//             fill: false,
//             pointRadius: 4,
//             pointBackgroundColor: ds.borderColor
//         }))
//     }), []);

//     const transformToPolarData = useCallback((data) => {
//         const labels = data.datasets.map(ds => ds.label);
//         const values = data.datasets.map(ds => ds.data.reduce((sum, val) => sum + val, 0));
//         return {
//             labels,
//             datasets: [{
//                 data: values,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.5)',
//                     'rgba(54, 162, 235, 0.5)'
//                 ],
//                 borderWidth: 1
//             }]
//         };
//     }, []);

//     const BackToPreviousPage = useCallback(() => {

//     }, [])

//     return (
//         <Box>
//             <DefaultPageLayout label={deptName}>
//                 <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
//                     <Grid
//                         xs={12} sm={12} md={6} lg={3} xl={3}
//                         onClick={BackToPreviousPage}
//                     >
//                     </Grid>
//                     <Box sx={{ width: '100%', overflow: 'auto', mt: 2, p: 2 }}>
//                         <Typography textAlign="center">{deptName}</Typography>
//                         <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
//                             <ButtonGroup aria-label="date range selector" sx={{
//                                 '--ButtonGroup-radius': '30px', display: "flex",
//                                 flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
//                             }}>
//                                 {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (

//                                     <Button key={label} onClick={() => handlePeriodChange(index + 2)}>

//                                         {index === 4 ? (
//                                             <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                                 <Input
//                                                     type="date"
//                                                     value={fromDate}
//                                                     onChange={(e) => setFromDate(e.target.value)}
//                                                     size='xs'
//                                                     sx={{ p: 0.5, color: 'grey', }}
//                                                 />
//                                                 <Input
//                                                     type="date"
//                                                     value={toDate}
//                                                     onChange={(e) => setToDate(e.target.value)}
//                                                     size='xs'
//                                                     sx={{
//                                                         p: 0.5,
//                                                         color: 'grey',
//                                                     }}
//                                                     slotProps={{ input: { min: fromDate } }}
//                                                 />
//                                             </Box>
//                                         ) : (
//                                             <Typography sx={{
//                                                 fontSize: 11,
//                                                 color: "rgba(var(--input-font-color))",
//                                                 '&:hover': {
//                                                     color: 'rgba(var(--font-black))',
//                                                     backgroundColor: 'transparent',
//                                                 }
//                                             }}>{label}</Typography>
//                                         )}
//                                     </Button>
//                                 ))}
//                             </ButtonGroup>
//                         </Box>

//                         <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
//                             <Box sx={{ mt: 2, }}>
//                                 <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
//                             </Box>
//                         </Box>

//                         <Box sx={{ mt: 2, height: 350 }}>
//                             {Chartlayout === 1 && chartData && (
//                                 <Bar data={chartData} options={barOptions} height={350} />
//                             )}

//                             {Chartlayout === 2 && chartData && (
//                                 <Line data={transformToLineChartData(chartData)} options={lineOptions} height={350} />
//                             )}

//                             {Chartlayout === 3 && (
//                                 <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
//                                     <PolarArea data={transformToPolarData(chartData)} height={300} width={300} />
//                                 </Box>
//                             )}
//                         </Box>


//                     </Box>
//                 </Grid>
//             </DefaultPageLayout>
//         </Box >
//     );
// };

// export default memo(OP_IP_Statistics);


