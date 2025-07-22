import React, { memo, useCallback } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CancelIcon from '@mui/icons-material/Cancel';
import InventoryIcon from '@mui/icons-material/Inventory2';
import WarningIcon from '@mui/icons-material/WarningAmberRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NodeBox = ({ title, description, icon, color, onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            cursor: 'pointer',
            border: `2px solid ${color}`,
            borderRadius: '16px',
            p: 1,
            width: 250,
            background: `linear-gradient(135deg, ${color}11, #fff)`,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: '0.2s',
            '&:hover': {
                boxShadow: `0 0 0 2px ${color}`,
                transform: 'scale(1.04)',
            },
        }}
    >
        <Box >
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
                <Typography sx={{ color: color, fontSize: 12 }}>{icon}</Typography>
                <Typography level="title-md" fontWeight="lg" sx={{ fontSize: 12, mt: 0.6 }}>
                    {title}
                </Typography>
            </Box>
        </Box>
        <Typography level="body-xs" sx={{ fontSize: 11, color: '#555' }}>
            {description}
        </Typography>
    </Box>
);

const ConnectorLine = ({ height = 30, color = '#999' }) => (
    <Box sx={{ width: '4px', height, backgroundColor: color, borderRadius: 2, my: 1 }} />
);

const DetailCard = ({ title, mrp, pcost, icon, color }) => (
    <Card variant="soft" sx={{ width: "100%", maxWidth: 300, p: 2, backgroundColor: '#F3F6F9', border: 1, borderColor: "#9ECAD6" }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                {icon}
                <Typography level="title-sm" fontWeight="lg">{title}</Typography>
            </Box>
            <Typography level="body-sm">MRP: <b style={{ color }}>{mrp.toLocaleString()}</b></Typography>
            <Typography level="body-sm">Pcost: <b style={{ color }}>{pcost.toLocaleString()}</b></Typography>
        </CardContent>
    </Card>
);

const CRS_Dental = ({ activeComp, setActiveComp }) => {


    const handleCRS_DentalClick = useCallback(() => {
        setActiveComp(4)
    }, [setActiveComp])

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
            <Box
                sx={{
                    mt: 0,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    fontFamily: 'Segoe UI, sans-serif',
                }}
            >
                <NodeBox
                    title="CRS Dental"
                    description={
                        <>
                            PCost:{' '}
                            <Typography component="span" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                                ₹{(500000000).toLocaleString()}
                            </Typography>
                        </>
                    }
                    icon={<LocalMallIcon />}
                    color="#1565c0"
                    onClick={handleCRS_DentalClick}
                />
                <ConnectorLine color="#2e7d32" />
                <NodeBox
                    title="TDC Store"
                    description={
                        <>
                            PCost:{' '}
                            <Typography component="span" sx={{ fontWeight: 'bold', color: "#00796b" }}>
                                ₹{(500000000).toLocaleString()}
                            </Typography>
                        </>
                    }
                    icon={<ShoppingBagIcon />}
                    color="#00796b"
                />
                <ConnectorLine color="#1565c0" />
                <NodeBox
                    title="User End"
                    description="Final Department"
                    icon={<PersonIcon />}
                    color="#6a1b9a"
                />
            </Box>


            {/* {activeComp === 4 ? ( */}


            <Box
                sx={{
                    // width: 1200,             // Always fixed width
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        transform: activeComp === 4 ? 'translateX(0)' : 'translateX(100%)',
                        opacity: activeComp === 4 ? 1 : 0,
                        transition: 'transform 0.8s ease, opacity 0.8s ease',
                        bgcolor: "#fdfcfc",
                        p: 2,
                        border: 1,
                        borderColor: "#9ECAD6",
                        borderRadius: 4,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                        zIndex: 999,
                        pointerEvents: activeComp === 4 ? 'auto' : 'none' // prevent click when hidden
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography level="h5" fontWeight="xl" sx={{ color: "#1565c0" }}>
                            CRS DENTAL DETAILS
                        </Typography>
                        <CancelIcon
                            sx={{ cursor: "pointer", color: "#d32f2f" }}
                            onClick={() => setActiveComp(0)}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, width: '100%' }}>
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

export default memo(CRS_Dental);
