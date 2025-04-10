import { React, memo, useCallback, useState, useEffect } from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import { Fragment } from 'react';
import SelectGraphicalView from './SelectGraphicalView';
import LineChartRep from './LineChartRep';
import PolarGraph from '../BIS_CommoCode/PolarGraph';
import { addDays, differenceInDays, eachDayOfInterval, endOfMonth, format, startOfMonth, startOfWeek, subDays, subMonths, subWeeks, subYears } from "date-fns";

const ComparisonChart = () => {
    const [salesData1, setSalesData1] = useState([]);
    const [xAxisData1, setXAxisData1] = useState([]);
    const [salesData2, setSalesData2] = useState([]);
    const [xAxisData2, setXAxisData2] = useState([]);
    const [Chartlayout, seChartlayout] = useState(1);

    const [dayCount, setDayCount] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [ChooseDate, setChooseDate] = useState('');
    const [prevDate, setPrevDate] = useState('');
    const [FirstOut, setFirstOut] = useState('');
    const [SecondIn, setSecondIn] = useState('');

    const Todays = format(new Date(), 'yyyy-MM-dd');
    const StartOfcurrentMonth = format(startOfMonth(new Date(Todays)), "yyyy-MM-dd");
    const startOfThisWeek = startOfWeek(Todays, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const PrevMonth = format(subMonths(new Date(StartOfcurrentMonth), 1), "yyyy-MM-dd");

    const colors = ['#E69DB8', '#97C3C7'];

    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);
        const monthsInYear = Array.from({ length: 12 }, (_, i) => new Date(new Date().getFullYear(), i, 1));
        const monthsInLastYear = Array.from({ length: 12 }, (_, i) => new Date(new Date().getFullYear() - 1, i, 1));

        let xAxis1 = [];
        let sales1 = [];
        let xAxis2 = [];
        let sales2 = [];
        let prev = '';

        if (period === 1) {

            xAxis1 = eachDayOfInterval({ start: StartOfcurrentMonth, end: new Date() }).map(date => format(date, 'yyyy-MM-dd'));
            sales1 = xAxis1.map(() => Math.floor(Math.random() * 10));

            xAxis2 = eachDayOfInterval({ start: PrevMonth, end: StartOfcurrentMonth }).map(date => format(date, 'yyyy-MM-dd'));
            sales2 = xAxis2.map(() => Math.floor(Math.random() * 10));
            prev = subMonths(StartOfcurrentMonth, 1);
            const formattedPrev = format(prev, 'yyyy-MMM');
            setPrevDate(formattedPrev)
            const formattedStartOfcurrentMonth = format(StartOfcurrentMonth, 'yyyy-MMM');
            setChooseDate(formattedStartOfcurrentMonth)

        } else if (period === 2) {
            xAxis1 = Array.from({ length: 6 }, (_, i) => {
                return format(subMonths(new Date(), i), 'yyyy-MM-dd');
            });
            sales1 = xAxis1.map(() => Math.floor(Math.random() * 10));

            const FirstIn = format(StartOfcurrentMonth, 'yyyy-MMM');

            const FirstOut = format(subMonths(FirstIn, 5), 'yyyy-MMM')

            const SecondOut = format(subMonths(FirstOut, 1), "yyyy-MMM")

            const SecondIn = format(subMonths(FirstOut, 6), "yyyy-MMM")
            setChooseDate(FirstIn)
            setPrevDate(SecondOut)
            setFirstOut(FirstOut)
            setSecondIn(SecondIn)

            xAxis2 = Array.from({ length: 6 }, (_, i) => {
                return format(subMonths(new Date(), 6 + i), 'yyyy-MM-dd');
            });

            sales2 = xAxis2.map(() => Math.floor(Math.random() * 10));

        } else if (period === 3) {
            xAxis1 = monthsInYear?.filter(month => format(new Date(month), 'yyyy-MM-dd') <= Todays).map(mnth => format(mnth, 'yyyy-MM-dd'))
            sales1 = xAxis1.map(() => Math.floor(Math.random() * 10));

            xAxis2 = monthsInLastYear?.map(mnth => format(mnth, 'yyyy-MM-dd'));

            sales2 = xAxis2.map(() => Math.floor(Math.random() * 10));

            prev = subYears(StartOfcurrentMonth, 1);
            const formattedPrev = format(prev, 'yyyy');
            setPrevDate(formattedPrev)
            const formattedStartOfcurrentMonth = format(StartOfcurrentMonth, 'yyyy');
            setChooseDate(formattedStartOfcurrentMonth)
        }
        setXAxisData1(xAxis1)
        setSalesData1(sales1)
        setXAxisData2(xAxis2);
        setSalesData2(sales2);

    }, [startOfLastWeek, endOfLastWeek, StartOfcurrentMonth, Todays, PrevMonth]);

    useEffect(() => {
        let xAxis1 = [];
        let sales1 = [];
        let xAxis2 = [];
        let sales2 = [];
        let prev = '';

        if (dayCount === 1) {

            xAxis1 = eachDayOfInterval({ start: StartOfcurrentMonth, end: new Date() }).map(date => format(date, 'yyyy-MM-dd'));
            sales1 = xAxis1.map(() => Math.floor(Math.random() * 10));

            xAxis2 = eachDayOfInterval({ start: PrevMonth, end: StartOfcurrentMonth }).map(date => format(date, 'yyyy-MM-dd'));
            sales2 = xAxis2.map(() => Math.floor(Math.random() * 10));
            prev = subMonths(StartOfcurrentMonth, 1);
            const formattedPrev = format(prev, 'yyyy-MMM');
            setPrevDate(formattedPrev)
            const formattedStartOfcurrentMonth = format(StartOfcurrentMonth, 'yyyy-MMM');
            setChooseDate(formattedStartOfcurrentMonth)
            setXAxisData1(xAxis1)
            setSalesData1(sales1)
            setXAxisData2(xAxis2);
            setSalesData2(sales2);
        }
        else if (fromDate && toDate) {
            const startDate = new Date(fromDate);
            const endDate = endOfMonth(new Date(toDate));

            const xAxis1 = eachDayOfInterval({ start: startDate, end: endDate }).map(date => format(date, 'yyyy-MM-dd'));

            const sales1 = xAxis1.map(() => Math.floor(Math.random() * 10));
            setXAxisData1(xAxis1)
            setSalesData1(sales1)

            const diffDateRange = differenceInDays(endDate, startDate)
            const nextStartDate = subDays(new Date(endDate), diffDateRange + 1)
            const nextEndDates = subDays(new Date(nextStartDate), diffDateRange)

            const xAxis2 = eachDayOfInterval({ start: nextStartDate, end: nextEndDates }).map(date => format(date, 'yyyy-MM-dd'));
            const sales2 = xAxis1.map(() => Math.floor(Math.random() * 10));

            setXAxisData2(xAxis2);
            setSalesData2(sales2);

            const first = format(new Date(startDate), 'yyyy-MMM')
            const second = format(new Date(endDate), 'yyyy-MMM')
            const third = format(new Date(nextStartDate), 'yyyy-MMM')
            const fourth = format(new Date(nextEndDates), 'yyyy-MMM')

            setChooseDate(first)
            setPrevDate(second)
            setFirstOut(third)
            setSecondIn(fourth)
        }
    }, [fromDate, toDate]);


    return (
        <Fragment>
            <Box sx={{ mt: 1, width: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: "100%", justifyContent: "space-between" }}>
                    <Box>
                        <ButtonGroup
                            aria-label="radius button group"
                            sx={{ '--ButtonGroup-radius': '40px' }}
                        >
                            <Button onClick={() => handlePeriodChange(1)}>
                                <Typography sx={{
                                    fontSize: 11,
                                    color: "rgba(var( --input-font-color))",
                                    '&:hover': {
                                        color: 'rgba(var( --font-black))',
                                        backgroundColor: 'transparent',
                                    }
                                }}>This Month</Typography>
                            </Button>
                            <Button onClick={() => handlePeriodChange(2)}>
                                <Typography sx={{
                                    fontSize: 11,
                                    color: "rgba(var( --input-font-color))",
                                    '&:hover': {
                                        color: 'rgba(var( --font-black))',
                                        backgroundColor: 'transparent',
                                    }
                                }}>Last 6 months</Typography>
                            </Button>
                            <Button onClick={() => handlePeriodChange(3)}>
                                <Typography sx={{
                                    fontSize: 11,
                                    color: "rgba(var( --input-font-color))",
                                    '&:hover': {
                                        color: 'rgba(var( --font-black))',
                                        backgroundColor: 'transparent',
                                    }
                                }}>This Year</Typography>
                            </Button>
                            <Button onClick={() => handlePeriodChange(4)}>
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                    <Input
                                        type="month"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        size='xs'
                                    />
                                    <Input
                                        type="month"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        size='xs'
                                        slotProps={{
                                            input: {
                                                min: fromDate
                                            }
                                        }}
                                    />
                                </Box>
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <Box>
                        <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                    </Box>
                </Box>

                <Box sx={{ width: "100%", display: "flex", flexDirection: "row", gap: 1, mt: 2, flexWrap: { sm: 'wrap', xl: "nowrap" } }}>
                    <Box sx={{ width: { xl: "50%", sm: '100%' }, maxHeight: 335, }}>
                        <Box>
                            <Typography sx={{ textAlign: "center" }}>
                                {dayCount === 1 ? ChooseDate :
                                    dayCount === 2 ? `${ChooseDate} - ${FirstOut}` :
                                        dayCount === 3 ? ChooseDate :
                                            dayCount === 4 ? `${ChooseDate} - ${FirstOut}` :
                                                ChooseDate}
                            </Typography>
                        </Box>
                        {
                            parseInt(Chartlayout) === 1 ?

                                <Box sx={{ overflowX: "auto", overflowY: "auto" }}>
                                    <BarChart
                                        sx={(theme) => ({
                                            [`.${barElementClasses.root}`]: {
                                                fill: theme.palette.background.paper,
                                                strokeWidth: 2,
                                            },
                                            [`.MuiBarElement-series-l_id`]: {
                                                fill: colors[0],
                                            },
                                            [`.MuiBarElement-series-r_id`]: {
                                                fill: colors[1],
                                            },
                                            [`.${axisClasses.root}`]: {
                                                [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                                    stroke: '#006BD6',
                                                    strokeWidth: 3,
                                                },
                                                [`.${axisClasses.tickLabel}`]: {
                                                    fill: '#006BD6',
                                                },
                                            },

                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            backgroundImage:
                                                'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                                            backgroundSize: '35px 35px',
                                            backgroundPosition: '20px 20px, 20px 20px',
                                            ...theme.applyStyles('dark', {
                                                borderColor: 'rgba(255,255,255, 0.1)',
                                                backgroundImage:
                                                    'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
                                            }),
                                        })}
                                        xAxis={[{ scaleType: 'band', data: xAxisData1, },]}
                                        series={[
                                            { data: salesData1, label: 'l', id: 'l_id' },
                                        ]}
                                        colors={colors}
                                        width={900}
                                        height={300}

                                    />
                                </Box>
                                : parseInt(Chartlayout) === 2 ?
                                    <LineChartRep salesData={salesData1} xAxisData={xAxisData1} />
                                    : parseInt(Chartlayout) === 3 ?
                                        <PolarGraph salesData={salesData1} xAxisData={xAxisData1} />
                                        : null
                        }
                    </Box>

                    <Box sx={{ width: { xl: "50%", sm: '100%' }, mt: { sm: 1, xl: 0 }, maxHeight: 335 }}>
                        <Box>
                            <Typography sx={{ textAlign: "center" }}>
                                {dayCount === 1 ? prevDate :
                                    dayCount === 2 ? `${prevDate} - ${SecondIn}` :
                                        dayCount === 3 ? prevDate :
                                            dayCount === 4 ? `${prevDate} - ${SecondIn}` :
                                                prevDate}
                            </Typography>
                        </Box>
                        {parseInt(Chartlayout) === 1 ?
                            <Box sx={{ overflowX: "auto", overflowY: "auto" }}>
                                <BarChart
                                    sx={(theme) => ({
                                        [`.${barElementClasses.root}`]: {
                                            fill: theme.palette.background.paper,
                                            strokeWidth: 2,
                                        },
                                        [`.MuiBarElement-series-l_id`]: {
                                            fill: colors[0],
                                        },
                                        [`.MuiBarElement-series-r_id`]: {
                                            fill: colors[1],
                                        },
                                        [`.${axisClasses.root}`]: {
                                            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                                stroke: '#006BD6',
                                                strokeWidth: 3,
                                            },
                                            [`.${axisClasses.tickLabel}`]: {
                                                fill: '#006BD6',
                                            },
                                        },

                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                        backgroundImage:
                                            'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                                        backgroundSize: '35px 35px',
                                        backgroundPosition: '20px 20px, 20px 20px',
                                        ...theme.applyStyles('dark', {
                                            borderColor: 'rgba(255,255,255, 0.1)',
                                            backgroundImage:
                                                'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
                                        }),
                                    })}
                                    xAxis={[{ scaleType: 'band', data: xAxisData2 }]}
                                    series={[
                                        { data: salesData2, label: 'r', id: 'r_id' },
                                    ]}
                                    colors={colors}
                                    width={900}
                                    height={300}
                                />
                            </Box>
                            : parseInt(Chartlayout) === 2 ?
                                <LineChartRep salesData={salesData2} xAxisData={xAxisData2} />
                                : parseInt(Chartlayout) === 3 ?
                                    <PolarGraph salesData={salesData2} xAxisData={xAxisData2} />
                                    : null
                        }
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(ComparisonChart)



