import React, { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { useQuery } from '@tanstack/react-query'
import { getSelectCategoryNameList } from '../api/commonAPI'
import { errorNofity } from '../Constant/Constant'

const SelectCmpCategoryNameList = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['docMainType'],
        queryFn: getSelectCategoryNameList,
        staleTime: Infinity
    })
    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'Document Main Type'}
            dataCollection={data}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectCmpCategoryNameList)