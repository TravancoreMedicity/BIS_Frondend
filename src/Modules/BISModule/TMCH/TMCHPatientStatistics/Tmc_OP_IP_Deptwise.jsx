import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import {
    addDays, format,
    startOfMonth, startOfWeek, subMonths, subWeeks
} from "date-fns";
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend, RadialLinearScale, ArcElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from 'react-router-dom';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import CommonDateComp from '../../BIS_CommoCode/CommonDateRange/CommonDateComp';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    RadialLinearScale,
    ArcElement
);
const departmentDetails = [
    { dept_id: 1, dept_name: "General Surgery", visit_date: "2025-05-01", TotalIp: 100, TotalOP: 120 },
    { dept_id: 2, dept_name: "Cardiology", visit_date: "2025-05-01", TotalIp: 80, TotalOP: 100 },
    { dept_id: 3, dept_name: "Dermatology", visit_date: "2025-07-25", TotalIp: 60, TotalOP: 70 },
    { dept_id: 4, dept_name: "ENT", visit_date: "2025-07-24", TotalIp: 90, TotalOP: 110 },
    { dept_id: 5, dept_name: "Neurology", visit_date: "2025-07-23", TotalIp: 70, TotalOP: 90 },
    { dept_id: 6, dept_name: "Orthopedics", visit_date: "2025-07-01", TotalIp: 60, TotalOP: 100 },
    { dept_id: 7, dept_name: "Urology", visit_date: "2025-07-01", TotalIp: 85, TotalOP: 110 },
    { dept_id: 8, dept_name: "Nephrology", visit_date: "2025-07-01", TotalIp: 95, TotalOP: 120 },
    { dept_id: 9, dept_name: "Oncology", visit_date: "2025-07-01", TotalIp: 110, TotalOP: 150 },
    { dept_id: 10, dept_name: "Gastroenterology", visit_date: "2025-07-01", TotalIp: 70, TotalOP: 85 },
    { dept_id: 11, dept_name: "Pulmonology", visit_date: "2025-06-30", TotalIp: 88, TotalOP: 110 },
    { dept_id: 12, dept_name: "Psychiatry", visit_date: "2025-06-28", TotalIp: 76, TotalOP: 95 },
    { dept_id: 13, dept_name: "Endocrinology", visit_date: "2025-07-01", TotalIp: 65, TotalOP: 80 },
    { dept_id: 14, dept_name: "Hematology", visit_date: "2025-07-01", TotalIp: 92, TotalOP: 110 },
    { dept_id: 15, dept_name: "Plastic Surgery", visit_date: "2025-07-01", TotalIp: 58, TotalOP: 75 },
    { dept_id: 16, dept_name: "Rheumatology", visit_date: "2025-06-25", TotalIp: 63, TotalOP: 85 },
    { dept_id: 17, dept_name: "Pediatrics", visit_date: "2025-06-20", TotalIp: 55, TotalOP: 65 },
    { dept_id: 18, dept_name: "Ophthalmology", visit_date: "2025-06-15", TotalIp: 72, TotalOP: 90 },
    { dept_id: 19, dept_name: "Geriatrics", visit_date: "2025-06-10", TotalIp: 66, TotalOP: 80 },
    { dept_id: 20, dept_name: "Immunology", visit_date: "2025-06-05", TotalIp: 105, TotalOP: 120 },
    { dept_id: 21, dept_name: "Anesthesiology", visit_date: "2025-06-01", TotalIp: 77, TotalOP: 90 },
    { dept_id: 22, dept_name: "Radiology", visit_date: "2025-05-28", TotalIp: 82, TotalOP: 100 },
    { dept_id: 23, dept_name: "Emergency", visit_date: "2025-05-25", TotalIp: 99, TotalOP: 130 },
    { dept_id: 24, dept_name: "Pathology", visit_date: "2025-05-20", TotalIp: 68, TotalOP: 85 },
    { dept_id: 25, dept_name: "Microbiology", visit_date: "2025-05-15", TotalIp: 61, TotalOP: 80 },
    { dept_id: 26, dept_name: "Biochemistry", visit_date: "2025-05-10", TotalIp: 74, TotalOP: 90 },
    { dept_id: 27, dept_name: "Forensic Medicine", visit_date: "2025-05-05", TotalIp: 80, TotalOP: 100 },
    { dept_id: 28, dept_name: "Rehabilitation", visit_date: "2025-04-30", TotalIp: 67, TotalOP: 85 },
    { dept_id: 29, dept_name: "Dentistry", visit_date: "2025-04-25", TotalIp: 53, TotalOP: 60 },
    { dept_id: 30, dept_name: "Occupational Therapy", visit_date: "2025-04-20", TotalIp: 64, TotalOP: 80 },
    { dept_id: 31, dept_name: "Speech Therapy", visit_date: "2025-07-01", TotalIp: 40, TotalOP: 55 },
    { dept_id: 32, dept_name: "Nutrition", visit_date: "2025-07-01", TotalIp: 45, TotalOP: 60 },
    { dept_id: 33, dept_name: "Pain Management", visit_date: "2025-07-01", TotalIp: 60, TotalOP: 80 },
    { dept_id: 34, dept_name: "Genetics", visit_date: "2025-07-01", TotalIp: 55, TotalOP: 70 },
    { dept_id: 35, dept_name: "Infectious Diseases", visit_date: "2025-06-30", TotalIp: 70, TotalOP: 90 },
    { dept_id: 36, dept_name: "Burn Unit", visit_date: "2025-06-25", TotalIp: 90, TotalOP: 110 },
    { dept_id: 37, dept_name: "Intensive Care", visit_date: "2025-06-20", TotalIp: 120, TotalOP: 150 },
    { dept_id: 38, dept_name: "Sports Medicine", visit_date: "2025-06-15", TotalIp: 66, TotalOP: 80 },
    { dept_id: 39, dept_name: "Sleep Medicine", visit_date: "2025-06-10", TotalIp: 48, TotalOP: 60 },
    { dept_id: 40, dept_name: "Hepatology", visit_date: "2025-06-05", TotalIp: 85, TotalOP: 100 },
    { dept_id: 41, dept_name: "Toxicology", visit_date: "2025-07-01", TotalIp: 50, TotalOP: 65 },
    { dept_id: 42, dept_name: "Transplant Surgery", visit_date: "2025-06-30", TotalIp: 58, TotalOP: 75 },
    { dept_id: 43, dept_name: "Clinical Pharmacology", visit_date: "2025-06-28", TotalIp: 60, TotalOP: 80 },
    { dept_id: 44, dept_name: "Occupational Health", visit_date: "2025-06-25", TotalIp: 45, TotalOP: 62 },
    { dept_id: 45, dept_name: "Palliative Care", visit_date: "2025-06-22", TotalIp: 70, TotalOP: 90 },
    { dept_id: 46, dept_name: "Nuclear Medicine", visit_date: "2025-06-18", TotalIp: 52, TotalOP: 68 },
    { dept_id: 47, dept_name: "Allergy & Immunology", visit_date: "2025-06-15", TotalIp: 63, TotalOP: 85 },
    { dept_id: 48, dept_name: "Medical Imaging", visit_date: "2025-06-10", TotalIp: 78, TotalOP: 92 },
    { dept_id: 49, dept_name: "Reproductive Medicine", visit_date: "2025-06-08", TotalIp: 55, TotalOP: 73 },
    { dept_id: 50, dept_name: "Hyperbaric Medicine", visit_date: "2025-06-05", TotalIp: 46, TotalOP: 60 }

];


