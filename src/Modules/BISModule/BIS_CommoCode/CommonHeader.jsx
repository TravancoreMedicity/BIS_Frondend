import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const CommonHeader = () => {
    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, }} >
                <Typography sx={{ color: 'rgb(var(--header-Font-Color))', fontStyle: "--font-varient" }}>Travancore Medical Collage Hospital</Typography>
            </Box>
        </div>
    )
}

export default memo(CommonHeader) 