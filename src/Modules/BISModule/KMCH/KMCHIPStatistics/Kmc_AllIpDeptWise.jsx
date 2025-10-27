import { Box } from '@mui/joy';
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
import ChartDataLabels from 'chartjs-plugin-datalabels'; //  Plugin import
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import CommonDateComp from '../../BIS_CommoCode/CommonDateRange/CommonDateComp';
import CommonGraphRep from '../../BIS_CommoCode/CommonGraphRep';

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
departmentNames.map((dept_name, index) => {
    const dept_id = index + 1;
    const visitDates = new Set();
    const entryCount = Math.floor(Math.random() * 3) + 3;

    while (visitDates.size < entryCount) {
        visitDates.add(getRandomDate(new Date("2025-01-01"), new Date("2025-06-26")));
    }

    Array.from(visitDates).map(date => {
        deptDetailArr.push({
            dept_id,
            dept_name,
            IP_date: date,
            Total_ip: Math.floor(Math.random() * 91) + 10
        });
    });
});

const Kmc_AllIpDeptWise = () => {
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
            const filtered = deptDetailArr.filter(({ IP_date }) => {
                const visitDate = parseISO(IP_date);
                return isWithinInterval(visitDate, { start: rangeStart, end: rangeEnd });
            });

            const grouped = filtered.reduce((acc, item) => {
                if (!acc[item.dept_id]) {
                    acc[item.dept_id] = {
                        dept_name: item.dept_name,
                        Total_ip: 0
                    };
                }
                acc[item.dept_id].Total_ip += item.Total_ip || 0;
                return acc;
            }, {});

            const sorted = Object.values(grouped).sort((a, b) => b.Total_ip - a.Total_ip);
            const totalOps = sorted.map(d => d.Total_ip);
            const departments = sorted.map(d => d.dept_name);

            return {
                labels: totalOps.map(String),
                datasets: [{
                    label: "Total IP Count",
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
            console.error("Error filtering department data:", error);
            return {
                labels: [],
                datasets: [{
                    label: "Total IP Count",
                    data: [],
                    backgroundColor: '#A8AACC',
                    borderColor: 'rgba(96, 94, 163, 1)',
                    borderWidth: 1,
                    datalabels: {}
                }]
            };
        }
    }, [deptDetailArr]);

    const handlePeriodChange = useCallback((period) => {
        try {
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
                setFromDate(format(rangeStart, "yyyy-MM-dd"));
                setToDate(format(rangeEnd, "yyyy-MM-dd"));
                setChartData(filterDeptData(rangeStart, rangeEnd));
            } else {
                console.warn("handlePeriodChange: Invalid date range for period", period);
            }
        } catch (error) {
            console.error("Error in handlePeriodChange:", error);
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: "Total IP Count",
                        data: [],
                        backgroundColor: "#A8AACC",
                        borderColor: "rgba(96, 94, 163, 1)",
                        borderWidth: 1,
                        datalabels: {}
                    }
                ]
            });
        }
    }, [now, filterDeptData]);


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
                    label: (context) => `IP Count: ${context.raw}`
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
                    text: 'Total IP Count'
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
            <CommonGraphRep Chartlayout={Chartlayout} chartData={chartData} options={chartOptions} polarData={chartData} polarOptions={chartOptions} />
        </Box>
    );
};
export default memo(Kmc_AllIpDeptWise);
