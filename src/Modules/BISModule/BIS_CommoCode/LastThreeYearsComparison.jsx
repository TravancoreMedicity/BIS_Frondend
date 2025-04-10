import { Box, Typography } from '@mui/joy';
import { Bar, Line, Pie } from 'react-chartjs-2';
import React, { memo, useState } from 'react';
import {
    Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement,
    PointElement,
    LinearScale,
    Filler
} from 'chart.js';
import SelectGraphicalView from './SelectGraphicalView';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Filler
);

const LastThreeYearsComparison = () => {
    const [Chartlayout, seChartlayout] = useState(3);

    const data2023 = {
        labels: ['Sales', 'Return', 'Net Amount'],
        datasets: [
            {
                data: [62, 26, 15],
                backgroundColor: ['#F7CFD8', '#A6F1E0', '#5A639C', '#FF5733', '#8E44AD'],
            },
        ],
    };

    const data2024 = {
        labels: ['Sales', 'Return', 'Net Amount'],
        datasets: [
            {
                data: [55, 35, 25],
                backgroundColor: ['#F7CFD8', '#A6F1E0', '#5A639C', '#FF5733', '#8E44AD'],
            },
        ],
    };

    const data2025 = {
        labels: ['Sales', 'Return', 'Net Amount'],
        datasets: [
            {
                data: [60, 30, 40],
                backgroundColor: ['#F7CFD8', '#A6F1E0', '#5A639C', '#FF5733', '#8E44AD'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Data Pie Chart',
            },
        },
    };


    const year2023 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],  // Year labels
        datasets: [
            {
                label: 'Sales',
                data: [35, 44, 24, 51, 6, 49, 15, 25, 30, 35, 44, 24],
                borderColor: 'rgba(238, 233, 234, 0.91)',
                backgroundColor: 'rgba(255, 154, 176,0.25)',
                fill: true,
                tension: 0.4,
            },
        ],
    };


    const year2024 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],  // Year labels
        datasets: [
            {
                label: 'Sales',
                data: [60, 25, 54, 75, 28, 49, 15, 35, 30, 12, 10, 41],
                borderColor: 'rgba(221, 214, 216, 0.91)',
                backgroundColor: 'rgba(67, 78, 156,0.25)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const year2025 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],  // Year labels
        datasets: [
            {
                label: 'Sales',
                data: [20, 10, 50, 13, 80, 20, 35, 10, 12, 65, 17, 50],
                borderColor: 'rgba(233, 223, 225, 0.97)',
                backgroundColor: 'rgba(111,255,221,0.28)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <div>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, width: "100%", mt: 1 }}>
                    <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                </Box>
                {parseInt(Chartlayout) === 3 ? (
                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", mt: 2 }}>
                        <Box sx={{ flex: 1, textAlign: "center", }}>
                            <Typography sx={{ textAlign: "center", flex: 1 }}>2023 Data</Typography>
                            <Pie data={data2023}
                                style={{ width: 300, maxHeight: 300 }}
                            />
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography sx={{ textAlign: "center", flex: 1 }}>2024 Data</Typography>
                            <Pie data={data2024} style={{ width: 300, maxHeight: 300 }} />
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography sx={{ textAlign: "center", flex: 1 }}>2025 Data</Typography>
                            <Pie data={data2025} style={{ width: 300, maxHeight: 300 }} />
                        </Box>
                    </Box>
                ) : parseInt(Chartlayout) === 2 ? (
                    <Box sx={{ px: 4, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography>Line Graph Of 2023</Typography>
                            <Line data={year2023} options={options} style={{ width: 500, maxHeight: 500 }} />
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography>Line Graph Of 2024</Typography>
                            <Line data={year2024} options={options} style={{ width: 500, maxHeight: 500 }} />
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography>Line Graph Of 2025</Typography>
                            <Line data={year2025} options={options} style={{ width: 500, maxHeight: 500 }} />
                        </Box>
                    </Box>
                ) : parseInt(Chartlayout) === 1 ? (
                    <Box sx={{ px: 4, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography>Bar Graph Of 2023</Typography>
                            <Bar data={year2023} options={options} style={{ width: 500, maxHeight: 500 }} />
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography>Bar Graph Of 2024</Typography>
                            <Bar data={year2024} options={options} style={{ width: 500, maxHeight: 500 }} />
                        </Box>
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography>Bar Graph Of 2025</Typography>
                            <Bar data={year2025} options={options} style={{ width: 500, maxHeight: 500 }} />
                        </Box>
                    </Box>
                ) : null}
            </Box>


        </div>
    );
};
export default memo(LastThreeYearsComparison);
