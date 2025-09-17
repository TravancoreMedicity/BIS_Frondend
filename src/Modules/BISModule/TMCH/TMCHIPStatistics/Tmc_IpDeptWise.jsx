import { Box } from '@mui/joy';
import React, { memo, useState, useCallback, useEffect } from 'react';
import {
    addDays, format, isWithinInterval, parseISO,
    startOfMonth, startOfWeek, subMonths, subWeeks
} from "date-fns";
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend, RadialLinearScale, ArcElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from 'react-router-dom';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import CommonDateComp from '../../BIS_CommoCode/CommonDateRange/CommonDateComp';
import { ensureNumber } from '../../BIS_CommoCode/CommonDateRange/ChartCommonFuns/ChartCommonFun';
import CommonGraphRep from '../../BIS_CommoCode/CommonGraphRep';

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
    { dept_id: 1, dept_name: "General Surgery", visit_date: "2025-09-01", TotalIp: 120, TotalAdmisiion: 35 },
    { dept_id: 2, dept_name: "Cardiology", visit_date: "2025-05-01", TotalIp: 80, TotalAdmisiion: 20 },
    { dept_id: 3, dept_name: "Dermatology", visit_date: "2025-06-25", TotalIp: 60, TotalAdmisiion: 10 },
    { dept_id: 4, dept_name: "General Surgery", visit_date: "2025-06-24", TotalIp: 100, TotalAdmisiion: 40 },
    { dept_id: 5, dept_name: "Cardiology", visit_date: "2025-06-23", TotalIp: 80, TotalAdmisiion: 20 },
    { dept_id: 6, dept_name: "Dermatology", visit_date: "2025-06-01", TotalIp: 60, TotalAdmisiion: 10 },
    { dept_id: 7, dept_name: "General Surgery", visit_date: "2025-06-01", TotalIp: 100, TotalAdmisiion: 40 },
    { dept_id: 8, dept_name: "Cardiology", visit_date: "2025-06-01", TotalIp: 80, TotalAdmisiion: 20 },
    { dept_id: 9, dept_name: "Dermatology", visit_date: "2025-06-01", TotalIp: 60, TotalAdmisiion: 10 },
    { dept_id: 10, dept_name: "General Surgery", visit_date: "2025-06-01", TotalIp: 100, TotalAdmisiion: 40 },
    { dept_id: 11, dept_name: "General Surgery", visit_date: "2025-06-01", TotalIp: 100, TotalAdmisiion: 40 },
    { dept_id: 12, dept_name: "Cardiology", visit_date: "2025-06-01", TotalIp: 80, TotalAdmisiion: 20 },
    { dept_id: 13, dept_name: "Dermatology", visit_date: "2025-06-01", TotalIp: 60, TotalAdmisiion: 10 },
    { dept_id: 14, dept_name: "General Surgery", visit_date: "2025-06-01", TotalIp: 100, TotalAdmisiion: 40 },
    { dept_id: 15, dept_name: "Cardiology", visit_date: "2025-06-01", TotalIp: 80, TotalAdmisiion: 20 },
    { dept_id: 16, dept_name: "Dermatology", visit_date: "2025-06-01", TotalIp: 60, TotalAdmisiion: 10 },
    { dept_id: 17, dept_name: "General Surgery", visit_date: "2025-06-01", TotalIp: 100, TotalAdmisiion: 40 },
    { dept_id: 18, dept_name: "Cardiology", visit_date: "2025-06-01", TotalIp: 80, TotalAdmisiion: 20 },
    { dept_id: 19, dept_name: "Dermatology", visit_date: "2025-06-01", TotalIp: 60, TotalAdmisiion: 10 }
];

const now = new Date();

