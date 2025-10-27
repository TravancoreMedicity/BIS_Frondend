import { Box } from '@mui/joy';
import React, { memo, useState } from 'react';
import { Bar, Line, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    RadialLinearScale,
    ArcElement
} from 'chart.js';
import GraphicalRep from '../../BIS_CommoCode/GraphicalRep';
import { useNavigate } from 'react-router-dom';
import { barOptions } from '../../BIS_CommoCode/CommonDateRange/ChartCommonFuns/ChartCommonFun';
import CommonGraphRep from '../../BIS_CommoCode/CommonGraphRep';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend,
    RadialLinearScale,
    ArcElement
);

const YearlyCount = [
    { year: 2014, total_count: 1500 },
    { year: 2015, total_count: 3500 },
    { year: 2016, total_count: 4852 },
    { year: 2017, total_count: 2000 },
    { year: 2018, total_count: 1236 },
    { year: 2019, total_count: 5000 },
    { year: 2020, total_count: 2369 },
    { year: 2021, total_count: 7125 },
    { year: 2022, total_count: 3698 },
    { year: 2023, total_count: 4000 },
    { year: 2024, total_count: 7523 },
    { year: 2025, total_count: 7895 },

]

const Tmc_IPYearWise = () => {
    const defaultStyle = 1; // 1 = Bar, 3 = PolarArea
    const [Chartlayout, seChartlayout] = useState(defaultStyle);

    const navigate = useNavigate();

    const singleValuePolarData = {
        labels: YearlyCount?.map((val) => val.year),
        datasets: [
            {
                label: 'Total IP Count',
                data: YearlyCount?.map((val) => val.total_count),
                backgroundColor: 'rgba(96, 94, 163, 0.5)',
                borderColor: 'rgba(96, 94, 163, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 15,
                    color: '#333',
                    font: { size: 12 },
                    padding: 20,
                    usePointStyle: true,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            datalabels: {
                // anchor: 'end', // You can also try 'center', 'start'
                align: 'top', // Try 'start', 'end', or 'center'
                color: 'rgba(var(--font-light))',
                font: {
                    size: 10,
                    family: "'Roboto', sans-serif"
                },
                rotation: -90, //  This rotates the label
                formatter: (value) => {
                    return value; // Customize label display if needed
                }
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const selectedYear = YearlyCount[index].year;
                navigate(`/Home/ViewAllMonthsInYear/${selectedYear}`);
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#333',
                    font: { size: 12, family: "'Roboto', sans-serif" },
                    padding: 5,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#333',
                    font: { size: 12, family: "'Roboto', sans-serif" },
                    padding: 5,
                },
            },
        },
        animation: { duration: 1000 },
        elements: {
            bar: {
                borderRadius: 4,
                borderSkipped: false,
            }
        }
    };

    const polarOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true },
        },
        scales: {
            r: {
                angleLines: { display: true },
                ticks: { display: false },
                grid: { display: true },
                suggestedMin: 0,
            },
        },
    };
    // const lineOptions = {
    //     ...options,
    //     elements: {
    //         line: { tension: 0.4, borderWidth: 2 },
    //         point: { radius: 4, backgroundColor: 'rgba(96, 94, 163, 1)' }
    //     }
    // };

    return (
        <Box sx={{ width: { xs: '100%', md: 700, lg: '100%' }, overflow: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", textAlign: "right" }}>
                    <Box sx={{ mt: 2, }}>
                        <GraphicalRep Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                    </Box>
                </Box>
            </Box>

            <CommonGraphRep Chartlayout={Chartlayout} chartData={singleValuePolarData} options={barOptions} polarData={singleValuePolarData} polarOptions={polarOptions} />

        </Box>
    );
};

export default memo(Tmc_IPYearWise);

