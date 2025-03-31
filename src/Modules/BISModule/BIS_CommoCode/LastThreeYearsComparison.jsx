import { LineChart } from '@mui/x-charts';
import React, { memo } from 'react';

const LastThreeYearsComparison = () => {
    // Data for the chart, xAxis and series
    const data = {
        xAxis: {
            data: ["Jan", "Feb", "Mar", "Apr", "May"], // Labels for x-axis
        },
        series: [
            {
                label: 'Dataset', // Label for the series
                data: [52, 26, 35, 12, 40], // Values corresponding to the x-axis
                borderColor: 'red', // Optional: Customize the line color
                fill: false, // Optional: Disable fill under the line
            }
        ]
    };
    // console.log(data);


    return (
        <div>
            <h3>Last Three Years Comparison Chatr</h3>
            <LineChart
                data={data}
                style={{ width: "100%", height: 400 }} // Ensures full width of the parent container
            />
        </div>
    );
};

export default memo(LastThreeYearsComparison);
