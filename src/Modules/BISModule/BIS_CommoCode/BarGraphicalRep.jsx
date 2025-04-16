import React, { Fragment, memo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarGraphicalRep = ({ salesData, xAxisData }) => {

    const data = {
        labels: xAxisData,
        // datasets: [
        //     {
        //         label: 'Sales Graph',
        //         data: salesData,
        //         borderColor: 'rgb(208, 219, 227)',
        //         backgroundColor: 'rgba(155, 173, 178, 0.75)',
        //         barThickness: 40,
        //         color: 'rgb(var(--graph-font-clr))'
        //     },
        // ],
        datasets: [
            {
                label: 'New Registration',
                data: [12000, 13500, 11000, 14500, 9000, 13000, 12500],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(44, 80, 103, 0.5)',
                barThickness: 30,
            },
            {
                label: 'Revist',
                data: [1500, 1200, 1100, 1300, 900, 1100, 950],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(70, 56, 60, 0.45)',
                barThickness: 30,
            },
            {
                label: 'OP Patients',
                data: [10500, 12300, 10200, 13200, 8100, 11900, 11550],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(74, 95, 95, 0.79)',
                barThickness: 30,
            }]
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
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Pharmacy Sales',
                color: 'rgb(var(--graph-font-clr))'
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                // color: 'black',
                color: 'rgb(var(--graph-font-clr))',
                align: 'top',
                anchor: 'top',
                font: {
                    weight: 'bold',
                    size: 12,
                },
                rotation: 270,
                formatter: (value, context) => context.chart.data.labels[context.dataIndex], // Display xAxisData (dates) on the bars
            },
        },
    };

    return (
        <Fragment>
            <Bar data={data} options={options} style={{ width: '100%', maxHeight: 335 }} />
        </Fragment>
    );
};

export default memo(BarGraphicalRep);




