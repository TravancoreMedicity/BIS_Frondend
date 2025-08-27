import { Box, Typography } from '@mui/joy';
import { Slide } from '@mui/material';
import React, { memo, useState } from 'react';
import CRS_Sales from '../../KMCH/KMCH_InventoryMatrix/CRS_Sales';
import CRS_Common from '../../KMCH/KMCH_InventoryMatrix/CRS_Common';
import CRS_TSSH from '../../KMCH/KMCH_InventoryMatrix/CRS_TSSH';
import CRS_Dental from '../../KMCH/KMCH_InventoryMatrix/CRS_Dental';
import ProjectStore from '../../KMCH/KMCH_InventoryMatrix/ProjectStore';

const TMCH_InventoryMatrix = () => {
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
                maxHeight: 'calc(100vh - 50px)',
                overflowY: 'auto',
                minHeight: 805,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <Box
                sx={{
                    p: 1,
                    borderRadius: 3,
                    mb: 5,
                    borderBottom: 2,
                    borderColor: '#cfc1dd'
                }}
            >
                <Typography
                    sx={{
                        display: "flex",
                        gap: 2
                    }}
                >
                    <Typography level="h5" sx={{ color: '#7d7575ff', letterSpacing: 2.1, fontWeight: 'bold', color: "rgb(var( --font-darkGrey))" }}>INVENTORY FLOW</Typography>
                    <Typography sx={{ mt: 0.5, fontFamily: "sans-serif", fontSize: 13, color: "rgb(var( --font-darkGrey))" }}>
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

export default memo(TMCH_InventoryMatrix);
