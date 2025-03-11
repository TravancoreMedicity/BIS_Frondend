import { Box } from '@mui/joy'
import React from 'react'
import { memo } from 'react'
import { screenWidth } from '../Constant/Constant'

const MasterPageLayout = ({ children, style }) => {
    return (
        <Box className="flex flex-0 flex-col items-center"  >
            <Box sx={{ width: `${screenWidth / 2}px`, pt: 10, ...style }}>
                {children}
            </Box>
        </Box>
    )
}

export default memo(MasterPageLayout)