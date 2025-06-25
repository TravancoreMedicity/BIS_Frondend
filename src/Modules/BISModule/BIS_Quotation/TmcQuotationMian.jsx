import { Box, Button, Input, Sheet, Table, Tooltip } from '@mui/joy';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import React, { Fragment, memo, useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { succesNofity, warningNofity } from '../../../Constant/Constant';
import axiosApi, { axiosellider_tmc } from '../../../Axios/Axios';

const TmcQuotationMian = () => {
    const [qtnNo, setQtnNo] = useState('');
    const [qtnDate, setQtnDate] = useState('');
    const [mastData, setMastData] = useState(null);
    const [detailData, setDetailData] = useState([]);
    const [validity, setValidity] = useState('');
    const [showTbl, setShowTbl] = useState(0);

    const SearchBtn = useCallback(async () => {
        setShowTbl(1)
        if (qtnNo && qtnDate) {
            const payloadVal = {
                qtnNo,
                qtnDate: format(new Date(qtnDate), 'dd-MMM-yyyy')
            };
            try {
                const { data: mastRes } = await axiosellider_tmc.post("/bisQuotationData/qtnMastDetails", payloadVal);
                setMastData(mastRes.successVal === 2 && mastRes.MastData?.length > 0 ? mastRes.MastData[0] : null);
                const { data: detailRes } = await axiosellider_tmc.post("/bisQuotationData/qtnDetailDetails", payloadVal);
                setDetailData(detailRes.success === 2 ? detailRes.DetailData : []);
            } catch (error) {
                warningNofity("Failed to fetch quotation data. Please try again.");
                setMastData(null);
                setDetailData([]);
            }
        } else {
            warningNofity("Quotation number and date are required");
        }
    }, [qtnNo, qtnDate]);


    const InsertData = useCallback(async () => {
        if (validity !== '') {
            const payloadData = {
                ...mastData,
                detailData,
                qtnNo,
                qtnDate,
                validity,
                qtn_expiry: format(new Date(mastData.QUD_EXPIRY), 'yyyy-MM-dd'),
                company_slno: 1
            };
            const insertData = await axiosApi.post("/bisQuotation/inserTmcQtnDetails", payloadData);
            const { success, message } = insertData.data;
            if (success === 1) {
                succesNofity(message)
                setShowTbl(0)
            }
            else {
                warningNofity(message)
            }
        }
        else {
            warningNofity("choose Validity")
        }
    }, [validity, detailData, mastData, qtnNo, qtnDate])

    return (
        <Fragment>
            <Box sx={{ backgroundColor: "#F0F6F5" }}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', height: "100%" }}>
                    <Box sx={{ width: '100%', mt: 3, p: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography sx={{ textAlign: "center", py: 2 }} variant="h6">
                                QUOTATION DETAILS
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                gap: 3,
                                flexWrap: 'wrap',
                                alignItems: 'flex-end',
                                // backgroundColor: "pink",
                                p: 1
                            }}
                        >
                            {/* Quotation Number */}
                            <Box>
                                <Typography>Quotation No</Typography>
                                <Input
                                    type="number"
                                    value={qtnNo}
                                    size='sm'
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) setQtnNo(value);
                                    }}
                                    sx={{
                                        width: 250,
                                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                        '& input[type=number]': {
                                            MozAppearance: 'textfield',
                                        },
                                    }}
                                    slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
                                />
                            </Box>

                            {/* Quotation Date and Search */}
                            <Box>
                                <Typography>Date</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Input
                                        type="date"
                                        value={qtnDate}
                                        onChange={(e) => setQtnDate(e.target.value)}
                                        size="sm"
                                        sx={{ width: 250 }}
                                    />
                                    <Tooltip title="Search">
                                        <Box
                                            component="button"
                                            onClick={SearchBtn}
                                            sx={{
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                p: 1
                                            }}
                                        >
                                            <SearchIcon />
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Box>

                            {/* Validity and Submit (shown conditionally) */}
                            {showTbl === 1 && (
                                <Box>
                                    <Typography>Valid Till</Typography>
                                    <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
                                        <Input
                                            type="date"
                                            value={validity}
                                            onChange={(e) => setValidity(e.target.value)}
                                            size="sm"
                                            sx={{ width: 250 }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                border: 1,
                                                borderRadius: 10,
                                                textTransform: 'none',
                                                fontWeight: 'bold',
                                                boxShadow: 2,
                                                backgroundColor: "#DBDBDB",
                                                borderColor: "grey"
                                            }}
                                            onClick={InsertData}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                {showTbl === 1 ?

                    <Box sx={{ p: 2 }}>
                        <Typography>
                            Master Table
                        </Typography>
                        <Sheet
                            variant="outlined"
                            invertedColors
                            sx={{
                                '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                                '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                                overflow: 'auto',
                                borderRadius: 5,
                                width: '100%',

                            }}
                        >
                            <Table
                                borderAxis="bothBetween"
                                stripe="odd"
                                hoverRow
                                stickyHeader
                                size='sm'
                                sx={{
                                    '& tr > *:first-of-type': {
                                        position: 'sticky',
                                        left: 0,
                                        boxShadow: '1px 0 var(--TableCell-borderColor)',
                                        bgcolor: 'background.surface',
                                        zIndex: 4,
                                        width: '100%'
                                    },
                                    '& tr > *:last-child': {
                                        position: 'sticky',
                                        right: 0,
                                        bgcolor: 'var(--TableCell-headBackground)',
                                    },
                                }}
                            >
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb' }}>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>SL NO</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>SU_CODE</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>SUC_NAME</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>QUC_TYPE</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>QUD_EXPIRY</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>QUC_STCODE</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>STC_DESC</th>
                                        <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>QUN_AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>1</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{mastData?.SU_CODE || ''}</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{mastData?.SUC_NAME || ''}</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{mastData?.QUC_TYPE || ''}</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>
                                            {mastData?.QUD_EXPIRY ? format(new Date(mastData.QUD_EXPIRY), 'dd-MM-yyyy') : ''}
                                        </td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{mastData?.QUC_STCODE || ''}</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{mastData?.STC_DESC || ''}</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{mastData?.QUN_AMOUNT || ''}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Sheet>

                    </Box>
                    : null}
                {
                    showTbl === 1 ?

                        <Box sx={{ width: "100%", p: 2, }} >
                            <Box sx={{
                                display: 'flex', width: '100%', flexDirection: 'column', p: 0.5,
                                overflow: 'auto',
                                '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                            }}>
                                <Typography>
                                    Detail Table
                                </Typography>
                                <Sheet
                                    variant="outlined"
                                    invertedColors
                                    sx={{
                                        '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                                        '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                                        overflow: 'auto',
                                        borderRadius: 5,
                                        width: '100%'
                                    }}
                                >
                                    <Table
                                        borderAxis="bothBetween"
                                        stripe="odd"
                                        hoverRow
                                        stickyHeader
                                        size='sm'
                                        sx={{
                                            '& tr > *:first-of-type': {
                                                position: 'sticky',
                                                left: 0,
                                                boxShadow: '1px 0 var(--TableCell-borderColor)',
                                                bgcolor: 'background.surface',
                                                zIndex: 4,
                                                width: '100%'
                                            },
                                            '& tr > *:last-child': {
                                                position: 'sticky',
                                                right: 0,
                                                bgcolor: 'var(--TableCell-headBackground)',
                                            },
                                        }}
                                    >

                                        <thead>
                                            <tr style={{ backgroundColor: '#f9fafb' }} >
                                                <th style={{ width: 100, zIndex: 5, backgroundColor: '#f9fafb', textAlign: "center" }}>SL NO</th>
                                                <th style={{ width: 200, zIndex: 2, backgroundColor: '#f9fafb', textAlign: "center" }} >DESC</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >CODE</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >FRETYPE</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >DISAMT</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >DISPER</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >FREEQTY</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >MRP</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >NETAMT</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >NETUNIT</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >PACK</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >QTY</th>
                                                <th style={{ width: 65, backgroundColor: '#f4f6f8', textAlign: "center" }} >RATE</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >STRIP</th>
                                                <th style={{ width: 65, backgroundColor: '#f4f6f8', textAlign: "center" }} >TAXAMT</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >DESC</th>
                                                <th style={{ width: 65, backgroundColor: '#f4f6f8', textAlign: "center" }} >PURPER</th>
                                                <th style={{ width: 60, backgroundColor: '#f4f6f8', textAlign: "center" }} >TX_CODE</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {detailData && detailData.map((row, index) => (
                                                <Fragment key={index}>

                                                    <tr>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{index + 1}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.ITC_DESC}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.IT_CODE}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUC_FRETYPE}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_DISAMT}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_DISPER}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_FREEQTY}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_MRP}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{Number(row?.QUN_NETAMT).toFixed(2)}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{Number(row?.QUN_NETUNITRATE).toFixed(2)}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_PACK}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_QTY}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_RATE}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.QUN_STRIP}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{Number(row?.QUN_TAXAMT).toFixed(2)}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.TXC_DESC}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.TXN_PURPER}</td>
                                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>{row?.TX_CODE}</td>

                                                    </tr>
                                                </Fragment>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Sheet>
                            </Box>
                        </Box>
                        : null}
            </Box>
        </Fragment>
    );
};

export default memo(TmcQuotationMian);

