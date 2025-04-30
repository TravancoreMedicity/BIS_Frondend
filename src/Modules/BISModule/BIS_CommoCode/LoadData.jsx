import { Box, Input } from '@mui/joy';
import { Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { memo } from 'react';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { getOpModuleDetails, getOpPatientDetails } from '../../../api/commonAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addDays, format, subDays } from 'date-fns';
import axiosApi from '../../../Axios/Axios';

const LoadData = () => {

    const queryClient = useQueryClient()

    const [updateDate, setUpdateDate] = useState({});
    const [lastUpdateDate, setLastUpdateDate] = useState(new Date());

    //getOpPatientDetails
    const { data: OpDatas } = useQuery({
        queryKey: ["opDetails"],
        queryFn: () => getOpPatientDetails(),
    })
    // console.log("OpDatas", OpDatas);

    //op_mosule_details
    const { data: OpModuleDatas } = useQuery({
        queryKey: ["opModuleDetails"],
        queryFn: () => getOpModuleDetails(),
    })

    const mapArr = useMemo(() => {
        if (!OpModuleDatas) return [];
        return [
            {
                title: "Out Patient Module",
                rows: [
                    { opslno: 1, name: OpModuleDatas?.total_op, date: OpModuleDatas?.last_total_op_update_date },
                    { opslno: 2, name: OpModuleDatas?.op_new_reg, date: OpModuleDatas?.last_new_reg_update_date },
                    { opslno: 3, name: OpModuleDatas?.op_visit, date: OpModuleDatas?.last_visit_update_date },
                    { opslno: 4, name: OpModuleDatas?.op_registration_fee, date: OpModuleDatas?.last_reg_fee_update_date },
                    { opslno: 5, name: OpModuleDatas?.op_visit_fee, date: OpModuleDatas?.last_visit_fee_update_date },
                    { opslno: 6, name: OpModuleDatas?.op_collection_total, date: OpModuleDatas?.last_collection_total_update_date },
                    { opslno: 7, name: OpModuleDatas?.op_canel_count, date: OpModuleDatas?.last_canel_count_update_date },
                    { opslno: 8, name: OpModuleDatas?.op_canel_amount, date: OpModuleDatas?.last_canel_amount_update_date },
                ]
            }
        ];
    }, [OpModuleDatas]);

    const mapArr1 = useMemo(() => {
        if (!OpModuleDatas) return [];
        return [
            {
                title: "In Patient Module",
                rows: [
                    { opslno: 1, name: OpModuleDatas.total_op, date: OpModuleDatas.last_total_op_update_date },
                    { opslno: 2, name: OpModuleDatas.op_new_reg, date: OpModuleDatas.last_new_reg_update_date },
                    { opslno: 3, name: OpModuleDatas.op_visit, date: OpModuleDatas.last_visit_update_date },
                    { opslno: 4, name: OpModuleDatas.op_registration_fee, date: OpModuleDatas.last_reg_fee_update_date }
                ]
            }
        ];
    }, [OpModuleDatas]);

    const mapArr2 = useMemo(() => {
        if (!OpModuleDatas) return [];
        return [
            {
                title: "Pharmacy Sales Module",
                rows: [
                    { opslno: 1, name: OpModuleDatas?.total_op, date: OpModuleDatas.last_total_op_update_date },
                    { opslno: 2, name: OpModuleDatas?.op_new_reg, date: OpModuleDatas.last_new_reg_update_date },
                    { opslno: 3, name: OpModuleDatas?.op_visit, date: OpModuleDatas.last_visit_update_date },
                    { opslno: 4, name: OpModuleDatas?.op_registration_fee, date: OpModuleDatas.last_reg_fee_update_date },
                    { opslno: 7, name: OpModuleDatas?.op_canel_count, date: OpModuleDatas.last_canel_count_update_date },
                    { opslno: 8, name: OpModuleDatas?.op_canel_amount, date: OpModuleDatas.last_canel_amount_update_date },
                ]
            }
        ];
    }, [OpModuleDatas]);


    // console.log("mapArr", mapArr);


    // const modules = [
    //     {
    //         title: "Out Patient Module",
    //         rows: [
    //             { slno: 1, label: "Total OP" },
    //             { slno: 2, label: "New Registration" },
    //             { slno: 3, label: "Visit" },
    //             { slno: 4, label: "Total Op Collection" },
    //             { slno: 5, label: "Op Registration Fee" },
    //             { slno: 6, label: "Op Visit Fee" },
    //             { slno: 7, label: "Op cancel Count" },
    //             { slno: 8, label: "Op Cancel Amount" },
    //         ],
    //     },
    //     {
    //         title: "In Patient Module",
    //         rows: [
    //             { slno: 4, label: "Total Admission" },
    //             { slno: 5, label: "Discharge" },
    //             { slno: 6, label: "Dama" },
    //         ],
    //     },
    //     {
    //         title: "Pharmacy Sales Module",
    //         rows: [
    //             { slno: 7, label: "Total Sales" },
    //             { slno: 8, label: "Return" },
    //             { slno: 9, label: "Net Sales" },
    //         ],
    //     },
    // ];

    // const uploadData = useCallback(
    // (slno) => {
    //     if (!OpDatas || !updateDate[slno]) return;

    //     const selectedDate = updateDate[slno];
    //     const matchedRecord = OpDatas.find(item => item.op_visit_date === selectedDate);

    //     const fieldMap = {
    //         1: "op_total_op",
    //         2: "op_new_reg",
    //         3: "op_visit",
    //         4: "op_collection_total",
    //         5: "op_registration_fee",
    //         6: "op_visit_fee",
    //         7: "op_canel_count",
    //         8: "op_canel_amount"
    //     };

    //     const fieldName = fieldMap[slno];
    //     const count = matchedRecord?.[fieldName] ?? 0;

    //     const postData = {
    //         slno,
    //         updateDate: selectedDate,
    //         count,
    //     };
    //     // console.log("postData", postData);
    // },
    // [updateDate, OpDatas]
    // );

    const uploadData = useCallback(async (name, date, last_date) => {
        // console.log("name, date, last_date", name, date, last_date);

        // const payload = {
        //     name,
        //     updateDate: format(new Date, "yyyy-MM-dd HH:mm:ss"),
        //     fromdate: format(addDays(new Date(last_date), 1), "yyyy-MM-dd"),
        //     todate: date
        // };
        // // console.log("payload", payload);
        // const getOracleData = await axiosApi.post("/bisDataPush/getOpOracleData", payload)
        // const { data, success } = getOracleData.data;
        // if (success === 1) {
        //     //insertdata to OP Table
        //     const insertData = await axiosApi.post("/bisDataPush/insertOpcount", payload)
        //     const { data, success } = insertData.data;
        //     if (success === 1) {

        //     }
        //     else {
        //         //else part
        //     }
        // }
        // else {

        // }
    }, [])

    // console.log("uploadDate", uploadDate);
    const today = useMemo(() => new Date().toISOString().split("T")[0], []);

    const lastDate = format(subDays(new Date(), 1), "yyyy-MM-dd")
    // console.log("lastDate", lastDate);

    return (
        <Box sx={{ width: "100%", height: { xl: 900, sm: 1060 } }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    flexWrap: { xl: "nowrap", sm: "wrap" },
                }}
            >

                {mapArr?.map((module, modIndex) => (
                    <Box key={modIndex} sx={{ mt: 1, flex: 1, p: 1 }}>
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
                                        value={updateDate[row?.name] || ''}
                                        onChange={(e) =>
                                            setUpdateDate(() => ({
                                                [row?.name]: e.target.value,
                                            }))
                                        }
                                        slotProps={{
                                            input: {
                                                min: format(new Date(row?.date), "yyyy-MM-dd"),
                                                max: lastDate,
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
                                    onClick={() => uploadData(row?.name, updateDate[row.name], row?.date)}

                                    sx={{
                                        width: "30%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        border: 1,
                                        borderColor: 'rgba(43, 142, 159, 0.66)',
                                        borderRadius: 10,
                                        cursor: "pointer",
                                    }}
                                >
                                    <UnarchiveIcon sx={{ color: 'rgba(43, 142, 159, 0.66)' }} />
                                    <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>Upload</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}





                {mapArr1?.map((module, modIndex) => (
                    <Box key={modIndex} sx={{ mt: 1, flex: 1, p: 1 }}>
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
                                        {row?.date}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                    <Input
                                        type="date"
                                        value={updateDate[row?.opslno] || ''}
                                        onChange={(e) =>
                                            setUpdateDate(() => ({
                                                [row?.opslno]: e.target.value,
                                            }))
                                        }
                                        slotProps={{
                                            input: {
                                                // min: minDate,
                                                max: today,
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
                                    onClick={() => uploadData(row?.opslno)}
                                    sx={{
                                        width: "30%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        border: 1,
                                        borderColor: 'rgba(43, 142, 159, 0.66)',
                                        borderRadius: 10,
                                        cursor: "pointer",
                                    }}
                                >
                                    <UnarchiveIcon sx={{ color: 'rgba(43, 142, 159, 0.66)' }} />
                                    <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>Upload</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}



                {mapArr2?.map((module, modIndex) => (
                    <Box key={modIndex} sx={{ mt: 1, flex: 1, p: 1 }}>
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
                                        {row?.date}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                    <Input
                                        type="date"
                                        value={updateDate[row?.opslno] || ''}
                                        onChange={(e) =>
                                            setUpdateDate(() => ({
                                                [row?.opslno]: e.target.value,
                                            }))
                                        }
                                        slotProps={{
                                            input: {
                                                // min: minDate,
                                                max: today,
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
                                    onClick={() => uploadData(row?.opslno)}
                                    sx={{
                                        width: "30%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        border: 1,
                                        borderColor: 'rgba(43, 142, 159, 0.66)',
                                        borderRadius: 10,
                                        cursor: "pointer",
                                    }}
                                >
                                    <UnarchiveIcon sx={{ color: 'rgba(43, 142, 159, 0.66)' }} />
                                    <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>Upload</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}






                {/* {modules?.map((module, modIndex) => (
                    <Box key={modIndex} sx={{ mt: 1, flex: 1, p: 1 }}>
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
                                        {row?.label}
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "24%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2, flexDirection: "column" }}>
                                    <Typography sx={{ fontSize: 9, color: 'rgba(var(--font-light))', }}>Last Update Date</Typography>
                                    <Typography sx={{ fontSize: 11, mt: 0.5, color: "rosybrown", }}>
                                        2025-04-23
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "center", p: 0.2 }}>
                                    <Input
                                        type="date"
                                        value={updateDate[row.slno] || ''}
                                        onChange={(e) =>
                                            setUpdateDate(() => ({
                                                [row.slno]: e.target.value,
                                            }))
                                        }
                                        slotProps={{
                                            input: {
                                                // min: minDate,
                                                max: today,
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
                                    onClick={() => uploadData(row.slno)}
                                    sx={{
                                        width: "30%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1,
                                        border: 1,
                                        borderColor: 'rgba(43, 142, 159, 0.66)',
                                        borderRadius: 10,
                                        cursor: "pointer",
                                    }}
                                >
                                    <UnarchiveIcon sx={{ color: 'rgba(43, 142, 159, 0.66)' }} />
                                    <Typography sx={{ color: 'rgba(var(--font-light))', fontSize: 13 }}>Upload</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))} */}
            </Box>
        </Box>
    );
};

export default memo(LoadData);
