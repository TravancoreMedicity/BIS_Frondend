import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getLocationMasterList } from '../api/commonAPI'

const SelectCmpLocationMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectLocationMaster'],
        queryFn: getLocationMasterList,
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

export default memo(SelectCmpLocationMaster) 