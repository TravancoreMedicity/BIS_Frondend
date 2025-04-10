import React, { memo } from 'react';
import { TextField, MenuItem } from '@mui/material';

const SelectGraphicalView = ({ Chartlayout, seChartlayout }) => {
    return (
        <div>
            <TextField
                size="small"
                select
                sx={{
                    minWidth: 150,
                    '& .MuiInputBase-root': {
                        color: 'rgb(var(--graph-font-clr))',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgb(var(--graph-font-clr))',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: 'black',
                    },
                    '@media (max-width:600px)': {
                        minWidth: '120px',
                    },
                    '@media (max-width:400px)': {
                        minWidth: '100px',
                    },
                }}
                label="Graphical view"
                value={Chartlayout}
                onChange={(event) => seChartlayout(event.target.value)}
                style={{
                    borderColor: 'red',
                }}
            >
                <MenuItem
                    value="1"
                    sx={{
                        color: 'rgb(var(--graph-font-clr))',
                        backgroundColor: 'rgba(var(--graph-bg-color))',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                        },
                    }}
                >
                    Bar Chart
                </MenuItem>
                <MenuItem
                    value="2"
                    sx={{
                        color: 'rgb(var(--graph-font-clr))',
                        backgroundColor: 'rgba(var(--graph-bg-color))',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                        },
                    }}
                >
                    Line Chart
                </MenuItem>
                <MenuItem
                    value="3"
                    sx={{
                        color: 'rgb(var(--graph-font-clr))',
                        backgroundColor: 'rgba(var(--graph-bg-color))',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                        },
                    }}
                >
                    Pie Chart
                </MenuItem>
            </TextField>
        </div>
    );
};

export default memo(SelectGraphicalView);
