import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getSelectDocTypeMasterList } from '../api/commonAPI'
import { useQuery } from '@tanstack/react-query'
import { errorNofity } from '../Constant/Constant'

const SelectDocTypeMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectDOcTypeMast'],
        queryFn: getSelectDocTypeMasterList,
        staleTime: Infinity
    })
    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={data}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectDocTypeMaster) 