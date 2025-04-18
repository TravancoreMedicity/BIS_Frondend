import React from 'react'

const RecycleBin = () => {
    return (
        <div> {/* Chart Display */}
            {/* <Box sx={{ mt: 2, width: '100%', height: 350, }}>
        {parseInt(Chartlayout) === 1 ? (
            <Box sx={{
                width: "100%",
                height: "100%",
                // display: "flex",
                // alignItems: "center", justifyContent: "center",
                overflow: "auto",
                // hoverBorderWidth: "160%"

            }}>

                <Bar data={chartData} options={barOptions} style={{ width: "100%" }} />
            </Box>

        ) : parseInt(Chartlayout) === 2 ? (

            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center", justifyContent: "center"
            }}>
                <Line
                    data={transformToLineChartData(chartData)}
                    options={lineOptions} style={{ width: '50%' }}
                />
            </Box>
        ) : parseInt(Chartlayout) === 3 ? (
            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center", justifyContent: "center"
            }}>
                <PolarArea
                    data={transformToPolarData(chartData)}
                    options={polarOptions} style={{ width: '50%' }}
                />
            </Box>

        ) : null}
    </Box> */}
        </div>
    )
}

export default RecycleBin

// import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
// import React, { memo, useCallback, useState, useEffect } from 'react';
// import { addDays, eachDayOfInterval, eachMonthOfInterval, endOfMonth, format, isWithinInterval, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
// import { Bar, Line, PolarArea } from 'react-chartjs-2'; // Import Line chart
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement, // Add LineElement
//     PointElement, // Add PointElement for line chart
//     Title,
//     Tooltip,
//     Legend,
//     RadialLinearScale, // Add this for polar area chart
//     ArcElement
// } from 'chart.js';
// import SelectGraphicalView from '../SelectGraphicalView';
// import { BarChart } from '@mui/x-charts';

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement, // Register LineElement
//     PointElement, // Register PointElement
//     Title,
//     Tooltip,
//     Legend,
//     RadialLinearScale,
//     ArcElement
// );

// const OverallSalesProgress = ({ Graphicaldata, Displaystyle }) => {
//     const StyleMode = parseInt(Displaystyle);

//     const [dayCount, setDayCount] = useState(1);
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');
//     const [chartData, setChartData] = useState(Graphicaldata);
//     const [Chartlayout, seChartlayout] = useState(StyleMode);

//     const Todays = format(new Date(), 'yyyy-MM-dd');
//     const StartOfcurrentMonth = format(startOfMonth(new Date()), "yyyy-MM-dd");
//     const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
//     const startOfLastWeek = subWeeks(startOfThisWeek, 1);
//     const endOfLastWeek = addDays(startOfLastWeek, 6);

//     // Function to filter data based on selected date range
//     // const filterDataByDateRange = (labels, data, dateRange) => {
//     //     if (dateRange.isRange) {
//     //         const { rangeStart, rangeEnd } = dateRange;
//     //         const filteredIndices = labels.map((label, index) => {
//     //             const labelDate = new Date(label);
//     //             return (labelDate >= rangeStart && labelDate <= rangeEnd) ? index : null;
//     //         }).filter(index => index !== null);

//     //         return {
//     //             labels: labels.filter((_, index) => filteredIndices.includes(index)),
//     //             datasets: data.datasets.map(dataset => ({
//     //                 ...dataset,
//     //                 data: filteredIndices.map(index => dataset.data[index]),
//     //             }))
//     //         };

//     //     }

//     //     // Handle exact date matches (original behavior for cases 1-3)
//     //     const filteredIndices = labels.map((label, index) =>
//     //         dateRange.includes(label) ? index : null
//     //     ).filter(index => index !== null);

