import React, { memo } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
} from 'chart.js'
import { Box, Typography } from '@mui/joy'

// Registering the necessary components of Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
)

const ComboChart = () => {

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Line Dataset',
                data: [35, 44, 24, 51, 6, 49, 15, 25, 30, 35, 44, 24],
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                tension: 0.1,
                type: 'line'
            },
            {
                label: 'Bar Dataset',
                data: [20, 30, 40, 50, 60, 70, 80, 60, 70, 25, 50, 30],
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                type: 'bar'
            }
        ]
    };

    return (
        <div>
            <Typography sx={{ textAlign: "center" }}>Combo Chart</Typography>
            <Box style={{ mt: 5, height: 350 }}>
                <Line data={chartData} style={{ width: 1000, maxHeight: 400 }} />
            </Box>
        </div>
    )
}

export default memo(ComboChart)
