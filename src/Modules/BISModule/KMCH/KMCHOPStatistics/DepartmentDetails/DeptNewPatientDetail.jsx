import React, { useState, useEffect, memo } from 'react';
import { Box, Typography, Select, Option, Button, ButtonGroup } from '@mui/joy';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    format,
    startOfWeek,
    eachDayOfInterval,
    endOfMonth,
    startOfMonth,
} from 'date-fns';
import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Tooltip,
    Legend
);

// Constants
const allMonths = Array.from({ length: 12 }, (_, i) => new Date(0, i));
const currentYear = new Date().getFullYear();
const allYears = Array.from({ length: currentYear - 2006 + 1 }, (_, i) => 2006 + i);

// Generate dummy patient data
const generateData = (labels) => {
    return {
        labels,
        datasets: [
            {
                label: 'Patients',
                data: labels.map(() => Math.floor(Math.random() * 100)),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
};

const DeptNewPatientDetail = () => {
    const [filter, setFilter] = useState('year');
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [labels, setLabels] = useState([]);
    const [chartData, setChartData] = useState(null);  // ✅ chart data in state
    const [Chartlayout, seChartlayout] = useState(1);

    // Generate labels based on filter
    useEffect(() => {
        let newLabels = [];

        if (filter === 'lastWeek') {
            const start = startOfWeek(new Date(), { weekStartsOn: 1 });
            const end = new Date();
            newLabels = eachDayOfInterval({ start, end }).map(date =>
                format(date, 'EEE dd')
            );
        } else if (filter === 'month' && selectedMonth != null) {
            const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
            let end = endOfMonth(start);

            if (selectedYear === currentYear && selectedMonth === new Date().getMonth() + 1) {
                end = new Date(); // restrict to today
            }

            newLabels = eachDayOfInterval({ start, end }).map(date =>
                format(date, 'dd MMM')
            );
        } else if (filter === 'year') {
            if (selectedYear === currentYear) {
                const currentMonthIndex = new Date().getMonth();
                newLabels = allMonths
                    .slice(0, currentMonthIndex + 1)
                    .map(date => format(date, 'MMMM'));
            } else {
                newLabels = allMonths.map(date => format(date, 'MMMM'));
            }
        }

        setLabels(newLabels);
    }, [filter, selectedMonth, selectedYear]);

    // ✅ Update chart data whenever labels change
    useEffect(() => {
        if (labels.length > 0) {
            setChartData(generateData(labels));
        }
    }, [labels]);

    const transformToLineChartData = (data) => ({
        ...data,
        datasets: data.datasets.map(ds => ({ ...ds, fill: false, tension: 0.3 }))
    });

    const transformToPolarData = (data) => ({
        labels: data.labels,
        datasets: data.datasets.map(ds => ({
            label: ds.label,
            data: ds.data,
            backgroundColor: ds.backgroundColor
        }))
    });

    return (
        <Box sx={{ flex: 1, height: '100%', width: "100%" }}>
            <Box sx={{ mt: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                    }}
                >
                    <Box sx={{ border: 1, p: 2, borderColor: '#dbe0e9ff', flex: 1, minWidth: 0 }}>
                        <Typography sx={{ textAlign: 'center', fontSize: 20, color: 'rgba(var(--font-light))', mb: 1 }}>
                            New Patient Overview
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                p: 0,
                                mb: 3,
                            }}
                        >
                            {/* Filters Row */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {/* Filter Controls */}
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <ButtonGroup>
                                        <Button
                                            variant={filter === 'lastWeek' ? 'solid' : 'outlined'}
                                            onClick={() => setFilter('lastWeek')}
                                            sx={{ borderRadius: '20px' }}
                                        >
                                            Last Week
                                        </Button>
                                    </ButtonGroup>

                                    {/* Month Selector */}
                                    <Select
                                        placeholder="Choose Month"
                                        value={selectedMonth}
                                        onChange={(_, val) => {
                                            setSelectedMonth(val);
                                            setFilter('month');
                                        }}
                                        sx={{ minWidth: 160 }}
                                    >
                                        {(selectedYear === currentYear
                                            ? allMonths.slice(0, new Date().getMonth() + 1)
                                            : allMonths
                                        ).map((date, index) => (
                                            <Option key={index} value={index + 1}>
                                                {format(date, 'MMMM')}
                                            </Option>
                                        ))}
                                    </Select>

                                    {/* Year Selector */}
                                    <Select
                                        placeholder="Choose Year"
                                        value={selectedYear}
                                        onChange={(_, val) => {
                                            setSelectedYear(val);
                                            setFilter('year');
                                            setSelectedMonth(null);
                                        }}
                                        sx={{ minWidth: 120 }}
                                    >
                                        {allYears.map((year) => (
                                            <Option key={year} value={year}>
                                                {year}
                                            </Option>
                                        ))}
                                    </Select>
                                </Box>

                                {/* Graph Layout Switch */}
                                <Box>
                                    <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                                </Box>
                            </Box>
                        </Box>

                        {/* ✅ Show chart only if chartData exists */}
                        <Box sx={{ mt: 2, height: 400, width: '100%' }}>
                            {chartData && (
                                Chartlayout === 1 ? (
                                    <Bar data={chartData} options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            datalabels: {
                                                anchor: 'center',       // position
                                                align: 'end',        // position relative to bar
                                                rotation: -90,       // 🔥 rotate text vertically
                                                color: '#333',
                                                font: {
                                                    size: 12,
                                                    weight: 'bold',
                                                },
                                                formatter: (value) => value, // format value
                                            },
                                        },
                                    }} />
                                ) : Chartlayout === 2 ? (
                                    <Line data={transformToLineChartData(chartData)} options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            datalabels: {
                                                anchor: 'center',       // position
                                                align: 'end',        // position relative to bar
                                                rotation: -90,       // 🔥 rotate text vertically
                                                color: '#333',
                                                font: {
                                                    size: 12,
                                                    weight: 'bold',
                                                },
                                                formatter: (value) => value, // format value
                                            },
                                        },
                                    }} />
                                ) : (
                                    <PolarArea data={transformToPolarData(chartData)} options={{ responsive: true, maintainAspectRatio: false }} />
                                )
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(DeptNewPatientDetail);



