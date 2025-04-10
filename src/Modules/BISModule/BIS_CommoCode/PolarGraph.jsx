
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale);

const PolarChart = ({ salesData, xAxisData }) => {
    const data = {
        labels: xAxisData,
        datasets: [
            {
                label: 'Sales Data',
                data: salesData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            r: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <PolarArea data={data}
                options={options}
                style={{ width: 500, maxHeight: 310 }} />
        </div>
    );
};

export default PolarChart;
