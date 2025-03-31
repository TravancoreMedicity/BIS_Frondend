
import { Box, Button, ButtonGroup, IconButton, Input, Typography } from '@mui/joy';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { Calendar } from 'iconoir-react';
import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";

const DateRangeCompAll = ({ setSalesData, setXAxisData }) => {
    const [dayCount, setDayCount] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

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
    }, [startOfLastWeek, endOfLastWeek, StartOfcurrentMonth, Todays]);

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
        <div>
            <Box sx={{ flexWrap: "wrap", mt: 1 }}>
                <ButtonGroup
                    aria-label="radius button group"
                    sx={{ '--ButtonGroup-radius': '40px' }}
                >
                    <IconButton>
                        <Calendar sx={{ color: "rgba(var( --input-font-color))" }} />
                    </IconButton>
                    <Button onClick={() => handlePeriodChange(1)}>
                        <Typography
                            sx={{
                                color: "rgba(var( --input-font-color))", '&:hover': {
                                    color: 'rgba(var( --font-black))', backgroundColor: 'transparent',
                                }
                            }}>Today</Typography>
                    </Button>
                    <Button onClick={() => handlePeriodChange(2)}>
                        <Typography sx={{
                            color: "rgba(var( --input-font-color))",
                            '&:hover': {
                                color: 'rgba(var( --font-black))',
                                backgroundColor: 'transparent',
                            }
                        }}>Last Week</Typography>
                    </Button>
                    <Button onClick={() => handlePeriodChange(3)}>
                        <Typography sx={{
                            color: "rgba(var( --input-font-color))",
                            '&:hover': {
                                color: 'rgba(var( --font-black))',
                                backgroundColor: 'transparent',
                            }
                        }}>This Month</Typography>
                    </Button>
                    <Button onClick={() => handlePeriodChange(4)}>
                        <Typography sx={{
                            color: "rgba(var( --input-font-color))",
                            '&:hover': {
                                color: 'rgba(var( --font-black))',
                                backgroundColor: 'transparent',
                            }
                        }}>Last 6 months</Typography>
                    </Button>
                    <Button onClick={() => handlePeriodChange(5)}>
                        <Typography sx={{
                            color: "rgba(var( --input-font-color))",
                            '&:hover': {
                                color: 'rgba(var( --font-black))',
                                backgroundColor: 'transparent',
                            }
                        }}>This Year</Typography>
                    </Button>
                    <Button onClick={() => handlePeriodChange(6)}>
                        <Typography sx={{
                            color: "rgba(var( --input-font-color))",
                            '&:hover': {
                                color: 'rgba(var( --font-black))',
                                backgroundColor: 'transparent',
                            }
                        }}>Date Range</Typography>
                    </Button>
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
                                        slotProps={{
                                            input: {
                                                min: fromDate
                                            }
                                        }}
                                    />
                                </Box>
                                :
                                <Calendar sx={{ color: "rgba(var( --input-font-color))" }} />
                        }
                    </Button>
                </ButtonGroup>
            </Box>
        </div>

    )
}

export default memo(DateRangeCompAll) 