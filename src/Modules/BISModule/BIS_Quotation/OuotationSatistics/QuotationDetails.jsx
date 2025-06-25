import React, { Fragment, memo } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Table } from '@mui/joy';

const QuotationDetails = ({ open, SetOpen }) => {
    return (
        <Fragment>
            <Button variant="outlined" color="neutral" onClick={() => SetOpen(true)}>
                Open modal
            </Button>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => SetOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{ maxWidth: "50%", borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg', mb: 1 }}
                    >
                        Quotation Details
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">

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
                                size='sm'
                                sx={{
                                    '& tr > *:first-of-type': {
                                        left: 0,
                                        boxShadow: '1px 0 var(--TableCell-borderColor)',
                                        bgcolor: 'background.surface',
                                        zIndex: 4,
                                        width: '100%'
                                    },
                                    '& tr > *:last-child': {
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
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>L006</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>LIFE CARE AGENCIES</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>P</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>
                                            31-05-2026
                                        </td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>C002</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>CRS (SALES)</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>14145.15</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>2</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>L007</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>CARE AGENCIES</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>P</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>
                                            26-05-2026
                                        </td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>C007</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>SALES</td>
                                        <td style={{ textAlign: 'center', height: 10, color: '#344767', fontWeight: 500, backgroundColor: '#f4f6f8' }}>36425.00</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Sheet>

                    </Typography>
                </Sheet>
            </Modal>
        </Fragment>
    )
}

export default memo(QuotationDetails)

