import { Box } from '@mui/joy';
import React, { Fragment, memo, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import SelectGraphicalView from '../SelectGraphicalView';
import BarGraphicalRep from '../BarGraphicalRep';
import LineChartRep from '../LineChartRep';
import PolarGraph from '../PolarGraph';
import DateRangeCompAll from '../CommonDateRange/DateRangeCompAll';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverallSalesProgress = () => {

    const [Chartlayout, seChartlayout] = useState(1);
    const [salesData, setSalesData] = useState([]);
    const [xAxisData, setXAxisData] = useState([]);

    return (
        <Fragment>
            <Box sx={{
                p: 0, px: 1.5, height: "100%"
            }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                    <Box sx={{ mt: 1 }}>
                        <DateRangeCompAll setSalesData={setSalesData} setXAxisData={setXAxisData} />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <SelectGraphicalView Chartlayout={Chartlayout} seChartlayout={seChartlayout} />
                    </Box>
                </Box>
                <Box sx={{ mt: 3, width: "100%", }}>
                    {parseInt(Chartlayout) === 1 ?
                        < BarGraphicalRep salesData={salesData} xAxisData={xAxisData} />
                        : parseInt(Chartlayout) === 2 ?
                            <LineChartRep salesData={salesData} xAxisData={xAxisData} />
                            : parseInt(Chartlayout) === 3 ?
                                <PolarGraph salesData={salesData} xAxisData={xAxisData} />
                                : "null"
                    }
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(OverallSalesProgress) 