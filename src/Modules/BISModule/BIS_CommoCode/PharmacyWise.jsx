import React, { useEffect, memo } from 'react';
import CanvasJS from '@canvasjs/charts';
import { Box } from '@mui/material';

const PharmacyWise = () => {
    useEffect(() => {
        const chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Pharmacy Sales"
            },
            data: [{
                // type: "column",
                dataPoints: [
                    { label: "OP", y: 10 },
                    { label: "IP", y: 15 },
                    { label: "OT", y: 25 },
                    { label: "Casuality", y: 30 },
                    { label: "Lobby", y: 28 },
                    { label: "Pharmacy 6", y: 18 },
                    { label: "OP", y: 35 },
                    { label: "Pharmacy 8", y: 55 },
                    { label: "Pharmacy 9", y: 10 },
                    { label: "Casuality", y: 18 },
                    { label: "Pharmacy 11", y: 50 },
                    { label: "IP ", y: 35 },
                    { label: "Pharmacy 13", y: 25 },
                    { label: "Pharmacy 14", y: 50 },
                    { label: "Pharmacy 15", y: 38 },
                    { label: "Pharmacy 16", y: 45 },
                    { label: "Pharmacy 17", y: 29 },
                    { label: "Lobby", y: 40 },
                    { label: "Pharmacy 19", y: 12 },
                    { label: "Pharmacy 20", y: 28 }
                ]
            }]
        });

        chart.render();
        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div >
            <Box>
                <div id="chartContainer" style={{ height: "300px", width: "100%" }}></div>
            </Box>
        </div>
    );
};

export default memo(PharmacyWise);
