import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
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
    { dept_id: 1, dept_name: "General Surgery", visit_date: "2025-05-01", TotalIp: 100, TotalOP: 40 },
    { dept_id: 2, dept_name: "Cardiology", visit_date: "2025-05-01", TotalIp: 80, TotalOP: 20 },
    { dept_id: 3, dept_name: "Dermatology", visit_date: "2025-07-25", TotalIp: 60, TotalOP: 10 },
    { dept_id: 4, dept_name: "General Surgery", visit_date: "2025-07-24", TotalIp: 100, TotalOP: 40 },
    { dept_id: 5, dept_name: "Cardiology", visit_date: "2025-07-23", TotalIp: 80, TotalOP: 20 },
    { dept_id: 6, dept_name: "Dermatology", visit_date: "2025-07-01", TotalIp: 60, TotalOP: 10 },
    { dept_id: 7, dept_name: "General Surgery", visit_date: "2025-07-01", TotalIp: 100, TotalOP: 40 },
    { dept_id: 8, dept_name: "Cardiology", visit_date: "2025-07-01", TotalIp: 80, TotalOP: 20 },
    { dept_id: 9, dept_name: "Dermatology", visit_date: "2025-07-01", TotalIp: 60, TotalOP: 10 },

    { dept_id: 10, dept_name: "General Surgery", visit_date: "2025-07-01", TotalIp: 100, TotalOP: 40 },
    { dept_id: 11, dept_name: "General Surgery", visit_date: "2025-07-01", TotalIp: 100, TotalOP: 40 },

    { dept_id: 12, dept_name: "Cardiology", visit_date: "2025-07-01", TotalIp: 80, TotalOP: 20 },
    { dept_id: 13, dept_name: "Dermatology", visit_date: "2025-07-01", TotalIp: 60, TotalOP: 10 },
    { dept_id: 14, dept_name: "General Surgery", visit_date: "2025-07-01", TotalIp: 100, TotalOP: 40 },
    { dept_id: 15, dept_name: "Cardiology", visit_date: "2025-06-01", TotalIp: 80, TotalOP: 20 },
    { dept_id: 16, dept_name: "Dermatology", visit_date: "2025-07-01", TotalIp: 60, TotalOP: 10 },
    { dept_id: 17, dept_name: "General Surgery", visit_date: "2025-06-01", TotalIp: 100, TotalOP: 40 },
    { dept_id: 18, dept_name: "Cardiology", visit_date: "2025-06-01", TotalIp: 80, TotalOP: 20 },
    { dept_id: 19, dept_name: "Dermatology", visit_date: "2025-06-01", TotalIp: 60, TotalOP: 10 }
];

const now = new Date();

const OP_IP_Deptwise = () => {
    const [Chartlayout, seChartlayout] = useState(1);
    const [fromDate, setFromDate] = useState(format(startOfMonth(now), 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [chartData, setChartData] = useState({ labels: [], datasets: [], totals: [], dept_id: [] });
    const [polarData, setPolarData] = useState({ labels: [], datasets: [] });
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
        const TotalIp = filtered.map(d => d.TotalIp);
        const TotalOP = filtered.map(d => d.TotalOP);
        const dept_id = filtered.map(d => d.dept_id);


        setPolarData({
            labels,
            datasets: [{
                label: "Total IP",
                data: TotalIp,
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
                    label: 'Total OP',
                    data: TotalOP,
                    backgroundColor: '#FFB6C1',
                    stack: 'stack1'
                },
                {
                    label: 'Total IP',
                    data: TotalIp,
                    backgroundColor: '#A8AACC',
                    stack: 'stack1'
                },

            ],
            totals: TotalIp,
            dept_id: dept_id
        };
    }, []);

    const handlePeriodChange = (period) => {
        let rangeStart, rangeEnd;

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

        if (rangeStart && rangeEnd) {
            setFromDate(format(rangeStart, 'yyyy-MM-dd'));
            setToDate(format(rangeEnd, 'yyyy-MM-dd'));
            const data = filterDeptData(rangeStart, rangeEnd);
            setChartData(data);
        }
    };

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
                font: { weight: 'bold', size: 10 },
                formatter: (value, ctx) => {
                    const datasetLabel = ctx.dataset.label;
                    if (datasetLabel === 'Total IP') return ctx.chart.data.labels[ctx.dataIndex];
                    if (datasetLabel === 'Total OP') return value;
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
                const deptId = chartData.dept_id[index];

                if (deptName && deptId) {
                    navigate(`/Home/IP_OP_DeptDetails/${encodeURIComponent(deptName)}/${deptId}`);
                }
            }
        }
    };

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1 }}>
                    <ButtonGroup aria-label="date range selector" sx={{
                        '--ButtonGroup-radius': '30px', display: "flex",
                        flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
                    }}>
                        {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                            <Button key={label} onClick={() => handlePeriodChange(index + 2)}>
                                {index === 4 ? (
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                        <Input
                                            type="date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            size='xs'
                                            sx={{ p: 0.5, color: 'grey' }}
                                        />
                                        <Input
                                            type="date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            size='xs'
                                            sx={{ p: 0.5, color: 'grey' }}
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
                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>

            <Box sx={{ mt: 2, width: "100%", height: 500 }}>
                {Chartlayout === 1 &&
                    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Bar data={chartData} options={options} />
                    </Box>
                }
                {Chartlayout === 2 &&
                    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Line data={chartData} options={options} />
                    </Box>
                }
                {Chartlayout === 3 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
                        <Box sx={{ width: 600, height: 600 }}>
                            <PolarArea
                                data={polarData}
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

export default memo(OP_IP_Deptwise) 