//     //     return {
//     //         labels: labels.filter((_, index) => filteredIndices.includes(index)),
//     //         datasets: data.datasets.map(dataset => ({
//     //             ...dataset,
//     //             data: filteredIndices.map(index => dataset.data[index])
//     //         }))
//     //     };
//     // };
//     // const handlePeriodChange = useCallback((period) => {
//     //     setDayCount(period);
//     //     const now = new Date();
//     //     const periodHandlers = {
//     //         1: () => [Todays], // Today
//     //         2: () => eachDayOfInterval({ // Last Week
//     //             start: startOfLastWeek,
//     //             end: endOfLastWeek
//     //         }).map(date => format(date, 'yyyy-MM-dd')),
//     //         3: () => eachDayOfInterval({ // This Month
//     //             start: new Date(StartOfcurrentMonth),
//     //             end: now
//     //         }).map(date => format(date, 'yyyy-MM-dd')),
//     //         4: () => { // Last 6 Months
//     //             const sixMonthsAgo = subMonths(now, 5);
//     //             const startDate = startOfMonth(sixMonthsAgo);
//     //             return {
//     //                 rangeStart: startDate,
//     //                 rangeEnd: now,
//     //                 isRange: true
//     //             };
//     //         },
//     //         5: () => { // This Year
//     //             const yearStart = new Date(now.getFullYear(), 0, 1);
//     //             return {
//     //                 rangeStart: yearStart,
//     //                 rangeEnd: now,
//     //                 isRange: true
//     //             };
//     //         }
//     //     };

//     //     const dateRange = periodHandlers[period]?.() || [];

//     //     const filteredData = filterDataByDateRange(
//     //         Graphicaldata.labels,
//     //         Graphicaldata,
//     //         dateRange
//     //     );


//     //     setChartData(filteredData);
//     // }, [Todays, startOfLastWeek, endOfLastWeek, StartOfcurrentMonth, Graphicaldata]);

//     // // console.log("chartData", chartData);

//     // useEffect(() => {
//     //     if (fromDate && toDate) {
//     //         const startDate = new Date(fromDate);
//     //         const endDate = new Date(toDate);
//     //         const customDateRange = eachDayOfInterval({
//     //             start: startDate,
//     //             end: endDate
//     //         }).map(date => format(date, 'yyyy-MM-dd'));

//     //         const filteredData = filterDataByDateRange(
//     //             Graphicaldata.labels,
//     //             Graphicaldata,
//     //             customDateRange
//     //         );
//     //         setChartData(filteredData);
//     //     }
//     // }, [fromDate, toDate, Graphicaldata]);


//     const handlePeriodChange = (labels, data, dateRange) => {
//         // Handle range selections (like last 6 months)
//         if (dateRange.isRange) {
//             const { rangeStart, rangeEnd } = dateRange;

//             // For monthly ranges, we'll group by month
//             if (dayCount === 4 || dayCount === 5) { // Last 6 months or This Year
//                 const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });

//                 // Create month labels (e.g., "Jan 2023")
//                 const monthLabels = months.map(month => format(month, 'MMM yyyy'));

//                 // Initialize monthly sums for each dataset
//                 const monthlySums = data.datasets.map(dataset => {
//                     return months.map(month => {
//                         const monthStart = startOfMonth(month);
//                         const monthEnd = endOfMonth(month);

//                         // Sum all values within this month
//                         return labels.reduce((sum, label, index) => {
//                             const labelDate = new Date(label);
//                             if (isWithinInterval(labelDate, { start: monthStart, end: monthEnd })) {
//                                 return sum + (dataset.data[index] || 0);
//                             }
//                             return sum;
//                         }, 0);
//                     });
//                 });

//                 return {
//                     labels: monthLabels,
//                     datasets: data.datasets.map((dataset, i) => ({
//                         ...dataset,
//                         data: monthlySums[i]
//                     }))
//                 };
//             }

//             // For other ranges, filter daily data within the range
//             const filteredIndices = labels.map((label, index) => {
//                 const labelDate = new Date(label);
//                 return (labelDate >= rangeStart && labelDate <= rangeEnd) ? index : null;
//             }).filter(index => index !== null);

//             return {
//                 labels: labels.filter((_, index) => filteredIndices.includes(index)),
//                 datasets: data.datasets.map(dataset => ({
//                     ...dataset,
//                     data: filteredIndices.map(index => dataset.data[index]),
//                 }))
//             };
//         }

//         // Handle exact date matches (original behavior for cases 1-3)
//         const filteredIndices = labels.map((label, index) =>
//             dateRange.includes(label) ? index : null
//         ).filter(index => index !== null);

//         return {
//             labels: labels.filter((_, index) => filteredIndices.includes(index)),
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 data: filteredIndices.map(index => dataset.data[index])
//             }))
//         };
//     };