const Tmc_OP_IP_Deptwise = ({ fromDate, setFromDate, toDate, setToDate }) => {
    const [Chartlayout, seChartlayout] = useState(1);
    const [chartData, setChartData] = useState(null);
    const [deptMapList, setDeptMapList] = useState([]);
    const [dayCount, setDayCount] = useState(2);
    const navigate = useNavigate();

    const today = new Date();
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    // const filterAndAggregate = useCallback((rangeStart, rangeEnd) => {
    //     const filtered = departmentDetails.filter(({ visit_date }) => {
    //         const date = new Date(visit_date);
    //         return date >= rangeStart && date <= rangeEnd;
    //     });

    //     const deptMap = {};
    //     const deptList = [];

    //     filtered.forEach(({ dept_name, dept_id, TotalOP, TotalIp }) => {
    //         if (!deptMap[dept_name]) {
    //             deptMap[dept_name] = { TotalOP: 0, TotalIp: 0, id: dept_id };
    //             deptList.push({ name: dept_name, id: dept_id });
    //         }
    //         deptMap[dept_name].TotalOP += TotalOP;
    //         deptMap[dept_name].TotalIp += TotalIp;
    //     });

    //     const labels = Object.keys(deptMap);
    //     const opData = labels.map(dept => deptMap[dept].TotalOP);
    //     const ipData = labels.map(dept => deptMap[dept].TotalIp);

    //     setDeptMapList(deptList);

    //     return {
    //         labels,
    //         datasets: [
    //             {
    //                 label: 'Total OP',
    //                 data: opData,
    //                 backgroundColor: 'rgba(96, 94, 163, 0.6)',
    //                 borderColor: 'rgba(96, 94, 163, 1)',
    //                 borderWidth: 1
    //             },
    //             {
    //                 label: 'Total IP',
    //                 data: ipData,
    //                 backgroundColor: 'rgba(12, 132, 162, 0.6)',
    //                 borderColor: 'rgba(12, 132, 162, 1)',
    //                 borderWidth: 1
    //             }
    //         ]
    //     };
    // }, []);

    const filterAndAggregate = useCallback((rangeStart, rangeEnd) => {
        try {
            // Input validation
            if (!(rangeStart instanceof Date) || isNaN(rangeStart)) {
                console.error("Invalid rangeStart:", rangeStart);
                return null;
            }
            if (!(rangeEnd instanceof Date) || isNaN(rangeEnd)) {
                console.error("Invalid rangeEnd:", rangeEnd);
                return null;
            }

            if (!Array.isArray(departmentDetails)) {
                console.error("departmentDetails is not an array");
                return null;
            }

            const filtered = departmentDetails.filter(({ visit_date }) => {
                const date = new Date(visit_date);
                if (isNaN(date)) {
                    console.warn(`Invalid visit_date encountered: ${visit_date}`);
                    return false;
                }
                return date >= rangeStart && date <= rangeEnd;
            });

            const deptMap = {};
            const deptList = [];

            filtered.forEach(({ dept_name, dept_id, TotalOP, TotalIp }) => {
                if (!deptMap[dept_name]) {
                    deptMap[dept_name] = { TotalOP: 0, TotalIp: 0, id: dept_id };
                    deptList.push({ name: dept_name, id: dept_id });
                }
                deptMap[dept_name].TotalOP += Number(TotalOP) || 0;
                deptMap[dept_name].TotalIp += Number(TotalIp) || 0;
            });

            const labels = Object.keys(deptMap);
            const opData = labels.map(dept => deptMap[dept].TotalOP);
            const ipData = labels.map(dept => deptMap[dept].TotalIp);

            setDeptMapList(deptList);

            return {
                labels,
                datasets: [
                    {
                        label: 'Total OP',
                        data: opData,
                        backgroundColor: 'rgba(96, 94, 163, 0.6)',
                        borderColor: 'rgba(96, 94, 163, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Total IP',
                        data: ipData,
                        backgroundColor: 'rgba(12, 132, 162, 0.6)',
                        borderColor: 'rgba(12, 132, 162, 1)',
                        borderWidth: 1
                    }
                ]
            };
        } catch (error) {
            console.error("Error in filterAndAggregate:", error);
            return null;
        }
    }, []);

    // const handlePeriodChange = useCallback((period) => {
    //     setDayCount(period)
    //     const now = new Date();
    //     const ranges = {
    //         2: () => [startOfLastWeek, endOfLastWeek],
    //         3: () => [startOfMonth(now), now],
    //         4: () => [startOfMonth(subMonths(now, 5)), now],
    //         5: () => [new Date(now.getFullYear(), 0, 1), now],
    //     };

    //     if (!ranges[period]) return;

    //     const [start, end] = ranges[period]();
    //     setFromDate(format(start, 'yyyy-MM-dd'));
    //     setToDate(format(end, 'yyyy-MM-dd'));
    //     const chart = filterAndAggregate(start, end);
    //     setChartData(chart);
    // }, [filterAndAggregate, setFromDate, setToDate]);

    const handlePeriodChange = useCallback((period) => {
        try {
            // Validate period input
            const validPeriods = [2, 3, 4, 5];
            if (!validPeriods.includes(period)) {
                console.warn(`Invalid period selected: ${period}`);
                return;
            }

            setDayCount(period);

            const now = new Date();

            const ranges = {
                2: () => [startOfLastWeek, endOfLastWeek],
                3: () => [startOfMonth(now), now],
                4: () => [startOfMonth(subMonths(now, 5)), now],
                5: () => [new Date(now.getFullYear(), 0, 1), now],
            };

            const getRange = ranges[period];

            if (!getRange) {
                console.warn(`No date range found for period: ${period}`);
                return;
            }

            const [start, end] = getRange();

            if (!(start instanceof Date) || isNaN(start) || !(end instanceof Date) || isNaN(end)) {
                console.error("Invalid date range generated.");
                return;
            }

            setFromDate(format(start, 'yyyy-MM-dd'));
            setToDate(format(end, 'yyyy-MM-dd'));

            const chart = filterAndAggregate(start, end);
            setChartData(chart);

        } catch (error) {
            console.error("Error in handlePeriodChange:", error);
        }
    }, [filterAndAggregate, setFromDate, setToDate]);


    useEffect(() => {
        handlePeriodChange(2); // Default: Last Week
    }, []);

    useEffect(() => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            const chart = filterAndAggregate(start, end);
            setChartData(chart);
        }
    }, [fromDate, toDate, filterAndAggregate]);

    const barOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 15,
                    font: { size: 12 },
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#333',
                font: { size: 11 },
                formatter: (value) => value,
            },
        },
        scales: {
            x: {
                ticks: { autoSkip: false, maxRotation: 45, font: { size: 10 } },
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                ticks: { font: { size: 10 } }
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const { name, id } = deptMapList[index] || {};
                if (name && id) {
                    navigate(`/Home/IP_OP_DeptDetails/${encodeURIComponent(name)}/${id}`);
                }
            }
        }
    }), [deptMapList, navigate]);

    const transformToLineChartData = useCallback((data) => ({
        labels: data.labels,
        datasets: data.datasets.map(ds => ({
            ...ds,
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: ds.borderColor
        }))
    }), []);

    const transformToPolarData = useCallback((data) => {
        const labels = data.datasets.map(ds => ds.label);
        const values = data.datasets.map(ds =>
            ds.data.reduce((sum, val) => sum + val, 0)
        );
        return {
            labels,
            datasets: [{
                data: values,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderWidth: 1
            }]
        };
    }, []);

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1 }}>
                <CommonDateComp
                    onPeriodChange={handlePeriodChange}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    Graphicaldata={chartData}
                    dayCount={dayCount}
                    setDayCount={setDayCount}
                    chartData={chartData}
                    setChartData={setChartData}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>

            <Box sx={{
                overflow: "auto", '&::-webkit-scrollbar': {
                    height: 5,
                    cursor: "pointer"
                }, gap: 2,
            }}>
                {Chartlayout === 1 && chartData && (
                    <Bar data={chartData} options={barOptions} height={350} />
                )}
                {Chartlayout === 2 && chartData && (
                    <Line data={transformToLineChartData(chartData)} options={barOptions} height={350} />
                )}
                {Chartlayout === 3 && chartData && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
                        <PolarArea data={transformToPolarData(chartData)} height={300} width={300} />
                    </Box>
                )}
            </Box>
        </Box >
    );
};


export default memo(Tmc_OP_IP_Deptwise) 