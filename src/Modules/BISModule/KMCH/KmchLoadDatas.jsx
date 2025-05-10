import { Box, Input } from '@mui/joy';
import { Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { memo } from 'react';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { getOpModuleDetails } from '../../../api/commonAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, endOfDay, format, startOfDay, subDays } from 'date-fns';
import axiosApi, { axiosellider } from '../../../Axios/Axios';
import { ToastContainer } from 'react-toastify';
import { succesNofity, warningNofity } from '../../../Constant/Constant';

const KmchLoadDatas = () => {

    const queryClient = useQueryClient()

    const [updateDate, setUpdateDate] = useState({});
    const [firstUpdate_ststus, setFirstUpdate_ststus] = useState(0);

    // const { data: OpDatas } = useQuery({
    //     queryKey: ["opDetails"],
    //     queryFn: () => getOpPatientDetails(),
    // })

    const { data: OpModuleDatas } = useQuery({
        queryKey: ["opModuleDetails"],
        queryFn: () => getOpModuleDetails(),
    })


    // const mapArr = useMemo(() => {
    //     if (!OpModuleDatas) return [];
    //     const moduleArray = Object.values(OpModuleDatas);
    //     return [
    //         {
    //             title: "bis_outpatient_visit",
    //             rows: moduleArray?.map((item) => ({
    //                 opslno: item?.opslno,
    //                 name: item?.name,
    //                 date: item?.date,
    //                 status: item?.status
    //             })),
    //         },
    //     ];
    // }, [OpModuleDatas]);


    const uploadData = useCallback(async (fromdate, todate, opslno) => {

        if (todate) {
            const formattedFromDate = format(startOfDay(addDays(fromdate, 1)), 'dd-MMM-yyyy HH:mm:ss');
            const formattedToDate = format(endOfDay(todate), 'dd-MMM-yyyy HH:mm:ss');
            const tDate = format(todate, 'yyyy-MM-dd');
            const payload = {
                fromdate: formattedFromDate,
                todate: formattedToDate,
            };
            const getOracleData = await axiosellider.post("/bisElliderData/opcount", payload)
            const { data, success } = getOracleData.data;
            if (opslno === 1 && success === 2 && data.length !== 0) {
                const enrichedData = data?.map(item => ({
                    ...item,
                    tDate,
                    c_name: 2
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
                    succesNofity(message)
                }
                else {
                    warningNofity(message)
                }
            }
            else {
            }
        }
        else {
            warningNofity("Select Any Date")
        }
    }, [queryClient])

    const mapArrs = [
        { opslno: 1, label: "Total OP" },
        { opslno: 2, label: "New Registration" },
        { opslno: 3, label: "Visit" },
        { opslno: 4, label: "Total Op Collection" },
        { opslno: 5, label: "Op Registration Fee" },
        { opslno: 6, label: "Op Visit Fee" },
        { opslno: 7, label: "Op cancel Count" },
        { opslno: 8, label: "Op Cancel Amount" }
    ]


    const handleDateChange = (opslno, newDate) => {
        setUpdateDate(prev => ({
            ...prev,
            [opslno]: newDate
        }));
    };

    return (
        <Box sx={{ width: "100%", height: { xl: 900, sm: 1060 } }}>
            <ToastContainer />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    flexWrap: { xl: "nowrap", sm: "wrap" },
                }}
            >



                <Box sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8" }}>
                    <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                        bis_outpatient_visit
                    </Typography>
                    {
                        mapArrs?.map((item, index) => {
                            const matchData = OpModuleDatas?.find(val => val?.opslno === item?.opslno);
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
                                                    max:
                                                        matchData?.opslno !== 1 && firstUpdate_ststus === 1
                                                            ? format(new Date(matchData?.date), "yyyy-MM-dd")
                                                            : format(subDays(new Date(), 1), "yyyy-MM-dd")
                                                }
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
                                            // borderColor: 'rgba(43, 142, 159, 0.66)',
                                            borderRadius: 10,
                                            // cursor: "pointer",
                                            // opacity: 1,
                                            borderColor: matchData?.opslno === 1 || firstUpdate_ststus === 1 ? 'rgba(43, 142, 159, 0.66)' : 'rgba(43, 142, 159, 0.66)',

                                            pointerEvents: "auto", // disables click
                                            cursor: matchData?.opslno === 1 || firstUpdate_ststus === 1 ? "pointer" : "not-allowed",
                                            opacity: matchData?.opslno === 1 || firstUpdate_ststus === 1 ? 1 : 0.5,
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

                <Box sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8" }}>
                    <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                        Inpatient
                    </Typography>
                </Box>

                <Box sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8" }}>
                    <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                        Pharmacy Sales
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default memo(KmchLoadDatas);





