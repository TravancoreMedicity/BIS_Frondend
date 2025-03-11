import React, { memo, useEffect, useState } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import axiosApi from '../Axios/Axios'

const SelectCmpDocumentMainType = ({ handleChange, value }) => {
    const [docMainType, setDocMainType] = useState([])
    useEffect(() => {
        axiosApi.get('/selectComponets/docMainTypeMaster').then((res) => {
            const { success, data } = res.data
            if (success === 1) {
                const docMainType = data?.map((item) => {
                    return { value: item.main_type_slno, label: item.main_type_name }
                })
                setDocMainType(docMainType)
            }
        })
    }, [])

    return (
        <CustomSelectWithLabel
            labelName='Document Main Type'
            dataCollection={docMainType}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={"Select here ..."}
        />
    )
}

export default memo(SelectCmpDocumentMainType)