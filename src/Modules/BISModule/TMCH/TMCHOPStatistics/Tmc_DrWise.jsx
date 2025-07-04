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

const doctorWiseOp = [];

const departments = [
    "General Surgery", "Cardiology", "Neurology", "Ent", "Pediatrics",
    "Orthopedics", "Dermatology", "Urology", "Nephrology", "Gastrology",
    "Gynecology", "Opthalmology", "Psychiatry", "Oncology", "Radiology"
];

function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

for (let dr_code = 1; dr_code <= 150; dr_code++) {
    const dr_name = `Dr. Name${dr_code}`;
    const dr_dept = departments[Math.floor(Math.random() * departments.length)];

    const visitDates = new Set();
    const numEntries = Math.floor(Math.random() * 3) + 3;

    while (visitDates.size < numEntries) {
        visitDates.add(getRandomDate(new Date('2025-01-01'), new Date('2025-06-26')));
    }

    Array.from(visitDates).forEach(date => {
        doctorWiseOp.push({
            dr_code,
            dr_name,
            dr_dept,
            Opvisit_date: date,
            Total_op: Math.floor(Math.random() * 91) + 10
        });
    });
}

const Kmc_DrWise = () => {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);

    const [Chartlayout, seChartlayout] = useState(1);
    const [selectedPeriod, setSelectedPeriod] = useState(3);
    const [fromDate, setFromDate] = useState(format(thisMonthStart, 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

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
                    total_op: 0
                };
            }
            acc[item.dr_code].total_op += item.Total_op || 0;
            return acc;
        }, {});

        const sorted = Object.values(grouped).sort((a, b) => b.total_op - a.total_op).slice(0, 20); // Top 20 doctors

        return {
            labels: sorted.map(d => d.total_op.toString()), // Show OP count at X-axis
            datasets: [
                {
                    label: "Total OP Count",
                    data: sorted.map(d => d.total_op),
                    backgroundColor: 'rgba(96, 94, 163, 0.7)',
                    datalabels: {
                        formatter: (_, context) => sorted[context.dataIndex].dr_name,
                        color: 'black',
                        anchor: 'center',
                        align: 'end',
                        font: { size: 11, weight: 'bold' }
                    }
                }
            ]
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

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
            },
            datalabels: {
                display: true,
                rotation: -90,
                color: 'black',
                anchor: 'end',
                align: 'end',
                font: { size: 10, weight: 'bold' },
            }

        },
        scales: {
            x: {
                grid: { display: true },
                ticks: {
                    display: true,
                    font: { size: 12, weight: 'bold' },
                    autoSkip: false,
                    // maxRotation: 45,
                    // minRotation: 30
                },
                title: {
                    display: true,
                    text: 'Total OP Count'
                }
            },
            y: {
                beginAtZero: true,
                ticks: { display: true },
                grid: { display: true },
                border: { display: true }
            }
        },
        animation: { duration: 1000 },
        elements: {
            bar: {
                borderRadius: 4,
                borderSkipped: false
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
                {Chartlayout === 1 && <Bar data={chartData} options={chartOptions} height={350} />}
                {Chartlayout === 2 && <Line data={chartData} options={chartOptions} height={350} />}
                {Chartlayout === 3 && (
                    // <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
                    //     <PolarArea data={chartData} options={chartOptions} height={300} width={300} />
                    // </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
                        <Box sx={{ width: 600, height: 600 }}>
                            <PolarArea
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

export default memo(Kmc_DrWise);
