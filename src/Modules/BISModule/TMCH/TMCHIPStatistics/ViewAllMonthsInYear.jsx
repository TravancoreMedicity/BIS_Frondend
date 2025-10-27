import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Helper for month labels
const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ViewAllMonthsInYear = () => {
    const { year } = useParams();
    const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));

    // Mock function to simulate API or data fetch
    const fetchMonthlyIpCount = async (year) => {
        // Example: returns random counts for demo
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 500));
        return data;
    };

    useEffect(() => {
        if (year) {
            fetchMonthlyIpCount(year).then(data => {
                setMonthlyData(data);
            });
        }
    }, [year]);

    const chartData = {
        labels: monthLabels,
        datasets: [
            {
                label: `Total IP Count - ${year}`,
                data: monthlyData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: `Monthly Total IP Count - ${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'IP Count' }
            }
        }
    };

    return (
        <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default memo(ViewAllMonthsInYear);
