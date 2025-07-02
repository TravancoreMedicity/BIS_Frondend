import React, { memo, useCallback, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    startOfWeek, format, addDays, startOfMonth, startOfYear,
    parseISO, subMonths, subWeeks, isWithinInterval
} from 'date-fns';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

// Generate lab data from Jan 2025 till today
const generateLabData = () => {
    const startDate = new Date('2025-01-01');
    const endDate = new Date();
    const daysCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return Array.from({ length: daysCount }, (_, i) => {
        const date = format(addDays(startDate, i), 'yyyy-MM-dd');
        return {
            date,
            totalOP: Math.floor(Math.random() * 100),
            totalIP: Math.floor(Math.random() * 50),
            completedOP: Math.floor(Math.random() * 60),
            completedIP: Math.floor(Math.random() * 40),
        };
    });
};

const labData = generateLabData();

const formatChartData = (dataArray) => ({
    labels: dataArray.map(f => {
        const dateObj = parseISO(f.date);
        return f.date.endsWith('-01')
            ? format(dateObj, 'MMM yyyy')  // for monthly
            : format(dateObj, 'dd/MM');    // for daily
    }),
    datasets: [
        {
            label: 'Total IP',
            data: dataArray.map(f => f.totalIP),
            backgroundColor: 'rgba(215, 115, 52, 0.7)',
            stack: 'Total'
        },
        {
            label: 'Total OP',
            data: dataArray.map(f => f.totalOP),
            backgroundColor: 'rgba(145, 154, 161, 0.7)',
            stack: 'Total'
        },
        {
            label: 'Completed IP',
            data: dataArray.map(f => f.completedIP),
            backgroundColor: 'rgba(50, 117, 125, 0.7)',
            stack: 'Completed'
        },
        {
            label: 'Completed OP',
            data: dataArray.map(f => f.completedOP),
            backgroundColor: 'rgba(149, 176, 134, 0.7)',
            stack: 'Completed'
        }
    ]
});

