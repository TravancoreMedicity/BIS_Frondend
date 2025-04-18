import React, { memo } from 'react';
import { TextField, MenuItem } from '@mui/material';

const SelectGraphicalView = ({ Chartlayout, seChartlayout }) => {
    return (
        <div>
            <TextField
                size="small"
                select

                sx={{
                    width: 75,
                    '& .MuiInputBase-root': {
                        color: 'rgb(var(--graph-font-clr))',
                        fontSize: '12px', // <-- Adjust this value to decrease font size
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgb(var(--graph-font-clr))',
                        fontSize: '12px', // <-- Label font size
                    },
                    '& .MuiSelect-select': {
                        fontSize: '12px', // <-- This targets the select's displayed value
                    },
                    '& .MuiMenuItem-root': {
                        fontSize: '12px', // <-- This would affect dropdown items (may need MenuProps)
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
                    textAlign: "center",
                    border: 0.1,
                    borderRadius: 1,
                    borderColor: 'rgba(var(--font-light))',
                }}
                value={Chartlayout}
                onChange={(event) => seChartlayout(event.target.value)}
            >

                <MenuItem
                    value="1"
                    sx={{
                        fontSize: '12px',
                        color: 'rgb(var(--graph-font-clr))',
                        backgroundColor: 'rgba(var(--graph-bg-color))',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                            fontSize: '12px'
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                        },
                    }}
                >
                    Bar
                </MenuItem>
                <MenuItem
                    value="2"
                    sx={{
                        fontSize: '12px',
                        color: 'rgb(var(--graph-font-clr))',
                        backgroundColor: 'rgba(var(--graph-bg-color))',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                            fontSize: '12px'
                        },
                    }}
                >
                    Line
                </MenuItem>
                <MenuItem
                    value="3"
                    sx={{
                        fontSize: '12px',
                        color: 'rgb(var(--graph-font-clr))',
                        backgroundColor: 'rgba(var(--graph-bg-color))',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            color: 'black',
                            fontSize: '12px'
                        },
                    }}
                >
                    Pie
                </MenuItem>
            </TextField>
        </div>
    );
};

export default memo(SelectGraphicalView);