const Tmc_IpDeptWise = () => {
    const [Chartlayout, seChartlayout] = useState(1);
    const [fromDate, setFromDate] = useState(format(startOfMonth(now), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [chartData, setChartData] = useState({ labels: [], datasets: [], totals: [] });
    const [polarData, setPolarData] = useState({ labels: [], datasets: [] });
    const [dayCount, setDayCount] = useState(2);
    const navigate = useNavigate();

    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const filterDeptData = useCallback((rangeStart, rangeEnd) => {
        try {
            //  Step 1: Validate input dates
            if (!(rangeStart instanceof Date) || !(rangeEnd instanceof Date) || isNaN(rangeStart) || isNaN(rangeEnd)) {
                console.warn("Invalid date range passed to filterDeptData:", rangeStart, rangeEnd);
                return { labels: [], datasets: [], totals: [] };
            }

            //  Step 2: Validate departmentDetails
            if (!Array.isArray(departmentDetails)) {
                console.warn("departmentDetails is not an array:", departmentDetails);
                return { labels: [], datasets: [], totals: [] };
            }

            //  Step 3: Filter data within date range
            const filtered = departmentDetails.filter(({ visit_date }) => {
                try {
                    const visitDate = parseISO(visit_date);
                    return isWithinInterval(visitDate, { start: rangeStart, end: rangeEnd });
                } catch (err) {
                    console.warn("Invalid visit_date skipped:", visit_date, err);
                    return false;
                }
            });

            //  Step 4: Extract labels and data
            const labels = filtered.map(d => d.dept_name);
            const TotalIp = filtered.map(d => d.TotalIp ?? 0);
            const TotalAdmission = filtered.map(d => d.TotalAdmisiion ?? 0);

            //  Step 5: Set Polar chart data safely
            setPolarData({
                labels,
                datasets: [
                    {
                        label: "Total IP",
                        data: TotalIp,
                        backgroundColor: [
                            '#FF6384', '#36A2EB', '#FFCE56',
                            '#4BC0C0', '#9966FF', '#FF9F40',
                        ]
                    }
                ]
            });

            //  Step 6: Return formatted chart data
            return {
                labels,
                datasets: [
                    {
                        label: 'Total Admission',
                        data: TotalAdmission,
                        backgroundColor: '#FFB6C1',
                        stack: 'stack1'
                    },
                    {
                        label: 'Total IP',
                        data: TotalIp,
                        backgroundColor: '#A8AACC',
                        stack: 'stack1'
                    }
                ],
                totals: TotalIp
            };
        } catch (error) {
            console.error("Error in filterDeptData:", error);
            return { labels: [], datasets: [], totals: [] }; // Safe fallback
        }
    }, [departmentDetails, setPolarData]);

    const handlePeriodChange = useCallback((period) => {
        try {
            const numericPeriod = ensureNumber(period);
            if (numericPeriod === 0) {
                console.warn("Invalid period value:", period);
                return;
            }

            let rangeStart, rangeEnd;
            setDayCount(period);

            //  Step 2: Choose ranges based on valid period
            if (period === 2) {
                rangeStart = startOfLastWeek;
                rangeEnd = endOfLastWeek;
            } else if (period === 3) {
                rangeStart = startOfMonth(now);
                rangeEnd = now;
            } else if (period === 4) {
                rangeStart = startOfMonth(subMonths(now, 5));
                rangeEnd = now;
            } else if (period === 5) {
                rangeStart = new Date(now.getFullYear(), 0, 1);
                rangeEnd = now;
            }

            // Step 3: Validate ranges
            if (rangeStart instanceof Date && rangeEnd instanceof Date && !isNaN(rangeStart) && !isNaN(rangeEnd)) {
                setFromDate(format(rangeStart, "yyyy-MM-dd"));
                setToDate(format(rangeEnd, "yyyy-MM-dd"));

                const data = filterDeptData(rangeStart, rangeEnd);
                setChartData(data);
            } else {
                console.warn("Invalid date range for period:", period);
                setFromDate(null);
                setToDate(null);
                setChartData([]);
            }
        } catch (error) {
            console.error("Error in handlePeriodChange:", error);
            setFromDate(null);
            setToDate(null);
            setChartData([]);
        }
    }, [now, startOfLastWeek, endOfLastWeek, setDayCount, setFromDate, setToDate, filterDeptData, setChartData]);

    useEffect(() => {
        const rangeStart = parseISO(fromDate);
        const rangeEnd = parseISO(toDate);
        const data = filterDeptData(rangeStart, rangeEnd);
        setChartData(data);
    }, [fromDate, toDate, filterDeptData]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            datalabels: {
                color: 'black',
                font: { size: 11.5 },
                formatter: (value, ctx) => {
                    const datasetLabel = ctx.dataset.label;
                    if (datasetLabel === 'Total IP') return ctx.chart.data.labels[ctx.dataIndex];
                    if (datasetLabel === 'Total Admission') return value;
                    return '';
                },
                anchor: 'center',
                align: 'center',
                display: true,
                rotation: -90
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    callback: function (value, index) {
                        return chartData.totals ? chartData.totals[index] : '';
                    },
                    color: 'black',
                    font: { weight: 'bold' }
                }
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        // onClick: (event, elements) => {
        //     if (elements.length > 0) {
        //         const index = elements[0].index;
        //         const deptName = chartData.labels[index];
        //         const selected = departmentDetails.find(d => d.dept_name === deptName);
        //         if (selected) navigate(`/Home/Kmc_dept_detailPage`);
        //     }
        // }
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const deptName = chartData.labels[index];
                const selected = departmentDetails.find(d => d.dept_name === deptName);
                if (selected) {
                    const encodedName = encodeURIComponent(selected.dept_name);
                    navigate(`/Home/Kmc_dept_detailPage/${selected.dept_id}/${encodedName}`, {
                        state: { dept_name: selected.dept_name }
                    });
                }
            }
        }
    };

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>
            <CommonGraphRep Chartlayout={Chartlayout} chartData={chartData} options={options} polarData={polarData} polarOptions={options} />
        </Box>
    );
};

export default memo(Tmc_IpDeptWise);
