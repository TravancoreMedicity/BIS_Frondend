import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getSelectCourseMasterList } from '../api/commonAPI'
import { useQuery } from '@tanstack/react-query'
import { errorNofity } from '../Constant/Constant'

const SelectCourseMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectCourseMaster'],
        queryFn: getSelectCourseMasterList,
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

export default memo(SelectCourseMaster)