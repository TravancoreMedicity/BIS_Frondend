import React, { lazy, memo, Suspense, useCallback } from 'react'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import MasterPageLayout from '../../Components/MasterPageLayout'
import { Box, Button } from '@mui/joy'
import axiosApi, { axiosellider_kmc } from '../../Axios/Axios'
import { succesNofity, warningNofity } from '../../Constant/Constant'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetTmcStoreMaster } from '../../api/commonAPI'
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState'

const TmcStoreMaster = () => {

    const queryClient = useQueryClient()

    const StoreData = lazy(() => import('../../Components/CustomTable'));

    const { data: GetstoreMasData } = useQuery({
        queryKey: ["storeMast"],
        queryFn: GetTmcStoreMaster,
        staleTime: Infinity,
    });

    const AddToStore = useCallback(async () => {
        const result = await axiosellider_kmc.get("/bisQuotationData/storeItems")
        const { data, success } = result.data;
        if (success === 2) {
            const InsertData = await axiosApi.post("/bisQuotation/insertTmcStoreDetails", data)
            const { success, message } = InsertData.data;
            if (success === 1) {
                succesNofity(message)
                queryClient.invalidateQueries(['storeMast'])
            }
            else {
                warningNofity("Can't Insert Store Details")
            }
        }
        else {
            warningNofity("Store Details Already Entered")
        }
    }, [queryClient])

    return (
        <DefaultPageLayout label=" Tmc Store Master" >
            <MasterPageLayout>
                <Box sx={{ textAlign: "center" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "#00809D",
                            color: "#fff",
                            border: '1px solid #00809D',
                            borderRadius: '16px', // if you want it to look like a chip
                            padding: '6px 12px',
                            textTransform: 'none', // optional: disable uppercase
                            '&:hover': {
                                backgroundColor: "#006C85",
                                borderColor: '#006C85',
                                cursor: 'pointer',
                            },
                        }}
                        onClick={AddToStore}
                    >
                        Insert Store Details
                    </Button>

                    <Box>
                        <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                            <StoreData tableHeaderCol={['Slno', 'Store Code', 'Store Desc', 'Stc Alias']} >
                                {
                                    GetstoreMasData?.map((item, idx) => (
                                        <tr key={idx}>
                                            <td style={{ textAlign: "left" }}>{idx + 1}</td>
                                            <td style={{ textAlign: "left" }}>{item?.st_code}</td>
                                            <td style={{ textAlign: "left" }}>{item?.stc_desc?.toUpperCase()}</td>
                                            <td style={{ textAlign: "left" }}>{item?.stc_alias}</td>
                                        </tr>
                                    ))
                                }
                            </StoreData>

                        </Suspense>
                    </Box>
                </Box >
            </MasterPageLayout >
        </DefaultPageLayout >
    )
}

export default memo(TmcStoreMaster)

