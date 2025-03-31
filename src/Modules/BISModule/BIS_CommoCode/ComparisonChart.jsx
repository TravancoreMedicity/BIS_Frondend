import { React, memo, useCallback, useState, useEffect } from 'react';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, Button, ButtonGroup, IconButton, Input, Typography } from '@mui/joy';
import { Fragment } from 'react';
import SelectGraphicalView from './SelectGraphicalView';
import LineChartRep from './LineChartRep';
import PolarGraph from '../BIS_CommoCode/PolarGraph';
import { Calendar } from 'iconoir-react';
import { addDays, differenceInDays, eachDayOfInterval, format, min, startOfMonth, startOfWeek, subDays, subMonths, subWeeks, subYears } from "date-fns";

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

    const colors = ['#006BD6', '#EC407A'];

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
            setChooseDate(FirstIn)

            const FirstOut = format(subMonths(FirstIn, 5), 'yyyy-MMM')

            const SecondOut = format(subMonths(FirstOut, 1), "yyyy-MMM")

            const SecondIn = format(subMonths(FirstOut, 6), "yyyy-MMM")
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
            const endDate = new Date(toDate);

            const xAxis1 = eachDayOfInterval({ start: startDate, end: endDate }).map(date => format(date, 'yyyy-MM-dd'));

            const sales1 = xAxis1.map(() => Math.floor(Math.random() * 10));
            setXAxisData1(xAxis1)
            setSalesData1(sales1)

            const nextStartDate = subDays(new Date(endDate), 1)
            const diffDateRange = differenceInDays(endDate, startDate)
            const nextEndDate = subDays(new Date(nextStartDate), diffDateRange)

            console.log("startDate", startDate);
            console.log("endDate", endDate);

            console.log("nextStartDate", nextStartDate);
            console.log("diffDateRange", diffDateRange);
            console.log("nextEndDate", nextEndDate);

            const xAxis2 = eachDayOfInterval({ start: nextStartDate, end: nextEndDate }).map(date => format(date, 'yyyy-MM-dd'));
            const sales2 = xAxis1.map(() => Math.floor(Math.random() * 10));

            setXAxisData2(xAxis2);
            setSalesData2(sales2);
        }
    }, [fromDate, toDate]);


    return (
        <Fragment>
            <Typography sx={{ textAlign: "center" }}>Comparison Chart</Typography>

            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 4, px: 4, flexWrap: "wrap" }}>

                {/* Date Rage Section */}

                <Box sx={{ flexWrap: "wrap", mt: 1 }}>
                    <ButtonGroup
                        aria-label="radius button group"
                        sx={{ '--ButtonGroup-radius': '40px' }}
                    >
                        <IconButton>
                            <Calendar sx={{ color: "rgba(var( --input-font-color))" }} />
                        </IconButton>
                        <Button onClick={() => handlePeriodChange(1)}>
                            <Typography sx={{
                                color: "rgba(var( --input-font-color))",
                                '&:hover': {
                                    color: 'rgba(var( --font-black))',
                                    backgroundColor: 'transparent',
                                }
                            }}>This Month</Typography>
                        </Button>
                        <Button onClick={() => handlePeriodChange(2)}>
                            <Typography sx={{
                                color: "rgba(var( --input-font-color))",
                                '&:hover': {
                                    color: 'rgba(var( --font-black))',
                                    backgroundColor: 'transparent',
                                }
                            }}>Last 6 months</Typography>
                        </Button>
                        <Button onClick={() => handlePeriodChange(3)}>
                            <Typography sx={{
                                color: "rgba(var( --input-font-color))",
                                '&:hover': {
                                    color: 'rgba(var( --font-black))',
                                    backgroundColor: 'transparent',
                                }
                            }}>This Year</Typography>
                        </Button>
                        <Button onClick={() => handlePeriodChange(4)}>
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
                                dayCount === 4 ?
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                        <Input
                                            type="month"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            size='s'
                                        />
                                        <Input
                                            type="month"
                                            // type="date"
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
                {/* Date Rage Section over */}

                <Box>
                    <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                {parseInt(Chartlayout) === 1 ?
                    // < BarGraphicalRep salesData={salesData} xAxisData={xAxisData} />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <Box sx={{ mt: 3 }}>
                            <Typography sx={{ textAlign: "center" }}>
                                {dayCount === 1 ? ChooseDate :
                                    dayCount === 2 ? `${ChooseDate} - ${FirstOut}` :
                                        dayCount === 3 ? ChooseDate :
                                            ChooseDate}
                            </Typography>
                            <BarChart
                                sx={(theme) => ({
                                    [`.${barElementClasses.root}`]: {
                                        fill: theme.palette.background.paper,
                                        strokeWidth: 2,
                                    },
                                    [`.MuiBarElement-series-l_id`]: {
                                        stroke: colors[0],
                                    },
                                    [`.MuiBarElement-series-r_id`]: {
                                        stroke: colors[1],
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
                                xAxis={[{ scaleType: 'band', data: xAxisData1 }]}
                                series={[
                                    { data: salesData1, label: 'l', id: 'l_id' },
                                    // { data: rData, label: 'r', id: 'r_id' },
                                ]}
                                colors={colors}
                                width={900}
                                height={300}
                            />
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography sx={{ textAlign: "center" }}>
                                {dayCount === 1 ? prevDate :
                                    dayCount === 2 ? `${prevDate} - ${SecondIn}` :
                                        dayCount === 3 ? prevDate :
                                            prevDate}
                            </Typography>
                            <BarChart
                                sx={(theme) => ({
                                    [`.${barElementClasses.root}`]: {
                                        fill: theme.palette.background.paper,
                                        strokeWidth: 2,
                                    },
                                    [`.MuiBarElement-series-l_id`]: {
                                        stroke: colors[0],
                                    },
                                    [`.MuiBarElement-series-r_id`]: {
                                        stroke: colors[1],
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
                                    // { data: lsData, label: 'l', id: 'l_id' },
                                    { data: salesData2, label: 'r', id: 'r_id' },
                                ]}
                                colors={colors}
                                width={900}
                                height={300}
                            />
                        </Box>
                    </Box>
                    : parseInt(Chartlayout) === 2 ?
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                            {/* <LineChartRep salesDat={salesData} xAxisData={xAxisData} /> */}
                            <Box sx={{ width: "50%" }}><LineChartRep salesData={salesData1} xAxisData={xAxisData1} /></Box>
                            <Box sx={{ width: "50%" }}><LineChartRep salesData={salesData2} xAxisData={xAxisData2} /></Box>

                        </Box>
                        : parseInt(Chartlayout) === 3 ?


                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                                {/* <LineChartRep salesDat={salesData} xAxisData={xAxisData} /> */}
                                <PolarGraph salesData={salesData1} xAxisData={xAxisData1} />
                                <PolarGraph salesData={salesData2} xAxisData={xAxisData2} />

                            </Box>
                            : "null"
                }
            </Box>
        </Fragment>
    )
}

export default memo(ComparisonChart)



