import { Box } from '@mui/joy'
import React from 'react'

const ScreenCheck = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', zIndex: 1700 }} >
            <Box sx={{ display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' }, bgcolor: 'white', color: 'black', justifyContent: 'center', fontWeight: 700, flexGrow: 1 }}>xs</Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none', lg: 'none', xl: 'none' }, bgcolor: 'white', color: 'black', justifyContent: 'center', fontWeight: 700, flexGrow: 1 }} >sm</Box>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none', xl: 'none' }, bgcolor: 'white', color: 'black', justifyContent: 'center', fontWeight: 700, flexGrow: 1 }}>md</Box>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'none' }, bgcolor: 'white', color: 'black', justifyContent: 'center', fontWeight: 700, flexGrow: 1 }}>lg</Box>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }, bgcolor: 'white', color: 'black', justifyContent: 'center', fontWeight: 700, flexGrow: 1 }}>xl</Box>
        </Box>
    )
}

export default ScreenCheck