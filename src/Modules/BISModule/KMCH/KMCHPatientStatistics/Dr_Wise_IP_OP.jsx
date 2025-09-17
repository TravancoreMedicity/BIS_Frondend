import {
    Box
} from '@mui/joy';
import React, { memo, useCallback, useState, useEffect } from 'react';
import {
    addDays, format, isWithinInterval,
    parseISO, startOfMonth, startOfWeek, subMonths, subWeeks
} from 'date-fns';

import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    PointElement, LineElement, RadialLinearScale, ArcElement,
    Title, Tooltip, Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import CommonDateComp from '../../BIS_CommoCode/CommonDateRange/CommonDateComp';
import CommonGraphRep from '../../BIS_CommoCode/CommonGraphRep';


ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    PointElement, LineElement, RadialLinearScale, ArcElement,
    Title, Tooltip, Legend, ChartDataLabels
);

// Mock data generation (no for/while)
const departments = [
    "General Surgery", "Cardiology", "Neurology", "Ent", "Pediatrics",
    "Orthopedics", "Dermatology", "Urology", "Nephrology", "Gastrology",
    "Gynecology", "Opthalmology", "Psychiatry", "Oncology", "Radiology"
];

const getRandomDate = (start, end) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        .toISOString().split('T')[0];

const generateUniqueDates = (count) => {
    const set = new Set();
    while (set.size < count) {
        set.add(getRandomDate(new Date('2025-01-01'), new Date('2025-07-01')));
    }
    return [...set];
};

const doctorWiseOp = Array.from({ length: 150 }, (_, i) => i + 1).flatMap(dr_code => {
    const dr_name = `Dr. Name${dr_code}`;
    const dr_dept = departments[Math.floor(Math.random() * departments.length)];
    const numEntries = Math.floor(Math.random() * 3) + 3;
    const visitDates = generateUniqueDates(numEntries);

    return visitDates.map(date => ({
        dr_code,
        dr_name,
        dr_dept,
        Opvisit_date: date,
        Total_op: Math.floor(Math.random() * 91) + 10,
        Total_ip: Math.floor(Math.random() * 41) + 5
    }));
});