// import React, { useState, useEffect, useMemo, memo } from 'react';
// import { Box, Typography, Select, Option, Button, ButtonGroup } from '@mui/joy';
// import { Bar, Line, PolarArea } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     RadialLinearScale,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import {
//     format,
//     startOfWeek,
//     eachDayOfInterval,
//     endOfMonth,
//     startOfMonth,
// } from 'date-fns';
// import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     LineElement,
//     PointElement,
//     RadialLinearScale,
//     Tooltip,
//     Legend
// );

// // Constants
// const allMonths = Array.from({ length: 12 }, (_, i) => new Date(0, i));
// const currentYear = new Date().getFullYear();
// const allYears = Array.from({ length: currentYear - 2006 + 1 }, (_, i) => 2006 + i);

// // Generate dummy patient data
// const generateData = (labels) => {
//     return {
//         labels,
//         datasets: [
//             {
//                 label: 'Patients',
//                 data: labels.map(() => Math.floor(Math.random() * 100)),
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//                 borderColor: 'rgba(53, 162, 235, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     };
// };

// const DeptNewPatientDetail = () => {

//     const [filter, setFilter] = useState('year');
//     const [selectedMonth, setSelectedMonth] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(currentYear);
//     const [labels, setLabels] = useState([]);
//     const [Chartlayout, seChartlayout] = useState(1);

//     // Generate labels based on filter
//     useEffect(() => {
//         let newLabels = [];

//         if (filter === 'lastWeek') {
//             const start = startOfWeek(new Date(), { weekStartsOn: 1 });
//             const end = new Date();
//             newLabels = eachDayOfInterval({ start, end }).map(date =>
//                 format(date, 'EEE dd')
//             );
//         } else if (filter === 'month' && selectedMonth != null) {
//             const start = startOfMonth(new Date(selectedYear, selectedMonth - 1));
//             let end = endOfMonth(start);

//             // ✅ If current year & current month → end = today
//             if (
//                 selectedYear === currentYear &&
//                 selectedMonth === new Date().getMonth() + 1
//             ) {
//                 end = new Date();
//             }

