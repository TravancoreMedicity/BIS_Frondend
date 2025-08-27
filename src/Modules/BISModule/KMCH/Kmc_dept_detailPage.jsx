import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import { useParams } from 'react-router-dom';
import {
    addDays, eachDayOfInterval, eachMonthOfInterval, endOfMonth,
    format, startOfMonth, startOfWeek, subMonths, subWeeks
} from 'date-fns';
import GraphicalRep from '../BIS_CommoCode/GraphicalRep';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
// import { FaUserDoctor } from "react-icons/fa6";

const Kmc_dept_detailPage = () => {
    const { deptId, deptName } = useParams();
    const [Chartlayout, seChartlayout] = useState(1);
    const [dayCount, setDayCount] = useState(2);
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [rawChartData, setRawChartData] = useState({ labels: [], datasets: [] });
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const doctors = useMemo(() => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`), []);
    const startDate = useMemo(() => new Date('2025-01-01'), []);
    const endDate = useMemo(() => new Date('2025-08-01'), []);

    const doctorOPStats = useMemo(() => {
        const stats = [];
        doctors.map((doctorName) => {
            let current = new Date(startDate);
            while (current <= endDate) {
                stats.push({
                    doctorName,
                    date: format(current, 'yyyy-MM-dd'),
                    totalRevisit: Math.floor(Math.random() * 20) + 5,
                    totalRegistration: Math.floor(Math.random() * 40) + 10,
                });
                current.setDate(current.getDate() + 1);
            }
        });
        return stats;
    }, [doctors, startDate, endDate]);

    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const filterDataByDateRange = useCallback((labels, data, dateRange) => {
        if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

        if (dateRange.isRange) {
            const { rangeStart, rangeEnd } = dateRange;

            if (dayCount === 4 || dayCount === 5) {
                const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                const monthLabels = months.map(month => format(month, 'MMM yyyy'));

                const monthlySums = data.datasets.map(dataset =>
                    months.map(month => {
                        const monthStart = startOfMonth(month);
                        const monthEnd = endOfMonth(month);
                        return labels.reduce((sum, label, index) => {
                            const labelDate = new Date(label);
                            if (labelDate >= monthStart && labelDate <= monthEnd) {
                                return sum + (dataset.data[index] || 0);
                            }
                            return sum;
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

            const filteredIndices = labels.map((label, index) => {
                const labelDate = new Date(label);
                return (labelDate >= rangeStart && labelDate <= rangeEnd) ? index : null;
            }).filter(index => index !== null);

            return {
                labels: filteredIndices.map(index => format(new Date(labels[index]), 'dd EEE')),
                datasets: data.datasets.map(dataset => ({
                    ...dataset,
                    data: filteredIndices.map(index => dataset.data[index]),
                })),
            };
        }

        const filteredIndices = labels.map((label, index) =>
            dateRange.includes(label) ? index : null
        ).filter(index => index !== null);

        return {
            labels: filteredIndices.map(index => format(new Date(labels[index]), 'dd EEE')),
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                data: filteredIndices.map(index => dataset.data[index]),
            })),
        };
    }, [dayCount]);

    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);
        const now = new Date();

        const periodHandlers = {
            2: () => {
                setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
            },
            3: () => {
                setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
            },
            4: () => {
                const sixMonthsAgo = subMonths(now, 5);
                const start = startOfMonth(sixMonthsAgo);
                setFromDate(format(start, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
            },
            5: () => {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                setFromDate(format(yearStart, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
            },
        };

        periodHandlers[period]?.();
    }, [startOfLastWeek, endOfLastWeek]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        const dates = eachDayOfInterval({ start: startDate, end: endDate });
        dates.forEach(date => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            labels.push(formattedDate);

            const revisitTotal = doctorOPStats
                .filter(item => item.date === formattedDate)
                .reduce((acc, cur) => acc + cur.totalRevisit, 0);

            const registrationTotal = doctorOPStats
                .filter(item => item.date === formattedDate)
                .reduce((acc, cur) => acc + cur.totalRegistration, 0);

            revisitData.push(revisitTotal);
            registrationData.push(registrationTotal);
        });

        const raw = {
            labels,
            datasets: [
                {
                    label: 'Total Revisit',
                    data: revisitData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Total Registration',
                    data: registrationData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
            ]
        };

        setRawChartData(raw);
    }, [doctorOPStats]);

    useEffect(() => {
        if (fromDate && toDate && rawChartData.labels.length) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setChartData(filterDataByDateRange(rawChartData.labels, rawChartData, range));
        }
    }, [fromDate, toDate, rawChartData, filterDataByDateRange]);

    const transformToLineChartData = (data) => ({
        labels: data.labels,
        datasets: data.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'),
            fill: false,
            borderWidth: 2,
            tension: 0.4,
        }))
    });

    const transformToPolarData = (data) => {
        const labels = data.datasets.map(d => d.label);
        const summedData = data.datasets.map(d => d.data.reduce((a, b) => a + b, 0));
        return {
            labels,
            datasets: [{
                data: summedData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
                borderWidth: 1
            }]
        };
    };


    //top peformer
    // 1️⃣ Add state to track top performer chart data
    const [topDoctorChartData, setTopDoctorChartData] = useState({ labels: [], datasets: [] });
    const [TopPerformfromDate, setTopPerformFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [TopPerformtoDate, setTopPerformToDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handletopPerfomerPeriodChange = useCallback((period) => {
        setDayCount(period);
        const now = new Date();

        const periodHandlers = {
            2: () => {
                setTopPerformFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                setTopPerformToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
            },
            3: () => {
                setTopPerformFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
                setTopPerformToDate(format(now, 'yyyy-MM-dd'));
            },
            4: () => {
                const sixMonthsAgo = subMonths(now, 5);
                const start = startOfMonth(sixMonthsAgo);
                setTopPerformFromDate(format(start, 'yyyy-MM-dd'));
                setTopPerformToDate(format(now, 'yyyy-MM-dd'));
            },
            5: () => {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                setTopPerformFromDate(format(yearStart, 'yyyy-MM-dd'));
                setTopPerformToDate(format(now, 'yyyy-MM-dd'));
            },
        };

        periodHandlers[period]?.();
    }, [startOfLastWeek, endOfLastWeek]);

    // 2️⃣ Add useEffect to compute top performers (sorted by total patients) within selected date range
    useEffect(() => {
        if (!TopPerformfromDate || !TopPerformtoDate) return;

        const start = new Date(TopPerformfromDate);
        const end = new Date(TopPerformtoDate);

        const doctorMap = {};
        doctorOPStats.map(entry => {
            const entryDate = new Date(entry.date);
            if (entryDate >= start && entryDate <= end) {
                const { doctorName, totalRevisit, totalRegistration } = entry;
                if (!doctorMap[doctorName]) {
                    doctorMap[doctorName] = { revisit: 0, registration: 0 };
                }
                doctorMap[doctorName].revisit += totalRevisit;
                doctorMap[doctorName].registration += totalRegistration;
            }
        });

        const sortedDoctors = Object.entries(doctorMap)
            .map(([name, stats]) => ({
                name,
                revisit: stats.revisit,
                registration: stats.registration,
                total: stats.revisit + stats.registration
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 25); // 👉 Limit to top 25 doctors

        const labels = sortedDoctors.map(d => d.name);
        const revisitData = sortedDoctors.map(d => d.revisit);
        const registrationData = sortedDoctors.map(d => d.registration);

        const newChartData = {
            labels,
            datasets: [
                {
                    label: 'Revisit',
                    data: revisitData,
                    backgroundColor: 'rgba(163, 78, 200, 0.6)'
                },
                {
                    label: 'New Registration',
                    data: registrationData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }
            ]
        };

        setTopDoctorChartData(newChartData);
    }, [TopPerformfromDate, TopPerformtoDate, doctorOPStats]);


    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fdf6f9', p: 1 }}>
            <DefaultPageLayout label={decodeURIComponent(deptName)}>
                <Box sx={{ textAlign: "center", mb: 2, p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                        <Typography level="h4">Department OP Statistics ( 21 )</Typography>
                        {/* <FaUserDoctor size={24} /> */}
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                    }}
                >
                    {/* Left Panel */}
                    <Box
                        sx={{
                            border: 1,
                            p: 2,
                            borderColor: "#dbe0e9ff",
                            flex: 1,
                            minWidth: 0
                        }}
                    >
                        {/* Button Group */}
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: 20,
                                color: 'rgba(var(--font-light))',
                                mb: 1,
                            }}
                        >
                            Departmental Total Visit
                        </Typography>
                        <Box sx={{ flexWrap: "wrap", mt: 2 }}>
                            <ButtonGroup aria-label="date range selector" sx={{
                                '--ButtonGroup-radius': '30px', display: "flex",
                                flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
                            }}>
                                {/* {['Today', 'Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => ( */}
                                {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (

                                    <Button key={label} onClick={() => handlePeriodChange(index + 2)}>

                                        {index === 4 ? (
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                <Input
                                                    type="date"
                                                    value={fromDate}
                                                    onChange={(e) => setFromDate(e.target.value)}
                                                    size='xs'
                                                    sx={{ p: 0.5, color: 'grey', }}
                                                />
                                                <Input
                                                    type="date"
                                                    value={toDate}
                                                    onChange={(e) => setToDate(e.target.value)}
                                                    size='xs'
                                                    sx={{
                                                        p: 0.5,
                                                        // backgroundColor: "rgba(175, 193, 210, 0.35)",
                                                        color: 'grey',
                                                    }}
                                                    slotProps={{ input: { min: fromDate } }}
                                                />
                                            </Box>
                                        ) : (
                                            <Typography sx={{
                                                fontSize: 11,
                                                color: "rgba(var(--input-font-color))",
                                                '&:hover': {
                                                    color: 'rgba(var(--font-black))',
                                                    backgroundColor: 'transparent',
                                                }
                                            }}>{label}</Typography>
                                        )}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                        {/* Chart Layout Control */}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 2,
                            }}
                        >
                            <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                        </Box>

                        {/* Chart Display */}
                        <Box sx={{ mt: 2, height: 400 }}>
                            {Chartlayout === 1 ? (
                                <Bar data={chartData} options={{ responsive: true }} />
                            ) : Chartlayout === 2 ? (
                                <Line data={transformToLineChartData(chartData)} options={{ responsive: true }} />
                            ) : (
                                <PolarArea data={transformToPolarData(chartData)} options={{ responsive: true }} />
                            )}
                        </Box>
                    </Box>

                    {/* Right Panel Placeholder */}
                    <Box sx={{ flex: 1, minHeight: 400 }}>
                        <Box
                            sx={{
                                border: 1,
                                p: 2,
                                borderColor: "#dbe0e9ff",
                                flex: 1,
                                minWidth: 0
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
                                Top Performer
                            </Typography>
                            {/* Button Group */}
                            <Box sx={{ flexWrap: "wrap", mt: 2 }}>
                                <ButtonGroup aria-label="date range selector" sx={{
                                    '--ButtonGroup-radius': '30px', display: "flex",
                                    flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
                                }}>
                                    {/* {['Today', 'Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => ( */}
                                    {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (

                                        <Button key={label} onClick={() => handletopPerfomerPeriodChange(index + 2)}>

                                            {index === 4 ? (
                                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                    <Input
                                                        type="date"
                                                        value={TopPerformfromDate}
                                                        onChange={(e) => setTopPerformFromDate(e.target.value)}
                                                        size='xs'
                                                        sx={{ p: 0.5, color: 'grey', }}
                                                    />
                                                    <Input
                                                        type="date"
                                                        value={TopPerformtoDate}
                                                        onChange={(e) => setTopPerformToDate(e.target.value)}
                                                        size='xs'
                                                        sx={{
                                                            p: 0.5,
                                                            // backgroundColor: "rgba(175, 193, 210, 0.35)",
                                                            color: 'grey',
                                                        }}
                                                        slotProps={{ input: { min: fromDate } }}
                                                    />
                                                </Box>
                                            ) : (
                                                <Typography sx={{
                                                    fontSize: 11,
                                                    color: "rgba(var(--input-font-color))",
                                                    '&:hover': {
                                                        color: 'rgba(var(--font-black))',
                                                        backgroundColor: 'transparent',
                                                    }
                                                }}>{label}</Typography>
                                            )}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Box>

                            {/* Chart Layout Control */}
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mt: 2,
                                }}
                            >
                                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                            </Box>

                            {/* Chart Display */}
                            <Box sx={{ mt: 2, height: 400, overflow: "auto" }}>
                                {Chartlayout === 1 ? (
                                    <Bar data={topDoctorChartData}
                                        options={{
                                            responsive: true,
                                            indexAxis: 'y', // horizontal bar chart
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    stacked: true,
                                                    beginAtZero: true,
                                                    ticks: {
                                                        stepSize: 20
                                                    }
                                                },
                                                y: {
                                                    stacked: true,
                                                },
                                            },
                                        }} />
                                ) : Chartlayout === 2 ? (
                                    <Line data={transformToLineChartData(topDoctorChartData)} options={{ responsive: true }} />
                                ) : (
                                    <PolarArea data={transformToPolarData(topDoctorChartData)} options={{ responsive: true }} />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DefaultPageLayout>
        </Box>
    );
};

export default memo(Kmc_dept_detailPage);