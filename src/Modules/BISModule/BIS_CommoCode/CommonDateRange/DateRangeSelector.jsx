// components/DateRangeSelector.js
import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import React, { memo } from 'react';

const DateRangeSelector = ({
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    onPeriodChange
}) => {
    const labels = ['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'];

    return (
        <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1 }}>
            <ButtonGroup aria-label="date range selector" sx={{
                '--ButtonGroup-radius': '30px',
                display: "flex",
                flexWrap: { sm: "wrap", xl: 'nowrap' },
                p: 0,
                size: "sm"
            }}>
                {labels.map((label, index) => (
                    <Button key={label} onClick={() => index < 4 && onPeriodChange(index + 2)}>
                        {index === 4 ? (
                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                <Input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => {
                                        setFromDate(e.target.value);
                                        onPeriodChange(6); // period 6 = custom
                                    }}
                                    size='xs'
                                    sx={{ p: 0.5, color: 'grey' }}
                                />
                                <Input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => {
                                        setToDate(e.target.value);
                                        onPeriodChange(6);
                                    }}
                                    size='xs'
                                    sx={{ p: 0.5, color: 'grey' }}
                                    slotProps={{ input: { min: fromDate } }}
                                />
                            </Box>
                        ) : (
                            <Typography sx={{
                                fontSize: 11,
                                color: "rgba(var(--input-font-color))",
                                '&:hover': {
                                    color: 'rgba(var(--font-black))',
                                    backgroundColor: 'transparent',
                                }
                            }}>{label}</Typography>
                        )}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default memo(DateRangeSelector);

