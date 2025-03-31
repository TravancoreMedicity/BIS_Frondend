import { Box } from '@mui/joy';
import React, { Fragment, memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraphicalRep = ({ salesData, xAxisData }) => {

    const data = {
        labels: xAxisData,
        datasets: [
            {
                label: 'Sales Graph',
                data: salesData,
                backgroundColor: 'rgb(199, 240, 219)',
                borderColor: 'rgba(186, 35, 35, 0.6)',
                borderWidth: 1,
                borderRadius: 10,
                barThickness: 70,
            },
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
                text: 'Pharmacy Sales',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <Fragment>
            <Box >
                <Bar data={data} options={options} style={{ width: 500, maxHeight: 400 }} />
            </Box>
        </Fragment >
    );
};

export default memo(BarGraphicalRep);

