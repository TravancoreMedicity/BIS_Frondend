import { Box, Grid } from '@mui/joy';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    addDays,
    format,
    isWithinInterval,
    startOfWeek,
    subDays,
    subWeeks
} from 'date-fns';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
} from 'chart.js';
import { useLocation } from 'react-router-dom';
import DefaultPageLayout from '../../../Components/DefaultPageLayout';
import GraphicalRep from '../BIS_CommoCode/GraphicalRep';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const GeneralBillingSectn = () => {
    const location = useLocation();
    const { datefrm, dateto } = location.state || {};

    const departments = [
        "Bloodcenter", "Cadiology", "Casuality", "Dermatology", "Endocrynology", "Ent",
        "Gastro Medicine", "Gastro Surgery", "KIOSK", "MRI", "Nephro", "Neuro Medicine",
        "Neuro Surgery", "Obj", "Oncology", "Opthamology", "Ortho", "Paediatrics", "Pain Clinic",
        "Physical Medicine", "Physiotherapy", "Plastic Surgery", "Priority Clinic", "Psychiatry",
        "Pulmo", "Reproductive Medicine", "Rhematology", "Surgery", "TDC", "Urology"
    ];

    const departmentStats = useMemo(() => {
        return departments.map(dept => {
            const op = Math.floor(Math.random() * 500) + 50;
            const ip = Math.floor(Math.random() * 300) + 20;
            const total = op + ip;
            const daysAgo = Math.floor(Math.random() * 30);
            const date = format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
            return {
                department: dept,
                date,
                op,
                ip,
                total
            };
        });
    }, []);

    const [fromDate, setFromDate] = useState(datefrm);
    const [toDate, setToDate] = useState(dateto);
    const [chartData, setChartData] = useState(null);
    const [Chartlayout, seChartlayout] = useState(1);

    const filteredStats = useMemo(() => {
        if (!fromDate || !toDate) return [];

        const from = new Date(fromDate);
        const to = new Date(toDate);

        return departmentStats.filter(stat =>
            isWithinInterval(new Date(stat.date), { start: from, end: to })
        );
    }, [departmentStats, fromDate, toDate]);

    useEffect(() => {
        if (!filteredStats.length) return;

        const labels = filteredStats.map(item => item.department);
        const opData = filteredStats.map(item => item.op);
        const ipData = filteredStats.map(item => item.ip);
        const total = filteredStats.map(item => item.ip + item.op);

        const data = {
            labels,
            datasets: [
                {
                    label: 'Total Bill',
                    data: total,
                    backgroundColor: 'rgba(29, 69, 122, 0.5)',
                    borderColor: 'rgba(96, 94, 163, 1)',
                    borderWidth: 1
                },
                {
                    label: 'OP Bill',
                    data: opData,
                    backgroundColor: 'rgba(96, 94, 163, 0.5)',
                    borderColor: 'rgba(96, 94, 163, 1)',
                    borderWidth: 1
                },
                {
                    label: 'IP Bill',
                    data: ipData,
                    backgroundColor: 'rgba(12, 132, 162, 0.5)',
                    borderColor: 'rgba(12, 132, 162, 1)',
                    borderWidth: 1
                }
            ]
        };

        setChartData(data);
    }, [filteredStats]);

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
            datalabels: {
                color: 'black',
                font: { weight: 'bold', size: 11 },
                // formatter: (value, ctx) => {
                //     const datasetLabel = ctx.dataset.label;
                //     if (datasetLabel === 'Total OP') {
                //         return chartData.doctorNames?.[ctx.dataIndex] || '';
                //     }
                //     return value;
                // },
                anchor: 'center',
                align: 'end',
                display: true,
                rotation: -90
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                ticks: { font: { size: 10 } },
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                ticks: { font: { size: 10 } }
            }
        }
    }), []);

    const lineOptions = {
        ...barOptions,
        elements: {
            line: { tension: 0.4, borderWidth: 2 },
            point: { radius: 4, backgroundColor: 'rgba(96, 94, 163, 1)' }
        }
    };

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
        const values = data.datasets.map(ds => ds.data.reduce((sum, val) => sum + val, 0));
        return {
            labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(63, 42, 101, 0.5)'
                ],
                borderWidth: 1
            }]
        };
    }, []);

    return (
        <Box>
            <DefaultPageLayout label="General Billing">
                <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
                    <Box sx={{ width: '100%', overflow: 'auto', mt: 2, p: 2 }}>
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
                            <Box sx={{ mt: 2 }}>
                                <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 2, height: 350 }}>
                            {Chartlayout === 1 && chartData && (
                                <Bar data={chartData} options={barOptions} height={350} />
                            )}
                            {Chartlayout === 2 && chartData && (
                                <Line data={transformToLineChartData(chartData)} options={lineOptions} height={350} />
                            )}
                            {Chartlayout === 3 && chartData && (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
                                    <PolarArea data={transformToPolarData(chartData)} height={300} width={300} />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </DefaultPageLayout>
        </Box>
    );
};

export default memo(GeneralBillingSectn);
