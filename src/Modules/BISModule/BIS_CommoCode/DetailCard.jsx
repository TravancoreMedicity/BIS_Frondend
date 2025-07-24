import React, { memo } from 'react';
import { Box, Typography } from '@mui/joy';

const DetailCard = ({ title, mrp, pcost, icon, color = '#7c51a1' }) => {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 300,
                p: 2,
                border: 1,
                borderColor: '#cfc1dd',
                borderRadius: 13,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                {icon}
                <Typography level="title-sm" fontWeight="lg" sx={{ color: "rgb(var( --font-darkGrey))" }}>
                    {title}
                </Typography>
            </Box>
            <Typography level="body-sm">
                MRP:{' '}
                <b style={{ color }}>
                    ₹ {Number(mrp).toLocaleString()}
                </b>
            </Typography>
            <Typography level="body-sm">
                Pcost:{' '}
                <b style={{ color }}>
                    ₹ {Number(pcost).toLocaleString()}
                </b>
            </Typography>
        </Box>
    );
};

export default memo(DetailCard);