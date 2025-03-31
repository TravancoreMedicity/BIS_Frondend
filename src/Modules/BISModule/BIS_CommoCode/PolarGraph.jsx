
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale } from 'chart.js';
import { Typography } from '@mui/joy';

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale);

const PolarChart = ({ salesData, xAxisData }) => {
    // Ensure salesData is in the expected format
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
            <Typography sx={{ textAlign: 'center' }}>Polar Chart</Typography>
            <PolarArea data={data}
                options={options}
                style={{ width: 500, maxHeight: 400 }} />
            {/* // style={{ maxHeight: '800px', maxWidth: '100%' }} */}



        </div>
    );
};

export default PolarChart;





// import React from 'react';
// import { PolarArea } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale } from 'chart.js';
// import { Typography } from '@mui/joy';

// ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale, CategoryScale);

// const PolarChart = () => {
//     const data = {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
//         datasets: [
//             {
//                 label: 'My Polar Chart',
//                 data: [12, 19, 3, 5, 2],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//         },
//     };

//     return (
//         <div>
//             <Typography sx={{ textAlign: "center" }}>Polar Chart</Typography>
//             <PolarArea data={data} options={options} style={{ maxHeight: "800px", maxWidth: "100%" }} />
//         </div>
//     );
// };

// export default PolarChart;