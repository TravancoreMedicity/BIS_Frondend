import { Box } from '@mui/joy';
import React, { memo, useState, useCallback, useEffect } from 'react';
import {
    addDays, format, isWithinInterval, parseISO,
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
import { ensureNumber } from '../../BIS_CommoCode/CommonDateRange/ChartCommonFuns/ChartCommonFun';

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
    { dept_id: 1, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },
    { dept_id: 2, dept_name: "Cardiology", visit_date: "2025-06-01", TotalOp: 80, NewVisit: 20 },
    { dept_id: 3, dept_name: "Dermatology", visit_date: "2025-06-01", TotalOp: 60, NewVisit: 10 },
    { dept_id: 4, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },
    { dept_id: 5, dept_name: "Cardiology", visit_date: "2025-06-01", TotalOp: 80, NewVisit: 20 },
    { dept_id: 6, dept_name: "Dermatology", visit_date: "2025-06-01", TotalOp: 60, NewVisit: 10 },
    { dept_id: 7, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },
    { dept_id: 8, dept_name: "Cardiology", visit_date: "2025-06-01", TotalOp: 80, NewVisit: 20 },
    { dept_id: 9, dept_name: "Dermatology", visit_date: "2025-06-01", TotalOp: 60, NewVisit: 10 },

    { dept_id: 10, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },
    { dept_id: 11, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },

    { dept_id: 12, dept_name: "Cardiology", visit_date: "2025-06-01", TotalOp: 80, NewVisit: 20 },
    { dept_id: 13, dept_name: "Dermatology", visit_date: "2025-06-01", TotalOp: 60, NewVisit: 10 },
    { dept_id: 14, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },
    { dept_id: 15, dept_name: "Cardiology", visit_date: "2025-06-01", TotalOp: 80, NewVisit: 20 },
    { dept_id: 16, dept_name: "Dermatology", visit_date: "2025-06-01", TotalOp: 60, NewVisit: 10 },
    { dept_id: 17, dept_name: "General Surgery", visit_date: "2025-06-01", TotalOp: 100, NewVisit: 40 },
    { dept_id: 18, dept_name: "Cardiology", visit_date: "2025-06-01", TotalOp: 80, NewVisit: 20 },
    { dept_id: 19, dept_name: "Dermatology", visit_date: "2025-06-01", TotalOp: 60, NewVisit: 10 }
];

const now = new Date();

const Tmc_OpDeptWise = () => {
    const [Chartlayout, seChartlayout] = useState(1);
    const [fromDate, setFromDate] = useState(format(startOfMonth(now), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [polarData, setPolarData] = useState({ labels: [], datasets: [] });
    const [dayCount, setDayCount] = useState(2);

    const navigate = useNavigate();

    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const filterDeptData = useCallback((rangeStart, rangeEnd) => {
        const filtered = departmentDetails.filter(({ visit_date }) => {
            const visitDate = parseISO(visit_date);
            return isWithinInterval(visitDate, { start: rangeStart, end: rangeEnd });
        });

        const labels = filtered.map(d => d.dept_name);
        const newVisits = filtered.map(d => d.NewVisit);
        const followUps = filtered.map(d => d.TotalOp - d.NewVisit);
        const totals = filtered.map(d => d.TotalOp);

        setPolarData({
            labels,
            datasets: [{
                label: "Total Visits",
                data: totals,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56',
                    '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }]
        });

        return {
            labels,
            datasets: [
                {
                    label: 'New Visit',
                    data: newVisits,
                    backgroundColor: '#FFB6C1',
                    stack: 'stack1'
                },
                {
                    label: 'Follow-up',
                    data: followUps,
                    backgroundColor: '#A8AACC',
                    stack: 'stack1'
                }
            ],
            totals
        };
    }, []);

    // const handlePeriodChange = (period) => {
    //     let rangeStart, rangeEnd;

    //     if (period === 2) {
    //         rangeStart = startOfLastWeek;
    //         rangeEnd = endOfLastWeek;
    //     } else if (period === 3) {
    //         rangeStart = startOfMonth(now);
    //         rangeEnd = now;
    //     } else if (period === 4) {
    //         rangeStart = startOfMonth(subMonths(now, 5));
    //         rangeEnd = now;
    //     } else if (period === 5) {
    //         rangeStart = new Date(now.getFullYear(), 0, 1);
    //         rangeEnd = now;
    //     }

    //     if (rangeStart && rangeEnd) {
    //         setFromDate(format(rangeStart, 'yyyy-MM-dd'));
    //         setToDate(format(rangeEnd, 'yyyy-MM-dd'));
    //         const data = filterDeptData(rangeStart, rangeEnd);
    //         setChartData(data);
    //     }
    // };
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
        plugins: {
            legend: { position: 'top' },
            datalabels: {
                color: 'black',
                font: { size: 11.5 },
                formatter: (value, ctx) => {
                    const datasetLabel = ctx.dataset.label;
                    if (datasetLabel === 'Follow-up') return ctx.chart.data.labels[ctx.dataIndex];
                    if (datasetLabel === 'New Visit') return value;
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
                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>

            <Box sx={{ mt: 2, width: "100%", height: 500, }}>
                {Chartlayout === 1 &&
                    // <Bar data={chartData} options={options} height={350} width={500} sx={{ width: "100%" }}
                    // />
                    <Box sx={{ width: '100%', height: 500, position: 'relative' }}>
                        <Bar data={chartData} options={{ ...options, maintainAspectRatio: false }} />
                    </Box>
                }
                {Chartlayout === 2 &&
                    // <Line data={chartData} options={options} height={350} width={500} />
                    <Box sx={{ width: '100%', height: 500, position: 'relative' }}>
                        <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />
                    </Box>
                }
                {Chartlayout === 3 && (

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
                        <Box sx={{ width: 600, height: 600 }}>
                            <PolarArea
                                width={500}
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { position: 'right' }
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default memo(Tmc_OpDeptWise);
