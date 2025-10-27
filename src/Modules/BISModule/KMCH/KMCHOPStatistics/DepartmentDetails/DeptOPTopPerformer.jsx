import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import {
    format,
    subWeeks,
    startOfWeek,
    endOfMonth,
    startOfMonth,
    subMonths,
} from 'date-fns';
import React, { memo, useEffect, useState } from 'react';
import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';
import { Bar, Line, PolarArea } from 'react-chartjs-2';


const DeptOPTopPerformer = ({ docList, chartData, setChartData }) => {

    const [Chartlayout, seChartlayout] = useState(1);
    const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    // const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const handlePeriodChange = (option) => {
        let start, end = new Date();

        switch (option) {
            case 2: // Last Week
                start = startOfWeek(subWeeks(new Date(), 1));
                end = new Date();
                break;
            case 3: // This Month
                start = startOfMonth(new Date());
                end = endOfMonth(new Date());
                break;
            case 4: // Last 6 months
                start = subMonths(new Date(), 6);
                break;
            case 5: // This Year
                start = new Date(new Date().getFullYear(), 0, 1);
                break;
            default:
                start = new Date(fromDate);
                end = new Date(toDate);
        }

        const filtered = docList.filter(doc => {
            const date = new Date(doc.consultDate);
            return date >= start && date <= end;
        });

        const groupByDoctor = filtered.reduce((acc, curr) => {
            if (!acc[curr.drName]) {
                acc[curr.drName] = { totalIP: 0, TotalOP: 0 };
            }
            acc[curr.drName].totalIP += curr.totalIP;
            acc[curr.drName].TotalOP += curr.TotalOP;
            return acc;
        }, {});

        const sortedDoctors = Object.entries(groupByDoctor).sort(
            ([, a], [, b]) => b.TotalOP - a.TotalOP
        );

        const labels = sortedDoctors.map(([name]) => name);
        const OPData = sortedDoctors.map(([, data]) => data.TotalOP);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'OP',
                    data: OPData,
                    backgroundColor: 'rgba(159, 68, 186, 0.6)',
                },
            ]
        });
    };

    useEffect(() => {
        handlePeriodChange(2); // default to Last Week
    }, []);

    const transformToLineChartData = (data) => ({
        ...data,
        datasets: data.datasets.map(ds => ({ ...ds, fill: false, tension: 0.3 }))
    });

    const transformToPolarData = (data) => {
        return {
            labels: data.labels,
            datasets: data.datasets.map(ds => ({
                label: ds.label,
                data: ds.data,
                backgroundColor: ds.backgroundColor
            }))
        };
    };

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
                            Top Performer- OP
                        </Typography>

                        <ButtonGroup
                            aria-label="date range selector"
                            sx={{ '--ButtonGroup-radius': '30px', display: 'flex', flexWrap: { sm: 'wrap', xl: 'nowrap' }, p: 0, size: 'sm' }}
                        >
                            {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                                <Button key={label} onClick={() => handlePeriodChange(index + 2)}>
                                    {index === 4 ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                            <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} size="xs" sx={{ p: 0.5, color: 'grey' }} />
                                            <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} size="xs" sx={{ p: 0.5, color: 'grey' }} slotProps={{ input: { min: fromDate } }} />
                                        </Box>
                                    ) : (
                                        <Typography sx={{ fontSize: 11, color: 'rgba(var(--input-font-color))' }}>{label}</Typography>
                                    )}
                                </Button>
                            ))}
                        </ButtonGroup>

                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                        </Box>

                        <Box sx={{ mt: 2, height: 400, width: '100%' }}>
                            {Chartlayout === 1 ? (
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
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(DeptOPTopPerformer);




// import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
// import {
//     format,
//     subWeeks,
//     startOfWeek,
//     endOfMonth,
//     startOfMonth,
//     subMonths,
// } from 'date-fns';
// import React, { memo, useEffect, useState } from 'react';
// import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';
// import { Bar, Line, PolarArea } from 'react-chartjs-2';

// const docList = [
//     { drCode: 1, drName: "Dr. Amal", consultDate: "2025-07-20", totalIP: 8, TotalOP: 18 },
//     { drCode: 1, drName: "Dr. Amal", consultDate: "2025-07-22", totalIP: 10, TotalOP: 22 },
//     { drCode: 1, drName: "Dr. Amal", consultDate: "2025-07-24", totalIP: 9, TotalOP: 20 },
//     { drCode: 1, drName: "Dr. Amal", consultDate: "2025-07-26", totalIP: 11, TotalOP: 25 },
//     { drCode: 1, drName: "Dr. Amal", consultDate: "2025-07-28", totalIP: 7, TotalOP: 15 },

//     { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-07-21", totalIP: 12, TotalOP: 23 },
//     { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-07-23", totalIP: 14, TotalOP: 28 },
//     { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-07-25", totalIP: 13, TotalOP: 26 },
//     { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-07-27", totalIP: 10, TotalOP: 20 },
//     { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-07-29", totalIP: 9, TotalOP: 19 },

//     { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-07-20", totalIP: 6, TotalOP: 14 },
//     { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-07-22", totalIP: 8, TotalOP: 16 },
//     { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-07-24", totalIP: 7, TotalOP: 15 },
//     { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-07-26", totalIP: 6, TotalOP: 13 },
//     { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-07-28", totalIP: 9, TotalOP: 17 },

//     { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-07-21", totalIP: 10, TotalOP: 22 },
//     { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-07-23", totalIP: 11, TotalOP: 21 },
//     { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-07-25", totalIP: 12, TotalOP: 24 },
//     { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-07-27", totalIP: 9, TotalOP: 18 },
//     { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-07-29", totalIP: 8, TotalOP: 17 },

//     { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-07-20", totalIP: 7, TotalOP: 16 },
//     { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-07-22", totalIP: 8, TotalOP: 19 },
//     { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-07-24", totalIP: 6, TotalOP: 14 },
//     { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-07-26", totalIP: 9, TotalOP: 20 },
//     { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-07-28", totalIP: 7, TotalOP: 18 },

//     { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-07-21", totalIP: 13, TotalOP: 26 },
//     { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-07-23", totalIP: 10, TotalOP: 21 },
//     { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-07-25", totalIP: 12, TotalOP: 24 },
//     { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-07-27", totalIP: 9, TotalOP: 19 },
//     { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-07-29", totalIP: 11, TotalOP: 22 },

//     { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-07-20", totalIP: 5, TotalOP: 13 },
//     { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-07-22", totalIP: 6, TotalOP: 14 },
//     { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-07-24", totalIP: 7, TotalOP: 15 },
//     { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-07-26", totalIP: 8, TotalOP: 17 },
//     { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-07-28", totalIP: 6, TotalOP: 12 },

//     { drCode: 8, drName: "Dr. Hari", consultDate: "2025-07-21", totalIP: 9, TotalOP: 20 },
//     { drCode: 8, drName: "Dr. Hari", consultDate: "2025-07-23", totalIP: 10, TotalOP: 22 },
//     { drCode: 8, drName: "Dr. Hari", consultDate: "2025-07-25", totalIP: 11, TotalOP: 23 },
//     { drCode: 8, drName: "Dr. Hari", consultDate: "2025-07-27", totalIP: 8, TotalOP: 18 },
//     { drCode: 8, drName: "Dr. Hari", consultDate: "2025-07-29", totalIP: 10, TotalOP: 21 },

//     { drCode: 9, drName: "Dr. Indu", consultDate: "2025-07-20", totalIP: 10, TotalOP: 21 },
//     { drCode: 9, drName: "Dr. Indu", consultDate: "2025-07-22", totalIP: 9, TotalOP: 19 },
//     { drCode: 9, drName: "Dr. Indu", consultDate: "2025-07-24", totalIP: 8, TotalOP: 17 },
//     { drCode: 9, drName: "Dr. Indu", consultDate: "2025-07-26", totalIP: 10, TotalOP: 20 },
//     { drCode: 9, drName: "Dr. Indu", consultDate: "2025-07-28", totalIP: 9, TotalOP: 18 },

//     { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-07-21", totalIP: 12, TotalOP: 26 },
//     { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-07-23", totalIP: 11, TotalOP: 24 },
//     { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-07-25", totalIP: 10, TotalOP: 22 },
//     { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-07-27", totalIP: 13, TotalOP: 27 },
//     { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-07-29", totalIP: 11, TotalOP: 23 }
// ];


// const DeptOPTopPerformer = () => {
//     const [Chartlayout, seChartlayout] = useState(1);
//     const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
//     const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//     const handlePeriodChange = (option) => {
//         let start, end = new Date();

//         switch (option) {
//             case 2: // Last Week
//                 start = startOfWeek(subWeeks(new Date(), 1));
//                 end = new Date();
//                 break;
//             case 3: // This Month
//                 start = startOfMonth(new Date());
//                 end = endOfMonth(new Date());
//                 break;
//             case 4: // Last 6 months
//                 start = subMonths(new Date(), 6);
//                 break;
//             case 5: // This Year
//                 start = new Date(new Date().getFullYear(), 0, 1);
//                 break;
//             default:
//                 start = new Date(fromDate);
//                 end = new Date(toDate);
//         }

//         const filtered = docList.filter(doc => {
//             const date = new Date(doc.consultDate);
//             return date >= start && date <= end;
//         });

//         const groupByDoctor = filtered.reduce((acc, curr) => {
//             if (!acc[curr.drName]) {
//                 acc[curr.drName] = { totalIP: 0, TotalOP: 0 };
//             }
//             acc[curr.drName].totalIP += curr.totalIP;
//             acc[curr.drName].TotalOP += curr.TotalOP;
//             return acc;
//         }, {});

//         // ✅ Correct sorting by TotalOP descending
//         const sortedDoctors = Object.entries(groupByDoctor).sort(
//             ([, a], [, b]) => b.TotalOP - a.TotalOP
//         );

//         const labels = sortedDoctors.map(([name]) => name);
//         const IPData = sortedDoctors.map(([, data]) => data.totalIP);
//         const OPData = sortedDoctors.map(([, data]) => data.TotalOP);

//         setChartData({
//             labels,
//             datasets: [
//                 // Uncomment to show IP too
//                 // {
//                 //     label: 'IP',
//                 //     data: IPData,
//                 //     backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 // },
//                 {
//                     label: 'OP',
//                     data: OPData,
//                     backgroundColor: 'rgba(153, 102, 255, 0.6)',
//                 }
//             ]
//         });
//     };


//     useEffect(() => {
//         handlePeriodChange(2); // default to Last Week
//     }, []);

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
//                             Top Performer- OP
//                         </Typography>

//                         <ButtonGroup
//                             aria-label="date range selector"
//                             sx={{ '--ButtonGroup-radius': '30px', display: 'flex', flexWrap: { sm: 'wrap', xl: 'nowrap' }, p: 0, size: 'sm' }}
//                         >
//                             {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
//                                 <Button key={label} onClick={() => handlePeriodChange(index + 2)}>
//                                     {index === 4 ? (
//                                         <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
//                                             <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} size="xs" sx={{ p: 0.5, color: 'grey' }} />
//                                             <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} size="xs" sx={{ p: 0.5, color: 'grey' }} slotProps={{ input: { min: fromDate } }} />
//                                         </Box>
//                                     ) : (
//                                         <Typography sx={{ fontSize: 11, color: 'rgba(var(--input-font-color))' }}>{label}</Typography>
//                                     )}
//                                 </Button>
//                             ))}
//                         </ButtonGroup>

//                         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//                             <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
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

// export default memo(DeptOPTopPerformer);




