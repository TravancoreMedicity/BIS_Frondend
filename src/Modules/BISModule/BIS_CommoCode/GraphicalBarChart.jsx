import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphicalBarChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, -5, 2, 52, 10, 42, 14, 55, 16, 20],
                backgroundColor: 'rgba(205, 119, 119, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 10,
                barThickness: 40,
            },
            {
                label: 'Dataset 2',
                data: [10, 15, 7, 3, 8, 12, 19, 3, -5, 2, 52, 10],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgb(7, 90, 105)',
                borderWidth: 1,
                borderRadius: 10,
                barThickness: 40,
            }
        ]
    };

    const options = {
        responsive: true,
        indexAxis: 'x',
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Comparison of Two Datasets',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div>
            <h2>Bar Chart with Border Radius</h2>
            <Bar data={data} options={options} style={{ width: 500, maxHeight: 400 }} />
        </div>
    );
};

export default memo(GraphicalBarChart);
