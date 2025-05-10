import { Box } from '@mui/joy';
// import React, { useCallback, useMemo, useState } from 'react';
import { memo } from 'react';
// import UnarchiveIcon from '@mui/icons-material/Unarchive';
// import { getOpModuleDetails, getOpPatientDetails } from '../../../api/commonAPI';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { addDays, endOfDay, format, startOfDay, subDays } from 'date-fns';
// import axiosApi, { axiosellider } from '../../../Axios/Axios';
// import { ToastContainer } from 'react-toastify';

const LoadData = () => {

    // const queryClient = useQueryClient()

    // const [updateDate, setUpdateDate] = useState({});
    // const [firstUpdate_ststus, setFirstUpdate_ststus] = useState(0);

    // const { data: OpDatas } = useQuery({
    //     queryKey: ["opDetails"],
    //     queryFn: () => getOpPatientDetails(),
    // })

    // const { data: OpModuleDatas } = useQuery({
    //     queryKey: ["opModuleDetails"],
    //     queryFn: () => getOpModuleDetails(),
    // })

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

    // const uploadData = useCallback(async (name, todate, fromdate, status, opslno) => {
    //     console.log("FirstUpload");
    //     const formattedFromDate = format(startOfDay(addDays(fromdate, 1)), 'dd-MMM-yyyy HH:mm:ss');
    //     const formattedToDate = format(endOfDay(todate), 'dd-MMM-yyyy HH:mm:ss');
    //     const tDate = format(todate, 'yyyy-MM-dd');
    //     const payload = {
    //         fromdate: formattedFromDate,
    //         todate: formattedToDate,
    //     };
    //     const getOracleData = await axiosellider.post("/bisElliderData/opcount", payload)
    //     const { data, success } = getOracleData.data;

    //     if (status === 1 && success === 2 && data.length !== 0) {

    //         const enrichedData = data?.map(item => ({
    //             ...item,
    //             tDate
    //         }));
    //         // console.log("enrichedData", enrichedData);

    //         const insertData = await axiosApi.post("/bisDataPush/insertOpcount", enrichedData);
    //         const { success: insertSuccess, message } = insertData.data;

    //         if (insertSuccess === 1) {
    //             setFirstUpdate_ststus(1)
    //             queryClient.invalidateQueries('opModuleDetails')

    //             console.log("Data successfully inserted:", message);
    //         } else {
    //             console.log("Data not successfully inserted:", message);
    //         }
    //     }
    //     else if (status === 0 && success === 2) {
    //         //     //update to OP Table
    //         //     const insertData = await axiosApi.post("/bisDataPush/updatOpCount", payload)
    //         //     const { data, success,message } = insertData.data;
    //         //     if (success === 1) {
    //         //     }
    //         //     else {
    //         //         //else part
    //         //     }
    //     }
    //     else {
    //     }
    // }, [updateDate, queryClient])

    // const today = useMemo(() => new Date().toISOString().split("T")[0], []);

    // const lastDate = format(subDays(new Date(), 1), "yyyy-MM-dd")


    // console.log("updateDate", updateDate);
    // console.log("ladtdate", lastDate);


    // const SecondUpload = useCallback(() => {

    // }, [])

    return (
        <Box sx={{ width: "100%", height: { xl: 900, sm: 1060 } }}>
            {/* <ToastContainer />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    flexWrap: { xl: "nowrap", sm: "wrap" },
                }}
            >

                {mapArr?.map((module, modIndex) => (
                    <Box key={modIndex} sx={{ mt: 1, flex: 1, p: 1, border: 1, borderColor: "#EBD3F8" }}>
                        <Typography sx={{ textAlign: "center", color: 'rgba(var(--font-light))', fontSize: 15 }}>
                            {module?.title}
                        </Typography>
                        {module?.rows?.map((row, rowIndex) => (
                            <Box
                                key={rowIndex}
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
                                        {row?.name}
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "24%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2, flexDirection: "column" }}>
                                    <Typography sx={{ fontSize: 9, color: 'rgba(var(--font-light))', }}>Last Update Date</Typography>
                                    <Typography sx={{ fontSize: 11, mt: 0.5, color: "rosybrown", }}>
                                        {format(new Date(row?.date), "yyyy-MM-dd")}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                    <Input
                                        type="date"
                                        value={updateDate[row?.name] || lastDate}
                                        onChange={(e) =>
                                            setUpdateDate(() => ({
                                                [row?.name]: e.target.value,
                                            }))
                                        }
                                        slotProps={{
                                            input: {
                                                min: addDays(new Date(row?.date), 1),
                                                max: format(subDays(new Date(), 1), "yyyy-MM-dd"),
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
                                    onClick={() =>
                                        firstUpdate_ststus === 0 && row?.status !== 0 ? uploadData(row?.name, updateDate[row?.name], row?.date, row?.status)
                                            : firstUpdate_ststus === 1 && row?.status === 0 ? SecondUpload(row?.name, updateDate[row?.name], row?.date, row?.status) : null
                                    }
                                    sx={{
                                        width: "30%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        border: 1,
                                        // backgroundColor: row?.status === 0 ? "green" : "pink",
                                        // backgroundColor: updateDate[row?.name] === row?.date ? "green" : "pink",

                                        borderColor: 'rgba(43, 142, 159, 0.66)',
                                        borderRadius: 10,
                                        cursor: "pointer",
                                        opacity: 1,


                                        borderColor:
                                            row?.status === 0 ? 'rgba(194, 182, 182, 0.57)' // disabled color
                                                : 'rgba(43, 142, 159, 0.66)',
                                        borderRadius: 10,
                                        cursor: row?.status === 0 ? "not-allowed" : "pointer",
                                        opacity: row?.status === 0 ? 0.5 : 1,
                                        pointerEvents: row?.status === 0 ? "none" : "auto", // disables click
                                    }}
                                >
                                    {
                                        row?.status === 1 ?
                                            <UnarchiveIcon
                                                sx={{
                                                    // color: firstUpdate_ststus === 0
                                                    // ? 'rgba(194, 182, 182, 0.57)' // greyed out icon
                                                    // : 'rgba(43, 142, 159, 0.66)',
                                                    color: 'rgba(43, 142, 159, 0.66)',
                                                }}
                                            />
                                            :
                                            <UnarchiveIcon
                                                sx={{
                                                    // color: firstUpdate_ststus === 0
                                                    //     ? 'rgba(194, 182, 182, 0.57)' // greyed out icon
                                                    //     : 'rgba(43, 142, 159, 0.66)',
                                                    color: 'rgba(194, 182, 182, 0.57)',
                                                }}
                                            />
                                    }


                                    <Typography
                                        sx={{
                                            color: 'rgba(var(--font-light))',
                                            fontSize: 13,
                                        }}
                                    >
                                        Upload
                                    </Typography>
                                </Box>














                            </Box>
                        ))}
                    </Box>
                ))}

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
            </Box> */}
        </Box>
    );
};

export default memo(LoadData);
