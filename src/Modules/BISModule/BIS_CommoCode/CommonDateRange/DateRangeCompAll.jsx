import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";

const DateRangeCompAll = ({ setSalesData, setXAxisData }) => {
    const [dayCount, setDayCount] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const Todays = format(new Date(), 'yyyy-MM-dd');
    const StartOfcurrentMonth = format(startOfMonth(new Date()), "yyyy-MM-dd");
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const generateRandomData = (length) =>
        Array.from({ length }, () => Math.floor(Math.random() * 10));

    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);

        let xAxis = [];
        switch (period) {
            case 1: // Today
                xAxis = [Todays];
                break;
            case 2: // Last Week
                xAxis = eachDayOfInterval({
                    start: startOfLastWeek,
                    end: endOfLastWeek
                }).map(date => format(date, 'yyyy-MM-dd'));
                break;
            case 3: // This Month
                xAxis = eachDayOfInterval({
                    start: new Date(StartOfcurrentMonth),
                    end: new Date()
                }).map(date => format(date, 'yyyy-MM-dd'));
                break;
            case 4: // Last 6 months
                xAxis = Array.from({ length: 6 }, (_, i) =>
                    format(subMonths(new Date(), 5 - i), 'yyyy-MM-dd'));
                break;
            case 5: // This Year
                const monthsInYear = Array.from({ length: 12 }, (_, i) =>
                    new Date(new Date().getFullYear(), i, 1));
                xAxis = monthsInYear
                    .filter(month => month <= new Date())
                    .map(month => format(month, 'yyyy-MM-dd'));
                break;
            default:
                xAxis = [];
        }

        setXAxisData(xAxis);
        setSalesData(generateRandomData(xAxis.length));
    }, [Todays, startOfLastWeek, endOfLastWeek, StartOfcurrentMonth]);

    useEffect(() => {
        if (dayCount === 1) {
            setXAxisData([Todays]);
            setSalesData(generateRandomData(1));
        } else if (fromDate && toDate) {
            const startDate = new Date(fromDate);
            const endDate = new Date(toDate);
            const xAxis = eachDayOfInterval({
                start: startDate,
                end: endDate
            }).map(date => format(date, 'yyyy-MM-dd'));

            setXAxisData(xAxis);
            setSalesData(generateRandomData(xAxis.length));
        }
    }, [dayCount, fromDate, toDate, Todays]);

    return (
        <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1 }}>
            <ButtonGroup aria-label="date range selector" sx={{ '--ButtonGroup-radius': '40px' }}>
                {['Today', 'Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                    <Button key={label} onClick={() => handlePeriodChange(index + 1)}>
                        {index === 5 ? (
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <Input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    size='xs'
                                    sx={{ p: 1, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
                                />
                                <Input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    size='xs'
                                    sx={{ p: 1, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
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
    );
};

export default memo(DateRangeCompAll);

// import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
// import React, { memo, useCallback, useState, useEffect } from 'react';
// import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";

// const DateRangeCompAll = ({ setSalesData, setXAxisData }) => {
//     const [dayCount, setDayCount] = useState(1);
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');

//     const Todays = format(new Date(), 'yyyy-MM-dd');
//     const StartOfcurrentMonth = format(startOfMonth(new Date(Todays)), "yyyy-MM-dd");
//     const startOfThisWeek = startOfWeek(Todays, { weekStartsOn: 1 });
//     const startOfLastWeek = subWeeks(startOfThisWeek, 1);
//     const endOfLastWeek = addDays(startOfLastWeek, 6);

//     const handlePeriodChange = useCallback((period) => {
//         setDayCount(period);
//         const monthsInYear = Array.from({ length: 12 }, (_, i) => new Date(new Date().getFullYear(), i, 1));
//         let xAxis = [];
//         let sales = [];
//         if (period === 1) {
//             xAxis = [format(new Date(), 'yyyy-MM-dd')];
//             sales = [Math.floor(Math.random() * 10)];
//         } else if (period === 2) {
//             xAxis = eachDayOfInterval({ start: startOfLastWeek, end: endOfLastWeek }).map(date => format(date, 'yyyy-MM-dd'));
//             sales = xAxis.map(() => Math.floor(Math.random() * 10));
//         } else if (period === 3) {
//             xAxis = eachDayOfInterval({ start: StartOfcurrentMonth, end: new Date() }).map(date => format(date, 'yyyy-MM-dd'));
//             sales = xAxis.map(() => Math.floor(Math.random() * 10));
//         } else if (period === 4) {
//             xAxis = Array.from({ length: 6 }, (_, i) => format(subMonths(new Date(), 6 - i), 'yyyy-MM-dd'));
//             sales = xAxis.map(() => Math.floor(Math.random() * 10));
//         } else if (period === 5) {
//             xAxis = monthsInYear?.filter(month => format(new Date(month), 'yyyy-MM-dd') <= Todays).map(mnth => format(mnth, 'yyyy-MM-dd'))
//             sales = xAxis.map(() => Math.floor(Math.random() * 10));
//         }
//         setXAxisData(xAxis);
//         setSalesData(sales);
//     }, [startOfLastWeek, endOfLastWeek, StartOfcurrentMonth, Todays]);

//     useEffect(() => {
//         let xAxis = [];
//         let sales = [];
//         if (dayCount === 1) {
//             xAxis = [format(new Date(), 'yyyy-MM-dd')];
//             sales = [Math.floor(Math.random() * 10)];
//             setXAxisData(xAxis);
//             setSalesData(sales);
//         }
//         else if (fromDate && toDate) {
//             const startDate = new Date(fromDate);
//             const endDate = new Date(toDate);
//             const xAxis = eachDayOfInterval({ start: startDate, end: endDate }).map(date => format(date, 'yyyy-MM-dd'));
//             const sales = xAxis.map(() => Math.floor(Math.random() * 10));
//             setXAxisData(xAxis);
//             setSalesData(sales);
//         }
//     }, [fromDate, toDate]);
//     return (
//         <div>
//             <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
//                 <ButtonGroup
//                     aria-label="radius button group"
//                     sx={{ '--ButtonGroup-radius': '40px' }}
//                 >
//                     <Button onClick={() => handlePeriodChange(1)}>
//                         <Typography
//                             sx={{
//                                 fontSize: 11,
//                                 color: "rgba(var( --input-font-color))", '&:hover': {
//                                     color: 'rgba(var( --font-black))', backgroundColor: 'transparent',
//                                 }
//                             }}>Today</Typography>
//                     </Button>
//                     <Button onClick={() => handlePeriodChange(2)}>
//                         <Typography sx={{
//                             fontSize: 11,
//                             color: "rgba(var( --input-font-color))",
//                             '&:hover': {
//                                 color: 'rgba(var( --font-black))',
//                                 backgroundColor: 'transparent',
//                             }
//                         }}>Last Week</Typography>
//                     </Button>
//                     <Button onClick={() => handlePeriodChange(3)}>
//                         <Typography sx={{
//                             fontSize: 11,
//                             color: "rgba(var( --input-font-color))",
//                             '&:hover': {
//                                 color: 'rgba(var( --font-black))',
//                                 backgroundColor: 'transparent',
//                             }
//                         }}>This Month</Typography>
//                     </Button>
//                     <Button onClick={() => handlePeriodChange(4)}>
//                         <Typography sx={{
//                             fontSize: 11,
//                             color: "rgba(var( --input-font-color))",
//                             '&:hover': {
//                                 color: 'rgba(var( --font-black))',
//                                 backgroundColor: 'transparent',
//                             }
//                         }}>Last 6 months</Typography>
//                     </Button>
//                     <Button onClick={() => handlePeriodChange(5)}>
//                         <Typography sx={{
//                             fontSize: 11,
//                             color: "rgba(var( --input-font-color))",
//                             '&:hover': {
//                                 color: 'rgba(var( --font-black))',
//                                 backgroundColor: 'transparent',
//                             }
//                         }}>This Year</Typography>
//                     </Button>
//                     <Button onClick={() => handlePeriodChange(6)}>
//                         <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                             <Input
//                                 type="date"
//                                 value={fromDate}
//                                 onChange={(e) => setFromDate(e.target.value)}
//                                 size='xs'
//                                 sx={{ p: 1, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
//                             />
//                             <Input
//                                 type="date"
//                                 value={toDate}
//                                 onChange={(e) => setToDate(e.target.value)}
//                                 size='xs'
//                                 sx={{
//                                     p: 1,
//                                     backgroundColor: "rgba(175, 193, 210, 0.35)"
//                                 }}
//                                 slotProps={{
//                                     input: {
//                                         min: fromDate
//                                     }
//                                 }}
//                             />
//                         </Box>
//                     </Button>
//                 </ButtonGroup>
//             </Box>
//         </div>

//     )
// }

// export default memo(DateRangeCompAll) 