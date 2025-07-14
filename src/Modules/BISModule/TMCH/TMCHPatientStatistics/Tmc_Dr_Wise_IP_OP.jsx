import {
    Box, Button, ButtonGroup, Input, Typography
} from '@mui/joy';
import React, { memo, useCallback, useState, useEffect } from 'react';
import {
    addDays, format, isWithinInterval,
    parseISO, startOfMonth, startOfWeek, subMonths, subWeeks
} from 'date-fns';

import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    PointElement, LineElement, RadialLinearScale, ArcElement,
    Title, Tooltip, Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';

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
        const filtered = doctorWiseOp.filter(({ Opvisit_date }) => {
            const visitDate = parseISO(Opvisit_date);
            return isWithinInterval(visitDate, { start: rangeStart, end: rangeEnd });
        });

        const grouped = filtered.reduce((acc, item) => {
            if (!acc[item.dr_code]) {
                acc[item.dr_code] = {
                    dr_name: item.dr_name,
                    dr_dept: item.dr_dept,
                    total_op: 0,
                    total_ip: 0
                };
            }
            acc[item.dr_code].total_op += item.Total_op || 0;
            acc[item.dr_code].total_ip += item.Total_ip || 0;
            return acc;
        }, {});

        const sorted = Object.values(grouped)
            .sort((a, b) => (b.total_op + b.total_ip) - (a.total_op + a.total_ip))
            .slice(0, 20);

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
                },
            ],
            doctorNames: sorted.map(d => d.dr_name)
        };
    }, []);

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
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
            setChartData(filterDoctorData(rangeStart, rangeEnd));
        }
    };

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

            <Box sx={{ mt: 2, width: '100%', height: 350 }}>
                {Chartlayout === 1 && <Bar data={chartData} options={options} />}
                {Chartlayout === 2 && <Line data={chartData} options={options} height={350} />}
                {Chartlayout === 3 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
                        <Box sx={{ width: 600, height: 600 }}>
                            <PolarArea
                                data={{
                                    labels: chartData.datasets.map(ds => ds.label),
                                    datasets: [{
                                        data: chartData.datasets.map(ds =>
                                            ds.data.reduce((sum, val) => sum + val, 0)),
                                        backgroundColor: ['rgba(96, 94, 163, 0.7)', 'rgba(2, 3, 3, 0.6)']
                                    }]
                                }}
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

export default memo(Dr_Wise_IP_OP);
