import React, { memo } from 'react';
import { Box, Typography } from '@mui/joy';

const StyledBox = ({ title, description, icon, color = '#7c51a1', onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                border: `2px solid ${color}`,
                borderRadius: '16px',
                p: 1,
                width: 250,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: '0.2s',
                '&:hover': {
                    boxShadow: `0 0 0 2px ${color}`,
                    transform: 'scale(1.04)',
                },
                // backgroundColor: 'background.surface',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                <Typography sx={{ color: color, fontSize: 12 }}>{icon}</Typography>
                <Typography
                    level="title-md"
                    fontWeight="lg"
                    sx={{ fontSize: 12, mt: 0.6, color: "rgb(var( --font-darkGrey))" }}
                >
                    {title}
                </Typography>
            </Box>
            <Typography level="body-xs" sx={{ fontSize: 11, color: '#555' }}>
                {description}
            </Typography>
        </Box>
    );
};

export default memo(StyledBox);
