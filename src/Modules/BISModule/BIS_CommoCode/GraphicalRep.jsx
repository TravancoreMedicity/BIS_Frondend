import React, { memo } from 'react';
import { Box } from '@mui/joy';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Tooltip } from '@mui/material';
import PieChartTwoToneIcon from '@mui/icons-material/PieChartTwoTone';
import InsertChartTwoToneIcon from '@mui/icons-material/InsertChartTwoTone';

const GraphicalRep = ({ seChartlayout }) => {

    return (
        <div>
            <Box sx={{ width: 150, border: 1, borderRadius: 10, borderColor: "#B2C6D5", p: 0, height: 'auto' }}>
                <Box sx={{ width: '100%', height: '100%', display: "flex", flexDirection: "row", p: 0, height: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '33%', display: "flex", borderRight: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }} onClick={() => seChartlayout(1)}>
                        <Tooltip title="Bar Chart">
                            <InsertChartTwoToneIcon sx={{ color: "#73946B", fontSize: 20, cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>

                    <Box sx={{ width: '33%', display: "flex", textAlign: "center", borderRight: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }} onClick={() => seChartlayout(2)}>
                        <Tooltip title="Line Chart">
                            <ShowChartIcon sx={{ color: "#85193C", fontSize: 20 }} />
                        </Tooltip>
                    </Box>

                    <Box sx={{ width: '33%', display: "flex", textAlign: "center", height: '100%', alignItems: 'center', justifyContent: 'center' }} onClick={() => seChartlayout(3)}>
                        <Tooltip title="Pie Chart">
                            <PieChartTwoToneIcon sx={{ color: "#410445", fontSize: 20 }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </div >
    );
};
export default memo(GraphicalRep);

