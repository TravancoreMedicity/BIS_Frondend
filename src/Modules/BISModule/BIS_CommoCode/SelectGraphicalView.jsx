import React, { memo } from 'react'
import { TextField, MenuItem } from '@mui/material';  // Ensure consistent MUI imports
import { Box } from '@mui/joy';


const SelectGraphicalView = ({ Chartlayout, seChartlayout }) => {

    return (
        <div> <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
            <TextField
                size='small'
                select
                sx={{ minWidth: 150 }}
                label="Graphical view"
                value={Chartlayout}
                onChange={(event) => seChartlayout(event.target.value)}
                style={{ borderRadius: 55, borderColor: "red" }}
                color="tertry"
            >
                <MenuItem value="1">Bar Chart</MenuItem>
                <MenuItem value="2">Line Chart</MenuItem>
                <MenuItem value="3">Pie Chart</MenuItem>
            </TextField>
        </Box></div>
    )
}

export default memo(SelectGraphicalView) 