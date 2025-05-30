import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'

const CopyRight = () => {
    return (
        <Box sx={{
            position: 'sticky',
            bottom: 10,
            textAlign: 'center',
        }}>
            <Typography sx={{
                fontSize: { xs: 6, sm: 9, md: 9, lg: 10 },
                color: 'rgba(14, 15, 14, 0.49)',
            }}>
                Copyright © 2024 Travancore Medicity. All Right Reserved.
            </Typography>
        </Box>
    )
}

export default memo(CopyRight)