const Dr_Wise_IP_OP = () => {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const [Chartlayout, seChartlayout] = useState(1);
    const [selectedPeriod, setSelectedPeriod] = useState(3);
    const [fromDate, setFromDate] = useState(format(thisMonthStart, 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [chartData, setChartData] = useState({ labels: [], datasets: [], doctorNames: [] });

    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const filterDoctorData = useCallback((rangeStart, rangeEnd) => {
        try {
            // Validate date inputs
            if (!(rangeStart instanceof Date) || isNaN(rangeStart)) {
                throw new Error("Invalid rangeStart date.");
            }
            if (!(rangeEnd instanceof Date) || isNaN(rangeEnd)) {
                throw new Error("Invalid rangeEnd date.");
            }

            // Validate data source
            if (!Array.isArray(doctorWiseOp)) {
                throw new Error("doctorWiseOp must be an array.");
            }

            //Filter by date range
            const filtered = doctorWiseOp.filter(({ Opvisit_date }) => {
                const visitDate = parseISO(Opvisit_date);
                return (
                    visitDate instanceof Date &&
                    !isNaN(visitDate) &&
                    isWithinInterval(visitDate, { start: rangeStart, end: rangeEnd })
                );
            });

            // Group by doctor code
            const grouped = filtered.reduce((acc, item) => {
                const drCode = item.dr_code;
                if (!drCode) return acc;

                if (!acc[drCode]) {
                    acc[drCode] = {
                        dr_name: item.dr_name || "Unknown",
                        dr_dept: item.dr_dept || "N/A",
                        total_op: 0,
                        total_ip: 0
                    };
                }

                acc[drCode].total_op += Number(item.Total_op) || 0;
                acc[drCode].total_ip += Number(item.Total_ip) || 0;

                return acc;
            }, {});

            //  Sort and take top 20
            const sorted = Object.values(grouped)
                .sort((a, b) => (b.total_op + b.total_ip) - (a.total_op + a.total_ip))
                .slice(0, 20);

            //  Build chart data
            return {
                labels: sorted.map(d => d.dr_name),
                datasets: [
                    {
                        label: "Total IP",
                        data: sorted.map(d => d.total_ip),
                        backgroundColor: 'rgba(161, 207, 217, 0.8)',
                        stack: 'stack1'
                    },
                    {
                        label: "Total OP",
                        data: sorted.map(d => d.total_op),
                        backgroundColor: 'rgba(10, 132, 153, 0.8)',
                        stack: 'stack1'
                    }
                ],
                doctorNames: sorted.map(d => d.dr_name)
            };

        } catch (error) {
            console.error("Error in filterDoctorData:", error);
            return {
                labels: [],
                datasets: [],
                doctorNames: []
            };
        }
    }, [doctorWiseOp]);

    const handlePeriodChange = useCallback((period) => {
        try {
            const validPeriods = [2, 3, 4, 5];
            if (!validPeriods.includes(period)) {
                console.warn(`Invalid period: ${period}`);
                return;
            }

            setSelectedPeriod(period);

            const now = new Date();
            let rangeStart = null;
            let rangeEnd = null;

            if (period === 2) {
                if (!(startOfLastWeek instanceof Date) || isNaN(startOfLastWeek) ||
                    !(endOfLastWeek instanceof Date) || isNaN(endOfLastWeek)) {
                    throw new Error("Invalid last week date range.");
                }
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

            // Validate date range
            if (!(rangeStart instanceof Date) || isNaN(rangeStart) ||
                !(rangeEnd instanceof Date) || isNaN(rangeEnd)) {
                console.error("Invalid date range.");
                return;
            }

            // Format dates and update state
            setFromDate(format(rangeStart, 'yyyy-MM-dd'));
            setToDate(format(rangeEnd, 'yyyy-MM-dd'));

            // Process and set chart data
            const chart = filterDoctorData(rangeStart, rangeEnd);
            if (chart) {
                setChartData(chart);
            } else {
                console.warn("No chart data returned from filterDoctorData.");
            }

        } catch (error) {
            console.error("Error in handlePeriodChange:", error);
        }
    }, [setSelectedPeriod, setFromDate, setToDate, setChartData, filterDoctorData]);


    useEffect(() => {
        const rangeStart = parseISO(fromDate);
        const rangeEnd = parseISO(toDate);
        setChartData(filterDoctorData(rangeStart, rangeEnd));
    }, [fromDate, toDate, filterDoctorData]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            datalabels: {
                color: 'black',
                font: { weight: 'bold', size: 11 },
                formatter: (value, ctx) => {
                    const datasetLabel = ctx.dataset.label;
                    if (datasetLabel === 'Total OP') {
                        return chartData.doctorNames?.[ctx.dataIndex] || '';
                    }
                    return value;
                },
                anchor: 'center',
                align: 'end',
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
                display: true,
                stacked: true,
                ticks: {
                    color: 'black',
                    // font: { weight: 'bold' },
                    callback: function (value, index) {
                        const ip = chartData.datasets[0]?.data[index] || 0;
                        const op = chartData.datasets[1]?.data[index] || 0;
                        return ip + op; // show total count on x-axis
                    }
                }
            },
            y: {
                stacked: true,
                beginAtZero: true
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
                        dayCount={selectedPeriod}
                        setDayCount={setSelectedPeriod}
                        chartData={chartData}
                        setChartData={setChartData}
                    />
                </Box>

                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
            </Box>

            <CommonGraphRep Chartlayout={Chartlayout} chartData={chartData} options={options} polarData={chartData} polarOptions={options} />
        </Box>
    );
};
export default memo(Dr_Wise_IP_OP);
