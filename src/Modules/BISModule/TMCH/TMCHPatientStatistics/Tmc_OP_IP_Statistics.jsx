import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import {
    addDays,
    eachDayOfInterval,
    eachMonthOfInterval,
    endOfMonth,
    format,
    isWithinInterval,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks
} from 'date-fns';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
} from 'chart.js';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const OP_IP_Statistics = ({ Displaystyle, fromDate, setFromDate, toDate, setToDate }) => {
    const StyleMode = parseInt(Displaystyle);
    const [dayCount, setDayCount] = useState(2);
    const [Chartlayout, seChartlayout] = useState(StyleMode);
    const [chartData, setChartData] = useState(null);

    const today = new Date();
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    // ✅ Generate random data
    const data = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return {
                visit_date: date.toISOString().split('T')[0],
                total_op: Math.floor(Math.random() * 100) + 50,
                total_ip: Math.floor(Math.random() * 30) + 10
            };
        });
    }, []);

    const Graphicaldata = useMemo(() => ({
        labels: data.map(val => val.visit_date),
        datasets: [
            {
                label: 'Total OP',
                data: data.map(val => val.total_op),
                borderColor: 'rgba(96, 94, 163, 1)',
                backgroundColor: 'rgba(96, 94, 163, 0.5)'
            },
            {
                label: 'Total IP',
                data: data.map(val => val.total_ip),
                borderColor: 'rgba(12, 132, 162, 1)',
                backgroundColor: 'rgba(12, 132, 162, 0.5)'
            }
        ]
    }), [data]);

    const filterDataByDateRange = useCallback((labels, datasets, dateRange) => {
        if (dateRange.isRange) {
            const { rangeStart, rangeEnd } = dateRange;

            if (dayCount === 4 || dayCount === 5) {
                const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                const monthLabels = months.map(month => format(month, 'MMM yyyy'));

                const monthlySums = datasets.map(dataset =>
                    months.map(month => {
                        const start = startOfMonth(month);
                        const end = endOfMonth(month);
                        return labels.reduce((sum, label, index) => {
                            const labelDate = new Date(label);
                            return isWithinInterval(labelDate, { start, end })
                                ? sum + (dataset.data[index] || 0)
                                : sum;
                        }, 0);
                    })
                );

                return {
                    labels: monthLabels,
                    datasets: datasets.map((ds, i) => ({ ...ds, data: monthlySums[i] }))
                };
            }

            const indices = labels
                .map((label, i) => {
                    const d = new Date(label);
                    return d >= rangeStart && d <= rangeEnd ? i : null;
                })
                .filter(i => i !== null);

            return {
                labels: indices.map(i => format(new Date(labels[i]), 'dd EEE')),
                datasets: datasets.map(ds => ({ ...ds, data: indices.map(i => ds.data[i]) }))
            };
        }

        const indices = labels
            .map((label, i) => (dateRange.includes(label) ? i : null))
            .filter(i => i !== null);

        return {
            labels: indices.map(i => format(new Date(labels[i]), 'dd EEE')),
            datasets: datasets.map(ds => ({ ...ds, data: indices.map(i => ds.data[i]) }))
        };
    }, [dayCount]);

    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);
        const now = new Date();

        const dateRanges = {
            2: () => {
                setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
                return eachDayOfInterval({ start: startOfLastWeek, end: endOfLastWeek }).map(d => format(d, 'yyyy-MM-dd'));
            },
            3: () => {
                const start = startOfMonth(now);
                setFromDate(format(start, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
                return eachDayOfInterval({ start, end: now }).map(d => format(d, 'yyyy-MM-dd'));
            },
            4: () => {
                const start = startOfMonth(subMonths(now, 5));
                setFromDate(format(start, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
                return { rangeStart: start, rangeEnd: now, isRange: true };
            },
            5: () => {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                setFromDate(format(yearStart, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
                return { rangeStart: yearStart, rangeEnd: now, isRange: true };
            }
        };

        const selectedRange = dateRanges[period]?.();
        if (selectedRange) {
            const filtered = filterDataByDateRange(Graphicaldata.labels, Graphicaldata.datasets, selectedRange);
            setChartData(prev => JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev);
        }
    }, [filterDataByDateRange, Graphicaldata, setFromDate, setToDate, startOfLastWeek, endOfLastWeek]);

    useEffect(() => {
        handlePeriodChange(2);
    }, []);

    useEffect(() => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            const customRange = { rangeStart: start, rangeEnd: end, isRange: true };
            const filtered = filterDataByDateRange(Graphicaldata.labels, Graphicaldata.datasets, customRange);
            setChartData(prev => JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev);
        }
    }, [fromDate, toDate, Graphicaldata, filterDataByDateRange]);

    const barOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 15,
                    color: '#333',
                    font: { size: 12 },
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            datalabels: {
                align: 'top', // Try 'start', 'end', or 'center'
                color: 'rgba(var(--font-light))',
                font: {
                    size: 10,
                    family: "'Roboto', sans-serif"
                },
                rotation: -90, // 🔄 This rotates the label
                formatter: (value) => {
                    return value; // Customize label display if needed
                }
            },
        },
        scales: {
            x: {
                ticks: { font: { size: 10 } },
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                ticks: { font: { size: 10 } }
            }
        }
    }), []);

    const lineOptions = {
        ...barOptions,
        elements: {
            line: { tension: 0.4, borderWidth: 2 },
            point: { radius: 4, backgroundColor: 'rgba(96, 94, 163, 1)' }
        }
    };
    const transformToLineChartData = useCallback((data) => ({
        labels: data.labels,
        datasets: data.datasets.map(ds => ({
            ...ds,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: ds.borderColor
        }))
    }), []);

    const transformToPolarData = useCallback((data) => {
        const labels = data.datasets.map(ds => ds.label);
        const values = data.datasets.map(ds => ds.data.reduce((sum, val) => sum + val, 0));
        return {
            labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)'
                ],
                borderWidth: 1
            }]
        };
    }, []);

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
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
    );
};

export default memo(OP_IP_Statistics);
