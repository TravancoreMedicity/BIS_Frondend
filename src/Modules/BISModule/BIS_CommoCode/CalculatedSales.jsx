import { Box, Typography } from '@mui/joy'
import { BarChart } from '@mui/x-charts'
import React, { memo } from 'react'

const CalculatedSales = () => {
    return (
        <div>
            <Box sx={{
                width: '200%',
                minWidth: '100%',
            }}>
                <Typography sx={{ textAlign: "center" }}>Overall Pharmacy Sales</Typography>
                <Box sx={{ mt: 5 }}>
                    < BarChart
                        series={[
                            { data: [35, 44, 24, 51, 6, 49, 15, 25, 30, 35, 44, 24] },
                            { data: [51, 6, 49, 35, 44, 24, 15, 25, 30, 35, 44, 24,] },
                            { data: [15, 25, 30, 35, 44, 24, 51, 6, 49, 35, 44, 24] },
                        ]}
                        height={290}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12',], scaleType: 'band' }]}
                    />
                </Box>
            </Box>
        </div>
    )
}
export default memo(CalculatedSales) 