//             newLabels = eachDayOfInterval({ start, end }).map(date =>
//                 format(date, 'dd MMM')
//             );
//         } else if (filter === 'year') {
//             if (selectedYear === currentYear) {
//                 const currentMonthIndex = new Date().getMonth(); // 0 = Jan
//                 newLabels = allMonths
//                     .slice(0, currentMonthIndex + 1)
//                     .map(date => format(date, 'MMMM'));
//             } else {
//                 newLabels = allMonths.map(date => format(date, 'MMMM'));
//             }
//         }

//         setLabels(newLabels);
//     }, [filter, selectedMonth, selectedYear]);

//     const chartData = useMemo(() => generateData(labels), [labels]);

//     const transformToLineChartData = (data) => ({
//         ...data,
//         datasets: data.datasets.map(ds => ({ ...ds, fill: false, tension: 0.3 }))
//     });

//     const transformToPolarData = (data) => {
//         return {
//             labels: data.labels,
//             datasets: data.datasets.map(ds => ({
//                 label: ds.label,
//                 data: ds.data,
//                 backgroundColor: ds.backgroundColor
//             }))
//         };
//     };

//     return (
//         <Box sx={{ flex: 1, height: '100%', width: "100%" }}>
//             <Box sx={{ mt: 2 }}>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', md: 'row' },
//                         gap: 2,
//                     }}
//                 >
//                     <Box sx={{ border: 1, p: 2, borderColor: '#dbe0e9ff', flex: 1, minWidth: 0 }}>
//                         <Typography sx={{ textAlign: 'center', fontSize: 20, color: 'rgba(var(--font-light))', mb: 1 }}>
//                             New Patient Overview
//                         </Typography>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 gap: 2,
//                                 p: 0,
//                                 mb: 3,
//                             }}
//                         >
//                             {/* Filters Row */}
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     flexWrap: 'wrap',
//                                     gap: 2,
//                                     alignItems: 'center',
//                                     justifyContent: 'space-between',
//                                 }}
//                             >
//                                 {/* Filter Controls */}
//                                 <Box sx={{ display: 'flex', gap: 0., flexWrap: 'wrap', alignItems: 'center' }}>
//                                     <ButtonGroup>
//                                         <Button
//                                             variant={filter === 'lastWeek' ? 'solid' : 'outlined'}
//                                             onClick={() => setFilter('lastWeek')}
//                                             sx={{ borderRadius: '20px' }}
//                                         >
//                                             Last Week
//                                         </Button>
//                                     </ButtonGroup>

//                                     {/* Month Selector */}
//                                     <Select
//                                         placeholder="Choose Month"
//                                         value={selectedMonth}
//                                         onChange={(_, val) => {
//                                             setSelectedMonth(val);
//                                             setFilter('month');
//                                         }}
//                                         sx={{ minWidth: 160 }}
//                                     >
//                                         {(selectedYear === currentYear
//                                             ? allMonths.slice(0, new Date().getMonth() + 1) // ✅ only upto current month
//                                             : allMonths // ✅ all months for past years
//                                         ).map((date, index) => (
//                                             <Option key={index} value={index + 1}>
//                                                 {format(date, 'MMMM')}
//                                             </Option>
//                                         ))}
//                                     </Select>

//                                     {/* Year Selector */}
//                                     <Select
//                                         placeholder="Choose Year"
//                                         value={selectedYear}
//                                         onChange={(_, val) => {
//                                             setSelectedYear(val);
//                                             setFilter('year');
//                                             setSelectedMonth(null);
//                                         }}
//                                         sx={{ minWidth: 120 }}
//                                     >
//                                         {allYears.map((year) => (
//                                             <Option key={year} value={year}>
//                                                 {year}
//                                             </Option>
//                                         ))}
//                                     </Select>
//                                 </Box>

//                                 {/* Graph Layout Switch */}
//                                 <Box>
//                                     <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
//                                 </Box>
//                             </Box>
//                         </Box>

//                         <Box sx={{ mt: 2, height: 400, width: '100%' }}>
//                             {Chartlayout === 1 ? (
//                                 <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//                             ) : Chartlayout === 2 ? (
//                                 <Line data={transformToLineChartData(chartData)} options={{ responsive: true, maintainAspectRatio: false }} />
//                             ) : (
//                                 <PolarArea data={transformToPolarData(chartData)} options={{ responsive: true, maintainAspectRatio: false }} />
//                             )}
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default memo(DeptNewPatientDetail);



























































