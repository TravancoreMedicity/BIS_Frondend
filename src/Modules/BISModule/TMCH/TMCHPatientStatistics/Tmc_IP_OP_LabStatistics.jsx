import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
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
import CommonDateComp from '../../BIS_CommoCode/CommonDateRange/CommonDateComp';
import DateFieldCommonComp from '../../BIS_CommoCode/DateFieldCommonComp';

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

const Tmc_IP_OP_LabStatistics = () => {
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
        <Box sx={{ width: '100%', overflow: 'auto', p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <DateFieldCommonComp
                    onPeriodChange={handlePeriodChange}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    currentPeriod={currentPeriod}
                    setCurrentPeriod={setCurrentPeriod}
                />
                <Box sx={{ mt: 1 }}>
                    <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                </Box>
            </Box>

            <Box sx={{ mt: 2, width: "100%", height: 500 }}>
                {chartData && (
                    <>
                        {Chartlayout === 1 &&
                            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                                <Bar data={chartData} options={barOptions} />
                            </Box>
                        }
                        {Chartlayout === 2 &&
                            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                                <Line data={chartData} options={barOptions} />
                            </Box>
                        }
                        {Chartlayout === 3 && (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
                                <Box sx={{ width: 600, height: 600 }}>
                                    <PolarArea
                                        data={polarData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: { position: 'right' }
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default memo(Tmc_IP_OP_LabStatistics);
