import { Box, Input } from '@mui/joy';
import { Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { memo } from 'react';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { getIpModuleDetails, getOpModuleDetails } from '../../../api/commonAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, endOfDay, format, startOfDay, subDays } from 'date-fns';
import axiosApi, { axiosellider_tmc } from '../../../Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { succesNofity, warningNofity } from '../../../Constant/Constant';
import CustomBackDrop from '../../../Components/CustomBackDrop';
import CommonHeader from './CommonHeader';

const DataPush = () => {

    const queryClient = useQueryClient()

    const [updateDate, setUpdateDate] = useState({});
    const [firstUpdate_ststus, setFirstUpdate_ststus] = useState(0);
    const [open, setOpen] = useState(false);

    const { data: OpModuleDatas } = useQuery({
        queryKey: ["opModuleDetails"],
        queryFn: () => getOpModuleDetails(),
    })



    const { data: IpModuleDatas } = useQuery({
        queryKey: ["ipModuleDetails"],
        queryFn: () => getIpModuleDetails(),
    })

    const uploadData = useCallback(async (fromdate, todate, opslno) => {
        if (todate) {
            // const formattedFromDate = format(startOfDay(addDays(fromdate, 1)), 'dd-MMM-yyyy 00:00:00');
            // const formattedToDate = format(endOfDay(todate), 'dd-MMM-yyyy 23:59:59');
            // const tDate = format(todate, 'yyyy-MM-dd');
            const formattedFromDate = format(startOfDay(addDays(fromdate, 1)), 'dd/MM/yyyy 00:00:00');
            const formattedToDate = format(endOfDay(todate), 'dd/MM/yyyy 23:59:59');
            const tDate = format(todate, 'yyyy-MM-dd');
            const payload = {
                fromdate: formattedFromDate,
                todate: formattedToDate,
            };
            const getOracleData = await axiosellider_tmc.post("/bisElliderData/opcount", payload)
            const { data, success } = getOracleData.data;
            if (opslno === 1 && success === 2 && data.length !== 0) {
                const enrichedData = data?.map(item => ({
                    ...item,
                    tDate,
                    c_name: 1
                }));

                const insertData = await axiosApi.post("/bisDataPush/insertOpcount", enrichedData);
                const { success: insertSuccess, message } = insertData.data;
                if (insertSuccess === 1) {
                    setFirstUpdate_ststus(1)
                    setUpdateDate({})
                    queryClient.invalidateQueries('opModuleDetails')
                    succesNofity(message)
                } else {
                    warningNofity(message)
                }
            }
            else if (opslno === 2 && success === 2 && data.length !== 0) {
                const updateData = data?.map(item => ({
                    ...item,
                    tDate
                }));
                //update to OP Table
                const UpdateData = await axiosApi.post("/bisDataPush/updatOpCount", updateData)
                const { success, message } = UpdateData.data;
                if (success === 1) {
                    queryClient.invalidateQueries('opModuleDetails')
                    succesNofity(message)
                }
                else {
                    warningNofity(message)
                }
            }
            else if (opslno === 4) {
                const getCashcredit = await axiosellider_tmc.post("/bisElliderData/cashcredit", payload)
                const { data, success } = getCashcredit.data;
                if (success === 2 && data.length !== 0) {
                    const enrichedData = data?.map(item => ({
                        ...item,
                        tDate,
                        c_name: 1
                    }));

                    const insertData = await axiosApi.patch("/bisDataPush/updateCashcredit", enrichedData);
                    const { success: insertSuccess, message } = insertData.data;
                    if (insertSuccess === 1) {
                        setUpdateDate({})
                        queryClient.invalidateQueries('opModuleDetails')
                        succesNofity(message)
                    } else {
                        warningNofity(message)
                    }
                }
            }
            else {
                warningNofity("No Data")
            }
        }
        else {
            warningNofity("Select Any Date")
        }
    }, [queryClient])

    const OpArrs = [
        { opslno: 1, label: "Total OP", id: 1 },
        { opslno: 2, label: "New Registration", id: 1 },
        { opslno: 3, label: "Visit", id: 1 },
        { opslno: 4, label: "Total Op Collection", id: 2 },
        { opslno: 5, label: "Op Registration Fee", id: 2 },
        { opslno: 6, label: "Op Visit Fee", id: 2 },
        { opslno: 7, label: "Op cancel Count", id: 3 },
        { opslno: 8, label: "Op Cancel Amount", id: 3 }
    ]

    const handleDateChange = (opslno, newDate) => {
        setUpdateDate(prev => ({
            ...prev,
            [opslno]: newDate
        }));
    };

    const uploadIpData = useCallback(async (fromdate, todate, opslno) => {
        if (todate) {
            const formattedFromDate = format(startOfDay(addDays(fromdate, 1)), 'dd/MM/yyyy 00:00:00');
            const formattedToDate = format(endOfDay(todate), 'dd/MM/yyyy 23:59:59');
            const tDate = format(todate, 'yyyy-MM-dd');
            const payload = {
                fromdate: formattedFromDate,
                todate: formattedToDate,
            };
            const getOracleIPData = await axiosellider_tmc.post("/bisElliderData/ipAddmissioncount", payload)
            const { data, success } = getOracleIPData.data;
            if (opslno === 1 && success === 2 && data.length !== 0) {
                const InserteData = data?.map(item => ({
                    ...item,
                    tDate,
                    c_name: 1
                }));
                const insertData = await axiosApi.post("/bisDataPush/insertIpAdmission", InserteData);
                const { success: insertSuccess, message } = insertData.data;
                if (insertSuccess === 1) {
                    setFirstUpdate_ststus(1)
                    setUpdateDate({})
                    queryClient.invalidateQueries('ipkmcModuleDetails')
                    succesNofity(message)
                } else {
                    warningNofity(message)
                }
            }
            else if (opslno === 2) {
                const getCashcredit = await axiosellider_tmc.post("/bisElliderData/getDischargeCount", payload)
                const { data, success } = getCashcredit.data;
                if (success === 2 && data.length !== 0) {
                    const DischageData = data?.map(item => ({
                        ...item,
                        tDate,
                        c_name: 1,
                    }));

                    const insertData = await axiosApi.patch("/bisDataPush/updateDischargeCount", DischageData);
                    const { success: insertSuccess, message } = insertData.data;
                    if (insertSuccess === 1) {
                        setUpdateDate({})
                        queryClient.invalidateQueries('ipkmcModuleDetails')
                        succesNofity(message)
                    } else {
                        warningNofity(message)
                    }
                }
            }
        }
        else {
            warningNofity("Select Any Date")
        }

    }, [queryClient])

    const IpArrs = [
        { opslno: 1, label: "Total IP" },
        { opslno: 2, label: "Total Discharge" },
        { opslno: 3, label: "Dama" },
        { opslno: 4, label: "Discharge Gross" },
        { opslno: 5, label: "Discharge Net" },
        { opslno: 6, label: "Receipt Count" },
        { opslno: 7, label: "Receipt Amount" },
        { opslno: 8, label: "Bill Cash Count" },
        { opslno: 9, label: "Bill Credit Card" },
        { opslno: 10, label: "Bill Cash" }
    ]

    const groupedArray = Object.values(
        OpArrs.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = { id: item.id, items: [] };
            }
            acc[item.id].items.push(item);
            return acc;
        }, {})
    );
    return (
        <Box sx={{ width: "100%", height: { xl: 900, sm: 1060 } }}>
            <CommonHeader />
            <ToastContainer />
            <CustomBackDrop setOpen={setOpen} open={open} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    flexWrap: { xl: "nowrap", sm: "wrap" },
                    // height: 500,
                    // overflowY: "auto"
                }}
            >
                <Box sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8", }}>
                    <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                        bis_outpatient_visit
                    </Typography>
                    {groupedArray?.map((group, groupIndex) => {
                        return (
                            <Box key={groupIndex} sx={{ border: 1, mt: 1, borderColor: "#EBD3F8", p: 0.5 }}>
                                {(() => {
                                    const item = group.items[0];
                                    if (!item) return null;

                                    const matchData = OpModuleDatas?.find(val => val?.opslno === item?.opslno);
                                    const lastday = format(subDays(new Date(), 1), "yyyy-MM-dd");
                                    const firstOpsDate = OpModuleDatas?.find(d => d?.opslno === 1)?.date || lastday;

                                    return (
                                        <Box
                                            key={item.opslno}
                                            sx={{
                                                mt: 0.5,
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                border: 1,
                                                borderRadius: 5,
                                                p: 0.5,
                                                borderColor: 'rgba(194, 182, 182, 0.57)'
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
                                <Box>
                                    <Typography sx={{ fontSize: 12, color: "rosybrown", mt: 0.5 }}>
                                        This includes: {group.items.map(item => item.label).join(", ")}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                    {/* {
                        OpArrs?.map((item, index) => {
                            const matchData = OpModuleDatas?.find(val => val?.opslno === item?.opslno);

                            const lastday = format(subDays(new Date(), 1), "yyyy-MM-dd");
                            const firstOpsDate = OpModuleDatas?.find(d => d?.opslno === 1)?.date || lastday

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        mt: 0.5,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        border: 1,
                                        borderRadius: 5,
                                        p: 0.5,
                                        borderColor: 'rgba(194, 182, 182, 0.57)',

                                    }}
                                >
                                    <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>
                                            {item?.label}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ width: "24%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2, flexDirection: "column" }}>
                                        <Typography sx={{ fontSize: 9, color: 'rgba(var(--font-light))', }}>Last Update Date</Typography>
                                        <Typography sx={{ fontSize: 11, mt: 0.5, color: "rosybrown", }}>
                                            {matchData?.date}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                        <Input
                                            type="date"
                                            disabled={matchData?.date === format(subDays(new Date(), 1), "yyyy-MM-dd")}
                                            value={updateDate[item?.opslno] || ''}
                                            onChange={(e) => handleDateChange(item?.opslno, e.target.value)}
                                            slotProps={{
                                                input: {
                                                    min: matchData?.date,
                                                    max:
                                                        // matchData?.opslno !== 1 && firstUpdate_ststus === 1
                                                        matchData?.opslno !== 1
                                                            ? firstOpsDate
                                                            : lastday,
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
                                        onClick={() => uploadData(matchData?.date, updateDate[item?.opslno], item?.opslno)
                                        }
                                        sx={{
                                            width: "30%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                            border: 1,
                                            borderRadius: 10,
                                            borderColor: matchData?.opslno === 1 || firstUpdate_ststus === 1 ? 'rgba(43, 142, 159, 0.66)' : 'rgba(43, 142, 159, 0.66)',
                                            cursor: "pointer",
                                            opacity: lastday === firstOpsDate || lastday > firstOpsDate ? 1 : 0.5,

                                        }}
                                    >
                                        <UnarchiveIcon
                                            sx={{
                                                color: 'rgba(43, 142, 159, 0.66)',
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                color: 'rgba(var(--font-light))',
                                                fontSize: 13,
                                            }}>Uploads</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    } */}
                </Box>

                <Box sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8" }}>
                    <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                        bis_Inpatient
                    </Typography>
                    <Box sx={{
                        flex: 1, p: 1, borderColor: "#EBD3F8", overflowY: "auto",
                        maxHeight: 450,
                    }}>
                        {
                            IpModuleDatas && IpArrs?.map((item, index) => {
                                const matchData = IpModuleDatas?.find(val => val?.opslno === item?.opslno);
                                const lastday = format(subDays(new Date(), 1), "yyyy-MM-dd");
                                const firstIpsDate = IpModuleDatas?.find(d => d?.opslno === 1)?.date;
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            mt: 0.5,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            border: 1,
                                            borderRadius: 5,
                                            p: 0.5,
                                            borderColor: 'rgba(194, 182, 182, 0.57)',

                                        }}
                                    >
                                        <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>
                                                {item?.label}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ width: "24%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2, flexDirection: "column" }}>
                                            <Typography sx={{ fontSize: 9, color: 'rgba(var(--font-light))', }}>Last Update Date</Typography>
                                            <Typography sx={{ fontSize: 11, mt: 0.5, color: "#D84B9A", }}>
                                                {matchData?.date}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                            <Input
                                                type="date"
                                                disabled={matchData?.date === format(subDays(new Date(), 1), "yyyy-MM-dd")}
                                                value={updateDate[item?.opslno] || ''}
                                                onChange={(e) => handleDateChange(item?.opslno, e.target.value)}
                                                slotProps={{
                                                    input: {
                                                        min: matchData?.date,
                                                        max:
                                                            // matchData?.opslno !== 1 && firstUpdate_ststus === 1
                                                            matchData?.opslno !== 1
                                                                ? firstIpsDate
                                                                : lastday,
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
                                            onClick={() => uploadIpData(matchData?.date, updateDate[item?.opslno], item?.opslno)
                                            }
                                            sx={{
                                                width: "30%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 1,
                                                border: 1,
                                                borderRadius: 10,
                                                borderColor: matchData?.opslno === 1 || firstUpdate_ststus === 1 ? 'rgba(43, 142, 159, 0.66)' : 'rgba(43, 142, 159, 0.66)',
                                                cursor: "pointer",
                                                opacity: lastday === firstIpsDate || lastday > firstIpsDate ? 1 : 0.5,
                                            }}
                                        >
                                            <UnarchiveIcon
                                                sx={{
                                                    color: 'rgba(43, 142, 159, 0.66)',
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    color: 'rgba(var(--font-light))',
                                                    fontSize: 13,
                                                }}>Uploads</Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>

                <Box sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8" }}>
                    <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                        Pharmacy Sales
                    </Typography>
                </Box>
            </Box>
            <CustomBackDrop />
        </Box>
    );
};

export default memo(DataPush);
