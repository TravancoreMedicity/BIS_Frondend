import { Box } from '@mui/joy'
import React, { memo } from 'react'
import { ensureNumber } from './CommonDateRange/ChartCommonFuns/ChartCommonFun'
import { Bar, Line, PolarArea } from 'react-chartjs-2'

const CommonGraphRep = ({ Chartlayout, chartData, options, polarData, polarOptions }) => {
    return (
        <div>
            <Box
                sx={{
                    mt: 2,
                    width: "100%",
                    height: 400,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "background.level1",
                    borderRadius: 3,
                    boxShadow: "sm",
                    p: 2,
                    overflow: "auto",
                    '&::-webkit-scrollbar': { height: 5 },
                }}
            >
                {ensureNumber(Chartlayout) === 1 && (
                    <Bar
                        data={{
                            ...chartData,
                            datasets: chartData.datasets.map(ds => ({
                                ...ds,
                                barPercentage: 0.9,
                                categoryPercentage: 0.8,
                                barThickness: "flex",
                            }))
                        }}
                        options={options}
                    />
                )}
                {ensureNumber(Chartlayout) === 2 && (
                    <Line data={chartData} options={options} />
                )}

                {ensureNumber(Chartlayout) === 3 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400, width: "100%" }}>
                        <PolarArea data={polarData} options={polarOptions} />
                    </Box>
                )}
            </Box>
        </div>
    )
}

export default memo(CommonGraphRep) 