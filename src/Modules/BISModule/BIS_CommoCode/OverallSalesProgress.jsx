// @ts-nocheck
import React, { memo, useCallback, useState, useEffect } from 'react';
import { Box } from '@mui/joy';
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

import GraphicalRep from './GraphicalRep';
import CommonDateComp from './CommonDateRange/CommonDateComp';
import { ensureNumber, toPolarChartData } from './CommonDateRange/ChartCommonFuns/ChartCommonFun';

// Register ChartJS components globally
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
    ArcElement,
);
// Utility to safely convert values to number
const OverallSalesProgress = ({
    Graphicaldata,
    Displaystyle,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    barOptions,
    lineOptions
}) => {
    const StyleMode = ensureNumber(Displaystyle);

    // 🔹 Local states
    const [dayCount, setDayCount] = useState(2);
    const [chartData, setChartData] = useState(Graphicaldata || { labels: [], datasets: [] });
    const [Chartlayout, seChartlayout] = useState(StyleMode);

    // 🔹 Predefined dates
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    // 🔹 Data filtering by date range
    const filterDataByDateRange = useCallback((labels, data, dateRange) => {
        try {
            // Validate inputs
            if (
                !Array.isArray(labels) || labels.length === 0 || // labels must be array with values
                !data?.datasets || !Array.isArray(data.datasets) || data.datasets.length === 0 || // datasets must exist and not empty
                !dateRange || typeof dateRange !== "object" || // dateRange must be object
                (dateRange.isRange && (!dateRange.rangeStart || !dateRange.rangeEnd)) // if isRange → must have valid dates
            ) {
                return { labels: [], datasets: [] };
            }

            // Monthly aggregation (for Last 6 Months / This Year)
            if (dateRange.isRange && (dayCount === 4 || dayCount === 5)) {
                const months = eachMonthOfInterval({ start: dateRange.rangeStart, end: dateRange.rangeEnd });
                const monthLabels = months.map(month => format(month, 'MMM yyyy'));

                const monthlySums = data.datasets.map(dataset =>
                    months.map(month => {
                        const monthStart = startOfMonth(month);
                        const monthEnd = endOfMonth(month);

                        return labels.reduce((sum, label, index) => {
                            const labelDate = new Date(label);
                            return isWithinInterval(labelDate, { start: monthStart, end: monthEnd })
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

            // Daily filtering
            if (dateRange.isRange) {
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = new Date(label);
                        return (labelDate >= dateRange.rangeStart && labelDate <= dateRange.rangeEnd) ? index : null;
                    })
                    .filter(index => index !== null);

                return {
                    labels: filteredIndices.map(index => format(new Date(labels[index]), 'dd EEE')),
                    datasets: data.datasets.map(dataset => ({
                        ...dataset,
                        data: filteredIndices.map(index => dataset.data[index]),
                    })),
                };
            }

            // Exact match ranges
            const filteredIndices = labels
                .map((label, index) => dateRange.includes(label) ? index : null)
                .filter(index => index !== null);

            return {
                labels: filteredIndices.map(index => format(new Date(labels[index]), 'dd EEE')),
                datasets: data.datasets.map(dataset => ({
                    ...dataset,
                    data: filteredIndices.map(index => dataset.data[index]),
                })),
            };

        } catch (error) {
            console.error("Error in filterDataByDateRange:", error);
            return { labels: [], datasets: [] }; // fallback
        }
    }, [dayCount]);

    // 🔹 Handle period change (Week, Month, 6 Months, Year)
    const handlePeriodChange = useCallback((period) => {
        try {
            //Basic validation
            if (period == null || typeof period !== "number" || ![2, 3, 4, 5].includes(period)) {
                console.warn("Invalid period:", period);
                setChartData(null);
                return null;
            }

            setDayCount(period);
            const now = new Date();

            const periodHandlers = {
                2: () => {
                    setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                    setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
                    return eachDayOfInterval({ start: startOfLastWeek, end: endOfLastWeek })
                        .map(date => format(date, 'yyyy-MM-dd'));
                },
                3: () => {
                    setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
                    setToDate(format(now, 'yyyy-MM-dd'));
                    return eachDayOfInterval({ start: startOfMonth(now), end: now })
                        .map(date => format(date, 'yyyy-MM-dd'));
                },
                4: () => {
                    const sixMonthsAgo = subMonths(now, 5);
                    const startDate = startOfMonth(sixMonthsAgo);
                    setFromDate(format(startDate, 'yyyy-MM-dd'));
                    setToDate(format(now, 'yyyy-MM-dd'));
                    return { rangeStart: startDate, rangeEnd: now, isRange: true };
                },
                5: () => {
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    setFromDate(format(yearStart, 'yyyy-MM-dd'));
                    setToDate(format(now, 'yyyy-MM-dd'));
                    return { rangeStart: yearStart, rangeEnd: now, isRange: true };
                }
            };

            //run selected handler
            const dateRange = periodHandlers[period]();
            const filteredData = filterDataByDateRange(Graphicaldata.labels, Graphicaldata, dateRange);

            setChartData(filteredData);
            return filteredData;

        } catch (error) {
            console.error("Error in handlePeriodChange:", error);
            setChartData(null);
            return null;
        }
    }, [Graphicaldata, filterDataByDateRange, setFromDate, setToDate, startOfLastWeek, endOfLastWeek]);


    // 🔹 Apply custom range from props
    useEffect(() => {
        if (!fromDate || !toDate) return;
        try {
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.warn("Invalid date range:", { fromDate, toDate });
                return;
            }

            const customDateRange = { rangeStart: startDate, rangeEnd: endDate, isRange: true };
            const filteredData = filterDataByDateRange(Graphicaldata.labels, Graphicaldata, customDateRange);

            setChartData(filteredData);
        } catch (error) {
            console.error("Error filtering chart data:", error);
            setChartData(null); // fallback
        }
    }, [fromDate, toDate, Graphicaldata, filterDataByDateRange]);


    // 🔹 Transform data for PolarArea
    const polarData = toPolarChartData(chartData.datasets);

    return (
        <Box sx={{ width: { xs: '100%', md: 700, lg: "100%" }, overflow: "auto" }}>

            {/* Date Range Selector */}
            <CommonDateComp
                onPeriodChange={handlePeriodChange}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                Graphicaldata={Graphicaldata}
                dayCount={dayCount}
                setDayCount={setDayCount}
                chartData={chartData}
                setChartData={setChartData}
            />

            {/* Chart type toggle */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>

            {/* Chart Display */}
            <Box
                sx={{
                    mt: 2,
                    width: "100%",
                    height: 400,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "background.level1",
                    borderRadius: 3,
                    boxShadow: "sm",
                    p: 2,
                    overflow: "auto",
                    '&::-webkit-scrollbar': { height: 5 },
                }}
            >
                {ensureNumber(Chartlayout) === 1 && (
                    <Bar
                        data={{
                            ...chartData,
                            datasets: chartData.datasets.map(ds => ({
                                ...ds,
                                barPercentage: 0.9,
                                categoryPercentage: 0.8,
                                barThickness: "flex",
                            }))
                        }}
                        options={barOptions}
                    />
                )}

                {ensureNumber(Chartlayout) === 2 && (
                    <Line data={chartData} options={lineOptions} />
                )}

                {ensureNumber(Chartlayout) === 3 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400, width: "100%" }}>
                        <PolarArea data={polarData} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default memo(OverallSalesProgress);
