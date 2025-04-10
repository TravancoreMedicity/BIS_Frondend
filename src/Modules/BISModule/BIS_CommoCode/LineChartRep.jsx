import { Box } from '@mui/joy'
import React, { memo } from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement,
    PointElement,
    LinearScale,
    Filler
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Filler
);

const LineChartRep = ({ salesData, xAxisData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            customCanvasBackgroundColor: {
                color: 'green',
            },
            title: {
                display: true,
                text: 'Monthly Data Line Chart',
            },
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },

    };


    const Datas = {
        labels: xAxisData,
        datasets: [
            {
                label: 'Sales',
                data: salesData,
                borderColor: '#F7CFD8',
                backgroundColor: 'rgba(247, 207, 216, 0.2)',
                fill: true,
                tension: 0.4
            },
        ],
    };


    return (
        <div>
            <Box sx={{ width: "100%", margin: '0 auto' }}>
                <Line data={Datas} options={options} style={{ width: '100%', maxHeight: 305 }} />
            </Box>
        </div>
    )
}

export default memo(LineChartRep)

