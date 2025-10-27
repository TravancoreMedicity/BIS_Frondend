import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Select, Option, Typography } from '@mui/joy';
import {
    eachMonthOfInterval,
    format
} from 'date-fns';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import GraphicalRep from '../../../BIS_CommoCode/GraphicalRep';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    ChartDataLabels
);

const DeptNewPatientCount = () => {
    const [Chartlayout, seChartlayout] = useState(1);
    const [selectedYear, setSelectedYear] = useState('all');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const doctors = useMemo(
        () => Array.from({ length: 5 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    const doctorOPStats = useMemo(() => {
        const stats = [];
        const start = new Date('2020-01-01');
        const end = new Date();
        doctors.forEach((doctorName) => {
            let current = new Date(start);
            while (current <= end) {
                stats.push({
                    doctorName,
                    date: format(current, 'yyyy-MM-dd'),
                    totalRevisit: Math.floor(Math.random() * 20) + 5,
                    totalRegistration: Math.floor(Math.random() * 40) + 10,
                });
                current.setDate(current.getDate() + 1);
            }
        });
        return stats;
    }, [doctors]);

    const yearsList = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear; y >= 2020; y--) {
            years.push(y);
        }
        return years;
    }, []);

    const updateChartData = useCallback((year) => {
        if (year === 'all') {
            const currentYear = new Date().getFullYear();
            const years = [];
            const yearlyRevisit = [];
            const yearlyRegistration = [];

            for (let y = 2020; y <= currentYear; y++) {
                years.push(y);
                const revisitSum = doctorOPStats.reduce((sum, entry) => {
                    const entryDate = new Date(entry.date);
                    return entryDate.getFullYear() === y ? sum + entry.totalRevisit : sum;
                }, 0);
                const registrationSum = doctorOPStats.reduce((sum, entry) => {
                    const entryDate = new Date(entry.date);
                    return entryDate.getFullYear() === y ? sum + entry.totalRegistration : sum;
                }, 0);

                yearlyRevisit.push(revisitSum);
                yearlyRegistration.push(registrationSum);
            }

            setChartData({
                labels: years.map(String),
                datasets: [
                    {
                        label: 'Total New Registration',
                        data: yearlyRevisit,
                        borderColor: '#9AD0F5',
                        backgroundColor: '#9AD0F5',
                    },
                ],
            });
        } else {
            const months = eachMonthOfInterval({
                start: new Date(year, 0, 1),
                end: new Date(year, 11, 31),
            });

            const labels = months.map((month) => format(month, 'MMM'));
            const monthlyRevisit = Array(12).fill(0);
            const monthlyRegistration = Array(12).fill(0);

            doctorOPStats.forEach((entry) => {
                const date = new Date(entry.date);
                if (date.getFullYear() === year) {
                    const monthIndex = date.getMonth();
                    monthlyRevisit[monthIndex] += entry.totalRevisit;
                    monthlyRegistration[monthIndex] += entry.totalRegistration;
                }
            });

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Total Visit',
                        data: monthlyRegistration,
                        borderColor: '#9AD0F5',
                        backgroundColor: '#9AD0F5',
                    },
                ],
            });
        }
    }, [doctorOPStats]);

    useEffect(() => {
        updateChartData(selectedYear);
    }, [selectedYear, updateChartData]);

    const transformToLineChartData = (data) => ({
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: dataset.backgroundColor.replace('0.5', '0.2'),
            fill: false,
            borderWidth: 2,
            tension: 0.4,
        })),
        plugins: {
            datalabels: {
                anchor: 'center',
                align: 'center',
                rotation: -90,
                color: '#333',
                font: {
                    size: 12,
                },
                formatter: (value) => value,
            },
        },
    });

    const transformToPolarData = (data) => {
        const labels = data.datasets.map((d) => d.label);
        const summedData = data.datasets.map((d) => d.data.reduce((a, b) => a + b, 0));
        return {
            labels,
            datasets: [
                {
                    data: summedData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            datalabels: {
                anchor: 'center',
                align: 'center',
                rotation: -90,
                color: '#333',
                font: {
                    size: 12,
                },
                formatter: (value) => value,
            },
        },
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'bottom',
                rotation: -90,
                color: '#333',
                font: {
                    size: 12,
                },
                formatter: (value) => value,
            },
        },
    };

    return (
        <Box sx={{ flex: 1, height: '100%', width: "100%" }}>
            <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <Box sx={{ border: 1, p: 2, borderColor: '#dbe0e9ff', flex: 1, minWidth: 0 }}>
                        <Typography sx={{ textAlign: 'center', fontSize: 20, mb: 2 }}>
                            Year Wise New Patient Count
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mt: 3, gap: 2 }}>
                            <Box>
                                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                            </Box>
                            <Box sx={{ width: { xs: '100%', sm: 150 } }}>
                                <Select
                                    value={selectedYear}
                                    onChange={(_, val) => setSelectedYear(val)}
                                >
                                    <Option value="all">All Years</Option>
                                    {yearsList.map((year) => (
                                        <Option key={year} value={year}>
                                            {year}
                                        </Option>
                                    ))}
                                </Select>
                            </Box>
                        </Box>

                        <Box sx={{ height: 392, width: '100%', mt: 5 }}>
                            {Chartlayout === 1 ? (
                                <Bar data={chartData} options={barChartOptions} plugins={[ChartDataLabels]} />
                            ) : Chartlayout === 2 ? (
                                <Line
                                    data={transformToLineChartData(chartData)}
                                    options={lineChartOptions}
                                    plugins={[ChartDataLabels]}
                                />
                            ) : (
                                <PolarArea data={transformToPolarData(chartData)} options={{ responsive: true }} />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(DeptNewPatientCount);
