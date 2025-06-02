import { Box, IconButton, Input } from '@mui/joy'
import { Typography } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from '../../../Constant/Constant';

const QuotationMainPage = () => {
    const [qtnNo, setQtnNo] = useState('')
    const [qtnDate, setQtnDate] = useState('')

    const SearchBtn = useCallback(() => {
        if (qtnNo !== '' && qtnDate !== '') {
            const payloadVal = {
                qtnNo: parseInt(qtnNo),
            }
            //Api call to fetch Quotation details

        }
        else {
            warningNofity("Quotation number and date are required")
        }
        console.log("qtnNo,qtnDate", qtnNo, qtnDate);

    }, [qtnNo, qtnDate])

    return (
        <Fragment>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', height: "100%" }}>
                <Box sx={{ width: '70%', mt: 3, p: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ textAlign: "center", py: 2 }}>QUOTATION DETAILS</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: "row", gap: 2 }}>
                        <Typography sx={{ pt: .6 }}>Quotation No</Typography>
                        <Input
                            type="number"
                            value={qtnNo}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setQtnNo(value);
                                }
                            }}
                            sx={{
                                flex: 1,
                                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '& input[type=number]': {
                                    MozAppearance: 'textfield',
                                },
                            }}
                            slotProps={{
                                input: {
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                },
                            }}
                        />

                        <Typography sx={{ mt: .5 }}>Date</Typography>
                        <Input
                            type="date"
                            value={qtnDate}
                            onChange={(e) => setQtnDate(e.target.value)}
                            size="xs"
                            sx={{
                                color: 'rgba(var(--font-light))',
                                flex: 1, p: 0.5
                            }}
                        />
                        <IconButton onClick={SearchBtn}>
                            <SearchIcon sx={{ mt: 0.5 }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(QuotationMainPage) 