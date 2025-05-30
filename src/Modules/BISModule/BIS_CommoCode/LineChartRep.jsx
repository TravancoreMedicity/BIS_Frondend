import { Box } from '@mui/joy';
import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Filler,
    TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register ChartJS components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Filler,
    TimeScale // Register the time scale
);

const LineChartRep = ({ datasets, xAxisLabels }) => {
    // Convert simple array to proper dataset format if needed
    const formattedDatasets = Array.isArray(datasets) && typeof datasets[0] !== 'object'

        ? [{
            label: 'Data',
            data: datasets,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.4,
            borderWidth: 2,
            fill: false,
            pointRadius: 5
        }]
        : datasets;

    const chartData = {
        labels: xAxisLabels,
        datasets: formattedDatasets || []
    };

    console.log("formattedDatasets", formattedDatasets);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Data Line Chart',
            },
        },
        scales: {
            x: {
                type: 'time', // Use time scale for x-axis
                time: {
                    parser: 'yyyy-MM-dd',
                    tooltipFormat: 'MMM dd',
                    unit: 'day'
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0 // Show whole numbers only
                }
            }
        }
    };

    return (
        <Box sx={{ width: "100%", margin: '0 auto' }}>
            <Line
                data={chartData}
                options={options}
                style={{ width: '100%', maxHeight: 305 }}
            />
        </Box>
    );
};

export default memo(LineChartRep);

// *******************************************************************
// import { Box } from '@mui/joy';
// import React, { memo } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//     CategoryScale,
//     LineElement,
//     PointElement,
//     LinearScale,
//     Filler
// } from 'chart.js';

// ChartJS.register(
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//     CategoryScale,
//     LineElement,
//     PointElement,
//     LinearScale,
//     Filler
// );

// const LineChartRep = ({ datasets, xAxisLabels }) => {
//     console.log("datasets", datasets);
//     console.log("xAxisLabels", xAxisLabels);

//     // Default colors if not provided in dataset
//     const defaultColors = [
//         { border: 'rgb(54, 162, 235)', background: 'rgba(54, 162, 235, 0.5)' },
//         { border: 'rgb(255, 99, 132)', background: 'rgba(255, 99, 132, 0.5)' },
//         { border: 'rgb(75, 192, 192)', background: 'rgba(75, 192, 192, 0.5)' },
//         { border: 'rgb(153, 102, 255)', background: 'rgba(153, 102, 255, 0.5)' },
//         { border: 'rgb(255, 159, 64)', background: 'rgba(255, 159, 64, 0.5)' },
//         { border: 'rgb(255, 205, 86)', background: 'rgba(255, 205, 86, 0.5)' },
//     ];

//     // Prepare chart data from props
//     const chartData = {
//         labels: xAxisLabels || [],
//         datasets: datasets?.map((dataset, index) => ({
//             label: dataset.label || `Dataset ${index + 1}`,
//             data: dataset.data || [],
//             borderColor: dataset.borderColor || defaultColors[index % defaultColors.length].border,
//             backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length].background,
//             fill: dataset.fill !== undefined ? dataset.fill : true,
//             tension: dataset.tension || 0.4,
//             pointRadius: dataset.pointRadius || 3,
//             borderWidth: dataset.borderWidth || 2,
//         })) || []
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Monthly Data Line Chart',
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: false,
//                 grid: {
//                     drawBorder: false,
//                 },
//             },
//             x: {
//                 grid: {
//                     display: false,
//                 },
//             },
//         },
//     };

//     return (
//         <Box sx={{ width: "100%", margin: '0 auto' }}>
//             <Line
//                 data={chartData}
//                 options={options}
//                 style={{ width: '100%', maxHeight: 305 }}
//             />
//         </Box>
//     );
// };

// export default memo(LineChartRep);


// ***************************************************




// import { Box } from '@mui/joy'
// import React, { memo } from 'react'
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LineElement,
//     PointElement,
//     LinearScale,
//     Filler
// } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale,
//     LineElement,
//     PointElement,
//     LinearScale,
//     Filler
// );

// const LineChartRep = ({ salesData, xAxisData }) => {
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             customCanvasBackgroundColor: {
//                 color: 'green',
//             },
//             title: {
//                 display: true,
//                 text: 'Monthly Data Line Chart',
//             },
//         },
//         // animations: {
//         //     tension: {
//         //         duration: 1000,
//         //         easing: 'linear',
//         //         from: 1,
//         //         to: 0,
//         //         loop: true
//         //     }
//         // },

//     };


//     const Datas = {
//         labels: xAxisData,
//         // datasets: [
//         //     {
//         //         label: 'Sales',
//         //         data: salesData,
//         //         borderColor: '#F7CFD8',
//         //         backgroundColor: 'rgba(247, 207, 216, 0.2)',
//         //         fill: true,
//         //         tension: 0.4
//         //     },
//         // ],
//         datasets: [
//             {
//                 label: 'New Registration',
//                 data: [12000, 13500, 11000, 14500, 9000, 13000, 12500],
//                 borderColor: 'rgb(54, 162, 235)',
//                 backgroundColor: 'rgba(44, 80, 103, 0.5)',
//                 barThickness: 30,
//             },
//             {
//                 label: 'Revist',
//                 data: [1500, 1200, 1100, 1300, 900, 1100, 950],
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgba(70, 56, 60, 0.45)',
//                 barThickness: 30,
//             },
//             {
//                 label: 'OP Patients',
//                 data: [10500, 12300, 10200, 13200, 8100, 11900, 11550],
//                 borderColor: 'rgb(75, 192, 192)',
//                 backgroundColor: 'rgba(74, 95, 95, 0.79)',
//                 barThickness: 30,
//             }]
//     };


//     return (
//         <div>
//             <Box sx={{ width: "100%", margin: '0 auto' }}>
//                 <Line data={Datas} options={options} style={{ width: '100%', maxHeight: 305 }} />
//             </Box>
//         </div>
//     )
// }

// export default memo(LineChartRep)