//     const polarOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             datalabels: {
//                 display: true,
//             },
//             tooltip: {
//                 enabled: true,
//             },
//             title: {
//                 display: false,
//                 text: 'Patient Details',
//             },
//         },
//         scales: {
//             r: {
//                 angleLines: {
//                     display: true,
//                 },
//                 ticks: {
//                     display: false,
//                 },
//                 grid: {
//                     display: true,
//                 },
//                 suggestedMin: 0,
//             },
//         },
//     };

//     // Bar chart options
//     const barOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         indexAxis: 'x',
//         scales: {
//             x: {
//                 beginAtZero: true,
//                 grid: {
//                     display: false
//                 },
//                 ticks: {
//                     autoSkip: false,
//                     // maxRotation: 45,
//                     // minRotation: 45
//                 },
//                 categoryPercentage: 0.8,
//                 barPercentage: 0.9,
//             },
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     display: true
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     boxWidth: 12
//                 }
//             },
//         },
//     };

//     // Line chart options
//     const lineOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 grid: {
//                     display: false
//                 },
//                 ticks: {
//                     autoSkip: false,
//                     // maxRotation: 45,
//                     // minRotation: 45
//                 }
//             },
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     display: true
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     boxWidth: 12
//                 }
//             },
//         }
//     };
//     // Transform Graphicaldata for line chart
//     const transformToLineChartData = (data) => {
//         return {
//             labels: data.labels,
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 borderColor: dataset.borderColor,
//                 backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'), // Make more transparent for line
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: false,
//                 pointRadius: 4,
//                 pointBackgroundColor: dataset.borderColor
//             }))
//         };
//     };

//     // Transform data for polar area chart
//     const transformToPolarData = (data) => {
//         const labels = data.datasets?.map((val) => val.label);
//         const summedData = data.datasets?.map((dataset) =>
//             dataset.data.reduce((sum, val) => sum + val, 0)
//         );
//         return {
//             labels,
//             datasets: [
//                 {
//                     data: summedData,
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.5)',
//                         'rgba(54, 162, 235, 0.5)',
//                         'rgba(255, 206, 86, 0.5)',
//                         'rgba(75, 192, 192, 0.5)',
//                         'rgba(153, 102, 255, 0.5)',
//                         'rgba(255, 159, 64, 0.5)',
//                     ],
//                     borderWidth: 1,
//                 },
//             ],
//         };
//     };

//     // console.log(chartData.labels.length * 20);

//     return (
//         <Box sx={{
//             width: { xs: '100%', sm: '100%', md: 700, lg: "100%" },
//             overflow: "auto"
//         }}>
//             {/* Date Range Selector */}
//             <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
//                 <ButtonGroup aria-label="date range selector" sx={{ '--ButtonGroup-radius': '30px', display: "flex", flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm" }}>
//                     {['Today', 'Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
//                         <Button key={label} onClick={() => handlePeriodChange(index + 1)}>
//                             {index === 5 ? (
//                                 <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                     <Input
//                                         type="date"
//                                         value={fromDate}
//                                         onChange={(e) => setFromDate(e.target.value)}
//                                         size='xs'
//                                         sx={{ p: 0.5, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
//                                     />
//                                     <Input
//                                         type="date"
//                                         value={toDate}
//                                         onChange={(e) => setToDate(e.target.value)}
//                                         size='xs'
//                                         sx={{ p: 0.5, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
//                                         slotProps={{ input: { min: fromDate } }}
//                                     />
//                                 </Box>
//                             ) : (
//                                 <Typography sx={{
//                                     fontSize: 11,
//                                     color: "rgba(var(--input-font-color))",
//                                     '&:hover': {
//                                         color: 'rgba(var(--font-black))',
//                                         backgroundColor: 'transparent',
//                                     }
//                                 }}>{label}</Typography>
//                             )}
//                         </Button>
//                     ))}
//                 </ButtonGroup>
//             </Box>

//             <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
//                 <Box sx={{ mt: 2, }}>
//                     <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
//                 </Box>
//             </Box>



//             {/* Chart Display */}
//             <Box sx={{
//                 mt: 2,
//                 width: '100%',
//                 height: 350,
//             }}>

