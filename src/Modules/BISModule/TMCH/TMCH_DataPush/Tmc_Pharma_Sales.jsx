import { Box, Input, Typography } from '@mui/joy'
import { format, subDays } from 'date-fns';
import React, { memo, useCallback, useState } from 'react'
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const Tmc_Pharma_Sales = ({ ipkmcPharmacyModDatas }) => {

    const [updateDate, setUpdateDate] = useState({});

    const mapArrs = [
        { opslno: 1, label: "Total Bill count", id: 1 },
        { opslno: 2, label: "Total OP bill count ", id: 2 },
        { opslno: 3, label: "Total IP bill count", id: 3 },
        { opslno: 4, label: "Total Bill amount", id: 4 },
        { opslno: 5, label: "Total OP bill amount", id: 5 },
        { opslno: 6, label: "Total IP bill amount", id: 6 },
        { opslno: 7, label: "Total Return count", id: 7 },
        { opslno: 8, label: "Total IP return count", id: 8 },
        { opslno: 9, label: "Total OP return count", id: 9 },
        { opslno: 10, label: "Total Return amount", id: 10 },
        { opslno: 11, label: "Total OP return amount", id: 11 },
        { opslno: 12, label: "Total IP return amount", id: 12 }
    ]

    const groupedArray = Object.values(
        mapArrs.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = { id: item.id, items: [] };
            }
            acc[item.id].items.push(item);
            return acc;
        }, {})
    );

    const uploadData = useCallback(() => {

    }, [])

    const handleDateChange = useCallback(() => {

    }, [])

    return (
        <Box>
            <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                Pharmacy Sales
            </Typography>
            <Box sx={{
                flex: 1, p: 1, borderColor: "#EBD3F8", overflowY: "auto",
                maxHeight: 600,
            }}>
                {groupedArray?.map((group, groupIndex) => {
                    return (
                        <Box key={groupIndex} sx={{ border: 1, mt: 1, borderColor: "#EBD3F8", p: 0.5 }}>
                            {(() => {
                                const item = group.items[0];
                                if (!item) return null;

                                const matchData = ipkmcPharmacyModDatas?.find(val => val?.opslno === item?.opslno);
                                const lastday = format(subDays(new Date(), 1), "yyyy-MM-dd");
                                const firstOpsDate = ipkmcPharmacyModDatas?.find(d => d?.opslno === 1)?.date || lastday;

                                return (
                                    <Box
                                        key={item.opslno}
                                        sx={{
                                            mt: 0.5,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            // border: 1,
                                            borderRadius: 7,
                                            // p: 0.5,
                                            p: 0,
                                            borderColor: '"#EBD3F8"'
                                        }}
                                    >
                                        <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>
                                                {item.label}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ width: "24%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2, flexDirection: "column" }}>
                                            <Typography sx={{ fontSize: 9, color: 'rgba(var(--font-light))' }}>Last Update Date</Typography>
                                            <Typography sx={{ fontSize: 11, mt: 0.5, color: "#D84B9A" }}>
                                                {matchData?.date}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                            <Input
                                                type="date"
                                                disabled={matchData?.date === lastday}
                                                value={updateDate[item?.opslno] || ''}
                                                onChange={(e) => handleDateChange(item?.opslno, e.target.value)}
                                                slotProps={{
                                                    input: {
                                                        min: matchData?.date,
                                                        max: matchData?.opslno !== 1 ? firstOpsDate : lastday,
                                                    },
                                                }}
                                                size="sm"
                                                sx={{
                                                    color: 'rgba(var(--font-light))',
                                                    width: "100%",
                                                    p: 0.2,
                                                    px: 1,
                                                    fontSize: 13,
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            onClick={() => uploadData(matchData?.date, updateDate[item?.opslno], item?.opslno)}
                                            sx={{
                                                width: "30%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 1,
                                                border: 1,
                                                borderRadius: 10,
                                                borderColor: 'rgba(43, 142, 159, 0.66)',
                                                cursor: "pointer",
                                                opacity: lastday === firstOpsDate || lastday > firstOpsDate ? 1 : 0.5,
                                            }}
                                        >
                                            <UnarchiveIcon sx={{ color: 'rgba(43, 142, 159, 0.66)' }} />
                                            <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>
                                                Uploads
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })()}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    )
}
export default memo(Tmc_Pharma_Sales) 
