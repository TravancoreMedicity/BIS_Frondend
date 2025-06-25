import React, { memo, useCallback } from 'react'
import DefaultPageLayout from '../../Components/DefaultPageLayout'
import MasterPageLayout from '../../Components/MasterPageLayout'
import { Box, Button } from '@mui/joy'
import axiosApi, { axiosellider_kmc } from '../../Axios/Axios'
import { succesNofity, warningNofity } from '../../Constant/Constant'

const MedDescription = () => {

    const AddToStore = useCallback(async () => {
        const result = await axiosellider_kmc.get("/bisQuotationData/medDescription")
        const { data, success } = result.data;
        if (success === 2) {
            const InsertData = await axiosApi.post("/bisQuotation/insertMedDec", data)
            const { success, message } = InsertData.data;
            if (success === 1) {
                succesNofity(message)
            }
            else {
                warningNofity(message)
            }
        }
        else {
            warningNofity("Store Details Already Entered")
        }
    }, [])

    return (
        <DefaultPageLayout label="Med-Description Master" >
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
                        Insert Med-Description Datas
                    </Button>
                </Box >
            </MasterPageLayout >
        </DefaultPageLayout >
    )
}

export default memo(MedDescription)

