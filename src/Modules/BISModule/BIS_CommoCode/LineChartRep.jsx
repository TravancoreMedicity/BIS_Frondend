import { Box, Typography } from '@mui/joy'
import { LineChart } from '@mui/x-charts'
import React, { memo } from 'react'

const LineChartRep = ({ salesData, xAxisData }) => {
    // console.log("salesData",salesData, xAxisData);
    // console.log("salesData, xAxisData",salesData, xAxisData);


    return (
        <div>
            <Box sx={{ width: "100%", maxWidth: '1200px', margin: '0 auto' }}> {/* Define max width */}
                <Typography sx={{ textAlign: "center" }}>Line Chart</Typography>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    style={{ width: "100%", height: 400 }} // Ensure full width of the parent container
                />
            </Box>
        </div>
    )
}

export default memo(LineChartRep)

//jomol (28-03-2024)- 01:10 PM
// import { Box, Typography } from '@mui/joy';
// import { LineChart } from '@mui/x-charts';
// import React, { memo } from 'react';

// const LineChartRep = ({ salesData, xAxisData }) => {
//     console.log("salesData", salesData);
//     console.log("xAxisData", xAxisData);

//     const dataRep = {
//         xAxis: xAxisData,
//         series: [
//             {
//                 data: salesData,
//                 label: 'Sales Data',
//             },
//         ],
//     };

//     return (
//         <div>
//             <Box sx={{ width: "100%", maxWidth: '1200px', margin: '0 auto' }}>
//                 <Typography sx={{ textAlign: "center" }}>Line Chart</Typography>
//                 <LineChart
//                     xAxis={[{ data: dataRep.xAxis }]}
//                     series={dataRep.series}
//                     // series={dataRep.series}
//                     sx={{ width: "100%", height: 400 }}
//                 />
//             </Box>
//         </div>
//     );
// };

// export default memo(LineChartRep);

// ***************************************

// import { Typography } from '@mui/joy';
// import { LineChart } from '@mui/x-charts';
// import React, { memo } from 'react';

// const LineChartRep = ({ salesDat = [], xAxisData = [] }) => {
//     // console.log("salesDat", salesDat);
//     console.log("xAxisData", xAxisData);


//     // Check if the data is valid
//     if (!Array.isArray(salesDat) || salesDat.length === 0) {
//         console.error('Sales data is empty or not an array!');
//         return <Typography sx={{ textAlign: 'center', color: 'red' }}>No Data Available</Typography>;
//     }



//     return (
//         <div>
//             <Typography sx={{ textAlign: 'center' }}>Line Chart</Typography>
//             <LineChart
//                 xAxis={[{ data: xAxisData }]}
//                 // series={formattedSalesDat} // Ensure data is formatted correctly
//                 series={[
//                     {
//                         data: salesDat,
//                     },
//                 ]}
//                 width={1900}
//                 height={300}
//             />
//         </div>
//     );
// };

// export default memo(LineChartRep);