const IP_OP_ReadioStastistics = () => {
    const now = new Date();
    const [Chartlayout, seChartlayout] = useState(1);
    const [fromDate, setFromDate] = useState(format(startOfMonth(now), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const filterlabData = useCallback((rangeStart, rangeEnd) => {
        const filtered = labData.filter(item => {
            const itemDate = parseISO(item.date);
            return isWithinInterval(itemDate, { start: rangeStart, end: rangeEnd });
        });

        const daysDiff = (rangeEnd - rangeStart) / (1000 * 60 * 60 * 24);

        if (daysDiff > 45) {
            // Group by month
            const monthlyMap = {};
            filtered.forEach(item => {
                const monthKey = format(parseISO(item.date), 'yyyy-MM');
                if (!monthlyMap[monthKey]) {
                    monthlyMap[monthKey] = {
                        date: `${monthKey}-01`,
                        totalOP: 0,
                        totalIP: 0,
                        completedOP: 0,
                        completedIP: 0
                    };
                }
                monthlyMap[monthKey].totalOP += item.totalOP;
                monthlyMap[monthKey].totalIP += item.totalIP;
                monthlyMap[monthKey].completedOP += item.completedOP;
                monthlyMap[monthKey].completedIP += item.completedIP;
            });

            const groupedData = Object.values(monthlyMap).sort((a, b) =>
                new Date(a.date) - new Date(b.date)
            );
            return formatChartData(groupedData);
        }

        // Return daily chart
        return formatChartData(filtered);
    }, []);

    const handlePeriodChange = useCallback((selectedIndex) => {
        const now = new Date();
        let rangeStart, rangeEnd;

        switch (selectedIndex) {
            case 0: // Last Week
                const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
                rangeStart = subWeeks(startOfThisWeek, 1);
                rangeEnd = addDays(rangeStart, 6);
                break;
            case 1: // This Month
                rangeStart = startOfMonth(now);
                rangeEnd = now;
                break;
            case 2: // Last 6 Months
                rangeStart = startOfMonth(subMonths(now, 5));
                rangeEnd = now;
                break;
            case 3: // This Year
                rangeStart = startOfYear(now);
                rangeEnd = now;
                break;
            case 4: // Custom
            default:
                return;
        }

        setFromDate(format(rangeStart, 'yyyy-MM-dd'));
        setToDate(format(rangeEnd, 'yyyy-MM-dd'));
        setChartData(filterlabData(rangeStart, rangeEnd));
    }, [filterlabData]);

    useEffect(() => {
        const rangeStart = parseISO(fromDate);
        const rangeEnd = parseISO(toDate);
        setChartData(filterlabData(rangeStart, rangeEnd));
    }, [fromDate, toDate, filterlabData]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`
                }
            },
            datalabels: {
                display: true,
                color: 'black',
                font: { weight: 'bold', size: 10 },
                anchor: 'center',
                align: 'end',
                // formatter: (value) => value,
                formatter: (value, ctx) => {
                    const datasetLabel = ctx.dataset.label;

                    // Optional: Include labels if needed
                    const labels = chartData.labels?.[ctx.dataIndex] || '';

                    if (datasetLabel === 'Total IP') {
                        return `IP-- ${value}`;
                    } else if (datasetLabel === 'Total OP') {
                        return `OP-- ${value}`;
                    } else if (datasetLabel === 'Completed IP') {
                        return `C-IP-- ${value}`;
                    } else if (datasetLabel === 'Completed OP') {
                        return `C-OP-- ${value}`;
                    }

                    return value;
                },
                rotation: -90
            }
        },
        scales: {
            x: {
                stacked: true,
                title: { display: true, text: 'Date' }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: { display: true, text: 'Counts' }
            }
        }
    };

    // const options = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //         legend: { position: 'top' },
    //         tooltip: {
    //             callbacks: {
    //                 label: (context) => `${context.dataset.label}: ${context.raw}`
    //             }
    //         },
    //         datalabels: {
    //             color: 'black',
    //             font: { weight: 'bold', size: 10 },
    //             formatter: (value, ctx) => {
    //                 // const datasetLabel = ctx.dataset.label;
    //                 // if (datasetLabel === 'Total OP') {
    //                 //     return chartData.doctorNames?.[ctx.dataIndex] || '';
    //                 // }
    //                 return value;
    //             },
    //             anchor: 'center',
    //             align: 'end',
    //             display: true,
    //             rotation: -90
    //         },
    //     },
    //     scales: {
    //         x: { stacked: true, title: { display: true, text: 'Date' } },
    //         y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Counts' } }
    //     }
    // };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <ButtonGroup aria-label="date range selector" sx={{
                    '--ButtonGroup-radius': '30px', display: "flex",
                    flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
                }}>
                    {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                        <Button key={label} onClick={() => handlePeriodChange(index)}>
                            {label === 'Custom' ? (
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                    <Input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        size='xs'
                                        sx={{ p: 0.5, color: 'grey' }}
                                    />
                                    <Input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        size='xs'
                                        sx={{ p: 0.5, color: 'grey' }}
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

                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>

            <Box sx={{ mt: 2, width: '100%', height: 350 }}>
                {chartData.labels.length === 0 ? (
                    <Typography level="body-sm" color="danger" sx={{ textAlign: 'center', mt: 2 }}>
                        No data found for selected date range.
                    </Typography>
                ) : Chartlayout === 1 ? (
                    <Bar data={chartData} options={options} />
                ) : Chartlayout === 2 ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
                        <Box sx={{ width: 600, height: 600 }}>
                            <PolarArea
                                data={{
                                    labels: chartData.datasets.map(ds => ds.label),
                                    datasets: [{
                                        data: chartData.datasets.map(ds => ds.data.reduce((sum, val) => sum + val, 0)),
                                        backgroundColor: chartData.datasets.map(ds => ds.backgroundColor)
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'right' } }
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default memo(IP_OP_ReadioStastistics);
