import { Box, Button, ButtonGroup, IconButton, Input, Typography } from '@mui/joy';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
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
import SelectGraphicalView from '../SelectGraphicalView';

// Register ChartJS components
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

const MainGraph = ({ Graphicaldata, chartItems, Displaystyle, DisplayData }) => {
    const StyleMode = parseInt(Displaystyle);
    const [dayCount, setDayCount] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [chartData, setChartData] = useState(DisplayData);
    const [Chartlayout, seChartlayout] = useState(StyleMode);

    const Todays = format(new Date(), 'yyyy-MM-dd');
    const StartOfcurrentMonth = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);


    // Function to filter data based on selected date range
    const filterDataByDateRange = (labels, data, dateRange) => {
        const filteredIndices = labels.map((label, index) =>
            dateRange.includes(label) ? index : null
        ).filter(index => index !== null);

        return {
            labels: labels.filter(label => dateRange.includes(label)),
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                data: filteredIndices.map(index => dataset.data[index])
            }))
        };
    };
    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);

        const now = new Date();

        const periodHandlers = {
            1: () => [Todays],
            2: () => eachDayOfInterval({
                start: startOfLastWeek,
                end: endOfLastWeek
            }).map(date => format(date, 'yyyy-MM-dd')),
            3: () => eachDayOfInterval({
                start: new Date(StartOfcurrentMonth),
                end: now
            }).map(date => format(date, 'yyyy-MM-dd')),
            4: () => Array.from({ length: 6 }, (_, i) =>
                format(subMonths(now, 5 - i), 'yyyy-MM-dd')),
            5: () => {
                const monthsInYear = Array.from({ length: 12 }, (_, i) =>
                    new Date(now.getFullYear(), i, 1));
                return monthsInYear
                    .filter(month => month <= now)
                    .map(month => format(month, 'yyyy-MM-dd'));
            }
        };
        const dateRange = periodHandlers[period]?.() || [];
        const filteredData = filterDataByDateRange(
            DisplayData.labels,
            DisplayData,
            dateRange
        );
        setChartData(filteredData);
    }, [Todays, startOfLastWeek, endOfLastWeek, StartOfcurrentMonth, Graphicaldata, DisplayData]);

    useEffect(() => {
        if (fromDate && toDate) {
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);
            const customDateRange = eachDayOfInterval({
                start: startDate,
                end: endDate
            }).map(date => format(date, 'yyyy-MM-dd'));

            const filteredData = filterDataByDateRange(
                DisplayData.labels,
                DisplayData,
                customDateRange
            );
            setChartData(filteredData);
        }
    }, [fromDate, toDate, Graphicaldata, DisplayData]);

    // Bar chart options
    const barOptions = {
        responsive: true,
        indexAxis: 'x',
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
        },
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Out Patient Statistics' },
        },
    };

    // Line chart options
    const lineOptions = {
        responsive: true,
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
        },
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Out Patient Trends' },
        },
    };

    // Transform Graphicaldata for line chart
    const transformToLineChartData = (data) => {
        return {
            labels: data.labels,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'), // Make more transparent for line
                borderWidth: 2,
                tension: 0.4,
                fill: false,
                pointRadius: 4,
                pointBackgroundColor: dataset.borderColor
            }))
        };
    };

    //Polar Area Functions
    const polarOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            datalabels: {
                display: true, // Show the data labels on the chart
            },
            tooltip: {
                enabled: true, // Enable tooltips for values on hover
            },
            title: {
                display: true,
                text: 'Patient Details',
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true, // Keep the angle lines (axes) visible
                },
                ticks: {
                    display: false, // Hide the ticks (numbers/counts) on the radial axis
                },
                grid: {
                    display: true, // Optionally, hide the gridlines if you don't want them
                },
                suggestedMin: 0, // Minimum value for the radial scale
            },
        },
    };

    // Transform data for polar area chart
    const transformToPolarData = (data) => {
        const labels = data.datasets?.map((val) => val.label);
        const summedData = data.datasets?.map((dataset) =>
            dataset.data.reduce((sum, val) => sum + val, 0)
        );
        return {
            labels,
            datasets: [
                {
                    // label: 'cout',
                    data: summedData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };
    const CenteredChart = ({ children }) => (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            {children}
        </Box>
    );

    //Section wise chart
    const DisplayDatas = {
        labels: ['2025-04-01', '2025-04-02', '2025-04-03'],
        datasets: [
            {
                label: 'MRI - IP',
                data: [10, 12, 8],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'MRI - OP',
                data: [20, 25, 23],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'MRI - Billing',
                data: [20, 25, 23],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'MRI - Return',
                data: [18, 10, 40],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'CT Scan - IP',
                data: [15, 13, 17],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
            },
            {
                label: 'CT Scan - OP',
                data: [22, 20, 25],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'CT - Billing',
                data: [24, 35, 12],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'CT - Return',
                data: [19, 40, 25],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
            },]
    };


    const GetChart = useCallback((item) => {
        const filtered = {
            labels: DisplayDatas.labels,
            datasets: DisplayDatas.datasets.filter(ds => ds.label.startsWith(item.label))
        };
        console.log("filtered", filtered);

        setChartData(filtered);
    }, [DisplayData]);
    // console.log(DisplayData);


    return (
        <Box sx={{
            width: '100%',
            overflow: "auto",
        }}>
            {/* Date Range Selector */}
            <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <ButtonGroup aria-label="date range selector" sx={{ '--ButtonGroup-radius': '30px', display: "flex", flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm" }}>
                    {['Today', 'Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                        <Button key={label} onClick={() => handlePeriodChange(index + 1)}>
                            {index === 5 ? (
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                    <Input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        size='xs'
                                        sx={{ p: 0.5, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
                                    />
                                    <Input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        size='xs'
                                        sx={{ p: 0.5, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
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
                <Box sx={{}}>
                    <Box sx={{ mt: { xl: 0, sm: 2 } }}>
                        <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                    </Box>
                </Box>
            </Box>

            {/* Chart Display */}
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: { sm: "wrap", xl: "nowrap" } }}>
                {/* Radio Group */}
                <Box sx={{ mt: 2, minWidth: 250, height: { xl: 350, sm: 180 }, overflow: "auto", px: 2 }}>
                    <Box sx={{ border: 1, p: 1, borderColor: 'rgba(128, 121, 121, 0.5)', borderRadius: 5 }}>
                        {chartItems?.map((item, index) => (
                            <Box key={index} sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <IconButton>
                                    {item?.icon}
                                </IconButton>
                                <Typography
                                    sx={{ mt: 1, color: item.color, fontWeight: "bold", cursor: "pointer" }}
                                    onClick={() => GetChart(item)}
                                >
                                    {item?.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                {/* Chart Area */}
                <Box sx={{ mt: 1, width: '100%', height: 350, overflow: "auto", }}>
                    {parseInt(Chartlayout) === 1 ? (
                        <CenteredChart>
                            <Bar data={chartData} options={barOptions} style={{ width: '100%' }} />
                        </CenteredChart>
                    ) : parseInt(Chartlayout) === 2 ? (
                        <CenteredChart>
                            <Line data={transformToLineChartData(chartData)} options={lineOptions} style={{ width: '50%' }} />
                        </CenteredChart>
                    ) : parseInt(Chartlayout) === 3 ? (
                        <CenteredChart>
                            <PolarArea data={transformToPolarData(chartData)} options={polarOptions} style={{ width: '50%' }} />
                        </CenteredChart>
                    ) : null}
                </Box>
            </Box>
        </Box >
    );
};
export default memo(MainGraph) 