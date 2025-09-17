import {
    Box
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
import ChartDataLabels from 'chartjs-plugin-datalabels'; //  Plugin import
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import CommonDateComp from '../../BIS_CommoCode/CommonDateRange/CommonDateComp';

ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    PointElement, LineElement, RadialLinearScale, ArcElement,
    Title, Tooltip, Legend, ChartDataLabels //  Register plugin
);

const deptDetailArr = [];

const departmentNames = [
    "General Surgery", "Cardiology", "Neurology", "Ent", "Pediatrics",
    "Orthopedics", "Dermatology", "Urology", "Nephrology", "Gastrology",
    "Gynecology", "Ophthalmology", "Psychiatry", "Oncology", "Radiology",
    "Pulmonology", "Endocrinology", "Hematology", "Plastic Surgery", "Pain Clinic",
    "Geriatrics", "Reproductive Medicine", "Neonatology", "Rheumatology", "Critical Care",
    "Emergency Medicine", "Surgical Oncology", "Dental Surgery", "Anesthesiology", "Infectious Diseases",
    "Internal Medicine", "Vascular Surgery"
];

function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// Generate mock data
departmentNames.forEach((dept_name, index) => {
    const dept_id = index + 1;
    const visitDates = new Set();
    const entryCount = Math.floor(Math.random() * 3) + 3;

    while (visitDates.size < entryCount) {
        visitDates.add(getRandomDate(new Date("2025-01-01"), new Date("2025-09-10")));
    }

    Array.from(visitDates).forEach(date => {
        deptDetailArr.push({
            dept_id,
            dept_name,
            Opvisit_date: date,
            Total_op: Math.floor(Math.random() * 91) + 10
        });
    });
});

const Kmc_AllOpDeptWise = () => {
    const now = new Date();
    const startOfThisMonth = startOfMonth(now);

    const [Chartlayout, seChartlayout] = useState(1);
    const [fromDate, setFromDate] = useState(format(startOfThisMonth, 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(now, 'yyyy-MM-dd'));
    const [selectedPeriod, setSelectedPeriod] = useState(3);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);


    const filterDeptData = useCallback((rangeStart, rangeEnd) => {
        try {
            // Validate inputs
            if (!(rangeStart instanceof Date) || isNaN(rangeStart.getTime())) {
                throw new Error("Invalid rangeStart date");
            }
            if (!(rangeEnd instanceof Date) || isNaN(rangeEnd.getTime())) {
                throw new Error("Invalid rangeEnd date");
            }

            const filtered = deptDetailArr.filter(({ Opvisit_date }) => {
                const visitDate = parseISO(Opvisit_date);
                if (isNaN(visitDate.getTime())) return false; // skip invalid dates
                return isWithinInterval(visitDate, { start: rangeStart, end: rangeEnd });
            });

            const grouped = filtered.reduce((acc, item) => {
                if (!acc[item.dept_id]) {
                    acc[item.dept_id] = {
                        dept_name: item.dept_name,
                        total_op: 0
                    };
                }
                acc[item.dept_id].total_op += item.Total_op || 0;
                return acc;
            }, {});

            const sorted = Object.values(grouped).sort((a, b) => b.total_op - a.total_op);
            const totalOps = sorted.map(d => d.total_op);
            const departments = sorted.map(d => d.dept_name);

            return {
                labels: totalOps.map(String), // Use Total OP as X-axis label
                datasets: [{
                    label: "Total OP Count",
                    data: totalOps,
                    backgroundColor: '#A8AACC',
                    borderColor: 'rgba(96, 94, 163, 1)',
                    borderWidth: 1,
                    datalabels: {
                        anchor: 'center',
                        align: 'end',
                        color: 'black',
                        font: { size: 11, weight: 'bold' },
                        formatter: (_, context) => departments[context.dataIndex]
                    }
                }]
            };
        } catch (error) {
            console.error("Error filtering department data:", error.message);
            return {
                labels: [],
                datasets: []
            };
        }
    }, [deptDetailArr]);


    const handlePeriodChange = useCallback((period) => {
        try {
            if (![2, 3, 4, 5].includes(period)) {
                throw new Error("Invalid period value");
            }

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

            // Validate dates
            if (!(rangeStart instanceof Date) || isNaN(rangeStart.getTime())) {
                throw new Error("Invalid rangeStart date computed");
            }
            if (!(rangeEnd instanceof Date) || isNaN(rangeEnd.getTime())) {
                throw new Error("Invalid rangeEnd date computed");
            }

            setFromDate(format(rangeStart, 'yyyy-MM-dd'));
            setToDate(format(rangeEnd, 'yyyy-MM-dd'));

            const data = filterDeptData(rangeStart, rangeEnd);
            setChartData(data);

        } catch (error) {
            console.error("Error in handlePeriodChange:", error.message);
        }
    }, [now, setSelectedPeriod, setFromDate, setToDate, setChartData, filterDeptData]);


    useEffect(() => {
        const rangeStart = parseISO(fromDate);
        const rangeEnd = parseISO(toDate);
        setChartData(filterDeptData(rangeStart, rangeEnd));
    }, [fromDate, toDate, filterDeptData]);

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
                callbacks: {
                    label: (context) => `OP Count: ${context.raw}`
                }
            },
            datalabels: {
                display: true,
                rotation: -90
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Total OP Count'
                },
                ticks: { display: true },
                grid: { display: true },

            },
            y: {
                beginAtZero: true,
                ticks: { display: true },
                grid: { display: true },
                border: { display: true },

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

            <Box sx={{ mt: 2, width: '100%', height: 350 }}>
                {Chartlayout === 1 && <Bar data={chartData} options={chartOptions} height={350} />}
                {Chartlayout === 2 && <Line data={chartData} options={chartOptions} height={350} />}
                {Chartlayout === 3 && (

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

export default memo(Kmc_AllOpDeptWise);
