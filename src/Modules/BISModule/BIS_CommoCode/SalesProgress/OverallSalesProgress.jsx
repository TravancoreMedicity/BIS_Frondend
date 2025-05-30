import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import React, { memo, useCallback, useState, useEffect } from 'react';
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
} from "date-fns";
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
// import SelectGraphicalView from '../SelectGraphicalView';
import GraphicalRep from '../GraphicalRep';

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

const OverallSalesProgress = ({ Graphicaldata, Displaystyle, fromDate, setFromDate, toDate, setToDate }) => {
    const StyleMode = parseInt(Displaystyle);

    const [dayCount, setDayCount] = useState(2);
    // const [fromDate, setFromDate] = useState('');
    // const [toDate, setToDate] = useState('');
    const [chartData, setChartData] = useState(Graphicaldata);
    const [Chartlayout, seChartlayout] = useState(StyleMode);

    const Todays = format(new Date(), 'yyyy-MM-dd');
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    // Function to filter data based on selected date range
    // const filterDataByDateRange = useCallback((labels, data, dateRange) => {
    //     if (dateRange.isRange) {
    //         const { rangeStart, rangeEnd } = dateRange;

    //         // For monthly ranges (Last 6 months or This Year)
    //         if (dayCount === 4 || dayCount === 5) {
    //             const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
    //             const monthLabels = months.map(month => format(month, 'MMM yyyy'));

    //             const monthlySums = data?.datasets?.map(dataset => {
    //                 return months?.map(month => {
    //                     const monthStart = startOfMonth(month);
    //                     const monthEnd = endOfMonth(month);

    //                     return labels.reduce((sum, label, index) => {
    //                         const labelDate = new Date(label);
    //                         if (isWithinInterval(labelDate, { start: monthStart, end: monthEnd })) {
    //                             return sum + (dataset.data[index] || 0);
    //                         }
    //                         return sum;
    //                     }, 0);
    //                 });
    //             });

    //             return {
    //                 labels: monthLabels,
    //                 datasets: data?.datasets?.map((dataset, i) => ({
    //                     ...dataset,
    //                     data: monthlySums[i]
    //                 }))
    //             };
    //         }

    //         // For other ranges, filter daily data within the range
    //         const filteredIndices = labels?.map((label, index) => {
    //             const labelDate = new Date(label);
    //             return (labelDate >= rangeStart && labelDate <= rangeEnd) ? index : null;
    //         }).filter(index => index !== null);

    //         return {
    //             labels: labels.filter((_, index) => filteredIndices.includes(index)),
    //             datasets: data.datasets.map(dataset => ({
    //                 ...dataset,
    //                 data: filteredIndices.map(index => dataset.data[index]),
    //             }))
    //         };
    //     }

    //     // Handle exact date matches (Today, Last Week, This Month)
    //     const filteredIndices = labels?.map((label, index) =>
    //         dateRange.includes(label) ? index : null
    //     ).filter(index => index !== null);

    //     return {
    //         labels: labels.filter((_, index) => filteredIndices.includes(index)),
    //         datasets: data.datasets.map(dataset => ({
    //             ...dataset,
    //             data: filteredIndices.map(index => dataset.data[index])
    //         }))
    //     };
    // }, [dayCount]);

    // import { format, eachMonthOfInterval, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

    const filterDataByDateRange = useCallback((labels, data, dateRange) => {
        if (dateRange.isRange) {
            const { rangeStart, rangeEnd } = dateRange;

            // Monthly ranges (Last 6 Months or This Year)
            if (dayCount === 4 || dayCount === 5) {
                const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                const monthLabels = months.map(month => format(month, 'MMM yyyy'));

                const monthlySums = data?.datasets?.map(dataset => {
                    return months.map(month => {
                        const monthStart = startOfMonth(month);
                        const monthEnd = endOfMonth(month);

                        return labels.reduce((sum, label, index) => {
                            const labelDate = new Date(label);
                            if (isWithinInterval(labelDate, { start: monthStart, end: monthEnd })) {
                                return sum + (dataset.data[index] || 0);
                            }
                            return sum;
                        }, 0);
                    });
                });

                return {
                    labels: monthLabels,
                    datasets: data.datasets.map((dataset, i) => ({
                        ...dataset,
                        data: monthlySums[i]
                    }))
                };
            }

            // Daily data within other ranges
            const filteredIndices = labels?.map((label, index) => {
                const labelDate = new Date(label);
                return (labelDate >= rangeStart && labelDate <= rangeEnd) ? index : null;
            }).filter(index => index !== null);

            return {
                labels: filteredIndices.map(index => {
                    const date = new Date(labels[index]);
                    return format(date, 'dd EEE');
                }),
                datasets: data.datasets.map(dataset => ({
                    ...dataset,
                    data: filteredIndices.map(index => dataset.data[index])
                }))
            };
        }

        // Exact date match (Today, Last Week, This Month)
        const filteredIndices = labels?.map((label, index) =>
            dateRange.includes(label) ? index : null
        ).filter(index => index !== null);

        const filteredLabels = filteredIndices.map(index => {
            const date = new Date(labels[index]);
            return format(date, 'dd EEE');
        });

        return {
            labels: filteredLabels,
            datasets: data.datasets.map(dataset => ({
                ...dataset,
                data: filteredIndices.map(index => dataset.data[index])
            }))
        };
    }, [dayCount]);




    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);
        const now = new Date();

        // const getOrdinalSuffix = (day) => {
        //     if (day > 3 && day < 21) return 'th';
        //     switch (day % 10) {
        //         case 1: return 'st';
        //         case 2: return 'nd';
        //         case 3: return 'rd';
        //         default: return 'th';
        //     }
        // };
        const periodHandlers = {
            // 1: () => {
            //     setFromDate(format(now, 'yyyy-MM-dd'));
            //     setToDate(format(now, 'yyyy-MM-dd'));
            //     return [Todays]; // Today
            // },
            2: () => {
                setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
                return eachDayOfInterval({
                    start: startOfLastWeek,
                    end: endOfLastWeek
                }).map(date => format(date, 'yyyy-MM-dd')); // Last Week
            },
            // 3: () => {
            //     setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
            //     setToDate(format(now, 'yyyy-MM-dd'));
            //     return eachDayOfInterval({
            //         start: startOfMonth(now),
            //         end: now
            //     }).map(date => format(date, 'yyyy-MM-dd')); // This Month
            // },
            3: () => {
                setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
                return eachDayOfInterval({
                    start: startOfMonth(now),
                    end: now
                }).map(date => format(date, 'yyyy-MM-dd')); // This Month
            },
            // 3: () => {
            //     const start = startOfMonth(now);
            //     const end = now;

            //     setFromDate(format(start, 'yyyy-MM-dd'));
            //     setToDate(format(end, 'yyyy-MM-dd'));

            //     return eachDayOfInterval({ start, end }).map(date =>
            //         `${String(date.getDate()).padStart(2, '0')} ${format(date, 'EEE')}`
            //     );
            // },
            // 3: () => {
            //     const start = startOfMonth(now); // Get the first day of the current month
            //     const end = now;                 // Get today's date

            //     // Set the selected date range for outside use (e.g., filters)
            //     setFromDate(format(start, 'yyyy-MM-dd'));
            //     setToDate(format(end, 'yyyy-MM-dd'));

            //     // Generate each day in the interval and return as 'DD DDD' (e.g., '01 Mon')
            //     return eachDayOfInterval({ start, end }).map(date => {
            //         const day = date.getDate();
            //         const dayName = format(date, 'EEE'); // Get short weekday name: Mon, Tue, etc.
            //         const formatted = `${String(day).padStart(2, '0')} ${dayName}`;
            //         console.log(formatted); // Optional: For debugging
            //         return formatted;
            //     });
            // }
            // ,
            4: () => {
                const sixMonthsAgo = subMonths(now, 5);
                const startDate = startOfMonth(sixMonthsAgo);
                setFromDate(format(startDate, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
                return {
                    rangeStart: startDate,
                    rangeEnd: now,
                    isRange: true
                }; // Last 6 Months
            },
            5: () => {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                setFromDate(format(yearStart, 'yyyy-MM-dd'));
                setToDate(format(now, 'yyyy-MM-dd'));
                return {
                    rangeStart: yearStart,
                    rangeEnd: now,
                    isRange: true
                }; // This Year
            }
        };

        const dateRange = periodHandlers[period]?.() || [];
        const filteredData = filterDataByDateRange(
            Graphicaldata.labels,
            Graphicaldata,
            dateRange
        );
        setChartData(filteredData);
    }, [Todays, startOfLastWeek, endOfLastWeek, Graphicaldata, filterDataByDateRange, setFromDate, setToDate]);

    useEffect(() => {

        if (fromDate && toDate) {
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);
            const customDateRange = {
                rangeStart: startDate,
                rangeEnd: endDate,
                isRange: true
            };

            const filteredData = filterDataByDateRange(
                Graphicaldata.labels,
                Graphicaldata,
                customDateRange
            );
            setChartData(filteredData);
        }
    }, [fromDate, toDate, Graphicaldata, filterDataByDateRange]);

    // ... (keep all the chart options and transform functions the same)
    const polarOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                display: true,
                color: 'rgba(var(--font-light))',
            },
            tooltip: {
                enabled: true,
            },
            title: {
                display: false,
                text: 'Patient Details',
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                ticks: {
                    display: false,
                },
                grid: {
                    display: true,
                },
                suggestedMin: 0,
            },
        },
    };

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

    // Line chart options
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    autoSkip: false,
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: true
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12
                }
            },
        }
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
                pointBackgroundColor: dataset.borderColor,

            }))
        };
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
    return (
        <Box sx={{
            width: { xs: '100%', sm: '100%', md: 700, lg: "100%" },
            overflow: "auto"
        }}>
            {/* Date Range Selector */}
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
                    {/* <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} /> */}
                    <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                </Box>
            </Box>

            {/* Chart Display */}
            <Box sx={{
                mt: 2,
                width: '100%',
                height: 350,
            }}>
                {parseInt(Chartlayout) === 1 ? (
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                        '&::-webkit-scrollbar': {
                            height: 5
                        },
                        gap: 2,
                        cursor: "pointer",
                        color: 'rgba(var(--font-light))',
                    }}>
                        <Bar
                            data={{
                                labels: chartData.labels,
                                datasets: chartData.datasets.map((dataset, index) => ({
                                    label: dataset.label,
                                    data: dataset.data,
                                    backgroundColor: [
                                        'rgba(96, 94, 163, 0.50)',
                                        'rgba(12, 132, 162, 0.50)',
                                        'rgba(184, 62, 143, 0.48)'
                                    ][index % 3], // Cycle through colors if more than 3 datasets
                                    borderColor: [
                                        'rgba(96, 94, 163, 1)',
                                        'rgba(12, 132, 162, 1)',
                                        'rgba(184, 62, 143, 1)'
                                    ][index % 3],
                                    borderWidth: 1,

                                    barPercentage: 0.9, // Equivalent to barPercentage in MUI
                                    categoryPercentage: 0.8, // Equivalent to categoryPercentage in MUI
                                }))
                            }}
                            options={options}

                            height={350}
                        />
                    </Box>

                ) : parseInt(Chartlayout) === 2 ? (
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        overflowX: "auto",
                        overflowY: "hidden",
                        minWidth: `${Math.max(
                            chartData?.labels?.length * 60,
                            800
                        )}px`,
                        '&::-webkit-scrollbar': {
                            height: '6px',
                        }
                    }}>
                        <Line
                            data={transformToLineChartData(chartData)}
                            options={{
                                ...lineOptions,
                                maintainAspectRatio: false
                            }}
                            height={350}
                        />
                    </Box>
                ) : parseInt(Chartlayout) === 3 ? (
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <PolarArea
                            data={transformToPolarData(chartData)}
                            options={polarOptions}
                            height={300}
                            width={300}
                        />
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};

export default memo(OverallSalesProgress);



