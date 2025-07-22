import { Box, Typography } from '@mui/joy';
import { Slide } from '@mui/material';
import React, { memo, useState } from 'react';
import CRS_Sales from './CRS_Sales';
import CRS_Common from './CRS_Common';
import CRS_Dental from './CRS_Dental';
import CRS_TSSH from './CRS_TSSH';
import ProjectStore from './ProjectStore';

const Inventory_matrix_main = () => {
    const [activeComp, setActiveComp] = useState(0);
    const [hasActivated, setHasActivated] = useState(false);

    const handleSetActiveComp = (id) => {
        setActiveComp(id);
        if (!hasActivated && id !== 0) {
            setHasActivated(true);
        }
    };

    const compArr = [
        { id: 1, comp: <CRS_Sales activeComp={activeComp} setActiveComp={handleSetActiveComp} /> },
        { id: 2, comp: <CRS_Common activeComp={activeComp} setActiveComp={handleSetActiveComp} /> },
        { id: 3, comp: <CRS_TSSH activeComp={activeComp} setActiveComp={handleSetActiveComp} /> },
        { id: 4, comp: <CRS_Dental activeComp={activeComp} setActiveComp={handleSetActiveComp} /> },
        { id: 5, comp: <ProjectStore activeComp={activeComp} setActiveComp={handleSetActiveComp} /> }
    ];

    return (
        <Box
            sx={{
                p: 2,
                maxHeight: 'calc(100vh - 100px)',
                overflowY: 'auto',
                background: 'linear-gradient(to bottom, #f0f4f8, #fff)',
                minHeight: 800,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <Box
                sx={{
                    p: 1,
                    borderRadius: 3,
                    mb: 5,
                    borderBottom: 2,
                    borderColor: '#e0d9d9ff'
                }}
            >
                <Typography
                    sx={{
                        display: "flex",
                        gap: 2
                    }}
                >
                    <Typography level="h5" sx={{ color: '#7d7575ff', letterSpacing: 2.1, fontWeight: 'bold' }}>INVENTORY FLOW</Typography>
                    <Typography sx={{ mt: 0.5, fontFamily: "sans-serif", fontSize: 13 }}>
                        ( Stock Value Update On: <b>15-07-2025 23:59:59</b> )
                    </Typography>
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {compArr?.map((val) => {
                    const shouldShow = activeComp === 0 || activeComp === val.id;

                    return hasActivated ? (
                        <Slide
                            key={val.id}
                            direction="left"
                            in={shouldShow}
                            mountOnEnter
                            unmountOnExit
                            timeout={500}
                        >
                            <Box sx={{ flex: 1, m: 1 }}>
                                {val.comp}
                            </Box>
                        </Slide>
                    ) : (
                        shouldShow && (
                            <Box key={val.id} sx={{ flex: 1, m: 1 }}>
                                {val.comp}
                            </Box>
                        )
                    );
                })}
            </Box>
        </Box>
    );
};

export default memo(Inventory_matrix_main);
