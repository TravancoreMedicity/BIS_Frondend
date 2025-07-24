import React, { memo, useCallback } from 'react';
import { Box, Typography } from '@mui/joy';
import BiotechIcon from '@mui/icons-material/Biotech';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CancelIcon from '@mui/icons-material/Cancel';
import InventoryIcon from '@mui/icons-material/Inventory2';
import WarningIcon from '@mui/icons-material/WarningAmberRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DetailCard from '../../BIS_CommoCode/DetailCard';
import StyledBox from '../../BIS_CommoCode/StyledBox';

const CRS_TSSH = ({ activeComp, setActiveComp }) => {

    const ConnectorLine = ({ height = 30, color = '#999' }) => (
        <Box sx={{ width: '4px', height, backgroundColor: color, borderRadius: 2, my: 1 }} />
    );

    const handleCRS_TSSHClick = useCallback(() => {
        setActiveComp(3);
    }, [setActiveComp]);

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, height: "80vh", }}>
            {/* LEFT COLUMN */}
            <Box
                sx={{
                    width: 300,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontFamily: 'Segoe UI, sans-serif',
                    overflowY: 'auto',
                }}
            >
                <StyledBox
                    title="CRS TSSH"
                    icon={<LocalMallIcon />}
                    color="#1565c0"
                    description={
                        <>
                            PCost:{' '}
                            <Typography component="span" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                                ₹{(500000000).toLocaleString()}
                            </Typography>
                        </>
                    }
                    onClick={handleCRS_TSSHClick}
                />
                <ConnectorLine color="#2e7d32" />
                <Box
                    sx={{
                        border: '2px dashed #999',
                        borderRadius: 6,
                        px: 3,
                        py: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.03)',
                    }}
                >
                    <StyledBox
                        title="Biomedical Store TSSH"
                        icon={<BiotechIcon />}
                        color="#00796b"
                        description={
                            <>
                                PCost:{' '}
                                <Typography component="span" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                                    ₹{(500000000).toLocaleString()}
                                </Typography>
                            </>
                        }
                    />
                    <StyledBox
                        title="Central Store TSSH"
                        icon={<SanitizerIcon />}
                        color="#00796b"
                        description={
                            <>
                                PCost:{' '}
                                <Typography component="span" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                                    ₹{(500000000).toLocaleString()}
                                </Typography>
                            </>
                        }
                    />
                    <StyledBox
                        title="General Store Consumable"
                        icon={<ShoppingBagIcon />}
                        color="#00796b"
                        description={
                            <>
                                PCost:{' '}
                                <Typography component="span" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                                    ₹{(500000000).toLocaleString()}
                                </Typography>
                            </>
                        }
                    />
                </Box>
                <ConnectorLine color="#1565c0" />
                <StyledBox
                    title="User End"
                    icon={<PersonIcon />}
                    color="#6a1b9a"
                    description="Final Department"
                />
            </Box>

            {/* RIGHT DETAIL PANEL */}
            <Box
                sx={{
                    flex: 1,
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        transform: activeComp === 3 ? 'translateX(0)' : 'translateX(100%)',
                        opacity: activeComp === 3 ? 1 : 0,
                        transition: 'transform 0.8s ease, opacity 0.8s ease',
                        p: 2,
                        border: 1,
                        borderColor: "#cfc1dd",
                        borderRadius: 4,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                        zIndex: 999,
                        pointerEvents: activeComp === 3 ? 'auto' : 'none',
                        overflowY: 'auto'
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography level="h5" fontWeight="xl" sx={{ color: "#1565c0" }}>
                            CRS TSSH DETAILS
                        </Typography>
                        <CancelIcon
                            sx={{ cursor: "pointer", color: "#d32f2f" }}
                            onClick={() => setActiveComp(0)}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, width: '100%', flexWrap: "wrap" }}>
                        <DetailCard title="Stock Value" mrp={250000000} pcost={2300323} icon={<InventoryIcon sx={{ color: '#2e7d32' }} />} color="#2e7d32" />
                        <DetailCard title="Total Items - 203568" mrp={250000000} pcost={2300323} icon={<LocalMallIcon sx={{ color: '#0277bd' }} />} color="#0277bd" />
                        <DetailCard title="Expiry Items - 4523" mrp={250000000} pcost={2300323} icon={<WarningIcon sx={{ color: '#f57c00' }} />} color="#f57c00" />
                        <DetailCard title="Stock Out" mrp={500000000} pcost={250000000} icon={<ExitToAppIcon sx={{ color: '#d32f2f' }} />} color="#d32f2f" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(CRS_TSSH);