//                 {parseInt(Chartlayout) === 1 ? (
//                     <Box sx={{
//                         width: "100%",
//                         height: "100%",
//                         overflow: "auto",
//                         overflow: "scroll", '&::-webkit-scrollbar': {
//                             height: 5
//                         }, gap: 2,
//                         cursor: "pointer"
//                     }}>
//                         <BarChart
//                             series={chartData.datasets.map(dataset => ({
//                                 data: dataset.data,
//                                 label: dataset.label,
//                             }))}
//                             xAxis={[{
//                                 scaleType: "band",
//                                 data: chartData.labels,
//                                 tickLabelStyle: {
//                                     textAnchor: 'start',
//                                     fontSize: 10,
//                                     textAlign: "center"
//                                 },
//                             }]}
//                             height={350}
//                             colors={['rgba(96, 94, 163, 0.50)', 'rgba(12, 132, 162, 0.50)', 'rgba(184, 62, 143, 0.48)']}
//                             slotProps={{
//                                 legend: {
//                                     direction: 'row',
//                                     position: {
//                                         vertical: 'top',
//                                         horizontal: 'middle'
//                                     },
//                                 },

//                             }}
//                         />
//                     </Box>

//                 ) : parseInt(Chartlayout) === 2 ? (
//                     <Box sx={{
//                         width: "100%",
//                         height: "100%",
//                         overflowX: "auto",
//                         overflowY: "hidden",
//                         minWidth: `${Math.max(
//                             chartData?.labels?.length * 60,
//                             800
//                         )}px`,
//                         '&::-webkit-scrollbar': {
//                             height: '6px',
//                         }
//                     }}>
//                         <Line
//                             data={transformToLineChartData(chartData)}
//                             options={{
//                                 ...lineOptions,
//                                 maintainAspectRatio: false
//                             }}
//                             height={350}
//                         />
//                     </Box>

//                 ) : parseInt(Chartlayout) === 3 ? (
//                     <Box sx={{
//                         width: "100%",
//                         height: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center"
//                     }}>
//                         <PolarArea
//                             data={transformToPolarData(chartData)}
//                             options={polarOptions}
//                             height={300}
//                             width={300}
//                         />
//                     </Box>
//                 ) : null}
//             </Box>
//         </Box>
//     );
// };

// export default memo(OverallSalesProgress);


// ******************************mainpage*************************
import { Box, Button, ButtonGroup, IconButton, Input, Typography } from '@mui/joy';
// import React, { memo, useCallback, useState, useEffect } from 'react';
// import { addDays, eachDayOfInterval, format, startOfMonth, startOfWeek, subMonths, subWeeks } from "date-fns";
// import { Bar, Line, PolarArea } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     RadialLinearScale,
//     ArcElement
// } from 'chart.js';
// import SelectGraphicalView from '../SelectGraphicalView';

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     RadialLinearScale,
//     ArcElement
// );

// const MainGraph = ({ Graphicaldata, chartItems, Displaystyle, DisplayData }) => {
//     const StyleMode = parseInt(Displaystyle);
//     const [dayCount, setDayCount] = useState(1);
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');
//     const [chartData, setChartData] = useState(DisplayData);
//     const [Chartlayout, seChartlayout] = useState(StyleMode);

//     const Todays = format(new Date(), 'yyyy-MM-dd');
//     const StartOfcurrentMonth = format(startOfMonth(new Date()), "yyyy-MM-dd");
//     const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
//     const startOfLastWeek = subWeeks(startOfThisWeek, 1);
//     const endOfLastWeek = addDays(startOfLastWeek, 6);


//     // Function to filter data based on selected date range
//     const filterDataByDateRange = (labels, data, dateRange) => {
//         const filteredIndices = labels.map((label, index) =>
//             dateRange.includes(label) ? index : null
//         ).filter(index => index !== null);

//         return {
//             labels: labels.filter(label => dateRange.includes(label)),
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 data: filteredIndices.map(index => dataset.data[index])
//             }))
//         };
//     };
//     const handlePeriodChange = useCallback((period) => {
//         setDayCount(period);

//         const now = new Date();

//         const periodHandlers = {
//             1: () => [Todays],
//             2: () => eachDayOfInterval({
//                 start: startOfLastWeek,
//                 end: endOfLastWeek
//             }).map(date => format(date, 'yyyy-MM-dd')),
//             3: () => eachDayOfInterval({
//                 start: new Date(StartOfcurrentMonth),
//                 end: now
//             }).map(date => format(date, 'yyyy-MM-dd')),
//             4: () => Array.from({ length: 6 }, (_, i) =>
//                 format(subMonths(now, 5 - i), 'yyyy-MM-dd')),
//             5: () => {
//                 const monthsInYear = Array.from({ length: 12 }, (_, i) =>
//                     new Date(now.getFullYear(), i, 1));
//                 return monthsInYear
//                     .filter(month => month <= now)
//                     .map(month => format(month, 'yyyy-MM-dd'));
//             }
//         };
//         const dateRange = periodHandlers[period]?.() || [];
//         const filteredData = filterDataByDateRange(
//             DisplayData.labels,
//             DisplayData,
//             dateRange
//         );
//         setChartData(filteredData);
//     }, [Todays, startOfLastWeek, endOfLastWeek, StartOfcurrentMonth, Graphicaldata, DisplayData]);

