import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { format, startOfMonth, subMonths, } from 'date-fns';
import { Bar } from 'react-chartjs-2';

const New_Items = () => {
    const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));

    const [category, setCategory] = useState('');

    const categories = ["Pharmacy", "Consumables", "Biomedical", "General", "Dental"];

    const handleCategoryClick = useCallback((category) => {
        setCategory(category);
    }, []);

    const handlePeriodChange = useCallback((type) => {
        let newFromDate;
        const today = new Date();

        switch (type) {
            case 1: // This Month
                newFromDate = startOfMonth(today);
                break;
            case 2: // Last 6 Months
                newFromDate = subMonths(today, 6);
                break;
            case 3: // This Year
                newFromDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                newFromDate = today;
        }

        const formattedFrom = format(newFromDate, 'yyyy-MM-dd');
        const formattedTo = format(today, 'yyyy-MM-dd');

        setFromDate(formattedFrom);
        setToDate(formattedTo);

        // simulate API/data filtering
        filterChartDataByDate(formattedFrom, formattedTo, type);

    }, []);

    const [chartData, setChartData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Pharmacy',
                data: [10, 20, 15, 25, 30, 35],
            },
            {
                label: 'Consumables',
                data: [5, 15, 10, 20, 25, 30],
            },
            {
                label: 'Biomedical',
                data: [8, 18, 12, 22, 28, 32],
            },
            {
                label: 'General',
                data: [6, 16, 11, 21, 27, 31],
            },
            {
                label: 'Dental',
                data: [4, 14, 9, 19, 24, 29],
            },
        ],
    });


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    color: 'rgb(var(--color-white))',
                    font: {
                        size: 12, // Added consistent font size for legend
                    },
                    padding: 20, // Added padding for better spacing
                    usePointStyle: true, // Optional: for circular color indicators
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
                    label: (context) => {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            },
            datalabels: {
                // anchor: 'end', // You can also try 'center', 'start'
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
            }
        },
        scales: {
            x: {
                barThickness: 50,

                grid: {
                    display: false,
                    drawBorder: true,
                    borderColor: 'rgba(var(--font-light), 0.2)',
                },
                ticks: {

                    color: 'rgba(var(--font-light))',
                    autoSkip: false,
                    font: {
                        size: 10,
                        family: "'Roboto', sans-serif", // Specify font family
                    },
                    align: 'center',
                    padding: 5, // Added padding for better tick spacing
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(var(--font-light))',

                    font: {
                        size: 10,
                        family: "'Roboto', sans-serif", // Consistent font family
                    },
                    padding: 5,
                    callback: (value) => {
                        // console.log("valueeee", value);

                        // Optional: Format tick values if needed
                        return value;
                    }
                },

            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        animation: {
            duration: 1000, // Smooth animations
        },
        elements: {
            bar: {
                borderRadius: 1,
                borderSkipped: false,
                // You can also control appearance here
                backgroundColor: (ctx) => {
                    // Example of varying color based on value
                    return ctx.raw > 50 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)';
                },
                borderWidth: (ctx) => {
                    // Example of varying border width
                    return ctx.raw > 50 ? 2 : 1;
                }
            }
        }
    };

    const filteredChartData = category
        ? {
            labels: chartData.labels,
            datasets: chartData.datasets.filter(ds => ds.label === category)
        }
        : chartData;
    const filterChartDataByDate = useCallback((from, to, type) => {
        let mockFilteredData;

        if (type === 1) {
            // This Month
            mockFilteredData = {
                labels: ['Jun'],
                datasets: [
                    { label: 'Pharmacy', data: [25] },
                    { label: 'Consumables', data: [18] },
                    { label: 'Biomedical', data: [10] },
                    { label: 'General', data: [15] },
                    { label: 'Dental', data: [5] },
                ],
            };
        } else if (type === 2) {
            // Last 6 Months
            mockFilteredData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'Pharmacy', data: [10, 15, 20, 25, 30, 35] },
                    { label: 'Consumables', data: [8, 12, 18, 22, 28, 30] },
                    { label: 'Biomedical', data: [5, 10, 15, 20, 25, 30] },
                    { label: 'General', data: [4, 8, 12, 16, 20, 24] },
                    { label: 'Dental', data: [2, 5, 8, 11, 14, 18] },
                ],
            };
        } else if (type === 3) {
            // This Year
            mockFilteredData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'Pharmacy', data: [12, 17, 22, 27, 32, 40] },
                    { label: 'Consumables', data: [10, 14, 19, 23, 29, 34] },
                    { label: 'Biomedical', data: [6, 11, 16, 21, 26, 30] },
                    { label: 'General', data: [3, 7, 11, 15, 19, 24] },
                    { label: 'Dental', data: [1, 4, 7, 10, 13, 18] },
                ],
            };
        }

        setChartData(mockFilteredData);
    }, []);


    return (
        <Fragment>
            <Box sx={{ minHeight: "10vh", p: 2, }}>
                <Typography sx={{ textAlign: "left", fontWeight: 600, fontSize: "15px", mt: 2, color: '#507687' }}>
                    NEW ITEMS
                </Typography>

                <Box sx={{ display: "flex", justifyContent: 'center', gap: 2, mt: 1, flexWrap: "wrap", }}>
                    {/* Total Items Box */}
                    <Box sx={{ height: 150, bgcolor: "white", flex: 1, minWidth: 250, p: 2, borderRadius: 2, boxShadow: 2, border: 1, borderColor: "#A2B9A7" }}>
                        <Typography variant="h6" sx={{ textAlign: 'center', color: "#4C585B" }}>Total Items</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 200,
                                    border: 1,
                                    borderColor: "#A5BFCC",
                                    py: 1.5,
                                    borderRadius: 15,
                                    px: 4,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography sx={{ color: "#507687", textAlign: "center", fontSize: "24px", fontWeight: 'bold' }}>
                                    60
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Category Summary Box */}
                    <Box sx={{ flexWrap: "wrap", flex: 3, }}>
                        <Box sx={{ textAlign: "right", mt: 1, }}>
                            <ButtonGroup aria-label="date range selector" sx={{

                                '--ButtonGroup-radius': '30px', display: "flex",
                                flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
                            }}>
                                {['This Month', 'Last 6 months', 'This Year'].map((label, index) => (
                                    <Button key={label} onClick={() => handlePeriodChange(index + 1)}>
                                        <Typography sx={{
                                            fontSize: 11,
                                            color: '#507687',
                                            '&:hover': {
                                                color: '#BE5B50',
                                                backgroundColor: 'transparent',
                                            }
                                        }}>{label}</Typography>
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>
                        <Box sx={{ height: 92, bgcolor: "white", flex: 3, minWidth: 200, p: 2, borderRadius: 2, boxShadow: 2, mt: 1.5, border: 1, borderColor: "#A2B9A7" }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1
                            }}>
                                {categories?.map((label, index) => (
                                    <Fragment key={label}>
                                        <Typography
                                            sx={{

                                                cursor: "pointer",
                                                "&:hover": {
                                                    color: "green",
                                                    textDecoration: "underline"
                                                }
                                            }}
                                            onClick={() => handleCategoryClick(label)}
                                        >
                                            {label}
                                        </Typography>
                                        {index < categories.length - 1 && (
                                            <Divider orientation="vertical" />
                                        )}
                                    </Fragment>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {category !== '' ?
                    <Box>{category}</Box> : null}
                <Box>
                    <Bar
                        data={{
                            labels: filteredChartData.labels,
                            datasets: filteredChartData.datasets.map((dataset, index) => ({
                                ...dataset,
                                backgroundColor: [
                                    'rgba(96, 94, 163, 0.50)',
                                    'rgba(12, 132, 162, 0.50)',
                                    'rgba(184, 62, 143, 0.48)'
                                ][index % 3],
                                borderColor: [
                                    'rgba(96, 94, 163, 1)',
                                    'rgba(12, 132, 162, 1)',
                                    'rgba(184, 62, 143, 1)'
                                ][index % 3],
                                borderWidth: 1,
                                barPercentage: 0.9,
                                categoryPercentage: 0.8,
                            }))
                        }}
                        options={options}
                        height={350}
                    />
                </Box>
            </Box>

        </Fragment>
    )
}

export default memo(New_Items)

