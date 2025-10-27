import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import {
    addDays,
    eachDayOfInterval,
    eachMonthOfInterval,
    endOfMonth,
    format,
    parseISO,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';
import { Bar, Line, PolarArea } from 'react-chartjs-2';

const DeptBillingStatistics = ({ chartData, setChartData, rawChartData, setRawChartData }) => {
    const [chartLayout, setChartLayout] = useState(1);
    const [dyCount, setDyCount] = useState(2);
    const [fDate, setFDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [tDate, setTDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const doctors = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );
    const startDate = useMemo(() => new Date('2025-01-01'), []);
    const endDate = useMemo(() => new Date('2025-08-11'), []);

    // Generate fake doctor OP data
    const doctorOPStats = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return doctors.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [doctors, startDate, endDate]);

    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);


    // useEffect(() => {
    //     const labels = [];
    //     const billingData = [];

    //     eachDayOfInterval({ start: startDate, end: endDate }).forEach((date) => {
    //         const formattedDate = format(date, 'yyyy-MM-dd');
    //         labels.push(formattedDate);

    //         const totalBilling = doctorOPStats
    //             .filter((item) => item.date === formattedDate)
    //             .reduce((acc, cur) => acc + cur.totalRegistration, 0);

    //         billingData.push(totalBilling);
    //     });

    //     setRawChartData({
    //         labels,
    //         datasets: [
    //             {
    //                 label: 'Total Billing',
    //                 data: billingData,
    //                 borderColor: 'rgba(54, 162, 235, 1)',
    //                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //             },
    //         ],
    //     });
    // }, [doctorOPStats, startDate, endDate, setRawChartData]);

    useEffect(() => {
        const labels = [];
        const billingData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).forEach((date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            labels.push(formattedDate);

            const totalBilling = doctorOPStats
                .filter((item) => item.date === formattedDate)
                .reduce((acc, cur) => acc + cur.totalRegistration, 0);

            billingData.push(totalBilling);
        });

        setRawChartData({
            labels,
            datasets: [
                {
                    label: 'Total Billing',
                    data: billingData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
            ],
        });
    }, [doctorOPStats, startDate, endDate, setRawChartData]);


    // Transformations
    const transformToLineChartData = (data) => ({
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'),
            fill: false,
            borderWidth: 2,
            tension: 0.4,
        })),
    });

    const transformToPolarData = (data) => {
        const labels = data.datasets.map((d) => d.label);
        const summedData = data.datasets.map((d) => d.data.reduce((a, b) => a + b, 0));
        return {
            labels,
            datasets: [
                {
                    data: summedData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    // Filter by date range
    const FilterDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dyCount === 4 || dyCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }

                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }

            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dyCount]
    );

    // Handle date range change
    const handleDateRange = useCallback(
        (period) => {
            setDyCount(period);
            const now = new Date();

            const periodHandlers = {
                2: () => {
                    setFDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                    setTDate(format(endOfLastWeek, 'yyyy-MM-dd'));
                },
                3: () => {
                    setFDate(format(startOfMonth(now), 'yyyy-MM-dd'));
                    setTDate(format(now, 'yyyy-MM-dd'));
                },
                4: () => {
                    const sixMonthsAgo = subMonths(now, 5);
                    setFDate(format(startOfMonth(sixMonthsAgo), 'yyyy-MM-dd'));
                    setTDate(format(now, 'yyyy-MM-dd'));
                },
                5: () => {
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    setFDate(format(yearStart, 'yyyy-MM-dd'));
                    setTDate(format(now, 'yyyy-MM-dd'));
                },
            };

            periodHandlers[period]?.();
        },
        [startOfLastWeek, endOfLastWeek]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fDate && tDate && rawChartData.labels?.length) {
            const start = parseISO(fDate);
            const end = parseISO(tDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setChartData(FilterDateRange(rawChartData.labels, rawChartData, range));
        }
    }, [fDate, tDate, rawChartData, FilterDateRange, setChartData]);

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ border: 1, p: 2, borderColor: '#dbe0e9ff', width: '100%' }}>

                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: 'rgba(var(--font-light))',
                                mb: 1,
                            }}
                        >
                            Total Billing
                        </Typography>

                        <Box sx={{ flexWrap: 'wrap', mt: 2 }}>
                            <ButtonGroup
                                aria-label="date range selector"
                                sx={{
                                    '--ButtonGroup-radius': '30px',
                                    display: 'flex',
                                    flexWrap: { sm: 'wrap', xl: 'nowrap' },
                                    p: 0,
                                }}
                            >
                                {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                                    <Button key={label} onClick={() => handleDateRange(index + 2)}>
                                        {index === 4 ? (
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Input
                                                    type="date"
                                                    value={fDate}
                                                    onChange={(e) => setFDate(e.target.value)}
                                                    size="xs"
                                                    sx={{ p: 0.5, color: 'grey' }}
                                                />
                                                <Input
                                                    type="date"
                                                    value={tDate}
                                                    onChange={(e) => setTDate(e.target.value)}
                                                    size="xs"
                                                    sx={{ p: 0.5, color: 'grey' }}
                                                    slotProps={{ input: { min: fDate } }}
                                                />
                                            </Box>
                                        ) : (
                                            <Typography sx={{ fontSize: 11 }}>{label}</Typography>
                                        )}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <GraphicalRep Chartlayout={chartLayout} seChartlayout={setChartLayout} />
                        </Box>

                        <Box sx={{ mt: 2, width: '100%', height: { xs: 300, sm: 400 } }}>
                            {chartLayout === 1 ? (
                                <Bar data={chartData} options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        datalabels: {
                                            anchor: 'center',       // position
                                            align: 'end',        // position relative to bar
                                            rotation: -90,       // 🔥 rotate text vertically
                                            color: '#333',
                                            font: {
                                                size: 12,
                                                weight: 'bold',
                                            },
                                            formatter: (value) => value, // format value
                                        },
                                    },
                                }} />
                            ) : chartLayout === 2 ? (
                                <Line data={transformToLineChartData(chartData)} options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        datalabels: {
                                            anchor: 'center',       // position
                                            align: 'end',        // position relative to bar
                                            rotation: -90,       // 🔥 rotate text vertically
                                            color: '#333',
                                            font: {
                                                size: 12,
                                                weight: 'bold',
                                            },
                                            formatter: (value) => value, // format value
                                        },
                                    },
                                }} />
                            ) : (
                                <PolarArea data={transformToPolarData(chartData)} options={{ responsive: true, maintainAspectRatio: false }} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(DeptBillingStatistics);



// import React, { useState, useMemo, useCallback } from 'react';
// import { Box, Button, Typography, Input, ButtonGroup } from '@mui/joy';
// import {
//     addDays, format, isWithinInterval, parseISO,
//     startOfWeek, subWeeks, startOfMonth, subMonths,
// } from 'date-fns';
// import { Bar, Line, PolarArea } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Sample billing data
// const Graphicaldata = [
//     { slno: 1, tBillCount: 250, billdate: "2025-07-01" },
//     { slno: 2, tBillCount: 480, billdate: "2025-08-02" },
//     { slno: 3, tBillCount: 380, billdate: "2025-06-03" },
//     { slno: 4, tBillCount: 520, billdate: "2025-03-04" },
//     { slno: 5, tBillCount: 610, billdate: "2025-05-05" },
//     { slno: 6, tBillCount: 470, billdate: "2025-02-06" },
//     { slno: 7, tBillCount: 420, billdate: "2025-01-07" },
//     { slno: 8, tBillCount: 310, billdate: "2025-07-08" },
//     { slno: 9, tBillCount: 390, billdate: "2025-07-09" },
//     { slno: 10, tBillCount: 450, billdate: "2025-07-10" }
// ];

// const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
// const startOfLastWeek = subWeeks(startOfThisWeek, 1);
// const endOfLastWeek = addDays(startOfLastWeek, 6);

// const transformToChartData = (data) => {
//     const labels = data.map(item => item.billdate);
//     const values = data.map(item => item.tBillCount);
//     return {
//         labels,
//         datasets: [{
//             label: 'Total Billing',
//             data: values,
//             backgroundColor: 'rgba(75, 192, 192, 0.5)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//         }]
//     };
// };

// const filterByDateRange = (data, from, to) => {
//     const fromDate = parseISO(from);
//     const toDate = parseISO(to);
//     return data.filter(item =>
//         isWithinInterval(parseISO(item.billdate), {
//             start: fromDate,
//             end: toDate
//         })
//     );
// };

// const DeptBillingStatistics = ({ fromDate, setFromDate, toDate, setToDate, dayCount, setDayCount }) => {
//     const [fDate, setFDate] = useState("2025-01-01");
//     const [tDate, setTDate] = useState("2025-08-15");
//     const [DyCount, setDyCount] = useState(2);
//     const [Chartlayout, seChartlayout] = useState(1);

//     const handleDateRange = useCallback((period) => {
//         setDyCount(period);
//         const now = new Date();

//         const periodHandlers = {
//             2: () => {
//                 setFDate(format(startOfLastWeek, 'yyyy-MM-dd'));
//                 setTDate(format(endOfLastWeek, 'yyyy-MM-dd'));
//             },
//             3: () => {
//                 setFDate(format(startOfMonth(now), 'yyyy-MM-dd'));
//                 setTDate(format(now, 'yyyy-MM-dd'));
//             },
//             4: () => {
//                 const sixMonthsAgo = subMonths(now, 5);
//                 setFDate(format(startOfMonth(sixMonthsAgo), 'yyyy-MM-dd'));
//                 setTDate(format(now, 'yyyy-MM-dd'));
//             },
//             5: () => {
//                 setFDate(format(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd'));
//                 setTDate(format(now, 'yyyy-MM-dd'));
//             }
//         };

//         periodHandlers[period]?.();
//     }, []);

//     const filteredData = useMemo(() => filterByDateRange(Graphicaldata, fromDate, toDate), [fromDate, toDate]);
//     const chartData = useMemo(() => transformToChartData(filteredData), [filteredData]);

//     const transformToLineChartData = (data) => ({
//         labels: data.labels,
//         datasets: data.datasets.map((dataset) => ({
//             ...dataset,
//             backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'),
//             fill: false,
//             borderWidth: 2,
//             tension: 0.4,
//         })),
//     });

//     const transformToPolarData = (data) => {
//         const labels = data.datasets.map((d) => d.label);
//         const summedData = data.datasets.map((d) => d.data.reduce((a, b) => a + b, 0));
//         return {
//             labels,
//             datasets: [{
//                 data: summedData,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.5)',
//                     'rgba(54, 162, 235, 0.5)',
//                     'rgba(255, 206, 86, 0.5)',
//                 ],
//                 borderWidth: 1,
//             }]
//         };
//     };

//     return (
//         <Box sx={{ flex: 1, height: '100%', width: "100%" }}>
//             <Box sx={{ mt: 1 }}>
//                 <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
//                     <Box sx={{ border: 1, p: 2, borderColor: '#dbe0e9ff', flex: 1 }}>
//                         <Typography sx={{ textAlign: 'center', fontSize: 20, mb: 1 }}>
//                             Total Billing
//                         </Typography>

//                         <Box sx={{ flexWrap: 'wrap', mt: 2 }}>
//                             <ButtonGroup
//                                 aria-label="date range selector"
//                                 sx={{
//                                     '--ButtonGroup-radius': '30px',
//                                     display: 'flex',
//                                     flexWrap: { sm: 'wrap', xl: 'nowrap' },
//                                     p: 0,
//                                     size: 'sm',
//                                 }}
//                             >
//                                 {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
//                                     <Button key={label} onClick={() => handleDateRange(index + 2)}>
//                                         {index === 4 ? (
//                                             <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
//                                                 <Input
//                                                     type="date"
//                                                     value={fDate}
//                                                     onChange={(e) => setFDate(e.target.value)}
//                                                     size="xs"
//                                                     sx={{ p: 0.5, color: 'grey' }}
//                                                 />
//                                                 <Input
//                                                     type="date"
//                                                     value={tDate}
//                                                     onChange={(e) => setTDate(e.target.value)}
//                                                     size="xs"
//                                                     sx={{ p: 0.5, color: 'grey' }}
//                                                     slotProps={{ input: { min: fromDate } }}
//                                                 />
//                                             </Box>
//                                         ) : (
//                                             <Typography sx={{ fontSize: 11 }}>
//                                                 {label}
//                                             </Typography>
//                                         )}
//                                     </Button>
//                                 ))}
//                             </ButtonGroup>
//                         </Box>

//                         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//                             <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
//                         </Box>

//                         <Box sx={{ mt: 2, height: 400, width: '100%' }}>
//                             <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
//                                 {Chartlayout === 1 ? (
//                                     <Bar
//                                         data={chartData}
//                                         options={{
//                                             responsive: true,
//                                             maintainAspectRatio: false,
//                                         }}
//                                     />
//                                 ) : Chartlayout === 2 ? (
//                                     <Line
//                                         data={transformToLineChartData(chartData)}
//                                         options={{
//                                             responsive: true,
//                                             maintainAspectRatio: false,
//                                         }}
//                                     />
//                                 ) : (
//                                     <PolarArea
//                                         data={transformToPolarData(chartData)}
//                                         options={{
//                                             responsive: true,
//                                             maintainAspectRatio: false,
//                                         }}
//                                     />
//                                 )}
//                             </Box>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default DeptBillingStatistics;