//     useEffect(() => {
//         if (fromDate && toDate) {
//             const startDate = new Date(fromDate);
//             const endDate = new Date(toDate);
//             const customDateRange = eachDayOfInterval({
//                 start: startDate,
//                 end: endDate
//             }).map(date => format(date, 'yyyy-MM-dd'));

//             const filteredData = filterDataByDateRange(
//                 DisplayData.labels,
//                 DisplayData,
//                 customDateRange
//             );
//             setChartData(filteredData);
//         }
//     }, [fromDate, toDate, Graphicaldata, DisplayData]);

//     // Bar chart options
//     const barOptions = {
//         responsive: true,
//         indexAxis: 'x',
//         scales: {
//             x: { beginAtZero: true },
//             y: { beginAtZero: true },
//         },
//         plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Out Patient Statistics' },
//         },
//     };

//     // Line chart options
//     const lineOptions = {
//         responsive: true,
//         scales: {
//             x: { beginAtZero: true },
//             y: { beginAtZero: true },
//         },
//         plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Out Patient Trends' },
//         },
//     };

//     // Transform Graphicaldata for line chart
//     const transformToLineChartData = (data) => {
//         return {
//             labels: data.labels,
//             datasets: data.datasets.map(dataset => ({
//                 ...dataset,
//                 borderColor: dataset.borderColor,
//                 backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'), // Make more transparent for line
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: false,
//                 pointRadius: 4,
//                 pointBackgroundColor: dataset.borderColor
//             }))
//         };
//     };

//     //Polar Area Functions
//     const polarOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top', // Position of the legend
//             },
//             datalabels: {
//                 display: true, // Show the data labels on the chart
//             },
//             tooltip: {
//                 enabled: true, // Enable tooltips for values on hover
//             },
//             title: {
//                 display: true,
//                 text: 'Patient Details',
//             },
//         },
//         scales: {
//             r: {
//                 angleLines: {
//                     display: true, // Keep the angle lines (axes) visible
//                 },
//                 ticks: {
//                     display: false, // Hide the ticks (numbers/counts) on the radial axis
//                 },
//                 grid: {
//                     display: true, // Optionally, hide the gridlines if you don't want them
//                 },
//                 suggestedMin: 0, // Minimum value for the radial scale
//             },
//         },
//     };

//     // Transform data for polar area chart
//     const transformToPolarData = (data) => {
//         const labels = data.datasets?.map((val) => val.label);
//         const summedData = data.datasets?.map((dataset) =>
//             dataset.data.reduce((sum, val) => sum + val, 0)
//         );
//         return {
//             labels,
//             datasets: [
//                 {
//                     // label: 'cout',
//                     data: summedData,
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.5)',
//                         'rgba(54, 162, 235, 0.5)',
//                         'rgba(255, 206, 86, 0.5)',
//                         'rgba(75, 192, 192, 0.5)',
//                         'rgba(153, 102, 255, 0.5)',
//                         'rgba(255, 159, 64, 0.5)',
//                     ],
//                     borderWidth: 1,
//                 },
//             ],
//         };
//     };
//     const CenteredChart = ({ children }) => (
//         <Box
//             sx={{
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center"
//             }}
//         >
//             {children}
//         </Box>
//     );

//     //Section wise chart
//     const DisplayDatas = {
//         labels: ['2025-04-01', '2025-04-02', '2025-04-03'],
//         datasets: [
//             {
//                 label: 'MRI - IP',
//                 data: [10, 12, 8],
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 borderColor: 'rgba(255, 99, 132, 1)',
//             },
//             {
//                 label: 'MRI - OP',
//                 data: [20, 25, 23],
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             },
//             {
//                 label: 'MRI - Billing',
//                 data: [20, 25, 23],
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             },
//             {
//                 label: 'MRI - Return',
//                 data: [18, 10, 40],
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             },
//             {
//                 label: 'CT Scan - IP',
//                 data: [15, 13, 17],
//                 backgroundColor: 'rgba(255, 206, 86, 0.5)',
//                 borderColor: 'rgba(255, 206, 86, 1)',
//             },
//             {
//                 label: 'CT Scan - OP',
//                 data: [22, 20, 25],
//                 backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//             },
//             {
//                 label: 'CT - Billing',
//                 data: [24, 35, 12],
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             },
//             {
//                 label: 'CT - Return',
//                 data: [19, 40, 25],
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//             },]
//     };


