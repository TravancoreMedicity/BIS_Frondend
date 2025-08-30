// @ts-nocheck
import React, { memo, useCallback } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Input,
    Typography
} from "@mui/joy";
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

const CommonDateComp = ({
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    Graphicaldata,
    dayCount,
    setDayCount,
    chartData,
    setChartData
}) => {
    const labels = ["Last Week", "This Month", "Last 6 months", "This Year", "Custom"];

    const today = format(new Date(), "yyyy-MM-dd");
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const filterDataByDateRange = useCallback(
        (labels, data, dateRange) => {
            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                // Monthly ranges (Last 6 Months or This Year)
                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, "MMM yyyy"));

                    const monthlySums = data?.datasets?.map((dataset) => {
                        return months.map((month) => {
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
                const filteredIndices = labels
                    ?.map((label, index) => {
                        const labelDate = new Date(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) => {
                        const date = new Date(labels[index]);
                        return format(date, "dd EEE");
                    }),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index])
                    }))
                };
            }

            // Exact date match (Today, Last Week, This Month)
            const filteredIndices = labels
                ?.map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => {
                    const date = new Date(labels[index]);
                    return format(date, "dd EEE");
                }),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index])
                }))
            };
        },
        [dayCount]
    );

    const handleClick = useCallback(
        (period) => {
            setDayCount(period);
            const now = new Date();

            const periodHandlers = {
                2: () => {
                    setFromDate(format(startOfLastWeek, "yyyy-MM-dd"));
                    setToDate(format(endOfLastWeek, "yyyy-MM-dd"));
                    return eachDayOfInterval({
                        start: startOfLastWeek,
                        end: endOfLastWeek
                    }).map((date) => format(date, "yyyy-MM-dd")); // Last Week
                },
                3: () => {
                    setFromDate(format(startOfMonth(now), "yyyy-MM-dd"));
                    setToDate(format(now, "yyyy-MM-dd"));
                    return eachDayOfInterval({
                        start: startOfMonth(now),
                        end: now
                    }).map((date) => format(date, "yyyy-MM-dd")); // This Month
                },
                4: () => {
                    const sixMonthsAgo = subMonths(now, 5);
                    const startDate = startOfMonth(sixMonthsAgo);
                    setFromDate(format(startDate, "yyyy-MM-dd"));
                    setToDate(format(now, "yyyy-MM-dd"));
                    return {
                        rangeStart: startDate,
                        rangeEnd: now,
                        isRange: true
                    }; // Last 6 Months
                },
                5: () => {
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    setFromDate(format(yearStart, "yyyy-MM-dd"));
                    setToDate(format(now, "yyyy-MM-dd"));
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
        },
        [Graphicaldata, filterDataByDateRange, setFromDate, setToDate, setDayCount, setChartData]
    );

    return (
        <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1 }}>
            <ButtonGroup
                aria-label="date range selector"
                sx={{
                    "--ButtonGroup-radius": "30px",
                    display: "flex",
                    flexWrap: { sm: "wrap", xl: "nowrap" },
                    p: 0,
                    size: "sm"
                }}
            >
                {labels.map((label, index) => (
                    <Button
                        key={label}
                        onClick={() => index === 4 ? null : handleClick(index + 2)} // ✅ match period correctly
                    >
                        {index === 4 ? (
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <Input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    size="xs"
                                    sx={{ p: 0.5, color: "grey" }}
                                />
                                <Input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    size="xs"
                                    sx={{ p: 0.5, color: "grey" }}
                                    slotProps={{ input: { min: fromDate } }}
                                />
                            </Box>
                        ) : (
                            <Typography
                                sx={{
                                    fontSize: 11,
                                    color: "rgba(var(--input-font-color))",
                                    "&:hover": {
                                        color: "rgba(var(--font-black))",
                                        backgroundColor: "transparent"
                                    }
                                }}
                            >
                                {label}
                            </Typography>
                        )}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default memo(CommonDateComp);
