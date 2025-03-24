import { Box, Button, ButtonGroup, IconButton, Input, Typography } from '@mui/joy';
import React, { Fragment, memo, useCallback, useState, useEffect } from 'react';
import { Calendar } from 'iconoir-react';
import { BarChart } from '@mui/x-charts';
import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";

const BarGraphicalRep = () => {
    const [dayCount, setDayCount] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [xAxisData, setXAxisData] = useState([]);

    const Todays = format(new Date(), 'yyyy-MM-dd');
    const StartOfcurrentMonth = format(startOfMonth(new Date(Todays)), "yyyy-MM-dd");
    const startOfThisWeek = startOfWeek(Todays, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);
        const monthsInYear = Array.from({ length: 12 }, (_, i) => new Date(new Date().getFullYear(), i, 1));
        let xAxis = [];
        let sales = [];
        if (period === 1) {
            xAxis = [format(new Date(), 'yyyy-MM-dd')];
            sales = [Math.floor(Math.random() * 10)];
        } else if (period === 2) {
            xAxis = eachDayOfInterval({ start: startOfLastWeek, end: endOfLastWeek }).map(date => format(date, 'yyyy-MM-dd'));
            sales = xAxis.map(() => Math.floor(Math.random() * 10));
        } else if (period === 3) {
            xAxis = eachDayOfInterval({ start: StartOfcurrentMonth, end: new Date() }).map(date => format(date, 'yyyy-MM-dd'));
            sales = xAxis.map(() => Math.floor(Math.random() * 10));
        } else if (period === 4) {
            xAxis = Array.from({ length: 6 }, (_, i) => format(subMonths(new Date(), 6 - i), 'yyyy-MM-dd'));
            sales = xAxis.map(() => Math.floor(Math.random() * 10));
        } else if (period === 5) {
            xAxis = monthsInYear?.filter(month => format(new Date(month), 'yyyy-MM-dd') <= Todays).map(mnth => format(mnth, 'yyyy-MM-dd'))
            sales = xAxis.map(() => Math.floor(Math.random() * 10));
        }
        setXAxisData(xAxis);
        setSalesData(sales);
    }, []);

    useEffect(() => {
        let xAxis = [];
        let sales = [];
        if (dayCount === 1) {
            xAxis = [format(new Date(), 'yyyy-MM-dd')];
            sales = [Math.floor(Math.random() * 10)];
            setXAxisData(xAxis);
            setSalesData(sales);
        }
        else if (fromDate && toDate) {
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);
            const xAxis = eachDayOfInterval({ start: startDate, end: endDate }).map(date => format(date, 'yyyy-MM-dd'));
            const sales = xAxis.map(() => Math.floor(Math.random() * 10));
            setXAxisData(xAxis);
            setSalesData(sales);
        }
    }, [fromDate, toDate]);

    return (
        <Fragment>
            <Box sx={{ height: 700 }}>
                <Box sx={{ mt: 3 }}>
                    <Typography textAlign="center" sx={{ fontWeight: "bold", fontSize: 25 }}>
                        Pharmacy Sales
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Box sx={{ px: 5, mt: 7 }}>
                        <ButtonGroup
                            aria-label="radius button group"
                            sx={{ '--ButtonGroup-radius': '40px' }}
                        >
                            <IconButton>
                                <Calendar />
                            </IconButton>
                            <Button onClick={() => handlePeriodChange(1)}>Today</Button>
                            <Button onClick={() => handlePeriodChange(2)}>Last Week</Button>
                            <Button onClick={() => handlePeriodChange(3)}>This Month</Button>
                            <Button onClick={() => handlePeriodChange(4)}>Last 6 months</Button>
                            <Button onClick={() => handlePeriodChange(5)}>This Year</Button>
                            <Button onClick={() => handlePeriodChange(6)}>Date Range</Button>
                            <Button>
                                {
                                    dayCount === 6 ?
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                            <Input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                size='s'
                                            />
                                            <Input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                size='s'
                                            />
                                        </Box>
                                        :
                                        <Calendar />
                                }
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: xAxisData }]}
                        series={[{ data: salesData }]}
                        width={1700}
                        height={300}
                    />
                </Box>
            </Box>
        </Fragment>
    );
};

export default memo(BarGraphicalRep);

