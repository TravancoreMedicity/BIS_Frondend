import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import React from 'react';

const DateFieldCommonComp = ({
    onPeriodChange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    currentPeriod,
    setCurrentPeriod
}) => {

    return (
        <ButtonGroup sx={{ flexWrap: 'wrap', mt: 1 }}>
            {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                <Button
                    key={label}
                    onClick={() => {
                        if (index < 4) {
                            onPeriodChange(index + 2); // 2 to 5
                        }
                    }}
                    variant={currentPeriod === index + 2 || (index === 4 && currentPeriod === 6) ? 'solid' : 'outlined'}
                >
                    {index === 4 ? (
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Input
                                type="date"
                                value={fromDate}
                                onChange={(e) => {
                                    setFromDate(e.target.value);
                                    setCurrentPeriod(6);
                                }}
                                size='xs'
                            />
                            <Input
                                type="date"
                                value={toDate}
                                onChange={(e) => {
                                    setToDate(e.target.value);
                                    setCurrentPeriod(6);
                                }}
                                size='xs'
                            />
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: 11 }}>{label}</Typography>
                    )}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default DateFieldCommonComp;