//     // const GetChart = useCallback((item) => {
//     //     const filtered = {
//     //         labels: DisplayDatas.labels,
//     //         datasets: DisplayDatas.datasets.filter(ds => ds.label.startsWith(item.label))
//     //     };
//     //     setChartData(filtered);
//     // }, [DisplayData]);
//     // console.log(DisplayData);


//     return (
//         <Box sx={{
//             width: '100%',
//             overflow: "auto",
//         }}>
//             {/* Date Range Selector */}
//             <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1, }}>
//                 <ButtonGroup aria-label="date range selector" sx={{ '--ButtonGroup-radius': '30px', display: "flex", flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm" }}>
//                     {['Today', 'Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
//                         <Button key={label} onClick={() => handlePeriodChange(index + 1)}>
//                             {index === 5 ? (
//                                 <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                     <Input
//                                         type="date"
//                                         value={fromDate}
//                                         onChange={(e) => setFromDate(e.target.value)}
//                                         size='xs'
//                                         sx={{ p: 0.5, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
//                                     />
//                                     <Input
//                                         type="date"
//                                         value={toDate}
//                                         onChange={(e) => setToDate(e.target.value)}
//                                         size='xs'
//                                         sx={{ p: 0.5, backgroundColor: "rgba(175, 193, 210, 0.35)" }}
//                                         slotProps={{ input: { min: fromDate } }}
//                                     />
//                                 </Box>
//                             ) : (
//                                 <Typography sx={{
//                                     fontSize: 11,
//                                     color: "rgba(var(--input-font-color))",
//                                     '&:hover': {
//                                         color: 'rgba(var(--font-black))',
//                                         backgroundColor: 'transparent',
//                                     }
//                                 }}>{label}</Typography>
//                             )}
//                         </Button>
//                     ))}
//                 </ButtonGroup>
//             </Box>

//             <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
//                 <Box sx={{ mt: 2, }}>
//                     <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
//                 </Box>
//             </Box>

//             {/* Chart Display */}
//             <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: { sm: "wrap", xl: "nowrap" } }}>
//                 {/* Radio Group */}
//                 {/* <Box sx={{ mt: 2, minWidth: 250, height: { xl: 350, sm: 180 }, overflow: "auto", px: 2 }}>
//                     <Box sx={{ border: 1, p: 1, borderColor: 'rgba(128, 121, 121, 0.5)', borderRadius: 5 }}>
//                         {chartItems?.map((item, index) => (
//                             <Box key={index} sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//                                 <IconButton>
//                                     {item?.icon}
//                                 </IconButton>
//                                 <Typography
//                                     sx={{ mt: 1, color: item.color, fontWeight: "bold", cursor: "pointer" }}
//                                     onClick={() => GetChart(item)}
//                                 >
//                                     {item?.label}
//                                 </Typography>
//                             </Box>
//                         ))}
//                     </Box>
//                 </Box> */}
//                 {/* Chart Area */}
//                 <Box sx={{ mt: 1, width: '100%', height: 350, overflow: "auto", }}>
//                     {parseInt(Chartlayout) === 1 ? (
//                         <CenteredChart>
//                             <Bar data={chartData} options={barOptions} style={{ width: '100%' }} />
//                         </CenteredChart>
//                     ) : parseInt(Chartlayout) === 2 ? (
//                         <CenteredChart>
//                             <Line data={transformToLineChartData(chartData)} options={lineOptions} style={{ width: '50%' }} />
//                         </CenteredChart>
//                     ) : parseInt(Chartlayout) === 3 ? (
//                         <CenteredChart>
//                             <PolarArea data={transformToPolarData(chartData)} options={polarOptions} style={{ width: '50%' }} />
//                         </CenteredChart>
//                     ) : null}
//                 </Box>
//             </Box>
//         </Box >
//     );
// };
// export default memo(MainGraph) 