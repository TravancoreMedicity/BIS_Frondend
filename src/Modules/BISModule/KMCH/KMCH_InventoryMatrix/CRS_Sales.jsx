import { Box, Typography, Card, CardContent } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CancelIcon from '@mui/icons-material/Cancel';
import InventoryIcon from '@mui/icons-material/Inventory2';
import WarningIcon from '@mui/icons-material/WarningAmberRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StyledBox = ({ title, description, icon, color, onClick }) => (
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
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
            <Typography sx={{ color: color, fontSize: 12 }}>{icon}</Typography>
            <Typography level="title-md" fontWeight="lg" sx={{ fontSize: 12, mt: 0.6 }}>
                {title}
            </Typography>
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

const CRS_Sales = ({ activeComp, setActiveComp }) => {

    const handleCRSSalesClick = useCallback(() => {
        setActiveComp(1);
    }, [setActiveComp]);

    const subDivisions = [
        { name: 'IP Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'Lobby Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'Casualty Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'OT First Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'OT Second Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'Immunization Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'Urology Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'LR Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'Orthopaedics OP Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#b14a81ff" },
        { name: 'Dental Pharmacy', mrp: 250000000, purchaseCost: 200000000, color: "#097179ab" },
    ];

    const formatDescription = (purchaseCost, mrp, color) => (
        <>
            PCost:{' '}
            <Typography component="span" sx={{ fontWeight: 'bold', color }}>
                ₹{purchaseCost.toLocaleString()}
            </Typography>{' '}
            | MRP:{' '}
            <Typography component="span" sx={{ fontWeight: 'bold', color }}>
                ₹{mrp.toLocaleString()}
            </Typography>
        </>
    );

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, position: "relative", width: '100%' }}>
            {/* LEFT SECTION */}
            <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <StyledBox
                    title="CRS Sales"
                    color="#1565c0"
                    description={formatDescription(200000000, 250000000, "#1565c0")}
                    icon={<LocalMallIcon />}
                    onClick={handleCRSSalesClick}
                />
                <ConnectorLine color="#2e7d32" />
                <StyledBox
                    title="Central Store Pharmacy"
                    color="#00796b"
                    description={formatDescription(200000000, 250000000, "#2e7d32")}
                    icon={<MedicalServicesIcon />}
                />
                <ConnectorLine color="#1565c0" />
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
                        backgroundColor: '#fafafa',
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.03)',
                        mt: 2,
                    }}
                >
                    {subDivisions?.map(({ name, purchaseCost, mrp, color }, index) => (
                        <StyledBox
                            key={index}
                            title={name}
                            description={formatDescription(purchaseCost, mrp, color)}
                            icon={<LocalPharmacyIcon />}
                            color={color}
                        />
                    ))}
                </Box>
            </Box>

            {/* RIGHT SECTION WITH SLIDE-IN */}
            {/* <Slide direction="left" in={activeComp === 1} mountOnEnter unmountOnExit timeout={800} sx={{ width: 900, zIndex: 999, bgcolor: 'green' }}>
                <Box
                    sx={{
                        bgcolor: "#fdfcfc",
                        // flex: 1,
                        p: 2,
                        mt: 1,
                        border: 1,
                        borderColor: "#9ECAD6",
                        borderRadius: 4,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                        width: "100%"
                    }}
                >

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography level="h5" fontWeight="xl" sx={{ color: "#1565c0" }}>
                            CRS SALES DETAILS
                        </Typography>
                        <CancelIcon
                            sx={{ cursor: "pointer", color: "#d32f2f" }}
                            onClick={() => setActiveComp(0)}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, width: '100%', bgcolor: 'blue' }}>
                        <DetailCard title="Stock Value" mrp={250000000} pcost={2300323} icon={<InventoryIcon sx={{ color: '#2e7d32' }} />} color="#2e7d32" />
                        <DetailCard title="Total Items - 203568" mrp={250000000} pcost={2300323} icon={<LocalMallIcon sx={{ color: '#0277bd' }} />} color="#0277bd" />
                        <DetailCard title="Expiry Items - 4523" mrp={250000000} pcost={2300323} icon={<WarningIcon sx={{ color: '#f57c00' }} />} color="#f57c00" />
                        <DetailCard title="Stock Out" mrp={500000000} pcost={250000000} icon={<ExitToAppIcon sx={{ color: '#d32f2f' }} />} color="#d32f2f" />
                    </Box>
                </Box>
            </Slide> */}
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
                        transform: activeComp === 1 ? 'translateX(0)' : 'translateX(100%)',
                        opacity: activeComp === 1 ? 1 : 0,
                        transition: 'transform 0.8s ease, opacity 0.8s ease',
                        bgcolor: "#fdfcfc",
                        p: 2,
                        border: 1,
                        borderColor: "#9ECAD6",
                        borderRadius: 4,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                        zIndex: 999,
                        pointerEvents: activeComp === 1 ? 'auto' : 'none' // prevent click when hidden
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography level="h5" fontWeight="xl" sx={{ color: "#1565c0" }}>
                            CRS SALES DETAILS
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

export default memo(CRS_Sales);
